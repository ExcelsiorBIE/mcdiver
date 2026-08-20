import type { MetadataRoute } from "next";

/** D26 — noindex while the public host is *.vercel.app. Flip on mcdiver.co launch. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", disallow: "/" },
  };
}
