import Image from "next/image";
import Link from "next/link";
import { ArrowRight, HardDrive, Monitor, ShieldCheck, Sparkles, Store, Truck, Wrench } from "lucide-react";
import {
  BrandTicker,
  MiniProof,
  ProductCard,
  PublicFooter,
  PublicHeader,
  ReviewCard,
  SectionIntro,
  ServiceCard,
} from "@/components/storefront";
import { getStorefrontData } from "@/lib/storefront-data";
import { formatRupiah } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function Home() {
  const { brands, promos, laptops } = await getStorefrontData({ limit: 12 });

  const heroLaptop = promos[0]?.laptop ?? laptops[0];
  const heroPromo = promos[0]
    ? {
        label: promos[0].label,
        price: promos[0].promoPrice,
        normal: promos[0].normalPrice,
      }
    : laptops[0]?.promos[0]
      ? {
          label: laptops[0].promos[0].label,
          price: laptops[0].promos[0].promoPrice,
          normal: laptops[0].promos[0].normalPrice,
        }
      : undefined;

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#fefce8_0%,#f8fafc_42%,#eef2ff_100%)] text-slate-950">
      <PublicHeader />

      <section className="relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-emerald-100/70 via-amber-50/40 to-transparent" />
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-20">
          <div className="relative z-10">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/90 px-4 py-2 text-sm font-bold text-emerald-700 shadow-sm">
              <Sparkles size={16} /> Laptop baru, bekas, dan unit promo ready stok
            </p>
            <h1 className="max-w-4xl text-4xl font-black leading-[1.02] text-slate-950 md:text-6xl lg:text-7xl">
              Cari laptop yang cocok buat kerja, kuliah, desain, atau gaming tanpa ribet.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
              Laptopku melayani penjualan laptop harian dengan stok yang terus di-update. Ada pilihan laptop
              pelajar, kantor, gaming, bisnis, sampai unit bekas layak pakai lengkap dengan konsultasi dan bantuan setup awal.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/produk" className="btn-primary inline-flex items-center gap-2">
                Lihat Produk
                <ArrowRight size={16} />
              </Link>
              <Link href="/kontak" className="btn-secondary">
                Hubungi Toko
              </Link>
            </div>

            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              <HeroStat value="50+" label="model aktif di katalog" />
              <HeroStat value="120+" label="unit terjual ke pelanggan" />
              <HeroStat value="09.00 - 20.00" label="jam operasional toko" />
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-4 top-8 hidden h-28 w-28 rounded-full bg-amber-200/60 blur-3xl lg:block" />
            <div className="absolute -right-4 bottom-4 hidden h-36 w-36 rounded-full bg-emerald-200/70 blur-3xl lg:block" />
            <div className="surface-card relative overflow-hidden p-4 sm:p-5">
              <div className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
                <div className="rounded-lg bg-slate-950 p-4 text-white shadow-[0_18px_45px_rgba(15,23,42,0.28)]">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.24em] text-emerald-300">
                        Featured unit
                      </p>
                      <p className="mt-2 max-w-[14rem] text-xl font-black">
                        {heroLaptop?.name || "Laptop pilihan admin minggu ini"}
                      </p>
                    </div>
                    <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-white/80">
                      {heroLaptop?.brand.name || "Laptopku"}
                    </span>
                  </div>
                  <div className="mt-4 rounded-lg border border-white/10 bg-white/5 p-4">
                    <div className="grid gap-3 sm:grid-cols-3">
                      <SpecChip icon={Monitor} label={heroLaptop?.processor || "Intel Core"} />
                      <SpecChip icon={Sparkles} label={heroLaptop?.ram || "16GB RAM"} />
                      <SpecChip icon={HardDrive} label={heroLaptop?.storage || "512GB SSD"} />
                    </div>
                    <div className="mt-5">
                      {heroPromo ? (
                        <p className="text-sm text-white/50 line-through">
                          {formatRupiah(heroPromo.normal)}
                        </p>
                      ) : null}
                      <p className="text-3xl font-black text-emerald-300">
                        {formatRupiah(heroPromo?.price || heroLaptop?.price || 0)}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid gap-4">
                  <div className="overflow-hidden rounded-lg border border-slate-200 bg-[linear-gradient(135deg,#ffffff_0%,#f8fafc_50%,#ecfeff_100%)] shadow-[0_18px_45px_rgba(15,23,42,0.08)]">
                    <div className="relative aspect-[4/3]">
                      {heroLaptop?.mainImage ? (
                        <Image
                          src={heroLaptop.mainImage}
                          alt={heroLaptop.name}
                          fill
                          className="object-cover"
                          priority
                        />
                      ) : (
                        <Image
                          src="/window.svg"
                          alt="Laptopku storefront preview"
                          fill
                          className="object-contain p-14"
                          priority
                        />
                      )}
                    </div>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-3">
                    <MiniProof icon={ShieldCheck} label="Garansi toko" />
                    <MiniProof icon={Truck} label="COD / pickup" />
                    <MiniProof icon={Wrench} label="Bantu instalasi" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <BrandTicker brands={brands.map((item) => item.name)} />

      <section className="section-wrap">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-4 md:grid-cols-4">
            <ServiceCard icon={ShieldCheck} title="Garansi jelas" text="Unit baru dan bekas dijelaskan kondisi, garansi, dan kelengkapannya sejak awal." />
            <ServiceCard icon={Store} title="Konsultasi jujur" text="Admin bantu pilih spek sesuai kebutuhan dan budget, bukan sekadar dorong barang." />
            <ServiceCard icon={Wrench} title="Siap dipakai" text="Bisa bantu setup Office, aplikasi kuliah, aplikasi kerja, dan pengecekan awal." />
            <ServiceCard icon={Sparkles} title="Promo harian" text="Unit promo dan best deal dipisahkan supaya lebih mudah ditemukan pelanggan." />
          </div>
        </div>
      </section>

      <section className="section-wrap">
        <div className="mx-auto max-w-7xl px-4">
          <SectionIntro eyebrow="Preview produk" title="Contoh laptop yang paling sering ditanyakan pelanggan" actionHref="/produk" actionText="Buka semua produk" />
          <div className="grid gap-5 md:grid-cols-3">
            {laptops.slice(0, 3).map((laptop) => (
              <ProductCard
                key={laptop.id}
                laptop={laptop}
                promo={
                  laptop.promos[0]
                    ? {
                        label: laptop.promos[0].label,
                        price: laptop.promos[0].promoPrice,
                        normal: laptop.promos[0].normalPrice,
                      }
                    : undefined
                }
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section-wrap border-y border-slate-200/70 bg-white/75 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4">
          <SectionIntro eyebrow="Review pelanggan" title="Pembeli datang lagi karena penjelasan jelas dan stoknya memang ada" actionHref="/tentang" actionText="Lihat profil toko" />
          <div className="grid gap-5 md:grid-cols-3">
            <ReviewCard name="Raka Pratama" review="Laptop gamingnya sesuai budget. Admin bantu jelasin bedanya RTX dan GTX, jadi tidak salah pilih." />
            <ReviewCard name="Maya Putri" review="Butuh laptop kuliah yang ringan. Barang dicek dulu, Windows dan Office sudah siap dipakai." />
            <ReviewCard name="Dimas Anggara" review="Harga promo jelas dan stoknya real. Saya chat pagi, sore sudah bisa pickup di toko." />
          </div>
        </div>
      </section>

      <PublicFooter />
    </main>
  );
}

function HeroStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-xl border border-white/80 bg-white/80 p-4 shadow-[0_18px_40px_rgba(15,23,42,0.06)] backdrop-blur">
      <p className="text-2xl font-black text-slate-950">{value}</p>
      <p className="mt-1 text-sm font-semibold text-slate-500">{label}</p>
    </div>
  );
}

function SpecChip({ icon: Icon, label }: { icon: typeof Monitor; label: string }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/5 p-3">
      <Icon size={16} className="mb-2 text-emerald-300" />
      <p className="text-sm font-semibold text-white/80">{label}</p>
    </div>
  );
}
