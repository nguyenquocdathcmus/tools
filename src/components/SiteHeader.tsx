"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type SiteHeaderProps = {
  compact?: boolean;
};

export default function SiteHeader({ compact = false }: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/tools/format", label: "Format" },
    { href: "/tools/encode", label: "Encode" },
    { href: "/tools/text-count", label: "Text Count" },
    { href: "/tools/timestamp", label: "Timestamp" },
    { href: "/tools/image", label: "Image" },
    { href: "/tools/pdf", label: "PDF" },
    { href: "/tools/qrcode", label: "QR Code" },
  ];

  function closeMenu() {
    setMenuOpen(false);
  }

  function isActive(href: string) {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname.startsWith(href);
  }

  return (
    <header className={`site-header ${compact ? "is-compact" : ""}`}>
      <div className="header-main">
        <div className="header-row">
          <Link href="/" className="brand" onClick={closeMenu}>
            <span className="brand-mark">M</span>
            <span className="brand-text-wrap">
              <span className="brand-text">MyTools</span>
              <span className="brand-subtitle">Code tools for fast workflows</span>
            </span>
          </Link>

          <div className="header-actions">
            <Link href="/request-feature" className="header-cta" onClick={closeMenu}>
              Request feature
            </Link>

            <button
              type="button"
              className="menu-toggle"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="main-nav"
              onClick={() => setMenuOpen((current) => !current)}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                {menuOpen ? (
                  <path d="M18.3 7.1L16.9 5.7 12 10.6 7.1 5.7 5.7 7.1l4.9 4.9-4.9 4.9 1.4 1.4 4.9-4.9 4.9 4.9 1.4-1.4-4.9-4.9z" />
                ) : (
                  <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z" />
                )}
              </svg>
            </button>
          </div>
        </div>

        <nav id="main-nav" className={`top-nav ${menuOpen ? "is-open" : ""}`} aria-label="Main navigation">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={closeMenu}
              className={isActive(item.href) ? "is-active" : ""}
              aria-current={isActive(item.href) ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
