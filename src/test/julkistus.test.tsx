import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { describe, it, expect, beforeAll } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "@/App";
import Julkistus from "@/pages/Julkistus";
import { LaunchEventSection } from "@/components/LaunchEventSection";
import { ORDER_URL, orderUrl } from "@/lib/julkistus";

// jsdom ei tunne IntersectionObserveria; etusivun framer-motion-osiot (whileInView) tarvitsevat sen.
beforeAll(() => {
  class NoopObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords() {
      return [];
    }
  }
  Object.defineProperty(window, "IntersectionObserver", { writable: true, value: NoopObserver });
});

const PDF = "/julkistus/HAR_julkistus_11112026_tiivistelma.pdf";

function renderPage(path = "/julkistus") {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Julkistus />
    </MemoryRouter>,
  );
}

describe("orderUrl", () => {
  it("palauttaa perusosoitteen, kun utm_content puuttuu", () => {
    expect(orderUrl("")).toBe(ORDER_URL);
    expect(orderUrl("?foo=bar")).toBe(ORDER_URL);
  });

  it("perusosoitteessa on julkistuksen utm-parametrit", () => {
    const params = new URL(ORDER_URL).searchParams;
    expect(params.get("utm_source")).toBe("h2a.fi");
    expect(params.get("utm_medium")).toBe("referral");
    expect(params.get("utm_campaign")).toBe("julkistus");
    expect(params.has("utm_content")).toBe(false);
  });

  it("lisää sivun utm_content-arvon tilauslinkkiin", () => {
    expect(orderUrl("?utm_content=ryhma-a")).toBe(`${ORDER_URL}&utm_content=ryhma-a`);
  });

  it("ohittaa tyhjän, pelkät välilyönnit sisältävän ja yli 100 merkin arvon", () => {
    expect(orderUrl("?utm_content=")).toBe(ORDER_URL);
    expect(orderUrl("?utm_content=%20%20")).toBe(ORDER_URL);
    expect(orderUrl(`?utm_content=${"a".repeat(101)}`)).toBe(ORDER_URL);
    expect(orderUrl(`?utm_content=${"a".repeat(100)}`)).toBe(`${ORDER_URL}&utm_content=${"a".repeat(100)}`);
  });

  it("ei päästä arvoa lisäämään tai korvaamaan muita parametreja", () => {
    const url = new URL(orderUrl("?utm_content=" + encodeURIComponent("x&utm_source=evil#frag")));
    expect(url.searchParams.getAll("utm_source")).toEqual(["h2a.fi"]);
    expect(url.searchParams.get("utm_content")).toBe("x&utm_source=evil#frag");
    expect(url.hash).toBe("");
  });

  it("säilyttää minkä tahansa arvon sellaisenaan ja muut parametrit ennallaan (generoidut syötteet)", () => {
    const pool = "abcXYZ019 -_.~&=?#%+/äöÅ€\"'<>";
    let seed = 42;
    const next = () => {
      seed = (seed * 1103515245 + 12345) % 2147483648;
      return seed;
    };
    for (let i = 0; i < 300; i++) {
      const len = next() % 110;
      let raw = "";
      for (let j = 0; j < len; j++) raw += pool[next() % pool.length];
      const url = new URL(orderUrl("?utm_content=" + encodeURIComponent(raw)));
      expect(url.searchParams.getAll("utm_source")).toEqual(["h2a.fi"]);
      expect(url.searchParams.getAll("utm_campaign")).toEqual(["julkistus"]);
      const expected = raw.trim();
      if (expected.length >= 1 && expected.length <= 100) {
        expect(url.searchParams.get("utm_content")).toBe(expected);
      } else {
        expect(url.searchParams.has("utm_content")).toBe(false);
      }
    }
  });
});

describe("Julkistus-sivu", () => {
  it("asettaa sivun otsikon ja näyttää pääotsikon", () => {
    renderPage();
    expect(document.title).toBe("Kirjan julkistus 11.11.2026 | Ihmisten ja agenttien organisaatio");
    expect(
      screen.getByRole("heading", { level: 1, name: "Ihmisten ja agenttien organisaatio julkaistiin Sofiassa" }),
    ).toBeInTheDocument();
  });

  it("yläosan nappi vie puheenvuoroihin, ja ankkurikohde on olemassa", () => {
    const { container } = renderPage();
    expect(screen.getByRole("link", { name: "Katso puheenvuorot" })).toHaveAttribute("href", "#puheenvuorot");
    const target = container.querySelector("#puheenvuorot");
    expect(target).not.toBeNull();
    expect(within(target as HTMLElement).getByRole("heading", { name: "Tapion ja Niklaksen puheenvuorot" })).toBeInTheDocument();
  });

  it("upottaa puheenvuorot YouTubesta laiskasti", () => {
    renderPage();
    const yt = screen.getByTitle("Tapion ja Niklaksen puheenvuorot");
    expect(yt.tagName).toBe("IFRAME");
    expect(yt).toHaveAttribute("src", "https://www.youtube-nocookie.com/embed/YKGG3txU5yQ");
    expect(yt).toHaveAttribute("loading", "lazy");
    expect(screen.getByRole("link", { name: "Katso YouTubessa" })).toHaveAttribute(
      "href",
      "https://www.youtube.com/watch?v=YKGG3txU5yQ",
    );
  });

  it("ei upota paneelin ääninäytteitä sisältävää koostevideota", () => {
    renderPage();
    const iframes = Array.from(document.querySelectorAll("iframe"));
    expect(iframes).toHaveLength(1);
    expect(iframes.some((f) => f.getAttribute("src")?.includes("drive.google.com"))).toBe(false);
    expect(screen.queryByRole("heading", { name: "Aamu kolmessa minuutissa" })).toBeNull();
  });

  it("tarjoaa tiivistelmän PDF:nä", () => {
    renderPage();
    expect(screen.getByRole("link", { name: "Lataa tiivistelmä (PDF, 4 Mt)" })).toHaveAttribute("href", PDF);
  });

  it("näyttää kolme johtopäätöstä", () => {
    renderPage();
    for (const t of ["Älä skaalaa kaaosta.", "Älä tee ihmisestä automaation pullonkaulaa.", "Muotoile päätöspolut uudelleen."]) {
      expect(screen.getByText(t)).toBeInTheDocument();
    }
  });

  it("paneeliosiossa on moderaattori, kysymykset ja panelistit, mutta ei lainauksia", () => {
    renderPage();
    const heading = screen.getByRole("heading", { name: "Paneeli: Mitä tekoälyagentit vaativat johtamiselta?" });
    const panel = heading.closest("section") as HTMLElement;
    expect(within(panel).getByText(/Moderaattorina Riina Ollila, FCG\./)).toBeInTheDocument();
    expect(within(panel).getAllByRole("listitem").length).toBeGreaterThanOrEqual(3);
    for (const name of ["Timo Ritakallio", "Outi Sivonen", "Mikael Jungner"]) {
      expect(within(panel).getByRole("heading", { level: 3, name })).toBeInTheDocument();
    }
    expect(panel.querySelectorAll("blockquote, q")).toHaveLength(0);
    expect(panel.textContent).not.toMatch(/[”“"]/);
  });

  it("nostaa kuusi kirjoittajien lainausta, joista jokaisesta on linkki leikkeeseen", () => {
    renderPage();
    const heading = screen.getByRole("heading", { level: 2, name: "Nostoja puheenvuoroista" });
    const section = heading.closest("section") as HTMLElement;
    expect(section.querySelectorAll("blockquote")).toHaveLength(6);
    const clips = within(section).getAllByRole("link", { name: /^Katso leike: / });
    expect(clips).toHaveLength(6);
    for (const a of clips) {
      expect(a.getAttribute("href")).toMatch(/^https:\/\/drive\.google\.com\/file\/d\/[\w-]+\/view$/);
      expect(a).toHaveAttribute("target", "_blank");
      expect(a).toHaveTextContent("Katso leike");
    }
    const names = Array.from(section.querySelectorAll("figure")).map((f) => f.querySelector("span")?.textContent);
    expect(names.filter((n) => n === "Tapio Nissilä")).toHaveLength(2);
    expect(names.filter((n) => n === "Niklas Nordling")).toHaveLength(4);
  });

  it("nostot tulevat heti YouTube-osion jälkeen", () => {
    renderPage();
    const h2s = screen.getAllByRole("heading", { level: 2 }).map((h) => h.textContent);
    expect(h2s.indexOf("Nostoja puheenvuoroista")).toBe(h2s.indexOf("Tapion ja Niklaksen puheenvuorot") + 1);
  });

  it("kuvagallerian kuvat avautuvat suurempina /julkistus/-kansiosta", () => {
    renderPage();
    const heading = screen.getByRole("heading", { level: 2, name: "Kuvat" });
    const section = heading.closest("section") as HTMLElement;
    const links = within(section).getAllByRole("link");
    expect(links.length).toBeGreaterThanOrEqual(10);
    for (const a of links) {
      const img = a.querySelector("img");
      expect(img).not.toBeNull();
      const full = a.getAttribute("href") ?? "";
      expect(full).toMatch(/^\/julkistus\/[\w-]+\.jpg$/);
      expect(img?.getAttribute("src")).toBe(full.replace(/\.jpg$/, "-pieni.jpg"));
      expect(img?.getAttribute("alt")?.trim()).toBeTruthy();
      expect(img).toHaveAttribute("loading", "lazy");
    }
  });

  it("listaa mediajutut uusimmasta vanhimpaan", () => {
    renderPage();
    const hrefs = [
      "https://www.verkkouutiset.fi/a/tekoalyn-piti-vapauttaa-aikaa-se-voikin-kuormittaa-enemman/",
      "https://www.hbl.fi/ekonomi/vara-hjarnor-ar-inte-gjorda-for-snabba-robotsvar/",
      "https://www.kuntalehti.fi/mielipide/mielipide-kunnan-tekoaelyagentti-tarvitsee-nimetyn-vastuuhenkiloen/327980",
      "https://yle.fi/a/7-10106890",
    ];
    const found = screen
      .getAllByRole("link")
      .map((a) => a.getAttribute("href"))
      .filter((h): h is string => !!h && hrefs.includes(h));
    expect(found).toEqual(hrefs);
  });

  it("tilauslinkit kantavat sivun utm_content-arvon", () => {
    renderPage("/julkistus?utm_content=kutsu-b");
    const expected = `${ORDER_URL}&utm_content=kutsu-b`;
    expect(screen.getByRole("link", { name: "Tilaa kirja" })).toHaveAttribute("href", expected);
    expect(screen.getByRole("link", { name: "Tilaa kirja kustantajalta" })).toHaveAttribute("href", expected);
  });

  it("tilauslinkit ilman utm_contentia käyttävät perusosoitetta", () => {
    renderPage();
    expect(screen.getByRole("link", { name: "Tilaa kirja" })).toHaveAttribute("href", ORDER_URL);
    expect(screen.getByRole("link", { name: "Tilaa kirja kustantajalta" })).toHaveAttribute("href", ORDER_URL);
  });

  it("linkittää HARin LinkedIn-sivulle ja uutiskirjeeseen", () => {
    renderPage();
    expect(screen.getByRole("link", { name: "Seuraa HARia LinkedInissä" })).toHaveAttribute(
      "href",
      "https://www.linkedin.com/company/112510385/",
    );
    expect(screen.getByRole("link", { name: "Tilaa HAR-uutiskirje" })).toHaveAttribute(
      "href",
      "https://www.linkedin.com/newsletters/har-human-agent-relationship-7441134902617563136/",
    );
  });

  it("kaikilla kuvilla on suomenkielinen alt-teksti ja ne ladataan julkistus-kansiosta", () => {
    renderPage();
    const imgs = Array.from(document.querySelectorAll("main img"));
    expect(imgs.length).toBeGreaterThanOrEqual(5);
    for (const img of imgs) {
      expect(img.getAttribute("alt")?.trim()).toBeTruthy();
    }
    const photoSrcs = imgs.map((i) => i.getAttribute("src")).filter((s) => s?.startsWith("/julkistus/"));
    expect(photoSrcs.length).toBeGreaterThanOrEqual(5);
  });

  it("jokainen sivun viittaama paikallinen kuva- ja PDF-tiedosto on olemassa public-kansiossa", () => {
    renderPage();
    const refs = [
      ...Array.from(document.querySelectorAll("main img")).map((i) => i.getAttribute("src")),
      ...Array.from(document.querySelectorAll("main a")).map((a) => a.getAttribute("href")),
    ].filter((r): r is string => !!r && /^\/(julkistus|media)\//.test(r));
    expect(refs.length).toBeGreaterThan(20);
    const missing = refs.filter((r) => !existsSync(resolve(process.cwd(), "public", r.slice(1))));
    expect(missing).toEqual([]);
  });

  it("ylävalikon Julkistus vie sivulle /julkistus", () => {
    renderPage();
    const links = screen.getAllByRole("link", { name: "Julkistus" });
    expect(links.length).toBeGreaterThan(0);
    for (const a of links) expect(a).toHaveAttribute("href", "/julkistus");
  });
});

describe("reititys", () => {
  it("osoite /julkistus näyttää julkistussivun", () => {
    window.history.pushState({}, "", "/julkistus");
    render(<App />);
    expect(
      screen.getByRole("heading", { level: 1, name: "Ihmisten ja agenttien organisaatio julkaistiin Sofiassa" }),
    ).toBeInTheDocument();
    window.history.pushState({}, "", "/");
  });
});

describe("etusivun julkistusosio", () => {
  function renderSection() {
    return render(
      <MemoryRouter>
        <LaunchEventSection />
      </MemoryRouter>,
    );
  }

  it("kertoo julkistuksesta menneessä aikamuodossa", () => {
    renderSection();
    expect(screen.getByText("Julkistus 11.11.2026")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Kirja julkaistiin täydelle salille" })).toBeInTheDocument();
    expect(
      screen.getByText(
        "Kirjoittajat avasivat kirjan keskeiset ajatukset, ja paneelissa Timo Ritakallio, Outi Sivonen ja Mikael Jungner keskustelivat siitä, mitä tekoälyagentit vaativat johtamiselta.",
      ),
    ).toBeInTheDocument();
  });

  it("ohjaa julkistussivulle eikä näytä enää aika-, paikka- tai ilmoittautumistietoja", () => {
    renderSection();
    expect(screen.getByRole("link", { name: "Katso puheenvuorot ja tunnelmat" })).toHaveAttribute("href", "/julkistus");
    expect(screen.queryByText("Ohjelma ja ilmoittautuminen julkaistaan pian.")).toBeNull();
    expect(screen.queryByText(/Sofiankatu/)).toBeNull();
    expect(screen.queryByText(/klo 8\.45/)).toBeNull();
  });

  it("pitää panelistilistan", () => {
    renderSection();
    for (const name of ["Timo Ritakallio", "Outi Sivonen", "Mikael Jungner"]) {
      expect(screen.getByText(name)).toBeInTheDocument();
    }
  });
});
