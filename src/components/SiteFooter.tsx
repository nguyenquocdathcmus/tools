import Link from "next/link";

export default function SiteFooter() {
  const year = new Date().getFullYear();

  const footerSections = [
    {
      title: "Core Tools",
      links: [
        { href: "/json-formatter", label: "JSON Formatter" },
        { href: "/xml-formatter", label: "XML Formatter" },
        { href: "/timestamp", label: "Timestamp Converter" },
      ],
    },
    {
      title: "Utilities",
      links: [
        { href: "/encode", label: "Encode Tools" },
        { href: "/image", label: "Image Tools" },
        { href: "/pdf", label: "PDF Tools" },
        { href: "/qrcode", label: "QR Code Tools" },
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
            <img
              src="/icon.svg"
              alt="Daxnoria Logo"
              width={30}
              height={30}
              className="footer-mark"
              style={{ background: "transparent", boxShadow: "none" }}
            />
            <p className="footer-brand">Daxnoria</p>
          </div>
          <p className="footer-copy">A code-first toolkit for formatting, encoding, counting and converting developer data in seconds.</p>
          <p className="footer-copy">
            Contact: <a href="mailto:daxnoria@gmail.com">daxnoria@gmail.com</a>
          </p>
          <p className="footer-copy">
            Facebook: <a href="https://web.facebook.com/people/Daxnoria/61575367715805/" target="_blank" rel="noopener noreferrer">Daxnoria</a>
          </p>
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
        <p>© {year} Daxnoria. Built for developers, technical teams, and fast workflows.</p>
      </div>
    </footer>
  );
}
