import { PrismaClient, Product } from "@prisma/client";
import WhatsAppButton from "../src/components/WhatsAppButton";

const prisma = new PrismaClient();

export default async function Home() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="min-h-screen bg-slate-50 font-sans selection:bg-emerald-200 selection:text-emerald-900">
      
      {/* 1. Navbar Premium */}
      <header className="fixed w-full top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-slate-200/50 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/30">
              <span className="text-white font-bold text-xl">S</span>
            </div>
            <h1 className="text-2xl font-black text-slate-800 tracking-tight">
              Sprei<span className="text-emerald-600">Ku</span>
            </h1>
          </div>
          <nav className="hidden md:flex gap-8 text-sm font-bold text-slate-600">
            <a href="#" className="hover:text-emerald-600 transition-colors">Beranda</a>
            <a href="#katalog" className="hover:text-emerald-600 transition-colors">Katalog</a>
            <a href="#" className="hover:text-emerald-600 transition-colors">Tentang Kami</a>
          </nav>
        </div>
      </header>

      {/* 2. Hero Section (Banner Utama) */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Dekorasi Background */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl">
          <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
          <div className="absolute top-20 right-10 w-72 h-72 bg-teal-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <span className="inline-block py-1.5 px-4 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-bold mb-6 tracking-wide shadow-sm">
            ✨ Koleksi Terbaru
          </span>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 mb-6 tracking-tight leading-tight">
            Tidur Lebih Nyenyak <br className="hidden md:block"/> dengan <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">Sprei Premium</span>
          </h2>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-10 font-medium leading-relaxed">
            Hadirkan kenyamanan hotel bintang 5 ke kamar Anda. Terbuat dari bahan pilihan yang super lembut, adem, dan anti luntur.
          </p>
          <a href="#katalog" className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white transition-all bg-slate-900 rounded-full hover:bg-slate-800 hover:shadow-xl hover:shadow-slate-900/20 hover:-translate-y-1">
            Lihat Katalog Sekarang
            <svg className="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
          </a>
        </div>
      </section>

      {/* 3. Grid Katalog Produk */}
      <section id="katalog" className="py-20 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <h3 className="text-3xl font-black text-slate-900">Katalog Produk</h3>
              <p className="text-slate-500 mt-2 font-medium">Pilih motif dan ukuran favorit Anda</p>
            </div>
            <div className="text-sm font-bold text-slate-400 bg-slate-50 px-4 py-2 rounded-lg border border-slate-100">
              Menampilkan {products.length} produk
            </div>
          </div>

          {products.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
              <span className="text-6xl mb-4">🛏️</span>
              <p className="text-slate-500 text-xl font-bold">Katalog masih kosong.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {products.map((product: Product) => (
                <div
                  key={product.id}
                  className="group flex flex-col bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500 overflow-hidden hover:-translate-y-2"
                >
                  {/* Gambar Produk */}
                  <div className="relative aspect-[4/5] overflow-hidden bg-slate-100">
                    <div className="absolute top-4 left-4 z-10 flex gap-2">
                      <span className={`px-3 py-1 text-xs font-black tracking-wider uppercase rounded-full shadow-md backdrop-blur-md ${product.isAvailable ? 'bg-white/90 text-emerald-700' : 'bg-red-500/90 text-white'}`}>
                        {product.isAvailable ? "Tersedia" : "Habis"}
                      </span>
                    </div>
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                  
                  {/* Detail Produk */}
                  <div className="p-6 flex flex-col flex-grow">
                    <h4 className="text-xl font-bold text-slate-800 mb-2 leading-tight group-hover:text-emerald-600 transition-colors">
                      {product.name}
                    </h4>
                    <p className="text-slate-500 text-sm mb-6 line-clamp-2 leading-relaxed flex-grow">
                      {product.description}
                    </p>
                    
                    <div className="mt-auto pt-4 border-t border-slate-100">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-sm font-bold text-slate-400">Harga Spesial</span>
                        <span className="text-2xl font-black text-emerald-600">
                          Rp{product.price.toLocaleString("id-ID")}
                        </span>
                      </div>
                      <WhatsAppButton
                        productName={product.name}
                        productPrice={product.price}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 4. Footer Simple */}
      <footer className="bg-slate-900 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 text-center md:flex md:justify-between md:text-left">
          <div>
            <h2 className="text-2xl font-black text-white tracking-tight mb-2">
              Sprei<span className="text-emerald-500">Ku</span>
            </h2>
            <p className="text-slate-400 text-sm">Kenyamanan tidur Anda adalah prioritas kami.</p>
          </div>
          <div className="mt-6 md:mt-0 text-slate-400 text-sm flex flex-col justify-end">
            <p>&copy; {new Date().getFullYear()} SpreiKu. All rights reserved.</p>
            <p className="mt-1">Pemesanan via WhatsApp 100% Aman & Terpercaya.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}