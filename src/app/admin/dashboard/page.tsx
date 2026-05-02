import Image from "next/image";
import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { formatRupiah } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function Dashboard() {
  await requireAdmin();
  const [laptops, promos, leads, brands, categories, latestLeads] = await Promise.all([
    prisma.laptop.findMany({ include: { brand: true, category: true, promos: { where: { isActive: true }, take: 1 } }, orderBy: { createdAt: "desc" } }),
    prisma.promo.count({ where: { isActive: true } }),
    prisma.lead.count(),
    prisma.brand.findMany({ orderBy: { name: "asc" } }),
    prisma.category.findMany({ orderBy: { name: "asc" } }),
    prisma.lead.findMany({ include: { laptop: true }, orderBy: { createdAt: "desc" }, take: 8 }),
  ]);

  return (
    <main className="min-h-screen bg-slate-100">
      <AdminHeader />
      <section className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="font-bold text-emerald-700">Dashboard Owner</p>
            <h1 className="text-3xl font-black">Kelola Toko Laptop</h1>
          </div>
          <Link className="btn-primary" href="/admin/laptops/new">
            Tambah Laptop
          </Link>
        </div>

        <div className="grid gap-3 md:grid-cols-4">
          <Stat label="Total laptop" value={laptops.length.toString()} />
          <Stat label="Promo aktif" value={promos.toString()} />
          <Stat label="Leads masuk" value={leads.toString()} />
          <Stat label="Stok habis" value={laptops.filter((item) => item.stock < 1).length.toString()} />
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_0.7fr]">
          <div className="rounded-lg border border-slate-200 bg-white">
            <div className="flex items-center justify-between border-b border-slate-200 p-4">
              <h2 className="text-xl font-black">Daftar Laptop</h2>
              <Link href="/admin/laptops/new" className="font-bold text-emerald-700">
                Tambah
              </Link>
            </div>
            <div className="divide-y divide-slate-100">
              {laptops.map((item) => (
                <div key={item.id} className="grid gap-3 p-4 md:grid-cols-[1fr_auto] md:items-center">
                  <div className="grid gap-3 sm:grid-cols-[84px_1fr] sm:items-center">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-slate-200 bg-slate-100">
                      {item.mainImage ? (
                        <Image
                          src={item.mainImage}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <Image
                          src="/file.svg"
                          alt={item.name}
                          fill
                          className="object-contain p-4"
                        />
                      )}
                    </div>
                    <div>
                      <p className="font-black">{item.name}</p>
                      <p className="text-sm text-slate-600">
                        {item.brand.name} / {item.category.name} / Stok {item.stock}
                      </p>
                      <p className="mt-1 font-bold text-emerald-700">{formatRupiah(item.promos[0]?.promoPrice || item.price)}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Link className="btn-secondary" href={`/laptop/${item.slug}`}>
                      Lihat
                    </Link>
                    <Link className="btn-secondary" href={`/admin/laptops/${item.id}/edit`}>
                      Edit
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-6">
            <div className="rounded-lg border border-slate-200 bg-white p-4">
              <h2 className="text-xl font-black">Tambah Promo</h2>
              <form action="/api/admin/promos" method="post" className="mt-4 grid gap-3">
                <select name="laptopId" required className="form-field">
                  <option value="">Pilih laptop</option>
                  {laptops.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
                <input className="form-field" name="promoName" placeholder="Nama promo" required />
                <input className="form-field" name="label" placeholder="Label, contoh: Flash Sale" defaultValue="Promo" />
                <input className="form-field" name="promoPrice" type="number" placeholder="Harga promo" required />
                <button className="btn-primary" type="submit">
                  Simpan Promo
                </button>
              </form>
              <Link href="/admin/promos" className="mt-3 inline-block font-bold text-emerald-700">
                Kelola semua promo
              </Link>
            </div>

            <div className="rounded-lg border border-slate-200 bg-white p-4">
              <h2 className="text-xl font-black">Leads Terbaru</h2>
              <div className="mt-3 divide-y divide-slate-100">
                {latestLeads.map((lead) => (
                  <div key={lead.id} className="py-3">
                    <p className="font-bold">{lead.name}</p>
                    <p className="text-sm text-slate-600">{lead.whatsapp} / {lead.budget || "Budget belum diisi"}</p>
                    <p className="text-sm text-slate-500">{lead.needDescription}</p>
                  </div>
                ))}
                {latestLeads.length === 0 && <p className="text-sm text-slate-600">Belum ada lead.</p>}
              </div>
            </div>

            <div className="rounded-lg border border-slate-200 bg-white p-4">
              <h2 className="text-xl font-black">Master Data</h2>
              <p className="mt-2 text-sm text-slate-600">Brand: {brands.map((item) => item.name).join(", ")}</p>
              <p className="mt-2 text-sm text-slate-600">Kategori: {categories.map((item) => item.name).join(", ")}</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function AdminHeader() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-xl font-black">Laptopku</Link>
        <div className="flex items-center gap-2">
          <Link href="/admin/dashboard" className="btn-secondary">Dashboard</Link>
          <Link href="/" className="btn-secondary">Website</Link>
          <form action="/api/admin/logout" method="post">
            <button className="btn-secondary" type="submit">Logout</button>
          </form>
        </div>
      </div>
    </header>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4">
      <p className="text-sm font-bold text-slate-500">{label}</p>
      <p className="mt-2 text-3xl font-black">{value}</p>
    </div>
  );
}
