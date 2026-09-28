import type { Metadata } from "next";
import Link from "next/link";
import { brand } from "@/data/brand";

export const metadata: Metadata = { title: "Privacy", description: `How ${brand.name} handles website inquiry data.` };

export default function PrivacyPage() {
  return <main className="legal-page"><Link href="/">← Back to {brand.name}</Link><p className="section-kicker">PRIVACY</p><h1>A short, plain-English privacy note.</h1><p className="legal-updated">Draft for launch review · September 2026</p><section><h2>What this website collects</h2><p>If you use the inquiry form, we collect the details you submit: your name, work email, company, the kind of project you are considering, and any optional message.</p></section><section><h2>Why we collect it</h2><p>We use this information only to understand and respond to your inquiry, scope potential work, and protect the form from abuse. The form does not add you to a mailing list.</p></section><section><h2>Service providers</h2><p>Form submissions are transmitted through our hosting provider and email delivery provider. Before launch, the company must confirm the final hosting provider, email provider, retention period, business address, and any analytics or cookie tools so this notice can be completed accurately.</p></section><section><h2>Your choices</h2><p>You can contact us at <a href={`mailto:${brand.email}`}>{brand.email}</a> to ask about an inquiry you submitted or request its deletion, subject to any legal obligations.</p></section><section><h2>Launch note</h2><p>This is a practical draft based on the current website form, not legal advice. The company must review it for the jurisdictions where it operates before publishing.</p></section></main>;
}
