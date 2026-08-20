import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import { Montserrat, Open_Sans } from "next/font/google";
import { isLocale, type Locale } from "@/lib/i18n";
import { site } from "@/content/site";
import "./globals.css";

/** Tipografía exacta del PDF §2: Montserrat (títulos/botones) + Open Sans (cuerpo). */
const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  weight: ["300", "400", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL(`https://${site.domain}`),
  title: {
    default: "MCDiver | Buceo Exclusivo en el Parque Nacional Coiba",
    template: `%s · ${site.brand}`,
  },
  description:
    "Viajes de buceo exclusivos al Parque Nacional Coiba, Panamá, saliendo desde Pixvae. Grupos pequeños, instructores PADI.",
  applicationName: site.brand,
};

export const viewport: Viewport = {
  themeColor: "#1b3a6b",
  colorScheme: "light", // docs/11 §4 — nunca invertir el formulario
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const headerStore = await headers();
  const raw = headerStore.get("x-locale") ?? "es";
  const lang: Locale = isLocale(raw) ? raw : "es";

  return (
    <html lang={lang} className={`${montserrat.variable} ${openSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
