// File: app/product/[id]/page.tsx
import { notFound } from "next/navigation";
import Link from "next/link";
import prisma from "../../../lib/prisma";
import ProductGallery from "./ProductGallery";
import Navbar from "../../Navbar";

export const dynamic = "force-dynamic";

export default async function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const product = await prisma.product.findUnique({
    where: { id: resolvedParams.id },
  });

  if (!product) return notFound();

  const waNumber = "6281234567890"; // GANTI NOMOR WA ANDA DI SINI
  const message = `Halo SpreiKu!\n\nSaya ingin memesan:\n*${product.name}*\nHarga: Rp${product.price.toLocaleString("id-ID")}\n\nApakah stoknya masih tersedia?`;
  const waLink = `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;

  // Menentukan apakah stok sudah habis
  const isOutOfStock = product.stock <= 0;

  return (
    <main className="min-h-screen bg-white font-sans text-slate-900 selection:bg-gray-200">
      
      {/* Memanggil Komponen Navbar Pintar */}
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 pt-24 pb-12">
        <div className="flex gap-2 text-[10px] text-gray-400 mb-8 font-bold items-center uppercase tracking-widest">
          <Link href="/" className="hover:text-black transition-colors">Beranda</Link> <span className="text-gray-300">&gt;</span> 
          <Link href="/katalog" className="hover:text-black transition-colors">Katalog</Link> <span className="text-gray-300">&gt;</span> 
          <span className="text-black">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          
          <ProductGallery images={product.imageUrls} productName={product.name} />

          <div className="flex flex-col pt-1 lg:pt-0">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-black uppercase tracking-tighter mb-3 leading-none text-black">
              {product.name}
            </h1>
            
            <div className="flex items-center gap-4 mb-4">
              <span className="text-2xl md:text-3xl font-bold text-black">
                Rp{product.price.toLocaleString("id-ID")}
              </span>
            </div>

            {/* INDIKATOR STOK BARANG */}
            <div className="mb-6">
              {isOutOfStock ? (
                <span className="bg-red-50 border border-red-200 text-red-600 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-widest inline-flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-600"></span> Stok Habis
                </span>
              ) : (
                <span className="text-sm font-medium text-gray-600">
                  Tersedia: <span className="font-bold text-black">{product.stock} stok</span>
                </span>
              )}
            </div>
            
            <p className="text-gray-500 text-sm leading-relaxed pb-6 border-b border-gray-200">
              {product.description}
            </p>
            
            <div className="py-5 border-b border-gray-200">
              <h3 className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-3">Ukuran Terpilih</h3>
              <div className="flex flex-wrap gap-2">
                <div className="px-5 py-2.5 rounded-xl border-2 border-black bg-white text-black font-bold uppercase text-xs shadow-sm">
                  {product.size}
                </div>
              </div>
            </div>
            
            <div className="pt-6 mt-auto flex items-center gap-3">
              <div className="flex items-center justify-between bg-[#F0F0F0] rounded-xl px-4 py-3.5 w-28 flex-shrink-0">
                <button className="text-xl font-medium hover:text-gray-500 transition-colors">−</button>
                <span className="text-sm font-bold">1</span>
                <button className="text-xl font-medium hover:text-gray-500 transition-colors">+</button>
              </div>
              
              {/* LOGIKA TOMBOL MATI JIKA STOK KOSONG */}
              {isOutOfStock ? (
                <button disabled className="flex-1 bg-gray-100 text-gray-400 py-3.5 rounded-xl text-sm font-bold flex items-center justify-center cursor-not-allowed">
                  Barang Kosong
                </button>
              ) : (
                <a href={waLink} target="_blank" className="flex-1 bg-black text-white py-3.5 rounded-xl text-sm font-bold flex items-center justify-center hover:bg-gray-800 hover:shadow-xl transition-all">
                  Pesan Sekarang
                </a>
              )}
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}