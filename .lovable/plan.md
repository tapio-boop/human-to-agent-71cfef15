## Tarkistuksen tulokset

Kävin läpi `index.html`:n ja koko koodikannan. Sisällön nimimuutos (Human-to-Agent Ratio → Human Agent Relationship) on tehty kauttaaltaan — title, description, og-tagit ja sivujen sisältö ovat ajan tasalla. Löysin kuitenkin kolme korjattavaa kohtaa.

## Korjattavat asiat

### 1. Puuttuva canonical ja og:url (`index.html`)
Tällä hetkellä `<head>`:stä puuttuvat:
- `<link rel="canonical" href="https://h2a.fi/" />`
- `<meta property="og:url" content="https://h2a.fi/" />`

Nämä ovat tärkeitä Googlen ja sosiaalisen median jakojen kannalta — ilman canonicalia hakukoneet voivat indeksoida useita variantteja (`h2a.fi`, `www.h2a.fi`, `human-to-agent.lovable.app`) erillisinä sivuina.

### 2. og:image osoittaa Lovablen placeholderiin
Nykyinen `og:image` ja `twitter:image` osoittavat `https://lovable.dev/opengraph-image-p98pqg.png` — yleinen Lovable-kuva. Vaihtoehdot:
- **A:** Poistetaan placeholder kokonaan (ei kuvaa jakolinkeissä, mutta ei myöskään väärää brändiä).
- **B:** Generoidaan HAR-brändätty 1200×630 jakokuva ja viitataan siihen.

### 3. Sisäinen tunniste edge-funktiossa
`supabase/functions/send-transactional-email/index.ts` rivillä 8: `const SITE_NAME = "human-to-agent"`. Tämä on sisäinen tunniste eikä näy käyttäjille, mutta voidaan siistiä esim. `"har"` tai `"h2a"`.

## Mitä tehdään

1. Lisätään `index.html`:ään `<link rel="canonical" href="https://h2a.fi/" />` ja `<meta property="og:url" content="https://h2a.fi/" />`.
2. og:image: valintasi mukaan (A poisto tai B generointi).
3. Päivitetään `SITE_NAME` → `"har"` edge-funktiossa.

## Kysymys ennen toteutusta

Kohdan 2 (og:image) osalta — kumpi: **A** poistetaan placeholder, vai **B** generoidaan HAR-brändätty jakokuva?
