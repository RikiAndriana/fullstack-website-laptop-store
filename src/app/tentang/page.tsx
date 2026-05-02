import { BadgeCheck, ShieldCheck, Sparkles, Store, Wrench } from "lucide-react";
import {
  BrandTicker,
  PageHero,
  PublicFooter,
  PublicHeader,
  ReviewCard,
  SectionIntro,
  ServiceCard,
} from "@/components/storefront";
import { getStorefrontData } from "@/lib/storefront-data";

export const dynamic = "force-dynamic";

export default async function TentangPage() {
  const { brands } = await getStorefrontData();

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#fefce8_0%,#f8fafc_40%,#ecfeff_100%)] text-slate-950">
      <PublicHeader />
      <PageHero
        eyebrow="Tentang toko"
        title="Laptopku adalah toko laptop harian yang fokus pada stok jelas, spek jelas, dan pelayanan yang enak diajak diskusi."
        description="Kami melayani pembeli yang butuh laptop untuk sekolah, kerja, usaha, desain, dan gaming, dengan pendekatan yang sederhana: jelaskan kondisi barang apa adanya dan bantu pilih yang paling masuk akal."
      />

      <BrandTicker brands={brands.map((item) => item.name)} />

      <section className="section-wrap">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="surface-card p-7">
            <p className="section-eyebrow">Cerita singkat</p>
            <h2 className="mt-3 text-3xl font-black leading-tight">
              Bukan sekadar jual unit, tapi bantu pembeli pulang dengan pilihan yang tepat.
            </h2>
            <p className="mt-4 leading-8 text-slate-600">
              Banyak pembeli datang dengan situasi yang sama: budget terbatas, banyak pilihan, dan takut salah ambil spek.
              Karena itu kami susun katalog yang rapi, update stok lebih realistis, dan siapkan admin yang bisa jelaskan
              perbedaan unit dengan bahasa yang gampang dipahami.
            </p>
            <div className="mt-6 grid gap-3">
              <ValueLine icon={BadgeCheck} text="Spesifikasi dan kondisi barang dijelaskan dengan bahasa yang mudah dipahami." />
              <ValueLine icon={ShieldCheck} text="Pengecekan unit, garansi, dan kelengkapan dibicarakan dari awal." />
              <ValueLine icon={Sparkles} text="Promo, best deal, dan unit unggulan dipisahkan supaya pelanggan lebih cepat memilih." />
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <ServiceCard icon={Store} title="Konsultasi ramah" text="Cocok untuk pembeli pemula yang masih bingung memilih RAM, SSD, atau GPU." />
            <ServiceCard icon={Wrench} title="Setup awal" text="Bisa bantu aktivasi, instal aplikasi dasar, dan pengecekan perangkat sebelum dibawa pulang." />
            <ServiceCard icon={ShieldCheck} title="Transparan" text="Harga, kondisi barang, minus unit bekas, dan kelengkapan dijelaskan sejelas mungkin." />
            <ServiceCard icon={Sparkles} title="Promo fleksibel" text="Saat ada stok spesial atau unit cuci gudang, promo bisa langsung ditonjolkan." />
          </div>
        </div>
      </section>

      <section className="section-wrap border-y border-slate-200/70 bg-white/75 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4">
          <SectionIntro eyebrow="Review pelanggan" title="Kepercayaan tumbuh karena pelayanan terasa manusiawi dan jelas" />
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

function ValueLine({ icon: Icon, text }: { icon: typeof BadgeCheck; text: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
      <div className="flex gap-3">
        <div className="mt-0.5 rounded-full bg-emerald-50 p-2 text-emerald-600">
          <Icon size={18} />
        </div>
        <p className="text-sm font-semibold leading-7 text-slate-600">{text}</p>
      </div>
    </div>
  );
}
