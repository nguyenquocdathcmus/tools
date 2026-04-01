import Link from "next/link";

export default function SiteFooter() {
  const year = new Date().getFullYear();

  const footerSections = [
    {
      title: "Shell",
      links: [
        { href: "/", label: "Home" },
        { href: "/request-feature", label: "Request feature" },
      ],
    },
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
        { href: "/tools/qrcode", label: "QR Code Tools" },
      ],
    },
    {
      title: "Resources",
      links: [
        { href: "/", label: "Homepage" },
        { href: "/request-feature", label: "Request Feature" },
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
          <p className="footer-copy">A code-first toolkit for formatting, encoding, counting and converting developer data in seconds.</p>
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
        <p>© {year} MyTools. Built for developers, technical teams, and fast workflows.</p>
      </div>
    </footer>
  );
}
