"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { site } from "@/content/site";
import { NAV, pathFor, type PageId } from "@/content/routes";
import { t } from "@/content/home";
import { LanguageToggle } from "@/components/LanguageToggle";
import type { Locale } from "@/lib/i18n";

export function SiteHeader({
  locale,
  pageId,
  reserveHref,
}: {
  locale: Locale;
  pageId: PageId;
  reserveHref: string;
}) {
  const copy = t(locale);
  const [heroPast, setHeroPast] = useState(false);
  const [open, setOpen] = useState(false);
  const solid = pageId !== "home" || heroPast;

  useEffect(() => {
    if (pageId !== "home") return;
    const hero = document.getElementById("home-hero");
    if (!hero) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        const headerH = 72;
        const visible = entry.isIntersecting && entry.intersectionRect.height > headerH;
        setHeroPast(!visible);
      },
      { threshold: [0, 0.05, 0.2] },
    );
    io.observe(hero);
    return () => io.disconnect();
  }, [pageId]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`site-header text-white ${solid ? "is-solid" : "is-over-hero"}`}
    >
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3">
        <Link
          href={pathFor("home", locale)}
          className="font-heading text-lg font-extrabold tracking-[0.18em]"
        >
          {site.brand}
        </Link>

        <nav
          aria-label={locale === "es" ? "Principal" : "Primary"}
          className="ml-auto hidden items-center gap-5 lg:flex"
        >
          {NAV.filter((item) => item.id !== "home").map((item) => (
            <Link
              key={item.id}
              href={pathFor(item.id, locale)}
              aria-current={pageId === item.id ? "page" : undefined}
              className="font-heading text-[0.72rem] font-semibold tracking-[0.14em] uppercase min-h-11 inline-flex items-center aria-[current=page]:text-(--color-sand-gold)"
            >
              {item[locale]}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2 lg:ml-4">
          <LanguageToggle locale={locale} pageId={pageId} />
          <a href={reserveHref} className="btn-gold hidden sm:inline-flex" target="_blank" rel="noopener noreferrer">
            {copy.book}
          </a>
          <button
            type="button"
            className="inline-flex min-h-11 min-w-11 items-center justify-center lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">{copy.menu}</span>
            <span aria-hidden className="flex flex-col gap-1.5">
              <span className="block h-px w-5 bg-white" />
              <span className="block h-px w-5 bg-white" />
              <span className="block h-px w-5 bg-white" />
            </span>
          </button>
        </div>
      </div>

      <div id="mobile-nav" className="nav-panel border-t border-white/10 bg-(--color-deep-blue) lg:hidden" hidden={!open}>
        <nav className="mx-auto flex max-w-6xl flex-col px-4 py-4" aria-label={copy.menu}>
          {NAV.map((item) => (
            <Link
              key={item.id}
              href={pathFor(item.id, locale)}
              className="min-h-11 flex items-center font-heading uppercase tracking-[0.14em] text-sm"
              onClick={() => setOpen(false)}
            >
              {item[locale]}
            </Link>
          ))}
          <a href={reserveHref} className="btn-gold mt-4 self-start" target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}>
            {copy.book}
          </a>
        </nav>
      </div>
    </header>
  );
}
