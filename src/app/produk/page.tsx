import { Search } from "lucide-react";
import {
  BrandTicker,
  EmptyState,
  PageHero,
  ProductCard,
  PublicFooter,
  PublicHeader,
  SectionIntro,
} from "@/components/storefront";
import { getStorefrontData } from "@/lib/storefront-data";

export const dynamic = "force-dynamic";

export default async function ProdukPage({
  searchParams,
}: {
  searchParams?: Promise<{ q?: string; brand?: string; budget?: string }>;
}) {
  const params = await searchParams;
  const { brands, categories, laptops } = await getStorefrontData({ ...params, limit: 60 });

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#f0fdf4_0%,#f8fafc_36%,#eff6ff_100%)] text-slate-950">
      <PublicHeader />
      <PageHero
        eyebrow="Katalog produk"
        title="Stok laptop lengkap untuk kuliah, kerja kantor, editing, sampai gaming."
        description="Gunakan pencarian dan filter untuk menemukan laptop yang paling cocok. Katalog ini kami pisahkan supaya pelanggan bisa lihat stok dengan lebih fokus seperti di toko beneran."
      />

      <BrandTicker brands={brands.map((item) => item.name)} />

      <section className="section-wrap">
        <div className="mx-auto max-w-7xl px-4">
          <div className="surface-card p-3 sm:p-4">
            <form className="grid gap-3 md:grid-cols-[1fr_180px_160px_auto]">
              <label className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 shadow-sm">
                <Search size={18} className="text-slate-500" />
                <input
                  name="q"
                  defaultValue={params?.q}
                  placeholder="Cari ASUS, i5, 16GB..."
                  className="w-full bg-transparent py-3.5"
                />
              </label>
              <select name="brand" defaultValue={params?.brand || ""} className="form-field">
                <option value="">Semua brand</option>
                {brands.map((item) => (
                  <option key={item.id} value={item.slug}>
                    {item.name}
                  </option>
                ))}
              </select>
              <select name="budget" defaultValue={params?.budget || ""} className="form-field">
                <option value="">Semua budget</option>
                <option value="5000000">Di bawah 5 juta</option>
                <option value="10000000">Di bawah 10 juta</option>
                <option value="15000000">Di bawah 15 juta</option>
              </select>
              <button className="btn-primary" type="submit">
                Cari
              </button>
            </form>
          </div>
        </div>
      </section>

      <section className="section-wrap border-y border-slate-200/70 bg-white/75 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4">
          <SectionIntro eyebrow="Katalog" title="Daftar produk yang sedang aktif di toko" />
          <div className="mb-6 flex flex-wrap gap-2">
            {categories.map((item) => (
              <span
                key={item.id}
                className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-sm font-semibold text-slate-600"
              >
                {item.name}
              </span>
            ))}
          </div>
          <div className="grid gap-5 md:grid-cols-3 lg:grid-cols-4">
            {laptops.map((laptop) => (
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
            {laptops.length === 0 ? <EmptyState text="Belum ada laptop yang cocok dengan filter yang Anda pilih." /> : null}
          </div>
        </div>
      </section>

      <PublicFooter />
    </main>
  );
}
