import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const form = await request.formData();
  const laptopId = String(form.get("laptopId") || "");
  const laptop = await prisma.laptop.findUniqueOrThrow({ where: { id: laptopId } });

  await prisma.promo.create({
    data: {
      laptopId,
      promoName: String(form.get("promoName") || "Promo Laptop"),
      label: String(form.get("label") || "Promo"),
      normalPrice: laptop.price,
      promoPrice: Number(form.get("promoPrice") || laptop.price),
      isActive: form.get("isActive") !== "off",
      showOnHomepage: form.get("showOnHomepage") !== "off",
    },
  });

  return NextResponse.redirect(new URL("/admin/dashboard", request.url), { status: 303 });
}
