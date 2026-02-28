import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { label: "Ongelma", href: "#ongelma", type: "hash" },
  { label: "Ydinajatus", href: "#ydinajatus", type: "hash" },
  { label: "9 uskomusta", href: "#uskomukset", type: "hash" },
  { label: "Tieteelliset perusteet", href: "#tieteelliset", type: "hash" },
  { label: "Osallistu", href: "#osallistu", type: "hash" },
  { label: "Malli", href: "/model", type: "route" },
  { label: "Arvioi tehtäväsi", href: "/assessment", type: "route" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const renderNavLink = (item: typeof navItems[0]) => {
    const className = "text-sm font-medium text-muted-foreground hover:text-primary transition-colors";
    const mobileClassName = "text-base font-medium text-primary hover:text-accent transition-colors py-2";

    if (item.type === "route") {
      return (
        <Link
          key={item.href}
          to={item.href}
          className={className}
          onClick={() => setIsMobileMenuOpen(false)}
        >
          {item.label}
        </Link>
      );
    }

    // Hash links: if on home page, just use anchor. Otherwise, navigate to /#section
    const href = isHome ? item.href : `/${item.href}`;
    return (
      <a
        key={item.href}
        href={href}
        className={className}
        onClick={() => setIsMobileMenuOpen(false)}
      >
        {item.label}
      </a>
    );
  };

  const renderMobileNavLink = (item: typeof navItems[0]) => {
    const className = "text-base font-medium text-primary hover:text-accent transition-colors py-2";

    if (item.type === "route") {
      return (
        <Link
          key={item.href}
          to={item.href}
          className={className}
          onClick={() => setIsMobileMenuOpen(false)}
        >
          {item.label}
        </Link>
      );
    }

    const href = isHome ? item.href : `/${item.href}`;
    return (
      <a
        key={item.href}
        href={href}
        onClick={() => setIsMobileMenuOpen(false)}
        className={className}
      >
        {item.label}
      </a>
    );
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-sm shadow-sm border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="container-narrow">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex flex-col">
            <span className="text-xl md:text-2xl font-extrabold tracking-tight text-primary">
              HAR
            </span>
            <span className="text-[10px] md:text-xs text-muted-foreground -mt-1">
              Human-to-Agent Ratio
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map(renderNavLink)}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-primary"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-background border-b border-border"
          >
            <nav className="container-narrow py-4 flex flex-col gap-4">
              {navItems.map(renderMobileNavLink)}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
