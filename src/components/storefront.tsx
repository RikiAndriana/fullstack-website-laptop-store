import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Clock,
  MapPin,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Star,
  Truck,
  Wrench,
} from "lucide-react";
import { formatRupiah, whatsappLink } from "@/lib/utils";

export const storeAddress = "Ruko Laptopku, Area Tebet, Jakarta Selatan";
export const mapsEmbedUrl =
  "https://www.google.com/maps?q=Tebet%2C%20Jakarta%20Selatan&output=embed";

export type StorefrontLaptop = {
  name: string;
  slug: string;
  price: number;
  mainImage: string | null;
  processor: string;
  ram: string;
  storage: string;
  stock: number;
  brand: { name: string };
  category: { name: string };
};

export type PromoLite = {
  label: string;
  price: number;
  normal: number;
};

export function PublicHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-white/60 bg-white/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4">
        <Link href="/" className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-lg bg-slate-950 text-base font-black text-white shadow-[0_12px_30px_rgba(15,23,42,0.24)]">
            L
          </span>
          <div>
            <p className="text-lg font-black">Laptopku</p>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              Pusat laptop harian
              </p>
          </div>
        </Link>
        <nav className="hidden items-center gap-2 rounded-full border border-slate-200/80 bg-white/80 p-1.5 text-sm font-semibold text-slate-600 shadow-sm lg:flex">
          <HeaderLink href="/" text="Home" />
          <HeaderLink href="/produk" text="Produk" />
          <HeaderLink href="/tentang" text="Tentang" />
          <HeaderLink href="/kontak" text="Kontak" />
          <HeaderLink href="/admin/dashboard" text="Dashboard Owner" />
        </nav>
        <a
          className="btn-primary inline-flex items-center gap-2 shadow-[0_12px_30px_rgba(5,150,105,0.22)]"
          href={whatsappLink("Halo Laptopku, saya mau konsultasi laptop dan cek stok terbaru.")}
        >
          <MessageCircle size={18} />
          Chat Admin
        </a>
      </div>
    </header>
  );
}

export function PublicFooter() {
  return (
    <footer className="bg-slate-950 text-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 md:grid-cols-[1.15fr_0.85fr_0.85fr]">
        <div>
          <Link href="/" className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-lg bg-emerald-500 text-base font-black text-white">
              L
            </span>
            <div>
              <p className="text-xl font-black">Laptopku</p>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                  Pusat laptop harian
              </p>
            </div>
          </Link>
          <p className="mt-4 max-w-md leading-7 text-slate-300">
            Toko laptop UMKM untuk pelanggan yang butuh rekomendasi jelas, harga transparan,
            promo aktif, dan layanan setelah pembelian.
          </p>
        </div>
        <div>
          <h3 className="font-black">Menu</h3>
          <div className="mt-4 grid gap-3 text-sm text-slate-300">
            <Link href="/">Home</Link>
            <Link href="/produk">Produk</Link>
            <Link href="/tentang">Tentang</Link>
            <Link href="/kontak">Kontak</Link>
          </div>
        </div>
        <div>
          <h3 className="font-black">Kontak</h3>
          <div className="mt-4 grid gap-3 text-sm leading-7 text-slate-300">
            <p>{storeAddress}</p>
            <a href={whatsappLink("Halo Laptopku, saya mau tanya stok laptop yang ready hari ini.")}>WhatsApp toko</a>
            <Link href="/admin/login">Login owner</Link>
          </div>
        </div>
      </div>
      <div className="border-t border-slate-800 px-4 py-4 text-center text-sm text-slate-400">
        (c) 2026 Laptopku. Laptop ready stok, promo update, dan konsultasi langsung dengan admin toko.
      </div>
    </footer>
  );
}

export function PageHero({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow: string;
  title: string;
  description: string;
  actions?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-emerald-100/70 via-amber-50/40 to-transparent" />
      <div className="mx-auto max-w-7xl px-4 py-12 lg:py-16">
        <div className="max-w-4xl">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/90 px-4 py-2 text-sm font-bold text-emerald-700 shadow-sm">
            <Sparkles size={16} /> {eyebrow}
          </p>
          <h1 className="text-4xl font-black leading-[1.02] text-slate-950 md:text-6xl">
            {title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">{description}</p>
          {actions ? <div className="mt-8 flex flex-wrap gap-3">{actions}</div> : null}
        </div>
      </div>
    </section>
  );
}

export function SectionIntro({
  eyebrow,
  title,
  actionHref,
  actionText,
  children,
}: {
  eyebrow: string;
  title: string;
  actionHref?: string;
  actionText?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div className="max-w-2xl">
        <p className="section-eyebrow">{eyebrow}</p>
        <h2 className="mt-3 text-3xl font-black leading-tight md:text-4xl">{title}</h2>
      </div>
      <div className="flex items-center gap-3">
        {children}
        {actionHref && actionText ? (
          <Link href={actionHref} className="inline-flex items-center gap-2 text-sm font-bold text-emerald-700">
            {actionText}
            <ArrowRight size={16} />
          </Link>
        ) : null}
      </div>
    </div>
  );
}

export function BrandTicker({ brands }: { brands: string[] }) {
  const names =
    brands.length > 0 ? brands : ["ASUS", "Lenovo", "HP", "Acer", "Dell", "MSI", "Apple"];
  const ticker = [...names, ...names, ...names];

  return (
    <section className="border-y border-slate-200/70 bg-slate-950 py-5 text-white">
      <div className="mx-auto mb-4 max-w-7xl px-4 text-sm font-bold uppercase tracking-[0.18em] text-emerald-300">
        Brand yang tersedia
      </div>
      <div className="brand-ticker overflow-hidden">
        <div className="brand-ticker-track flex w-max gap-4 px-4">
          {ticker.map((name, index) => (
            <div
              key={`${name}-${index}`}
              className="grid h-14 min-w-40 place-items-center rounded-full border border-white/10 bg-white/10 px-6 text-base font-black tracking-[0.08em] text-white/90"
            >
              {name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ProductCard({
  laptop,
  promo,
}: {
  laptop: StorefrontLaptop;
  promo?: PromoLite;
}) {
  return (
    <article className="product-card group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_18px_42px_rgba(15,23,42,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_60px_rgba(15,23,42,0.12)]">
      <Link href={`/laptop/${laptop.slug}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden bg-[linear-gradient(135deg,#f8fafc_0%,#ffffff_45%,#ecfeff_100%)]">
          {laptop.mainImage ? (
            <Image
              src={laptop.mainImage}
              alt={laptop.name}
              fill
              className="object-cover transition duration-500 group-hover:scale-[1.03]"
            />
          ) : (
            <Image
              src="/file.svg"
              alt={laptop.name}
              fill
              className="object-contain p-14 transition duration-500 group-hover:scale-[1.03]"
            />
          )}
          {promo ? (
            <span className="absolute left-4 top-4 rounded-full bg-rose-600 px-3 py-1 text-xs font-black text-white shadow-sm">
              {promo.label}
            </span>
          ) : null}
        </div>
      </Link>
      <div className="p-5">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
          {laptop.brand.name} / {laptop.category.name}
        </p>
        <h3 className="mt-2 min-h-14 text-lg font-black leading-7 text-slate-950">{laptop.name}</h3>
        <p className="mt-2 text-sm leading-7 text-slate-600">
          {laptop.processor} / {laptop.ram} / {laptop.storage}
        </p>
        <div className="mt-5">
          {promo ? <p className="text-sm text-slate-400 line-through">{formatRupiah(promo.normal)}</p> : null}
          <p className="text-2xl font-black text-emerald-700">{formatRupiah(promo?.price || laptop.price)}</p>
        </div>
        <div className="mt-5 flex gap-2">
          <Link className="btn-secondary flex-1 text-center" href={`/laptop/${laptop.slug}`}>
            Detail
          </Link>
          <a className="btn-primary flex-1 text-center" href={whatsappLink(`Halo Laptopku, saya tertarik dengan ${laptop.name}.`)}>
            Tanya
          </a>
        </div>
      </div>
    </article>
  );
}

export function EmptyState({ text }: { text: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-6 text-slate-600 shadow-sm">
      {text}
    </div>
  );
}

export function ReviewCard({ name, review }: { name: string; review: string }) {
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("");

  return (
    <article className="surface-card h-full p-6">
      <div className="mb-4 flex items-center gap-3">
        <div className="grid h-12 w-12 place-items-center rounded-full bg-slate-950 text-sm font-black text-white">
          {initials}
        </div>
        <div>
          <p className="font-black">{name}</p>
          <div className="mt-1 flex gap-1 text-amber-500">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star key={index} size={16} fill="currentColor" />
            ))}
          </div>
        </div>
      </div>
      <p className="leading-8 text-slate-600">{review}</p>
    </article>
  );
}

export function ServiceCard({
  icon: Icon,
  title,
  text,
}: {
  icon: typeof ShieldCheck;
  title: string;
  text: string;
}) {
  return (
    <div className="feature-card rounded-xl border border-white/70 bg-white/80 p-5 backdrop-blur">
      <Icon className="mb-4 text-emerald-600" size={24} />
      <h3 className="text-lg font-black">{title}</h3>
      <p className="mt-2 text-sm leading-7 text-slate-600">{text}</p>
    </div>
  );
}

export function MiniInfo({ text }: { text: string }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-600">
      {text}
    </div>
  );
}

export function ContactInfoLine({
  icon: Icon,
  title,
  text,
}: {
  icon: typeof MapPin | typeof Clock | typeof BadgeCheck;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
      <div className="flex gap-3">
        <div className="mt-0.5 rounded-full bg-emerald-50 p-2 text-emerald-600">
          <Icon size={18} />
        </div>
        <div>
          <p className="font-black">{title}</p>
          <p className="mt-1 text-sm leading-7 text-slate-600">{text}</p>
        </div>
      </div>
    </div>
  );
}

export function MiniProof({ icon: Icon, label }: { icon: typeof ShieldCheck | typeof Truck | typeof Wrench; label: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 text-sm font-bold text-slate-700 shadow-[0_14px_28px_rgba(15,23,42,0.05)]">
      <div className="mb-2 inline-flex rounded-full bg-emerald-50 p-2 text-emerald-600">
        <Icon size={16} />
      </div>
      <p>{label}</p>
    </div>
  );
}

function HeaderLink({ href, text }: { href: string; text: string }) {
  return (
    <Link href={href} className="rounded-full px-4 py-2 transition hover:bg-slate-100 hover:text-slate-950">
      {text}
    </Link>
  );
}
