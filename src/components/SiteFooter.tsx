import Link from "next/link";

export default function SiteFooter() {
  const year = new Date().getFullYear();

  const footerSections = [
    {
      title: "Core Tools",
      links: [
        { href: "/json-formatter", label: "JSON Formatter" },
        { href: "/xml-formatter", label: "XML Formatter" },
        { href: "/tools/timestamp", label: "Timestamp Converter" },
      ],
    },
    {
      title: "Utilities",
      links: [
        { href: "/tools/encode", label: "Encode Tools" },
        { href: "/tools/image", label: "Image Tools" },
        { href: "/tools/pdf", label: "PDF Tools" },
      ],
    },
    {
      title: "Resources",
      links: [
        { href: "/", label: "Homepage" },
        { href: "/sitemap.xml", label: "Sitemap" },
        { href: "/robots.txt", label: "Robots" },
      ],
    },
  ];

  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <section className="footer-intro">
          <div className="footer-brand-row">
            <span className="footer-mark" aria-hidden="true">
              M
            </span>
            <p className="footer-brand">MyTools</p>
          </div>
          <p className="footer-copy">A focused toolkit for formatting, encoding, and converting developer data in seconds.</p>
          <div className="footer-quick-links">
            <Link href="/#premium">Premium</Link>
            <Link href="/#popular">Popular</Link>
          </div>
        </section>

        {footerSections.map((section) => (
          <section key={section.title}>
            <p className="footer-title">{section.title}</p>
            <div className="footer-links">
              {section.links.map((link) => (
                <Link key={link.href} href={link.href}>
                  {link.label}
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>

      <div className="footer-meta">
        <p>© {year} MyTools. Built for developers and technical teams.</p>
        <div className="footer-meta-links">
          <Link href="/#premium">Premium</Link>
          <Link href="/#popular">Popular</Link>
        </div>
      </div>
    </footer>
  );
}
