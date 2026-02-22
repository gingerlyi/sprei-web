// File: app/page.tsx
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-white font-sans text-slate-900 selection:bg-gray-200 scroll-smooth">
      
      {/* NAVBAR MELAYANG (SAMA UNTUK SEMUA HALAMAN) */}
      <header className="fixed w-full top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 transition-all">
        <div className="max-w-7xl mx-auto px-6 h-16 md:h-20 flex items-center justify-between">
          <Link href="/" className="text-2xl md:text-3xl font-black tracking-tighter uppercase">
            Sprei<span className="text-gray-400">Ku</span>.
          </Link>
          <nav className="hidden md:flex gap-8 text-sm font-medium">
            <Link href="/" className="font-bold border-b-2 border-black pb-1">Beranda</Link>
            <Link href="/katalog" className="hover:text-gray-500 transition-colors">Katalog</Link>
            <Link href="/#tentang-kami" className="hover:text-gray-500 transition-colors">Tentang Kami</Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden text-center bg-[#F2F0F1]">
        <div className="relative max-w-7xl mx-auto px-6">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter mb-6 leading-none text-black">
            Kenyamanan Tidur <br className="hidden md:block"/> Tanpa Kompromi
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-10 font-medium leading-relaxed">
            Hadirkan nuansa hotel bintang 5 langsung di kamar Anda. Terbuat dari serat pilihan yang ekstra lembut, sejuk, dan memanjakan kulit.
          </p>
          <Link href="/katalog" className="inline-flex items-center justify-center px-10 py-4 bg-black text-white font-medium rounded-full hover:bg-gray-800 transition-all">
            Lihat Koleksi Sprei
          </Link>
        </div>
      </section>

      {/* Bagian Tentang Kami */}
      <section id="tentang-kami" className="py-24 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h3 className="text-gray-400 font-bold tracking-widest uppercase text-sm mb-3">Tentang SpreiKu</h3>
              <h4 className="text-3xl md:text-4xl font-black uppercase tracking-tighter mb-6 leading-tight">
                Dedikasi Kami untuk <br/> Kualitas Tidur Anda
              </h4>
              <p className="text-gray-500 text-lg mb-6 leading-relaxed">
                SpreiKu berawal dari sebuah kepercayaan sederhana: hari yang produktif dimulai dari tidur yang nyenyak. Oleh karena itu, kami berkomitmen untuk menghadirkan perlengkapan tidur dengan material premium yang tidak hanya cantik dipandang, tetapi juga memeluk Anda dengan kelembutan.
              </p>
              <div className="grid grid-cols-2 gap-6 mt-8">
                <div className="bg-[#F0EEED] p-6 rounded-3xl">
                  <h5 className="font-bold text-black mb-2 uppercase tracking-tight">Bahan Premium</h5>
                  <p className="text-sm text-gray-500">Terbuat dari katun dan serat pilihan berkualitas tinggi.</p>
                </div>
                <div className="bg-[#F0EEED] p-6 rounded-3xl">
                  <h5 className="font-bold text-black mb-2 uppercase tracking-tight">Ekstra Sejuk</h5>
                  <p className="text-sm text-gray-500">Material breathable yang menyerap keringat dengan sempurna.</p>
                </div>
              </div>
            </div>
            <div className="bg-[#F0EEED] rounded-[2.5rem] p-12 aspect-square flex flex-col justify-center items-center text-center">
               <h5 className="text-3xl font-black uppercase tracking-tighter mb-4 text-black">Investasi Tidur</h5>
               <p className="text-gray-500 leading-relaxed italic">
                 "Tidur yang nyaman bukanlah sebuah kemewahan, melainkan kebutuhan dasar untuk hidup yang lebih produktif."
               </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-12">
        <div className="max-w-7xl mx-auto px-6 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} SpreiKu. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}