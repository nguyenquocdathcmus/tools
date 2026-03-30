import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import TimestampToolsPanel from "@/components/TimestampToolsPanel";

export const metadata: Metadata = {
  title: "Timestamp Converter Tools",
  description: "Unix to Date, Date to Unix, and Timezone Convert online tools.",
};

export default function TimestampToolsPage() {
  return (
    <main className="page-wrap app-shell">
      <SiteHeader compact />
      <section className="hero">
        <p className="badge">Timestamp toolkit</p>
        <h1>Unix and Timezone Converter</h1>
        <p className="lead">Convert Unix timestamps and timezone values without switching apps.</p>
      </section>
      <TimestampToolsPanel />
      <SiteFooter />
    </main>
  );
}
