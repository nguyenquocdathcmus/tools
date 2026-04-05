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
          <Link href="/blog/json-format-guide">
            <span>JSON Format Guide</span>
            <small>Structure guide -&gt;</small>
          </Link>
        </li>
        <li>
          <Link href="/blog/fix-invalid-json">
            <span>Fix Invalid JSON</span>
            <small>Repair guide -&gt;</small>
          </Link>
        </li>
        <li>
          <Link href="/blog/common-json-errors">
            <span>Common JSON Errors</span>
            <small>Error checklist -&gt;</small>
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
        <li>
          <Link href="/blog/base64-encode-decode-workflow">
            <span>Base64 Encode And Decode Workflow</span>
            <small>Encoding guide -&gt;</small>
          </Link>
        </li>
        <li>
          <Link href="/blog/url-encoding-guide-for-webworkflows">
            <span>URL Encoding Guide</span>
            <small>Query string guide -&gt;</small>
          </Link>
        </li>
        <li>
          <Link href="/blog/text-counting-guide-for-writers-and-seo">
            <span>Text Counting Guide</span>
            <small>Copy length guide -&gt;</small>
          </Link>
        </li>
        <li>
          <Link href="/blog/timestamp-converter-for-productivity">
            <span>Timestamp Converter Use Cases</span>
            <small>Time workflow guide -&gt;</small>
          </Link>
        </li>
        <li>
          <Link href="/blog/qrcode-link-sharing-guide">
            <span>QR Code Sharing Guide</span>
            <small>Sharing guide -&gt;</small>
          </Link>
        </li>
        <li>
          <Link href="/blog/url-decode-practical-guide">
            <span>URL Decode Practical Guide</span>
            <small>Decoding guide -&gt;</small>
          </Link>
        </li>
        <li>
          <Link href="/blog/base64-decode-inspection-guide">
            <span>Base64 Decode Inspection Guide</span>
            <small>Inspection guide -&gt;</small>
          </Link>
        </li>
        <li>
          <Link href="/blog/diff-checker-review-workflow">
            <span>Diff Checker Review Workflow</span>
            <small>Review guide -&gt;</small>
          </Link>
        </li>
        <li>
          <Link href="/blog/xml-formatter-clean-xml-workflow">
            <span>XML Formatter Clean XML Workflow</span>
            <small>Legacy XML guide -&gt;</small>
          </Link>
        </li>
        <li>
          <Link href="/blog/pdf-tool-workflow-for-large-documents">
            <span>PDF Tool Workflow For Large Documents</span>
            <small>Document guide -&gt;</small>
          </Link>
        </li>
        <li>
          <Link href="/json-tools">
            <span>JSON Tools Hub</span>
            <small>Cluster page -&gt;</small>
          </Link>
        </li>
      </ul>
    </section>
  );
}
