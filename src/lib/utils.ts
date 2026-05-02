export function formatRupiah(value: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function whatsappLink(message: string) {
  const phone = process.env.NEXT_PUBLIC_STORE_WHATSAPP || "6282119105215";
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
