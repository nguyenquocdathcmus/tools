import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import JwtDecoderPanel from "@/components/JwtDecoderPanel";

export const metadata: Metadata = {
  title: "JWT Decoder",
  description: "Decode JWT header, payload, signature, and claims locally in the browser.",
};

export default function JwtDecoderPage() {
  return (
    <main className="page-wrap app-shell">
      <SiteHeader compact />
      <section className="hero">
        <p className="badge">Auth toolkit</p>
        <h1>JWT Decoder</h1>
        <p className="lead">Decode tokens locally and inspect claims, signature segments, and expiry details.</p>
      </section>
      <JwtDecoderPanel />
      <SiteFooter />
    </main>
  );
}