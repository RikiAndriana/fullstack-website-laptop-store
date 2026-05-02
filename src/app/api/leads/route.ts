import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const form = await request.formData();
  await prisma.lead.create({
    data: {
      name: String(form.get("name") || ""),
      whatsapp: String(form.get("whatsapp") || ""),
      budget: String(form.get("budget") || ""),
      needDescription: String(form.get("needDescription") || ""),
      message: String(form.get("message") || ""),
      laptopId: form.get("laptopId") ? String(form.get("laptopId")) : null,
    },
  });

  return NextResponse.redirect(new URL("/?lead=success", request.url), { status: 303 });
}
