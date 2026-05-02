import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { formatRupiah } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function AdminPromosPage() {
  await requireAdmin();
  const promos = await prisma.promo.findMany({
    include: { laptop: true },
    orderBy: { createdAt: "desc" },
  });
  return (
    <main className="min-h-screen bg-slate-100">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
          <Link href="/admin/dashboard" className="text-xl font-black">Laptopku Admin</Link>
          <Link href="/admin/dashboard" className="btn-secondary">Dashboard</Link>
        </div>
      </header>
      <section className="mx-auto max-w-5xl px-4 py-8">
        <h1 className="text-3xl font-black">Promo Laptop</h1>
        <div className="mt-6 divide-y divide-slate-100 rounded-lg border border-slate-200 bg-white">
          {promos.map((promo) => (
            <div key={promo.id} className="grid gap-2 p-4 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <p className="font-black">{promo.promoName}</p>
                <p className="text-sm text-slate-600">{promo.laptop.name} / {promo.label}</p>
              </div>
              <p className="font-black text-emerald-700">{formatRupiah(promo.promoPrice)}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
