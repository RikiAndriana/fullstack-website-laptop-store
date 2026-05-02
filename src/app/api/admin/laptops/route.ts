import { randomUUID } from "crypto";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/utils";

async function saveImage(file: FormDataEntryValue | null) {
  if (!(file instanceof File) || file.size === 0) return null;
  const bytes = Buffer.from(await file.arrayBuffer());
  const ext = path.extname(file.name) || ".jpg";
  const name = `${randomUUID()}${ext}`;
  const uploadDir = path.join(process.cwd(), "public", "uploads");
  await mkdir(uploadDir, { recursive: true });
  await writeFile(path.join(uploadDir, name), bytes);
  return `/uploads/${name}`;
}

export async function POST(request: Request) {
  const form = await request.formData();
  const name = String(form.get("name") || "");
  const mainImage = await saveImage(form.get("mainImage"));
  const brandId = String(form.get("brandId") || "");
  const categoryId = String(form.get("categoryId") || "");

  await prisma.laptop.create({
    data: {
      name,
      slug: slugify(name),
      brandId,
      categoryId,
      condition: String(form.get("condition") || "NEW") === "USED" ? "USED" : "NEW",
      price: Number(form.get("price") || 0),
      costPrice: form.get("costPrice") ? Number(form.get("costPrice")) : null,
      stock: Number(form.get("stock") || 0),
      status: String(form.get("status") || "ACTIVE") as "DRAFT" | "ACTIVE" | "INACTIVE" | "SOLD_OUT",
      mainImage,
      description: String(form.get("description") || ""),
      processor: String(form.get("processor") || ""),
      ram: String(form.get("ram") || ""),
      storage: String(form.get("storage") || ""),
      gpu: String(form.get("gpu") || ""),
      screenSize: String(form.get("screenSize") || ""),
      warranty: String(form.get("warranty") || ""),
      packageItems: String(form.get("packageItems") || ""),
      conditionNote: String(form.get("conditionNote") || ""),
      usageTags: String(form.get("usageTags") || "")
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
      isFeatured: form.get("isFeatured") === "on",
      isBestSeller: form.get("isBestSeller") === "on",
    },
  });

  return NextResponse.redirect(new URL("/admin/dashboard", request.url), { status: 303 });
}
