import { PrismaClient } from "@prisma/client";
import { notFound } from "next/navigation";
import Link from "next/link";

export const dynamic = "force-dynamic";
const prisma = new PrismaClient();

export default async function ProductDetail({ params }: { params: { id: string } }) {
  // Ambil data produk berdasarkan ID yang diklik
  const product = await prisma.product.findUnique({
    where: { id: params.id },
  });

  // Jika produk tidak ditemukan, arahkan ke halaman 404
  if (!product) {
    return notFound();
  }

  // --- SETTING WHATSAPP ---
  // GANTI NOMOR DI BAWAH INI DENGAN NOMOR WA ANDA (Gunakan kode negara 62)
  const waNumber = "6281234567890"; 
  const message = `Halo SpreiKu! 🌙\n\nSaya tertarik untuk memesan:\n*${product.name}*\nHarga: Rp${product.price.toLocaleString("id-ID")}\n\nApakah stok dan ukuran yang saya butuhkan masih tersedia?`;
  const waLink = `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;
  
  // Membuat harga coret (diskon palsu 20% untuk estetika marketing)
  const coretPrice = product.price * 1.2;

  return (
    <main className="min-h-screen bg-white font-sans text-slate-900 selection:bg-indigo-200 selection:text-indigo-900">
      
      {/* Navbar Minimalis */}
      <header className="w-full border-b border-slate-200 py-6">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <Link href="/" className="text-2xl font-black tracking-tight">
            Sprei<span className="text-indigo-600">Ku</span>
          </Link>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Breadcrumb Navigation */}
        <div className="flex gap-2 text-sm text-slate-500 mb-10 font-medium">
          <Link href="/" className="hover:text-indigo-600 transition-colors">Beranda</Link> 
          <span>&gt;</span> 
          <Link href="/#katalog" className="hover:text-indigo-600 transition-colors">Katalog Sprei</Link> 
          <span>&gt;</span> 
          <span className="text-slate-900 font-bold">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Kolom Kiri: Galeri Gambar (Sesuai Desain Referensi) */}
          <div className="flex flex-col md:flex-row-reverse gap-6">
            {/* Gambar Utama */}
            <div className="flex-1 bg-[#F5F5F5] rounded-3xl overflow-hidden aspect-[4/5] md:aspect-auto md:h-[600px] flex items-center justify-center relative">
              <img src={product.imageUrl} alt={product.name} className="object-cover w-full h-full mix-blend-multiply" />
            </div>
            
            {/* Thumbnail Samping (Efek Visual) */}
            <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-visible pb-2 md:pb-0">
              <div className="w-24 h-24 md:w-32 md:h-32 bg-[#F5F5F5] rounded-2xl overflow-hidden border-2 border-slate-900 flex-shrink-0 cursor-pointer">
                <img src={product.imageUrl} className="object-cover w-full h-full mix-blend-multiply" />
              </div>
              <div className="w-24 h-24 md:w-32 md:h-32 bg-[#F5F5F5] rounded-2xl overflow-hidden border border-slate-200 opacity-60 hover:opacity-100 flex-shrink-0 cursor-pointer transition-opacity">
                <img src={product.imageUrl} className="object-cover w-full h-full mix-blend-multiply scale-110" />
              </div>
            </div>
          </div>

          {/* Kolom Kanan: Detail Produk */}
          <div className="flex flex-col pt-4">
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-4">
              {product.name}
            </h1>
            
            {/* Bintang Rating (Visual) */}
            <div className="flex items-center gap-2 mb-6">
              <div className="flex text-[#FFC107] text-xl">
                ★★★★★
              </div>
              <span className="text-slate-500 text-sm font-medium">5.0 / 5 Terjual 100+</span>
            </div>

            {/* Harga & Diskon */}
            <div className="flex items-end gap-4 mb-8">
              <span className="text-4xl font-black">Rp{product.price.toLocaleString("id-ID")}</span>
              <span className="text-2xl text-slate-400 font-medium line-through mb-1">Rp{coretPrice.toLocaleString("id-ID")}</span>
              <span className="bg-[#FFEAEA] text-[#FF4B4B] px-3 py-1 rounded-full text-sm font-bold mb-2">-20%</span>
            </div>

            <p className="text-slate-600 text-lg leading-relaxed mb-10 pb-10 border-b border-slate-200">
              {product.description} <br/><br/>
              Dibuat dari material pilihan yang memastikan sirkulasi udara optimal, memberikan pengalaman tidur yang lebih sejuk dan nyaman sepanjang malam.
            </p>

            {/* Opsi Ukuran (Visual Interaktif) */}
            <div className="mb-10">
              <h3 className="text-slate-500 text-sm mb-4 font-bold">Pilih Ukuran</h3>
              <div className="flex flex-wrap gap-3">
                <div className="px-6 py-3 rounded-full border border-slate-200 text-slate-500 font-bold hover:border-slate-900 cursor-pointer transition-all">Single 100x200</div>
                <div className="px-6 py-3 rounded-full border border-slate-200 text-slate-500 font-bold hover:border-slate-900 cursor-pointer transition-all">Queen 160x200</div>
                <div className="px-6 py-3 rounded-full bg-slate-900 text-white font-bold cursor-pointer shadow-md">King 180x200</div>
                <div className="px-6 py-3 rounded-full border border-slate-200 text-slate-500 font-bold hover:border-slate-900 cursor-pointer transition-all">Extra King 200x200</div>
              </div>
            </div>

            {/* Tombol Pemesanan Besar */}
            <div className="mt-auto">
              <a 
                href={waLink} 
                target="_blank" 
                className="w-full flex items-center justify-center bg-slate-900 text-white py-5 rounded-full text-xl font-bold hover:bg-slate-800 hover:shadow-xl hover:-translate-y-1 transition-all"
              >
                Pesan Sekarang via WA
              </a>
              <p className="text-center text-slate-400 text-sm mt-4 font-medium">
                Pemesanan aman dan langsung diproses oleh admin.
              </p>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}