"use client";

import { useEffect, useId, useRef } from "react";
import { t } from "@/content/home";
import type { Locale } from "@/lib/i18n";
import type { TripId } from "@/content/trips";
import { InquiryForm } from "@/components/InquiryForm";

export function InquiryDialog({
  locale,
  open,
  onClose,
  defaultTrip,
}: {
  locale: Locale;
  open: boolean;
  onClose: () => void;
  defaultTrip?: TripId;
}) {
  const copy = t(locale);
  const titleId = useId();
  const ref = useRef<HTMLDialogElement>(null);
  const triggerReturn = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (open) {
      triggerReturn.current = (document.activeElement as HTMLElement) ?? null;
      if (!el.open) el.showModal();
      document.body.style.overflow = "hidden";
    } else if (el.open) {
      el.close();
    }
  }, [open]);

  function handleClose() {
    document.body.style.overflow = "";
    onClose();
    triggerReturn.current?.focus();
  }

  return (
    <dialog
      ref={ref}
      className="w-[min(32rem,calc(100vw-2rem))] border-0 bg-white p-0 text-(--color-soft-black) shadow-2xl"
      aria-labelledby={titleId}
      onClose={handleClose}
      onClick={(e) => {
        if (e.target === ref.current) handleClose();
      }}
    >
      <div className="flex flex-col gap-4 p-6">
        <h2 id={titleId} className="font-heading text-xl font-bold text-(--color-deep-blue)">
          {copy.reserveTitle}
        </h2>
        <InquiryForm locale={locale} defaultTrip={defaultTrip} />
        <button type="button" className="min-h-11 self-start px-1 underline" onClick={handleClose}>
          {copy.close}
        </button>
      </div>
    </dialog>
  );
}
