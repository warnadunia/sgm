export function parseJsonArray(value?: string | null): string[] {
  if (!value) return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed.filter((x) => typeof x === "string") : [];
  } catch {
    return [];
  }
}

export function firstImage(value?: string | null, fallback = "/images/seed/hero-studio.jpg") {
  const arr = parseJsonArray(value);
  return arr[0] ?? fallback;
}

export function formatIDR(price: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);
}

export function formatDate(date?: Date | string | null) {
  if (!date) return "";
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

export function formatDateShort(date?: Date | string | null) {
  if (!date) return "";
  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "short",
  }).format(new Date(date));
}

export function formatDateRange(start?: Date | null, end?: Date | null) {
  if (!start) return "Segera diumumkan";
  if (!end) return formatDate(start);
  const s = new Date(start);
  const e = new Date(end);
  if (s.getFullYear() === e.getFullYear() && s.getMonth() === e.getMonth()) {
    return `${s.getDate()}–${e.getDate()} ${new Intl.DateTimeFormat("id-ID", {
      month: "long",
      year: "numeric",
    }).format(e)}`;
  }
  return `${formatDate(s)} — ${formatDate(e)}`;
}

export function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function todayAtMidnight() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}

/** Event "sedang berlangsung": ditandai manual (isLiveNow) ATAU tanggal hari ini berada dalam rentang event. */
export function isEventLive(m: { isLiveNow: boolean; startDate?: Date | null; endDate?: Date | null }) {
  if (m.isLiveNow) return true;
  if (!m.startDate) return false;
  const now = new Date();
  const start = new Date(m.startDate);
  const end = m.endDate ? new Date(m.endDate) : new Date(m.startDate);
  end.setHours(23, 59, 59, 999);
  return now >= start && now <= end;
}

export function micrositeUrl(m: { kind: string; slug: string }) {
  return m.kind === "EVENT" ? `/event/${m.slug}` : `/program/${m.slug}`;
}

export function waOrderLink(productName: string) {
  const number = process.env.NEXT_PUBLIC_WA_NUMBER || "6281234567890";
  const text = encodeURIComponent(
    `Halo Studio Grafis Minggiran! Saya tertarik memesan: ${productName}. Apakah stoknya masih tersedia?`
  );
  return `https://wa.me/${number}?text=${text}`;
}

export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
