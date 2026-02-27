import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Membersihkan data lama...");
  await prisma.product.deleteMany();

  const products = [
    {
      name: "Lavender Mist Polos",
      description: "Sprei katun Jepang premium dengan warna ungu lavender yang elegan.",
      price: 350000,
      stock: 12,
      category: "polos",
      size: "king",
      // Gambar Baru yang Lebih Stabil
      imageUrls: ["https://images.unsplash.com/photo-1592343167943-04212f548633?auto=format&fit=crop&q=80&w=800"]
    },
    {
      name: "Midnight Navy Signature",
      description: "Warna navy gelap yang mewah, bahan sangat sejuk.",
      price: 320000,
      stock: 8,
      category: "polos",
      size: "queen",
      imageUrls: ["https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=800"]
    },
    {
      name: "Tropical Leaf Motif",
      description: "Motif dedaunan tropis untuk suasana kamar yang asri.",
      price: 275000,
      stock: 5,
      category: "motif",
      size: "single",
      // Gambar Baru yang Lebih Stabil
      imageUrls: ["https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&q=80&w=800"]
    },
    {
      name: "Charcoal Grey Bedcover",
      description: "Set bedcover tebal charcoal grey, sangat empuk.",
      price: 850000,
      stock: 3,
      category: "bedcover",
      size: "king",
      imageUrls: ["https://images.unsplash.com/photo-1631679706909-1844bbd07221?auto=format&fit=crop&q=80&w=800"]
    },
    {
      name: "Soft Sakura Blossom",
      description: "Motif bunga sakura yang cantik dan feminin.",
      price: 310000,
      stock: 10,
      category: "motif",
      size: "queen",
      imageUrls: ["https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=800"]
    },
    {
      name: "Emerald Forest Green",
      description: "Warna hijau botol mewah dengan bahan serat alami.",
      price: 350000,
      stock: 15,
      category: "polos",
      size: "king",
      imageUrls: ["https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&q=80&w=800"]
    },
    {
      name: "Geometric Scandic Blue",
      description: "Motif geometris modern gaya Skandinavia.",
      price: 340000,
      stock: 7,
      category: "motif",
      size: "king",
      imageUrls: ["https://images.unsplash.com/photo-1616627547584-bf28cee262db?auto=format&fit=crop&q=80&w=800"]
    },
    {
      name: "Vanilla Cream Luxury",
      description: "Warna krem vanilla yang hangat dan bersih.",
      price: 299000,
      stock: 20,
      category: "polos",
      size: "queen",
      imageUrls: ["https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800"]
    },
    {
      name: "Classic Tartan Red",
      description: "Motif kotak-kotak klasik yang abadi.",
      price: 285000,
      stock: 6,
      category: "motif",
      size: "single",
      imageUrls: ["https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&q=80&w=800"]
    },
    {
      name: "Pure White Hotel Series",
      description: "Kualitas hotel berbintang dalam rumah Anda.",
      price: 790000,
      stock: 4,
      category: "bedcover",
      size: "king",
      // Gambar Baru yang Lebih Stabil
      imageUrls: ["https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&q=80&w=800"]
    },
  ];

  for (const product of products) {
    await prisma.product.create({ data: product });
  }
  console.log("10 Produk dummy dengan gambar baru berhasil ditambahkan!");
}

main().catch(e => { console.error(e); process.exit(1); }).finally(async () => { await prisma.$disconnect(); });