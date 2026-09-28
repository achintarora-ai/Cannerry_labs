import type { Metadata } from "next";
import { brand } from "@/data/brand";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(brand.siteUrl),
  title: { default: `${brand.name} — AI systems for growing businesses`, template: `%s | ${brand.name}` },
  description: brand.description,
  keywords: ["AI assistants", "RAG chatbot", "business automation", "knowledge assistant", "AI workflows"],
  alternates: { canonical: "/" },
  openGraph: { title: brand.name, description: brand.description, type: "website", url: "/", images: [{ url: "/canary/canary-hero.png", width: 2048, height: 1024 }] },
  twitter: { card: "summary_large_image", title: brand.name, description: brand.description, images: ["/canary/canary-hero.png"] },
};

const organization = { "@context": "https://schema.org", "@type": "Organization", name: brand.name, url: brand.siteUrl, email: brand.email, description: brand.description };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><a className="skip-link" href="#top">Skip to content</a>{children}<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }} /></body></html>;
}
