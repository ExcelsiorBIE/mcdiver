import { z } from "zod";

export const DIVE_LEVELS = ["ow", "aow", "rescue", "dm", "instructor"] as const;
export type DiveLevel = (typeof DIVE_LEVELS)[number];

export const inquirySchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(200),
  whatsapp: z.string().trim().min(8).max(20),
  plan: z.enum(["essential", "complete"]),
  level: z.enum(DIVE_LEVELS),
  people: z.coerce.number().int().min(1).max(12),
  message: z.string().trim().max(2000).optional().default(""),
  locale: z.enum(["es", "en"]).optional().default("es"),
  company: z.string().max(0).optional().default(""), // honeypot
});

export type InquiryInput = z.infer<typeof inquirySchema>;

export const levelLabel: Record<DiveLevel, { es: string; en: string }> = {
  ow: { es: "Open Water", en: "Open Water" },
  aow: { es: "Advanced Open Water", en: "Advanced Open Water" },
  rescue: { es: "Rescue Diver", en: "Rescue Diver" },
  dm: { es: "Divemaster", en: "Divemaster" },
  instructor: { es: "Instructor", en: "Instructor" },
};
