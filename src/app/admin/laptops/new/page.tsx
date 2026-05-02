import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function NewLaptopPage() {
  await requireAdmin();
  const [brands, categories] = await Promise.all([
    prisma.brand.findMany({ orderBy: { name: "asc" } }),
    prisma.category.findMany({ orderBy: { name: "asc" } }),
  ]);

  return (
    <main className="min-h-screen bg-slate-100">
      <Header />
      <section className="mx-auto max-w-4xl px-4 py-8">
        <h1 className="text-3xl font-black">Tambah Laptop</h1>
        <LaptopForm action="/api/admin/laptops" brands={brands} categories={categories} />
      </section>
    </main>
  );
}

function Header() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-4">
        <Link href="/admin/dashboard" className="font-black">Laptopku Admin</Link>
        <Link href="/admin/dashboard" className="btn-secondary">Kembali</Link>
      </div>
    </header>
  );
}

export function LaptopForm({
  action,
  brands,
  categories,
  laptop,
}: {
  action: string;
  brands: { id: string; name: string }[];
  categories: { id: string; name: string }[];
  laptop?: {
    name: string;
    brandId: string;
    categoryId: string;
    condition: string;
    price: number;
    costPrice: number | null;
    stock: number;
    status: string;
    description: string;
    processor: string;
    ram: string;
    storage: string;
    gpu: string | null;
    screenSize: string | null;
    warranty: string | null;
    packageItems: string | null;
    conditionNote: string | null;
    usageTags: string[];
    isFeatured: boolean;
    isBestSeller: boolean;
  };
}) {
  return (
    <form action={action} method="post" encType="multipart/form-data" className="mt-6 grid gap-4 rounded-lg border border-slate-200 bg-white p-5">
      <input className="form-field" name="name" placeholder="Nama laptop" defaultValue={laptop?.name} required />
      <div className="grid gap-3 md:grid-cols-2">
        <select className="form-field" name="brandId" defaultValue={laptop?.brandId} required>
          <option value="">Pilih brand</option>
          {brands.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
        </select>
        <select className="form-field" name="categoryId" defaultValue={laptop?.categoryId} required>
          <option value="">Pilih kategori</option>
          {categories.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
        </select>
      </div>
      <div className="grid gap-3 md:grid-cols-4">
        <input className="form-field" name="price" type="number" placeholder="Harga jual" defaultValue={laptop?.price} required />
        <input className="form-field" name="costPrice" type="number" placeholder="Harga modal" defaultValue={laptop?.costPrice || ""} />
        <input className="form-field" name="stock" type="number" placeholder="Stok" defaultValue={laptop?.stock ?? 1} required />
        <select className="form-field" name="condition" defaultValue={laptop?.condition || "NEW"}>
          <option value="NEW">Baru</option>
          <option value="USED">Bekas</option>
        </select>
      </div>
      <div className="grid gap-3 md:grid-cols-4">
        <input className="form-field" name="processor" placeholder="Processor" defaultValue={laptop?.processor} required />
        <input className="form-field" name="ram" placeholder="RAM" defaultValue={laptop?.ram} required />
        <input className="form-field" name="storage" placeholder="Storage" defaultValue={laptop?.storage} required />
        <input className="form-field" name="gpu" placeholder="GPU" defaultValue={laptop?.gpu || ""} />
      </div>
      <div className="grid gap-3 md:grid-cols-3">
        <input className="form-field" name="screenSize" placeholder="Ukuran layar" defaultValue={laptop?.screenSize || ""} />
        <input className="form-field" name="warranty" placeholder="Garansi" defaultValue={laptop?.warranty || ""} />
        <select className="form-field" name="status" defaultValue={laptop?.status || "ACTIVE"}>
          <option value="ACTIVE">Aktif</option>
          <option value="DRAFT">Draft</option>
          <option value="INACTIVE">Nonaktif</option>
          <option value="SOLD_OUT">Stok habis</option>
        </select>
      </div>
      <textarea className="form-field" name="description" rows={4} placeholder="Deskripsi produk" defaultValue={laptop?.description} required />
      <textarea className="form-field" name="packageItems" rows={2} placeholder="Kelengkapan paket" defaultValue={laptop?.packageItems || ""} />
      <textarea className="form-field" name="conditionNote" rows={2} placeholder="Catatan kondisi untuk laptop bekas" defaultValue={laptop?.conditionNote || ""} />
      <input className="form-field" name="usageTags" placeholder="Tag kebutuhan, pisahkan koma: Gaming, Coding, Kuliah" defaultValue={laptop?.usageTags.join(", ")} />
      <label className="rounded-lg border border-slate-200 p-3 text-sm font-bold">
        Foto utama produk
        <input className="mt-2 block w-full" name="mainImage" type="file" accept="image/*" />
      </label>
      <div className="flex flex-wrap gap-4">
        <label className="flex items-center gap-2 font-semibold"><input type="checkbox" name="isFeatured" defaultChecked={laptop?.isFeatured} /> Unggulan</label>
        <label className="flex items-center gap-2 font-semibold"><input type="checkbox" name="isBestSeller" defaultChecked={laptop?.isBestSeller} /> Best seller</label>
      </div>
      <button className="btn-primary" type="submit">Simpan Laptop</button>
    </form>
  );
}
