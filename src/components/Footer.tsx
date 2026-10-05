export function Footer() {
  return (
    <footer className="py-8 bg-background border-t border-border">
      <div className="container-narrow text-center">
        <p className="text-primary font-medium mb-1">
          HAR: Human Agent Relationship © 2026 Tapio Nissilä & Niklas Nordling
        </p>
        <p className="text-sm text-muted-foreground italic mb-2">
          "Don't Scale Chaos"
        </p>
        <p className="text-xs text-secondary font-medium mb-3">
          Kirja ilmestyy 6.11.2026 · Ennakkomyynti auki
        </p>
        <a
          href="https://propublishing.fi/products/ihmisten-ja-agenttien-organisaatio-miten-muotoilet-toimintamallin"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-accent text-accent-foreground text-sm font-semibold hover:opacity-90 transition"
        >
          Osta kirja
        </a>
        <p className="mt-4 text-sm">
          <a href="/media" className="text-secondary hover:underline">Medialle</a>
        </p>


      </div>
    </footer>
  );
}
