import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import RequestFeaturePanel from "@/components/RequestFeaturePanel";

export const metadata: Metadata = {
  title: "Request a Feature",
  description: "Request a new feature or tool for Daxnoria.",
};

export default function RequestFeaturePage() {
  return (
    <main className="page-wrap app-shell">
      <SiteHeader compact />
      <section className="hero">
        <p className="badge">Contact</p>
        <h1>Request a Feature</h1>
        <p className="lead">Let us know what kind of tools you need. We are always looking to improve Daxnoria.</p>
      </section>
      <RequestFeaturePanel />
      <SiteFooter />
    </main>
  );
}