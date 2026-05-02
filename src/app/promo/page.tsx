import Link from "next/link";
import {
  PageHero,
  ProductCard,
  PublicFooter,
  PublicHeader,
  SectionIntro,
} from "@/components/storefront";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function PromoPage() {
  const promos = await prisma.promo.findMany({
    where: { isActive: true },
    include: { laptop: { include: { brand: true, category: true } } },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
  });

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#fef2f2_0%,#f8fafc_34%,#fff7ed_100%)]">
      <PublicHeader />
      <PageHero
        eyebrow="Promo toko"
        title="Daftar laptop promo, best deal, dan unit yang lagi turun harga."
        description="Semua unit promo dikumpulkan di satu halaman supaya pelanggan yang sedang berburu harga spesial bisa cek lebih cepat."
      />

      <section className="section-wrap">
        <div className="mx-auto max-w-7xl px-4">
          <SectionIntro eyebrow="Promo aktif" title="Unit promo yang masih aktif hari ini">
            <Link href="/produk" className="text-sm font-bold text-emerald-700">
              Lihat semua produk
            </Link>
          </SectionIntro>
          <div className="grid gap-5 md:grid-cols-3">
            {promos.map((promo) => (
              <ProductCard
                key={promo.id}
                laptop={promo.laptop}
                promo={{
                  label: promo.label,
                  price: promo.promoPrice,
                  normal: promo.normalPrice,
                }}
              />
            ))}
          </div>
        </div>
      </section>

      <PublicFooter />
    </main>
  );
}
