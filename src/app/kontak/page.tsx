import { ArrowRight, BadgeCheck, Clock, MapPin } from "lucide-react";
import {
  ContactInfoLine,
  MiniInfo,
  PageHero,
  PublicFooter,
  PublicHeader,
  mapsEmbedUrl,
  storeAddress,
} from "@/components/storefront";

export default function KontakPage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#ecfeff_0%,#f8fafc_40%,#fefce8_100%)] text-slate-950">
      <PublicHeader />
      <PageHero
        eyebrow="Kontak toko"
        title="Butuh cek stok, tanya rekomendasi, atau mau datang ke toko? Semua ada di sini."
        description="Halaman kontak kami sengaja dibuat ringkas supaya pelanggan bisa cepat chat admin, kirim kebutuhan, dan melihat lokasi toko tanpa muter-muter."
      />

      <section className="section-wrap">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 lg:grid-cols-[0.82fr_1.18fr]">
          <div className="surface-card p-7">
            <p className="section-eyebrow">Hubungi kami</p>
            <h2 className="mt-3 text-3xl font-black leading-tight">
              Konsultasi cepat untuk pembeli online maupun pengunjung toko.
            </h2>
            <div className="mt-6 grid gap-3">
              <ContactInfoLine icon={MapPin} title="Alamat" text={storeAddress} />
              <ContactInfoLine icon={Clock} title="Jam buka" text="Senin - Sabtu, 09.00 - 20.00 WIB" />
              <ContactInfoLine icon={BadgeCheck} title="Layanan" text="Cek fisik, instalasi awal, konsultasi, dan after sales." />
            </div>
            <div className="mt-6 grid gap-3">
              <MiniInfo text="Lead otomatis masuk ke dashboard owner dan siap di-follow-up." />
              <MiniInfo text="Cocok untuk pembeli yang mau bandingkan beberapa unit dulu." />
            </div>
          </div>

          <form action="/api/leads" method="post" className="surface-card grid gap-3 p-5 sm:p-6">
            <div className="grid gap-3 sm:grid-cols-2">
              <input name="name" required placeholder="Nama" className="form-field" />
              <input name="whatsapp" required placeholder="Nomor WhatsApp" className="form-field" />
            </div>
            <input name="budget" placeholder="Budget, contoh: 8 juta" className="form-field" />
            <textarea
              name="needDescription"
              placeholder="Kebutuhan: kuliah, kerja, gaming, editing..."
              className="form-field min-h-36"
              rows={5}
            />
            <button className="btn-primary mt-2 inline-flex items-center justify-center gap-2" type="submit">
              Kirim Konsultasi
              <ArrowRight size={16} />
            </button>
          </form>
        </div>
      </section>

      <section className="section-wrap border-y border-slate-200/70 bg-white/75 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4">
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-[0_24px_60px_rgba(15,23,42,0.08)]">
            <iframe
              title="Lokasi Laptopku"
              src={mapsEmbedUrl}
              className="h-[420px] w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      <PublicFooter />
    </main>
  );
}
