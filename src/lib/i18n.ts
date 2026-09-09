export type Lang = "en" | "id";

/** A bilingual string. Content and UI chrome both use this shape. */
export type Bi = { en: string; id: string };

export function pick(value: Bi | string, lang: Lang): string {
  if (typeof value === "string") return value;
  return value[lang] ?? value.en;
}

/** Shorthand for inline bilingual literals in components. */
export function bi(en: string, id: string): Bi {
  return { en, id };
}
