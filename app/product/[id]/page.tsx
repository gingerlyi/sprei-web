// File: app/product/[id]/page.tsx
import { notFound } from "next/navigation";
import Link from "next/link";
import prisma from "../../../lib/prisma";

export const dynamic = "force-dynamic";

export default async function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;

  const product = await prisma.product.findUnique({
    where: { id: resolvedParams.id },
  });

  if (!product) {
    return notFound();
  }

  // --- SETTING WHATSAPP ---
  const waNumber = "6281234567890"; // GANTI DENGAN NOMOR WA ANDA
  const message = `Halo SpreiKu!\n\nSaya ingin memesan:\n*${product.name}*\nHarga: Rp${product.price.toLocaleString("id-ID")}\n\nApakah stoknya masih tersedia?`;
  const waLink = `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;
  
  const originalPrice = Math.round(product.price / 0.6);

  return (
    <main className="min-h-screen bg-white font-sans text-slate-900 selection:bg-gray-200">
      
      {/* NAVBAR MELAYANG (SAMA UNTUK SEMUA HALAMAN) */}
      <header className="fixed w-full top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 transition-all">
        <div className="max-w-7xl mx-auto px-6 h-16 md:h-20 flex items-center justify-between">
          <Link href="/" className="text-2xl md:text-3xl font-black tracking-tighter uppercase">
            Sprei<span className="text-gray-400">Ku</span>.
          </Link>
          <nav className="hidden md:flex gap-8 text-sm font-medium">
            <Link href="/" className="hover:text-gray-500 transition-colors">Beranda</Link>
            <Link href="/katalog" className="hover:text-gray-500 transition-colors">Katalog</Link>
            <Link href="/#tentang-kami" className="hover:text-gray-500 transition-colors">Tentang Kami</Link>
          </nav>
        </div>
      </header>

      {/* Konten Detail Produk - Ditambahkan pt-28 agar tidak tertutup navbar */}
      <div className="max-w-7xl mx-auto px-6 pt-28 pb-12">
        
        <div className="flex gap-2 text-sm text-gray-500 mb-10 font-medium items-center">
          <Link href="/" className="hover:text-black transition-colors">Beranda</Link> 
          <span className="text-gray-300">&gt;</span> 
          <Link href="/katalog" className="hover:text-black transition-colors">Katalog</Link> 
          <span className="text-gray-300">&gt;</span> 
          <span className="text-black">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
          
          {/* KOLOM KIRI */}
          <div className="flex flex-col-reverse lg:flex-row gap-4 lg:gap-6 h-auto lg:h-[600px]">
            <div className="flex lg:flex-col gap-4 overflow-x-auto lg:overflow-y-auto w-full lg:w-36 flex-shrink-0 hide-scrollbar">
              <div className="w-24 h-24 lg:w-full lg:h-36 bg-[#F0EEED] rounded-2xl overflow-hidden border-2 border-black flex-shrink-0 cursor-pointer">
                <img src={product.imageUrl} className="object-cover w-full h-full mix-blend-multiply" alt={`Thumbnail 1 ${product.name}`} />
              </div>
              <div className="w-24 h-24 lg:w-full lg:h-36 bg-[#F0EEED] rounded-2xl overflow-hidden border border-transparent hover:border-gray-300 flex-shrink-0 cursor-pointer transition-colors opacity-70 hover:opacity-100">
                <img src={product.imageUrl} className="object-cover w-full h-full mix-blend-multiply scale-105" alt={`Thumbnail 2 ${product.name}`} />
              </div>
            </div>

            <div className="flex-1 bg-[#F0EEED] rounded-[2rem] overflow-hidden relative flex items-center justify-center">
              <img src={product.imageUrl} alt={product.name} className="object-cover w-full h-full mix-blend-multiply" />
            </div>
          </div>

          {/* KOLOM KANAN */}
          <div className="flex flex-col pt-2 lg:pt-0">
            <h1 className="text-4xl md:text-5xl lg:text-[2.75rem] font-black uppercase tracking-tighter mb-3 leading-none">
              {product.name}
            </h1>
            
            <div className="flex items-center gap-3 mb-6">
              <div className="flex text-[#FFC633] text-xl tracking-widest">
                ★★★★<span className="text-[#FFC633]/50">★</span>
              </div>
              <span className="text-gray-500 text-sm md:text-base">4.5/<span className="text-gray-400">5</span></span>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <span className="text-3xl md:text-4xl font-bold">Rp{product.price.toLocaleString("id-ID")}</span>
              <span className="text-3xl md:text-4xl text-gray-300 font-bold line-through">Rp{originalPrice.toLocaleString("id-ID")}</span>
              <span className="bg-[#FF3333]/10 text-[#FF3333] px-4 py-1.5 rounded-full text-sm font-bold ml-2">
                -40%
              </span>
            </div>

            <p className="text-gray-500 text-base leading-relaxed pb-8 border-b border-gray-200">
              {product.description || "Sprei premium ini sempurna untuk melengkapi kenyamanan tidur Anda. Dibuat dari bahan yang lembut dan bersirkulasi udara dengan baik."}
            </p>

            <div className="py-6 border-b border-gray-200">
              <h3 className="text-gray-500 mb-4 font-medium">Ukuran Tersedia</h3>
              <div className="flex flex-wrap gap-3">
                <div className="px-6 py-3 rounded-full bg-black text-white font-medium cursor-pointer uppercase text-sm">
                  {product.size}
                </div>
              </div>
            </div>

            <div className="pt-6 mt-auto flex items-center gap-4">
              <div className="flex items-center justify-between bg-[#F0F0F0] rounded-full px-5 py-4 w-32 flex-shrink-0">
                <button className="text-2xl font-medium hover:text-gray-500 transition-colors">−</button>
                <span className="font-medium">1</span>
                <button className="text-2xl font-medium hover:text-gray-500 transition-colors">+</button>
              </div>

              <a 
                href={waLink} 
                target="_blank" 
                className="flex-1 bg-black text-white py-4 rounded-full text-base font-medium flex items-center justify-center hover:bg-gray-800 hover:shadow-xl transition-all"
              >
                Pesan Sekarang
              </a>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}