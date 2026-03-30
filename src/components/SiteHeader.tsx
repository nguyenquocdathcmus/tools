"use client";

import { useState } from "react";
import Link from "next/link";

type SiteHeaderProps = {
  compact?: boolean;
};

export default function SiteHeader({ compact = false }: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className={`site-header ${compact ? "is-compact" : ""}`}>
      <div className="header-main">
        <div className="header-row">
          <Link href="/" className="brand" onClick={closeMenu}>
            <span className="brand-mark">M</span>
            <span className="brand-text-wrap">
              <span className="brand-text">MyTools</span>
            </span>
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

        <nav id="main-nav" className={`top-nav ${menuOpen ? "is-open" : ""}`} aria-label="Main navigation">
          <Link href="/" onClick={closeMenu}>Home</Link>
          <Link href="/tools/format" onClick={closeMenu}>Format</Link>
          <Link href="/tools/encode" onClick={closeMenu}>Encode</Link>
          <Link href="/tools/timestamp" onClick={closeMenu}>Timestamp</Link>
          <Link href="/tools/image" onClick={closeMenu}>Image</Link>
          <Link href="/tools/pdf" onClick={closeMenu}>PDF</Link>
          <Link href="/tools/qrcode" onClick={closeMenu}>QR Code</Link>
        </nav>
      </div>
    </header>
  );
}
