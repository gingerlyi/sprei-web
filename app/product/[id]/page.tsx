// File: app/product/[id]/page.tsx
import { notFound } from "next/navigation";
import Link from "next/link";
import prisma from "../../../lib/prisma";
import ProductGallery from "./ProductGallery";

export const dynamic = "force-dynamic";

export default async function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const product = await prisma.product.findUnique({
    where: { id: resolvedParams.id },
  });

  if (!product) return notFound();

  const waNumber = "6281234567890"; // GANTI NOMOR WA
  const message = `Halo SpreiKu!\n\nSaya ingin memesan:\n*${product.name}*\nHarga: Rp${product.price.toLocaleString("id-ID")}\n\nApakah stoknya masih tersedia?`;
  const waLink = `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;
  const originalPrice = Math.round(product.price / 0.6);

  return (
    <main className="min-h-screen bg-white font-sans text-slate-900 selection:bg-gray-200">
      
      <header className="fixed w-full top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 transition-all">
        <div className="max-w-7xl mx-auto px-6 h-16 md:h-20 flex items-center justify-between">
          <Link href="/" className="text-2xl md:text-3xl font-black tracking-tighter uppercase">Sprei<span className="text-gray-400">Ku</span>.</Link>
          <nav className="hidden md:flex gap-8 text-sm font-medium">
            <Link href="/" className="hover:text-gray-500 transition-colors">Beranda</Link>
            <Link href="/katalog" className="hover:text-gray-500 transition-colors">Katalog</Link>
            <Link href="/#tentang-kami" className="hover:text-gray-500 transition-colors">Tentang Kami</Link>
          </nav>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 pt-28 pb-12">
        <div className="flex gap-2 text-sm text-gray-500 mb-10 font-medium items-center">
          <Link href="/" className="hover:text-black transition-colors">Beranda</Link> <span className="text-gray-300">&gt;</span> 
          <Link href="/katalog" className="hover:text-black transition-colors">Katalog</Link> <span className="text-gray-300">&gt;</span> 
          <span className="text-black">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
          
          <ProductGallery images={product.imageUrls} productName={product.name} />

          <div className="flex flex-col pt-2 lg:pt-0">
            {/* RATING DIHAPUS, MARGIN DISESUAIKAN */}
            <h1 className="text-4xl md:text-5xl lg:text-[2.75rem] font-black uppercase tracking-tighter mb-4 leading-none">{product.name}</h1>
            
            <div className="flex items-center gap-4 mb-6">
              <span className="text-3xl md:text-4xl font-bold">Rp{product.price.toLocaleString("id-ID")}</span>
              <span className="text-3xl md:text-4xl text-gray-300 font-bold line-through">Rp{originalPrice.toLocaleString("id-ID")}</span>
              <span className="bg-[#FF3333]/10 text-[#FF3333] px-4 py-1.5 rounded-full text-sm font-bold ml-2">-40%</span>
            </div>
            
            <p className="text-gray-500 text-base leading-relaxed pb-8 border-b border-gray-200">{product.description}</p>
            
            <div className="py-6 border-b border-gray-200">
              <h3 className="text-gray-500 mb-4 font-medium">Ukuran Tersedia</h3>
              <div className="flex flex-wrap gap-3">
                <div className="px-6 py-3 rounded-full bg-black text-white font-medium cursor-pointer uppercase text-sm">{product.size}</div>
              </div>
            </div>
            
            <div className="pt-6 mt-auto flex items-center gap-4">
              <div className="flex items-center justify-between bg-[#F0F0F0] rounded-full px-5 py-4 w-32 flex-shrink-0">
                <button className="text-2xl font-medium hover:text-gray-500 transition-colors">−</button><span className="font-medium">1</span><button className="text-2xl font-medium hover:text-gray-500 transition-colors">+</button>
              </div>
              <a href={waLink} target="_blank" className="flex-1 bg-black text-white py-4 rounded-full text-base font-medium flex items-center justify-center hover:bg-gray-800 hover:shadow-xl transition-all">Pesan Sekarang</a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}