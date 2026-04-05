import Link from "next/link";

type BlogFunnelLinksProps = {
  title?: string;
};

export default function BlogFunnelLinks({ title = "Developer Guides" }: BlogFunnelLinksProps) {
  return (
    <section className="supported" aria-labelledby="blog-guides-title">
      <h2 id="blog-guides-title">{title}</h2>
      <ul className="related-grid">
        <li>
          <Link href="/blog/ai-tools-for-developers">
            <span>AI Tools For Developers</span>
            <small>Workflow guide -&gt;</small>
          </Link>
        </li>
        <li>
          <Link href="/blog/json-formatter-best-practices">
            <span>JSON Formatter Best Practices</span>
            <small>Validation guide -&gt;</small>
          </Link>
        </li>
        <li>
          <Link href="/blog/xml-validator-best-practices">
            <span>XML Validator Best Practices</span>
            <small>SOAP guide -&gt;</small>
          </Link>
        </li>
        <li>
          <Link href="/blog/jwt-debugging-workflow">
            <span>JWT Debugging Workflow</span>
            <small>Auth guide -&gt;</small>
          </Link>
        </li>
        <li>
          <Link href="/blog/unix-timestamp-converter-use-cases">
            <span>Unix Timestamp Converter Use Cases</span>
            <small>Debugging guide -&gt;</small>
          </Link>
        </li>
      </ul>
    </section>
  );
}
