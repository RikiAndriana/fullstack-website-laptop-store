import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { LaptopForm } from "../../new/page";

export const dynamic = "force-dynamic";

export default async function EditLaptopPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const { id } = await params;
  const [laptop, brands, categories] = await Promise.all([
    prisma.laptop.findUnique({ where: { id } }),
    prisma.brand.findMany({ orderBy: { name: "asc" } }),
    prisma.category.findMany({ orderBy: { name: "asc" } }),
  ]);
  if (!laptop) notFound();

  return (
    <main className="min-h-screen bg-slate-100">
      <section className="mx-auto max-w-4xl px-4 py-8">
        <h1 className="text-3xl font-black">Edit Laptop</h1>
        <LaptopForm action={`/api/admin/laptops/${laptop.id}`} brands={brands} categories={categories} laptop={laptop} />
      </section>
    </main>
  );
}
