import type { MetadataRoute } from "next";
import { brand } from "@/data/brand";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/news", "/privacy"].map((path) => ({
    url: `${brand.siteUrl}${path}`,
    lastModified: new Date(),
  }));
}
