import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Memulai proses seeding data sprei...');

  // Hapus data lama agar tidak dobel jika dijalankan berkali-kali
  await prisma.product.deleteMany();

  // Menambahkan 3 produk contoh
  await prisma.product.createMany({
    data: [
      {
        name: 'Sprei Katun Jepang Motif Bunga',
        description: 'Sprei berbahan katun Jepang asli 100%. Sangat lembut, adem, dan tidak luntur. Ukuran Queen (160x200).',
        price: 250000,
        imageUrl: 'https://images.unsplash.com/photo-1522771739223-072710a597ff?q=80&w=800&auto=format&fit=crop',
      },
      {
        name: 'Sprei Microtex Polos Minimalis - Abu Abu',
        description: 'Sprei aesthetic berbahan microtex yang tebal namun halus. Anti kusut dan mudah dicuci. Ukuran King (180x200).',
        price: 150000,
        imageUrl: 'https://images.unsplash.com/photo-1615873968403-89e068629265?q=80&w=800&auto=format&fit=crop',
      },
      {
        name: 'Sprei Tencel Premium Luxury - Putih',
        description: 'Sprei kelas hotel bintang 5 berbahan organik Tencel. Sangat dingin di kulit dan hypoallergenic. Ukuran King (180x200).',
        price: 450000,
        imageUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800&auto=format&fit=crop',
      }
    ],
  });

  console.log('Seeding selesai! Data sprei berhasil dimasukkan.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });