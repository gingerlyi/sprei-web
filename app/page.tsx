import { PrismaClient } from "@prisma/client";
import WhatsAppButton from "../src/components/WhatsAppButton";

// Baris krusial untuk kestabilan Vercel dan sinkronisasi database
export const dynamic = "force-dynamic";

const prisma = new PrismaClient();

export default async function Home() {
  // Mengambil data produk dari database, diurutkan dari yang terbaru
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="min-h-screen bg-slate-50 font-sans selection:bg-indigo-200 selection:text-indigo-900 scroll-smooth">
      
      {/* 1. Navbar Premium (Warna Indigo) */}
      <header className="fixed w-full top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-slate-200/50 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
              <span className="text-white font-bold text-xl">S</span>
            </div>
            <h1 className="text-2xl font-black text-slate-800 tracking-tight">
              Sprei<span className="text-indigo-600">Ku</span>
            </h1>
          </div>
          <nav className="hidden md:flex gap-8 text-sm font-bold text-slate-600">
            <a href="#" className="hover:text-indigo-600 transition-colors">Beranda</a>
            <a href="#katalog" className="hover:text-indigo-600 transition-colors">Katalog</a>
            <a href="#tentang-kami" className="hover:text-indigo-600 transition-colors">Tentang Kami</a>
          </nav>
        </div>
      </header>

      {/* 2. Hero Section (Banner Utama - Nuansa Tidur) */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden text-center">
        {/* Dekorasi Background Cahaya Lembut */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl -z-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
          <div className="absolute top-20 right-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6">
          <span className="inline-block py-1.5 px-4 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-sm font-bold mb-6 tracking-wide shadow-sm">
            ✨ Koleksi Premium 2026
          </span>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 mb-6 tracking-tight leading-tight">
            Tidur Nyenyak dengan <br className="hidden md:block"/> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500">
              Kenyamanan Sempurna
            </span>
          </h2>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-10 font-medium leading-relaxed">
            Hadirkan nuansa hotel bintang 5 langsung di kamar Anda. Terbuat dari serat pilihan yang ekstra lembut, sejuk, dan memanjakan kulit.
          </p>
          <a href="#katalog" className="inline-flex items-center justify-center px-8 py-4 bg-slate-900 text-white font-bold rounded-full hover:bg-slate-800 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/20 transition-all">
            Lihat Koleksi Sprei
          </a>
        </div>
      </section>

      {/* 3. Grid Katalog Produk */}
      <section id="katalog" className="py-20 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <h3 className="text-3xl font-black text-slate-900">Katalog Produk</h3>
              <p className="text-slate-500 mt-2 font-medium">Temukan motif dan ukuran yang paling pas untuk kasur Anda</p>
            </div>
            <div className="text-sm font-bold text-slate-400 bg-slate-50 px-4 py-2 rounded-lg border border-slate-100">
              Tersedia {products.length} pilihan
            </div>
          </div>

          {products.length === 0 ? (
            <div className="p-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200 text-center flex flex-col items-center justify-center">
              <span className="text-6xl mb-4">🛏️</span>
              <p className="text-slate-500 text-xl font-bold">Katalog saat ini sedang diperbarui.</p>
            </div>
          ) : (
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {products.map((product) => (
                <div key={product.id} className="group flex flex-col bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-2xl hover:shadow-indigo-100/50 transition-all duration-500 hover:-translate-y-2">
                  <div className="relative aspect-[4/5] bg-slate-100 overflow-hidden">
                    <img src={product.imageUrl} alt={product.name} className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-700 ease-in-out" />
                    {/* Efek gelap saat di-hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h4 className="text-xl font-bold text-slate-800 mb-2 leading-tight group-hover:text-indigo-600 transition-colors">{product.name}</h4>
                    <p className="text-slate-500 text-sm mb-6 line-clamp-2 leading-relaxed flex-grow">{product.description}</p>
                    <div className="mt-auto pt-4 border-t border-slate-100">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-sm font-bold text-slate-400">Harga Spesial</span>
                        <span className="text-2xl font-black text-indigo-600">
                          Rp{product.price.toLocaleString("id-ID")}
                        </span>
                      </div>
                      <WhatsAppButton productName={product.name} productPrice={product.price} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 4. Bagian Tentang Kami (Elegan & Modern) */}
      <section id="tentang-kami" className="py-24 bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Bagian Teks */}
            <div>
              <h3 className="text-indigo-600 font-bold tracking-wide uppercase text-sm mb-3">Tentang SpreiKu</h3>
              <h4 className="text-3xl md:text-4xl font-black text-slate-900 mb-6 leading-tight">
                Dedikasi Kami untuk <br/> Kualitas Tidur Anda
              </h4>
              <p className="text-slate-600 text-lg mb-6 leading-relaxed">
                SpreiKu berawal dari sebuah kepercayaan sederhana: hari yang produktif dimulai dari tidur yang nyenyak. Oleh karena itu, kami berkomitmen untuk menghadirkan perlengkapan tidur dengan material premium yang tidak hanya cantik dipandang, tetapi juga memeluk Anda dengan kelembutan.
              </p>
              <p className="text-slate-600 text-lg mb-8 leading-relaxed">
                Setiap detail dan jahitan dikerjakan dengan tingkat ketelitian tinggi. Menggunakan bahan pilihan yang sejuk dan anti-luntur, koleksi kami dirancang untuk menemani waktu istirahat Anda selama bertahun-tahun.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 hover:border-indigo-200 transition-colors">
                  <span className="text-3xl mb-3 block">🧵</span>
                  <h5 className="font-bold text-slate-800 mb-1">Bahan Premium</h5>
                  <p className="text-sm text-slate-500">Terbuat dari katun dan serat pilihan berkualitas tinggi.</p>
                </div>
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 hover:border-indigo-200 transition-colors">
                  <span className="text-3xl mb-3 block">❄️</span>
                  <h5 className="font-bold text-slate-800 mb-1">Ekstra Sejuk</h5>
                  <p className="text-sm text-slate-500">Material breathable yang menyerap keringat dengan sempurna.</p>
                </div>
              </div>
            </div>
            
            {/* Bagian Visual (Aesthetic Card) */}
            <div className="relative mt-10 lg:mt-0 lg:ml-10">
              {/* Background miring untuk efek estetik */}
              <div className="absolute -inset-4 bg-indigo-100 rounded-[3rem] transform rotate-3 -z-10 transition-transform hover:rotate-6 duration-500"></div>
              <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl border border-white relative overflow-hidden aspect-square flex flex-col justify-center items-center text-center">
                <div className="w-24 h-24 bg-indigo-50 rounded-full flex items-center justify-center mb-6">
                  <span className="text-5xl">🌙</span>
                </div>
                <h5 className="text-2xl font-black text-slate-800 mb-4">Investasi Tidur Anda</h5>
                <p className="text-slate-500 leading-relaxed max-w-sm italic">
                  "Tidur yang nyaman bukanlah sebuah kemewahan, melainkan kebutuhan dasar untuk hidup yang lebih produktif, sehat, dan bahagia."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Footer */}
      <footer className="bg-slate-900 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 text-center md:flex md:justify-between md:text-left">
          <div>
            <h2 className="text-2xl font-black text-white mb-2">Sprei<span className="text-indigo-400">Ku</span></h2>
            <p className="text-slate-400 text-sm">Kenyamanan tidur Anda adalah prioritas kami.</p>
          </div>
          <div className="mt-6 md:mt-0 text-slate-400 text-sm flex flex-col justify-end">
            <p>&copy; {new Date().getFullYear()} SpreiKu. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}