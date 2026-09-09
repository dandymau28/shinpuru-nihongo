export const DEFAULT_START_DATE = "2026-09-02";
export const TOTAL_DAYS = 90;

const MS_PER_DAY = 24 * 60 * 60 * 1000;

function atMidnight(d: Date): number {
  return Date.UTC(d.getFullYear(), d.getMonth(), d.getDate());
}

/** Parse an ISO `YYYY-MM-DD` string into a local Date at midnight. */
export function parseISO(iso: string): Date {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, (m ?? 1) - 1, d ?? 1);
}

/** Whole days from `startISO` to `now` (0-based), i.e. day 1 is offset 0. */
export function dayOffset(startISO: string, now: Date = new Date()): number {
  const start = atMidnight(parseISO(startISO));
  const today = atMidnight(now);
  return Math.round((today - start) / MS_PER_DAY);
}

/** Which plan day (1..90) "today" is, clamped to the plan range. */
export function currentDayNumber(startISO: string, now: Date = new Date()): number {
  return Math.min(Math.max(dayOffset(startISO, now) + 1, 1), TOTAL_DAYS);
}

/** Has the plan not started yet? */
export function planNotStarted(startISO: string, now: Date = new Date()): boolean {
  return dayOffset(startISO, now) < 0;
}

// Deterministic, locale-stable formatting (avoids SSR/client Intl drift).

const MONTHS: Record<"en" | "id", string[]> = {
  en: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  id: ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"],
};

const MONTHS_SHORT: Record<"en" | "id", string[]> = {
  en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  id: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"],
};

const WEEKDAYS_SHORT: Record<"en" | "id", string[]> = {
  en: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  id: ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"],
};

export function formatDate(iso: string, lang: "en" | "id"): string {
  const d = parseISO(iso);
  return `${WEEKDAYS_SHORT[lang][d.getDay()]} ${d.getDate()} ${MONTHS_SHORT[lang][d.getMonth()]}`;
}

export function formatDateLong(iso: string, lang: "en" | "id"): string {
  const d = parseISO(iso);
  return `${d.getDate()} ${MONTHS[lang][d.getMonth()]} ${d.getFullYear()}`;
}
