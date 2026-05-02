const { PrismaClient } = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
});

const slug = (value) =>
  value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const brands = ["ASUS", "Lenovo", "HP", "Acer", "Dell", "MSI", "Apple"];
const categories = [
  "Gaming",
  "Pelajar",
  "Kantor",
  "Editing",
  "Bisnis",
  "Laptop Bekas",
];

const catalogSeries = [
  {
    brand: "ASUS",
    model: "Vivobook 14 A1404",
    category: "Pelajar",
    screenSize: "14 inch FHD",
    gpu: "Intel UHD Graphics",
    os: "Windows 11 Home",
    usageTags: ["Kuliah", "Office", "Browsing"],
    variants: [
      { suffix: "Intel Core i3 8GB 512GB", processor: "Intel Core i3-1215U", ram: "8GB", storage: "512GB SSD", price: 6899000 },
      { suffix: "Intel Core i5 8GB 512GB", processor: "Intel Core i5-1235U", ram: "8GB", storage: "512GB SSD", price: 7899000 },
      { suffix: "Intel Core i5 16GB 512GB", processor: "Intel Core i5-1235U", ram: "16GB", storage: "512GB SSD", price: 8699000 },
    ],
  },
  {
    brand: "ASUS",
    model: "TUF Gaming F15",
    category: "Gaming",
    screenSize: "15.6 inch FHD 144Hz",
    gpu: "NVIDIA GeForce RTX 3050",
    os: "Windows 11 Home",
    usageTags: ["Gaming", "Streaming", "Editing"],
    variants: [
      { suffix: "Core i5 RTX 3050 16GB 512GB", processor: "Intel Core i5-12500H", ram: "16GB", storage: "512GB SSD", price: 12499000 },
      { suffix: "Core i7 RTX 4050 16GB 512GB", processor: "Intel Core i7-12700H", ram: "16GB", storage: "512GB SSD", gpu: "NVIDIA GeForce RTX 4050", price: 14999000 },
      { suffix: "Core i7 RTX 4060 16GB 1TB", processor: "Intel Core i7-12700H", ram: "16GB", storage: "1TB SSD", gpu: "NVIDIA GeForce RTX 4060", price: 17499000 },
    ],
  },
  {
    brand: "ASUS",
    model: "Zenbook 14 OLED",
    category: "Bisnis",
    screenSize: "14 inch 2.8K OLED",
    gpu: "Intel Iris Xe",
    os: "Windows 11 Home",
    usageTags: ["Presentasi", "Bisnis", "Mobile"],
    variants: [
      { suffix: "Core i5 16GB 512GB", processor: "Intel Core i5-1340P", ram: "16GB", storage: "512GB SSD", price: 13999000 },
      { suffix: "Core i7 16GB 1TB", processor: "Intel Core i7-1360P", ram: "16GB", storage: "1TB SSD", price: 15999000 },
      { suffix: "Core Ultra 7 16GB 1TB", processor: "Intel Core Ultra 7 155H", ram: "16GB", storage: "1TB SSD", price: 17999000 },
    ],
  },
  {
    brand: "Lenovo",
    model: "IdeaPad Slim 3 14",
    category: "Pelajar",
    screenSize: "14 inch FHD",
    gpu: "Intel UHD Graphics",
    os: "Windows 11 Home",
    usageTags: ["Kuliah", "Kerja Ringan", "Browsing"],
    variants: [
      { suffix: "Intel Core i3 8GB 512GB", processor: "Intel Core i3-1215U", ram: "8GB", storage: "512GB SSD", price: 6799000 },
      { suffix: "Intel Core i5 8GB 512GB", processor: "Intel Core i5-1235U", ram: "8GB", storage: "512GB SSD", price: 7799000 },
      { suffix: "Ryzen 5 16GB 512GB", processor: "AMD Ryzen 5 7530U", ram: "16GB", storage: "512GB SSD", gpu: "AMD Radeon Graphics", price: 8299000 },
    ],
  },
  {
    brand: "Lenovo",
    model: "LOQ 15",
    category: "Gaming",
    screenSize: "15.6 inch FHD 144Hz",
    gpu: "NVIDIA GeForce RTX 4050",
    os: "Windows 11 Home",
    usageTags: ["Gaming", "Desain 3D", "Editing"],
    variants: [
      { suffix: "Ryzen 5 RTX 4050 16GB 512GB", processor: "AMD Ryzen 5 7640HS", ram: "16GB", storage: "512GB SSD", price: 14499000 },
      { suffix: "Ryzen 7 RTX 4050 16GB 512GB", processor: "AMD Ryzen 7 7840HS", ram: "16GB", storage: "512GB SSD", price: 15999000 },
      { suffix: "Ryzen 7 RTX 4060 16GB 1TB", processor: "AMD Ryzen 7 7840HS", ram: "16GB", storage: "1TB SSD", gpu: "NVIDIA GeForce RTX 4060", price: 18299000 },
    ],
  },
  {
    brand: "Lenovo",
    model: "ThinkPad E14 Gen 5",
    category: "Bisnis",
    screenSize: "14 inch WUXGA",
    gpu: "Intel Iris Xe",
    os: "Windows 11 Pro",
    usageTags: ["Bisnis", "Office", "Presentasi"],
    variants: [
      { suffix: "Core i5 16GB 512GB", processor: "Intel Core i5-1335U", ram: "16GB", storage: "512GB SSD", price: 12499000 },
      { suffix: "Core i7 16GB 512GB", processor: "Intel Core i7-1355U", ram: "16GB", storage: "512GB SSD", price: 13999000 },
      { suffix: "Core i7 16GB 1TB", processor: "Intel Core i7-1355U", ram: "16GB", storage: "1TB SSD", price: 14999000 },
    ],
  },
  {
    brand: "HP",
    model: "14s",
    category: "Pelajar",
    screenSize: "14 inch FHD",
    gpu: "Intel UHD Graphics",
    os: "Windows 11 Home",
    usageTags: ["Sekolah", "Kuliah", "Office"],
    variants: [
      { suffix: "Intel N200 8GB 512GB", processor: "Intel Processor N200", ram: "8GB", storage: "512GB SSD", price: 5499000 },
      { suffix: "Core i3 8GB 512GB", processor: "Intel Core i3-1215U", ram: "8GB", storage: "512GB SSD", price: 6899000 },
      { suffix: "Ryzen 5 16GB 512GB", processor: "AMD Ryzen 5 7520U", ram: "16GB", storage: "512GB SSD", gpu: "AMD Radeon Graphics", price: 7999000 },
    ],
  },
  {
    brand: "HP",
    model: "Victus 15",
    category: "Gaming",
    screenSize: "15.6 inch FHD 144Hz",
    gpu: "NVIDIA GeForce RTX 3050",
    os: "Windows 11 Home",
    usageTags: ["Gaming", "Editing", "Multitasking"],
    variants: [
      { suffix: "Ryzen 5 RTX 3050 16GB 512GB", processor: "AMD Ryzen 5 7535HS", ram: "16GB", storage: "512GB SSD", price: 12999000 },
      { suffix: "Ryzen 7 RTX 4050 16GB 512GB", processor: "AMD Ryzen 7 7840HS", ram: "16GB", storage: "512GB SSD", gpu: "NVIDIA GeForce RTX 4050", price: 15499000 },
      { suffix: "Core i7 RTX 4060 16GB 1TB", processor: "Intel Core i7-13620H", ram: "16GB", storage: "1TB SSD", gpu: "NVIDIA GeForce RTX 4060", price: 17999000 },
    ],
  },
  {
    brand: "Acer",
    model: "Aspire 5 Slim",
    category: "Kantor",
    screenSize: "15.6 inch FHD",
    gpu: "Intel Iris Xe",
    os: "Windows 11 Home",
    usageTags: ["Kantor", "Meeting", "Office"],
    variants: [
      { suffix: "Core i3 8GB 512GB", processor: "Intel Core i3-1315U", ram: "8GB", storage: "512GB SSD", price: 6999000 },
      { suffix: "Core i5 16GB 512GB", processor: "Intel Core i5-1335U", ram: "16GB", storage: "512GB SSD", price: 8799000 },
      { suffix: "Core i7 16GB 1TB", processor: "Intel Core i7-1355U", ram: "16GB", storage: "1TB SSD", price: 10499000 },
    ],
  },
  {
    brand: "Acer",
    model: "Nitro V 15",
    category: "Gaming",
    screenSize: "15.6 inch FHD 144Hz",
    gpu: "NVIDIA GeForce RTX 4050",
    os: "Windows 11 Home",
    usageTags: ["Gaming", "Rendering", "Editing"],
    variants: [
      { suffix: "Core i5 RTX 4050 16GB 512GB", processor: "Intel Core i5-13420H", ram: "16GB", storage: "512GB SSD", price: 14499000 },
      { suffix: "Core i7 RTX 4050 16GB 512GB", processor: "Intel Core i7-13620H", ram: "16GB", storage: "512GB SSD", price: 15999000 },
      { suffix: "Core i7 RTX 4060 16GB 1TB", processor: "Intel Core i7-13620H", ram: "16GB", storage: "1TB SSD", gpu: "NVIDIA GeForce RTX 4060", price: 18199000 },
    ],
  },
  {
    brand: "Dell",
    model: "Inspiron 14",
    category: "Kantor",
    screenSize: "14 inch FHD+",
    gpu: "Intel Iris Xe",
    os: "Windows 11 Home",
    usageTags: ["Kerja Kantor", "Presentasi", "Mobile"],
    variants: [
      { suffix: "Core i5 8GB 512GB", processor: "Intel Core i5-1334U", ram: "8GB", storage: "512GB SSD", price: 9299000 },
      { suffix: "Core i5 16GB 512GB", processor: "Intel Core i5-1334U", ram: "16GB", storage: "512GB SSD", price: 9999000 },
      { suffix: "Core i7 16GB 1TB", processor: "Intel Core i7-1355U", ram: "16GB", storage: "1TB SSD", price: 11799000 },
    ],
  },
  {
    brand: "Dell",
    model: "Vostro 14",
    category: "Bisnis",
    screenSize: "14 inch FHD",
    gpu: "Intel Iris Xe",
    os: "Windows 11 Pro",
    usageTags: ["Bisnis", "Kantor", "Akuntansi"],
    variants: [
      { suffix: "Core i3 8GB 512GB", processor: "Intel Core i3-1315U", ram: "8GB", storage: "512GB SSD", price: 8699000 },
      { suffix: "Core i5 16GB 512GB", processor: "Intel Core i5-1335U", ram: "16GB", storage: "512GB SSD", price: 10499000 },
      { suffix: "Core i7 16GB 1TB", processor: "Intel Core i7-1355U", ram: "16GB", storage: "1TB SSD", price: 12499000 },
    ],
  },
  {
    brand: "MSI",
    model: "Thin A15",
    category: "Gaming",
    screenSize: "15.6 inch FHD 144Hz",
    gpu: "NVIDIA GeForce RTX 4050",
    os: "Windows 11 Home",
    usageTags: ["Gaming", "Streaming", "Desain"],
    variants: [
      { suffix: "Ryzen 5 RTX 4050 16GB 512GB", processor: "AMD Ryzen 5 7535HS", ram: "16GB", storage: "512GB SSD", price: 14999000 },
      { suffix: "Ryzen 7 RTX 4050 16GB 512GB", processor: "AMD Ryzen 7 7735HS", ram: "16GB", storage: "512GB SSD", price: 16299000 },
      { suffix: "Ryzen 7 RTX 4060 16GB 1TB", processor: "AMD Ryzen 7 7735HS", ram: "16GB", storage: "1TB SSD", gpu: "NVIDIA GeForce RTX 4060", price: 18499000 },
    ],
  },
  {
    brand: "Apple",
    model: "MacBook Air M2",
    category: "Bisnis",
    screenSize: "13.6 inch Liquid Retina",
    gpu: "Apple GPU",
    os: "macOS",
    usageTags: ["Konten", "Bisnis", "Mobile"],
    variants: [
      { suffix: "8GB 256GB", processor: "Apple M2", ram: "8GB", storage: "256GB SSD", price: 15999000 },
      { suffix: "8GB 512GB", processor: "Apple M2", ram: "8GB", storage: "512GB SSD", price: 17999000 },
      { suffix: "16GB 512GB", processor: "Apple M2", ram: "16GB", storage: "512GB SSD", price: 20999000 },
    ],
  },
  {
    brand: "Apple",
    model: "MacBook Pro 14",
    category: "Editing",
    screenSize: "14.2 inch Liquid Retina XDR",
    gpu: "Apple GPU",
    os: "macOS",
    usageTags: ["Video Editing", "Desain", "Audio"],
    variants: [
      { suffix: "M3 8GB 512GB", processor: "Apple M3", ram: "8GB", storage: "512GB SSD", price: 26999000 },
      { suffix: "M3 Pro 18GB 512GB", processor: "Apple M3 Pro", ram: "18GB", storage: "512GB SSD", price: 33999000 },
      { suffix: "M3 Pro 18GB 1TB", processor: "Apple M3 Pro", ram: "18GB", storage: "1TB SSD", price: 37999000 },
    ],
  },
  {
    brand: "HP",
    model: "Pavilion Aero 13",
    category: "Bisnis",
    screenSize: "13.3 inch WUXGA",
    gpu: "AMD Radeon Graphics",
    os: "Windows 11 Home",
    usageTags: ["Travel", "Office", "Presentasi"],
    variants: [
      { suffix: "Ryzen 5 16GB 512GB", processor: "AMD Ryzen 5 7535U", ram: "16GB", storage: "512GB SSD", price: 10999000 },
      { suffix: "Ryzen 7 16GB 512GB", processor: "AMD Ryzen 7 7735U", ram: "16GB", storage: "512GB SSD", price: 12499000 },
      { suffix: "Ryzen 7 16GB 1TB", processor: "AMD Ryzen 7 7735U", ram: "16GB", storage: "1TB SSD", price: 13499000 },
    ],
  },
];

const usedCatalog = [
  {
    brand: "Lenovo",
    model: "ThinkPad X1 Carbon Gen 9",
    category: "Laptop Bekas",
    processor: "Intel Core i7-1165G7",
    ram: "16GB",
    storage: "512GB SSD",
    gpu: "Intel Iris Xe",
    screenSize: "14 inch WQXGA",
    price: 13999000,
    usageTags: ["Bisnis", "Premium", "Bekas"],
    conditionNote: "Body mulus 90 persen, baterai normal, keyboard aman.",
  },
  {
    brand: "Dell",
    model: "Latitude 7420",
    category: "Laptop Bekas",
    processor: "Intel Core i7-1185G7",
    ram: "16GB",
    storage: "512GB SSD",
    gpu: "Intel Iris Xe",
    screenSize: "14 inch FHD",
    price: 11299000,
    usageTags: ["Kantor", "Bekas", "Mobile"],
    conditionNote: "Pemakaian wajar, layar aman, charger original.",
  },
  {
    brand: "HP",
    model: "EliteBook 840 G8",
    category: "Laptop Bekas",
    processor: "Intel Core i5-1135G7",
    ram: "16GB",
    storage: "512GB SSD",
    gpu: "Intel Iris Xe",
    screenSize: "14 inch FHD",
    price: 9699000,
    usageTags: ["Office", "Bekas", "Bisnis"],
    conditionNote: "Ada hairline tipis di cover, performa normal dan siap kerja.",
  },
  {
    brand: "Apple",
    model: "MacBook Air M1",
    category: "Laptop Bekas",
    processor: "Apple M1",
    ram: "8GB",
    storage: "256GB SSD",
    gpu: "Apple GPU",
    screenSize: "13.3 inch Retina",
    price: 10999000,
    usageTags: ["Konten", "Bekas", "Kuliah"],
    conditionNote: "Unit bekas terawat, siklus baterai aman, minus pemakaian sangat minim.",
  },
  {
    brand: "ASUS",
    model: "ROG Zephyrus G14",
    category: "Laptop Bekas",
    processor: "AMD Ryzen 9 6900HS",
    ram: "16GB",
    storage: "1TB SSD",
    gpu: "NVIDIA GeForce RTX 3060",
    screenSize: "14 inch QHD 120Hz",
    price: 16999000,
    usageTags: ["Gaming", "Bekas", "Editing"],
    conditionNote: "Bezel aman, engsel halus, suhu normal, cocok untuk gaming dan kerja berat.",
  },
];

const promoTargets = [
  { slug: "asus-tuf-gaming-f15-core-i5-rtx-3050-16gb-512gb", label: "Best Deal", promoName: "Promo Gaming Mingguan", discount: 800000 },
  { slug: "lenovo-loq-15-ryzen-5-rtx-4050-16gb-512gb", label: "Promo", promoName: "Harga Spesial LOQ", discount: 700000 },
  { slug: "hp-victus-15-ryzen-5-rtx-3050-16gb-512gb", label: "Flash Sale", promoName: "Flash Sale Victus", discount: 600000 },
  { slug: "acer-nitro-v-15-core-i5-rtx-4050-16gb-512gb", label: "Promo", promoName: "Deal Nitro V", discount: 750000 },
  { slug: "macbook-air-m2-8gb-256gb", label: "Best Deal", promoName: "MacBook Favorit", discount: 1000000 },
  { slug: "asus-vivobook-14-a1404-intel-core-i3-8gb-512gb", label: "Hemat", promoName: "Promo Laptop Kuliah", discount: 400000 },
  { slug: "lenovo-ideapad-slim-3-14-intel-core-i3-8gb-512gb", label: "Hemat", promoName: "Promo Kuliah Harian", discount: 350000 },
  { slug: "hp-14s-intel-n200-8gb-512gb", label: "Promo", promoName: "Entry Level Deal", discount: 300000 },
  { slug: "lenovo-thinkpad-e14-gen-5-core-i5-16gb-512gb", label: "Bisnis", promoName: "Promo Laptop Kantor", discount: 500000 },
  { slug: "apple-macbook-pro-14-m3-8gb-512gb", label: "Spesial", promoName: "Promo Kreator", discount: 1200000 },
];

function buildDescription(item) {
  const conditionText = item.condition === "USED" ? "Unit bekas pilihan" : "Unit baru";
  return `${conditionText} ${item.brand} ${item.model} dengan ${item.processor}, ${item.ram}, dan ${item.storage}. Cocok untuk ${item.usageTags.join(", ").toLowerCase()} dengan kondisi siap pakai dan spek yang jelas.`;
}

function buildPackageItems(condition) {
  return condition === "USED"
    ? "Unit, charger, sleeve, nota pembelian"
    : "Unit, charger original, dus, nota pembelian";
}

async function main() {
  const passwordHash = await bcrypt.hash(process.env.ADMIN_PASSWORD || "riki02", 10);

  await prisma.user.upsert({
    where: { email: process.env.ADMIN_EMAIL || "owner@laptopku.local" },
    update: { passwordHash },
    create: {
      name: "Owner Laptopku",
      email: process.env.ADMIN_EMAIL || "owner@laptopku.local",
      passwordHash,
      role: "OWNER",
    },
  });

  for (const name of brands) {
    await prisma.brand.upsert({
      where: { slug: slug(name) },
      update: {},
      create: { name, slug: slug(name) },
    });
  }

  for (const name of categories) {
    await prisma.category.upsert({
      where: { slug: slug(name) },
      update: {},
      create: {
        name,
        slug: slug(name),
        description: `Pilihan laptop untuk ${name.toLowerCase()}.`,
      },
    });
  }

  const brandMap = Object.fromEntries(
    (await prisma.brand.findMany()).map((item) => [item.name, item.id]),
  );
  const categoryMap = Object.fromEntries(
    (await prisma.category.findMany()).map((item) => [item.name, item.id]),
  );

  let productIndex = 0;
  const createdProducts = [];

  for (const series of catalogSeries) {
    for (const variant of series.variants) {
      const name = `${series.brand} ${series.model} ${variant.suffix}`;
      const product = {
        name,
        slug: slug(name),
        brandId: brandMap[series.brand],
        categoryId: categoryMap[series.category],
        condition: "NEW",
        price: variant.price,
        stock: 2 + (productIndex % 6),
        status: "ACTIVE",
        mainImage: null,
        description: buildDescription({
          brand: series.brand,
          model: series.model,
          processor: variant.processor,
          ram: variant.ram,
          storage: variant.storage,
          usageTags: series.usageTags,
          condition: "NEW",
        }),
        processor: variant.processor,
        ram: variant.ram,
        storage: variant.storage,
        gpu: variant.gpu || series.gpu,
        screenSize: series.screenSize,
        screenResolution: series.screenSize.includes("2.8K") || series.screenSize.includes("QHD") ? "High Resolution" : "Full HD",
        operatingSystem: series.os,
        warranty: series.brand === "Apple" ? "Garansi toko 30 hari" : "Garansi resmi 2 tahun",
        weight: series.screenSize.startsWith("13") ? "1.2 kg" : series.screenSize.startsWith("14") ? "1.4 kg" : "1.9 kg",
        color: "Standard",
        packageItems: buildPackageItems("NEW"),
        conditionNote: null,
        usageTags: series.usageTags,
        isFeatured: productIndex < 8,
        isBestSeller: productIndex % 5 === 0,
      };

      await prisma.laptop.upsert({
        where: { slug: product.slug },
        update: product,
        create: product,
      });

      createdProducts.push({ slug: product.slug, price: product.price });
      productIndex += 1;
    }
  }

  for (const item of usedCatalog) {
    const name = `${item.brand} ${item.model}`;
    const product = {
      name,
      slug: slug(name),
      brandId: brandMap[item.brand],
      categoryId: categoryMap[item.category],
      condition: "USED",
      price: item.price,
      stock: 1 + (productIndex % 2),
      status: "ACTIVE",
      mainImage: null,
      description: buildDescription({
        brand: item.brand,
        model: item.model,
        processor: item.processor,
        ram: item.ram,
        storage: item.storage,
        usageTags: item.usageTags,
        condition: "USED",
      }),
      processor: item.processor,
      ram: item.ram,
      storage: item.storage,
      gpu: item.gpu,
      screenSize: item.screenSize,
      screenResolution: "Full HD",
      operatingSystem: item.brand === "Apple" ? "macOS" : "Windows 11",
      warranty: "Garansi toko 14 hari",
      weight: item.screenSize.startsWith("13") ? "1.3 kg" : "1.5 kg",
      color: "Standard",
      packageItems: buildPackageItems("USED"),
      conditionNote: item.conditionNote,
      usageTags: item.usageTags,
      isFeatured: false,
      isBestSeller: false,
    };

    await prisma.laptop.upsert({
      where: { slug: product.slug },
      update: product,
      create: product,
    });

    createdProducts.push({ slug: product.slug, price: product.price });
    productIndex += 1;
  }

  for (const [index, target] of promoTargets.entries()) {
    const laptop = await prisma.laptop.findUnique({ where: { slug: target.slug } });
    if (!laptop) continue;

    await prisma.promo.upsert({
      where: { id: `seed-promo-${index + 1}` },
      update: {
        laptopId: laptop.id,
        promoName: target.promoName,
        normalPrice: laptop.price,
        promoPrice: Math.max(laptop.price - target.discount, 1000000),
        label: target.label,
        isActive: true,
        showOnHomepage: true,
        sortOrder: index,
      },
      create: {
        id: `seed-promo-${index + 1}`,
        laptopId: laptop.id,
        promoName: target.promoName,
        normalPrice: laptop.price,
        promoPrice: Math.max(laptop.price - target.discount, 1000000),
        label: target.label,
        isActive: true,
        showOnHomepage: true,
        sortOrder: index,
      },
    });
  }
}

main().finally(async () => prisma.$disconnect());
