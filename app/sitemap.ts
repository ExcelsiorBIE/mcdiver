import type { MetadataRoute } from "next";
import { allPageIds, pathFor, type PageId } from "@/content/routes";
import { posts } from "@/content/posts";
import { locales } from "@/lib/i18n";
import { site } from "@/content/site";

const BASE = `https://${site.domain}`;

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = [];
  for (const locale of locales) {
    for (const id of allPageIds()) {
      if (id === "blog") continue; // posts listed below; index page still included
      pages.push({
        url: `${BASE}${pathFor(id as PageId, locale)}`,
        changeFrequency: "weekly",
        priority: id === "home" ? 1 : 0.7,
      });
    }
    pages.push({ url: `${BASE}${pathFor("blog", locale)}`, changeFrequency: "weekly", priority: 0.5 });
    for (const post of posts) {
      pages.push({
        url: `${BASE}${pathFor("blog", locale)}/${post.slug[locale]}`,
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }
  }
  return pages;
}
