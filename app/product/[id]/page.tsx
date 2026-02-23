// File: app/product/[id]/page.tsx
import Link from "next/link";
import { notFound } from "next/navigation";
import prisma from "../../../lib/prisma";
import Navbar from "../../Navbar";
import ProductGallery from "./ProductGallery";

export const dynamic = "force-dynamic";

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  
  const product = await prisma.product.findUnique({
    where: { id: resolvedParams.id },
  });

  if (!product) {
    notFound();
  }

  // Pengaturan WhatsApp
  const waNumber = "6281234567890"; // Ganti dengan nomor asli Anda
  const waMessage = `Halo SpreiKu! Saya tertarik dengan produk ini:%0A%0A*${product.name}*%0AUkuran: ${product.size.toUpperCase()}%0AHarga: Rp${product.price.toLocaleString("id-ID")}%0A%0AApakah stoknya masih tersedia?`;
  const waLink = `https://wa.me/${waNumber}?text=${waMessage}`;

  // Daftar semua ukuran standar yang ada di toko Anda
  const allSizes = ['single', 'queen', 'king', 'extra king'];

  return (
    <main className="min-h-screen bg-[#F5F5F5] font-sans text-slate-900 selection:bg-violet-200">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 md:px-6 pt-24 pb-20">
        
        <div className="flex gap-2 text-[10px] text-gray-500 mb-6 font-medium items-center uppercase tracking-widest">
          <Link href="/" className="hover:text-violet-600 transition-colors">Beranda</Link> 
          <span className="text-gray-300">&gt;</span> 
          <Link href="/katalog" className="hover:text-violet-600 transition-colors">Katalog</Link> 
          <span className="text-gray-300">&gt;</span> 
          <span className="text-violet-700 font-bold">{product.name.substring(0, 20)}...</span>
        </div>

        <div className="bg-white rounded-[2rem] p-5 md:p-8 shadow-sm border border-gray-100 flex flex-col lg:flex-row gap-8 lg:gap-12">
          
          <div className="w-full lg:w-1/2 flex-shrink-0">
            <ProductGallery images={product.imageUrls} productName={product.name} />
          </div>

          <div className="w-full lg:w-1/2 flex flex-col pt-2">
            
            {/* Label Kategori */}
            <div className="flex gap-2 mb-4">
              <span className="bg-violet-50 border border-violet-100 px-3 py-1.5 rounded-md text-[10px] font-bold text-violet-700 uppercase tracking-widest">
                Kategori: {product.category}
              </span>
            </div>

            {/* Nama & Harga Produk */}
            <h1 className="text-2xl md:text-4xl font-black uppercase tracking-tighter mb-4 leading-[1.1] text-gray-900">
              {product.name}
            </h1>
            <div className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-700 to-fuchsia-600 mb-6">
              Rp{product.price.toLocaleString("id-ID")}
            </div>

            <hr className="border-gray-100 mb-6" />

            {/* ========================================== */}
            {/* VARIAN UKURAN (Semua tampil, hanya 1 yg aktif) */}
            {/* ========================================== */}
            <div className="mb-8">
              <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Pilih Ukuran</h3>
              <div className="flex flex-wrap gap-2.5">
                {allSizes.map((s) => {
                  // Cek apakah ukuran ini sama dengan ukuran asli produk di database
                  const isActive = product.size.toLowerCase() === s;
                  
                  return (
                    <div 
                      key={s} 
                      className={`px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-widest border transition-all ${
                        isActive 
                          ? 'border-violet-600 bg-violet-50 text-violet-700 ring-1 ring-violet-600 shadow-sm' // Style jika aktif
                          : 'border-gray-200 text-gray-400 bg-[#F8F8F8] opacity-60 cursor-not-allowed'         // Style jika tidak aktif/kosong
                      }`}
                    >
                      {s}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Info Stok & Kualitas */}
            <div className="flex flex-col gap-3 mb-8">
               <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-violet-50 flex items-center justify-center text-violet-600">📦</div>
                  <div className="text-xs font-bold text-gray-600 uppercase tracking-widest">
                    Stok Tersedia: <span className={product.stock > 0 ? "text-violet-600" : "text-red-500"}>{product.stock > 0 ? product.stock : "Habis"}</span>
                  </div>
               </div>
               <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-fuchsia-50 flex items-center justify-center text-fuchsia-600">✨</div>
                  <div className="text-xs font-bold text-gray-600 uppercase tracking-widest">Bahan Premium & Ekstra Sejuk</div>
               </div>
            </div>

            {/* Deskripsi Produk */}
            <div className="mb-8 flex-grow">
              <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Deskripsi Lengkap</h3>
              <div className="text-sm text-gray-600 leading-relaxed whitespace-pre-wrap">
                {product.description}
              </div>
            </div>

            {/* Tombol Pesan via WhatsApp */}
            <a 
              href={product.stock > 0 ? waLink : "#"} 
              target={product.stock > 0 ? "_blank" : "_self"}
              rel="noopener noreferrer"
              className={`w-full py-4 rounded-xl font-bold text-sm uppercase tracking-widest flex items-center justify-center gap-2 transition-all ${
                product.stock > 0 
                  ? "bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 text-white shadow-[0_10px_20px_rgba(124,58,237,0.2)] hover:shadow-[0_15px_25px_rgba(124,58,237,0.3)] hover:-translate-y-1" 
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
              {product.stock > 0 ? "Pesan via WhatsApp" : "Stok Habis"}
            </a>
            
            <p className="text-center text-[9px] text-gray-400 mt-3 font-medium">
              Klik tombol di atas untuk mengonfirmasi pesanan dengan admin kami.
            </p>

          </div>
        </div>
      </div>
    </main>
  );
}