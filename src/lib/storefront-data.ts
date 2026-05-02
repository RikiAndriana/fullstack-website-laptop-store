import { prisma } from "@/lib/prisma";

export async function getStorefrontData(search?: {
  q?: string;
  brand?: string;
  budget?: string;
  limit?: number;
}) {
  const query = search?.q?.trim();
  const brand = search?.brand;
  const maxBudget = search?.budget ? Number(search.budget) : undefined;

  const limit = search?.limit ?? 12;

  const [brands, categories, promos, laptops] = await Promise.all([
    prisma.brand.findMany({ where: { isActive: true }, orderBy: { name: "asc" } }),
    prisma.category.findMany({ where: { isActive: true }, orderBy: { sortOrder: "asc" } }),
    prisma.promo.findMany({
      where: { isActive: true, showOnHomepage: true },
      include: { laptop: { include: { brand: true, category: true } } },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
      take: 6,
    }),
    prisma.laptop.findMany({
      where: {
        status: "ACTIVE",
        ...(query
          ? {
              OR: [
                { name: { contains: query, mode: "insensitive" } },
                { processor: { contains: query, mode: "insensitive" } },
                { ram: { contains: query, mode: "insensitive" } },
              ],
            }
          : {}),
        ...(brand ? { brand: { slug: brand } } : {}),
        ...(maxBudget ? { price: { lte: maxBudget } } : {}),
      },
      include: { brand: true, category: true, promos: { where: { isActive: true }, take: 1 } },
      orderBy: [{ isFeatured: "desc" }, { createdAt: "desc" }],
      take: limit,
    }),
  ]);

  return { brands, categories, promos, laptops };
}
