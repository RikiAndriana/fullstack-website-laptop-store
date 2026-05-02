import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductCard, PublicFooter, PublicHeader, SectionIntro } from "@/components/storefront";
import { prisma } from "@/lib/prisma";
import { formatRupiah, whatsappLink } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function LaptopDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const laptop = await prisma.laptop.findUnique({
    where: { slug },
    include: { brand: true, category: true, promos: { where: { isActive: true }, take: 1 } },
  });
  if (!laptop) notFound();

  const related = await prisma.laptop.findMany({
    where: {
      status: "ACTIVE",
      id: { not: laptop.id },
      OR: [{ brandId: laptop.brandId }, { categoryId: laptop.categoryId }],
    },
    include: { brand: true, category: true, promos: { where: { isActive: true }, take: 1 } },
    take: 4,
  });

  const promo = laptop.promos[0];

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#eef2ff_0%,#f8fafc_32%,#ecfeff_100%)]">
      <PublicHeader />

      <section className="section-wrap">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_24px_60px_rgba(15,23,42,0.08)]">
            <div className="relative aspect-[4/3] bg-[linear-gradient(135deg,#f8fafc_0%,#ffffff_45%,#ecfeff_100%)]">
              {laptop.mainImage ? (
                <Image src={laptop.mainImage} alt={laptop.name} fill className="object-cover" priority />
              ) : (
                <Image src="/file.svg" alt={laptop.name} fill className="object-contain p-20" priority />
              )}
            </div>
          </div>

          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-emerald-700">
              {laptop.brand.name} / {laptop.category.name}
            </p>
            <h1 className="mt-3 text-3xl font-black md:text-5xl">{laptop.name}</h1>
            <p className="mt-4 leading-8 text-slate-600">{laptop.description}</p>

            <div className="surface-card mt-6 p-5">
              <div className="flex flex-wrap items-center gap-3">
                {promo ? (
                  <p className="inline-block rounded-full bg-rose-600 px-3 py-1 text-sm font-black text-white">
                    {promo.label}
                  </p>
                ) : null}
                <p className="rounded-full bg-slate-100 px-3 py-1 text-sm font-bold text-slate-600">
                  Stok tersedia: {laptop.stock} unit
                </p>
              </div>
              {promo ? (
                <p className="mt-4 text-sm text-slate-400 line-through">
                  {formatRupiah(promo.normalPrice)}
                </p>
              ) : null}
              <p className="text-3xl font-black text-emerald-700">
                {formatRupiah(promo?.promoPrice || laptop.price)}
              </p>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                Cocok untuk pembeli yang ingin unit siap pakai dengan spek yang jelas. Kalau butuh
                pembanding, admin bisa bantu carikan opsi lain dengan budget yang mirip.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <a
                  className="btn-primary"
                  href={whatsappLink(`Halo Laptopku, saya tertarik dengan ${laptop.name}. Apakah unit ini masih ready?`)}
                >
                  Tanya stok via WhatsApp
                </a>
                <Link href="/produk" className="btn-secondary">
                  Kembali ke produk
                </Link>
              </div>
            </div>

            <div className="mt-6 grid gap-3 md:grid-cols-2">
              <Spec label="Processor" value={laptop.processor} />
              <Spec label="RAM" value={laptop.ram} />
              <Spec label="Storage" value={laptop.storage} />
              <Spec label="GPU" value={laptop.gpu || "-"} />
              <Spec label="Layar" value={laptop.screenSize || "-"} />
              <Spec label="Garansi" value={laptop.warranty || "-"} />
              <Spec label="Kondisi" value={laptop.condition === "NEW" ? "Baru" : "Bekas"} />
              <Spec label="Kelengkapan" value={laptop.packageItems || "-"} />
            </div>

            {laptop.conditionNote ? (
              <div className="mt-5 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-7 text-amber-900">
                Catatan kondisi: {laptop.conditionNote}
              </div>
            ) : null}

            {laptop.usageTags.length > 0 ? (
              <div className="mt-6 flex flex-wrap gap-2">
                {laptop.usageTags.map((tag) => (
                  <span key={tag} className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-bold text-emerald-700">
                    {tag}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </section>

      {related.length > 0 ? (
        <section className="section-wrap border-y border-slate-200/70 bg-white/75 backdrop-blur">
          <div className="mx-auto max-w-7xl px-4">
            <SectionIntro eyebrow="Rekomendasi lain" title="Kalau unit ini belum cocok, coba lihat pilihan yang mirip" />
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {related.map((item) => (
                <ProductCard
                  key={item.id}
                  laptop={item}
                  promo={
                    item.promos[0]
                      ? {
                          label: item.promos[0].label,
                          price: item.promos[0].promoPrice,
                          normal: item.promos[0].normalPrice,
                        }
                      : undefined
                  }
                />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <PublicFooter />
    </main>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <p className="text-sm font-bold text-slate-500">{label}</p>
      <p className="mt-1 font-black">{value}</p>
    </div>
  );
}
