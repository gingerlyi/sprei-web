// File: src/app/page.tsx
import Link from "next/link";
import Navbar from "./Navbar";
import Typewriter from "../src/components/Typewriter";

export default function Home() {
  return (
    <main className="min-h-screen bg-white font-sans text-slate-900 selection:bg-violet-200 scroll-smooth">
      <Navbar />

      {/* ========================================== */}
      {/* 1. HERO SECTION (TEMA UNGU GRADASI) */}
      {/* ========================================== */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden text-center">
        {/* Soft Purple Background Gradient */}
        <div className="absolute inset-0 -z-10 h-full w-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-violet-100 via-fuchsia-50/50 to-white"></div>
        
        <div className="relative max-w-7xl mx-auto px-6">
          {/* Badge Buatan Lokal */}
          <div className="inline-flex items-center gap-1.5 mb-8 px-6 py-2.5 rounded-full bg-gradient-to-r from-violet-50/80 to-fuchsia-50/80 backdrop-blur-md border border-violet-200/50 shadow-sm group hover:scale-105 transition-all duration-300 ring-1 ring-white/50">
            <span className="text-base animate-pulse">✨</span>
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] bg-clip-text text-transparent bg-gradient-to-r from-violet-600 via-fuchsia-500 to-indigo-600">
              Buatan Lokal
            </span>
          </div>

          {/* JUDUL DENGAN EFEK GELOMBANG CAHAYA UNGU GRADASI */}
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-serif font-bold uppercase tracking-tight mb-6 leading-[1.1] text-gray-900">
            <span className="block mb-2">Kenyamanan Tidur</span>
            
            <span className="relative inline-block overflow-hidden pb-2">
              <span className="bg-gradient-to-r from-indigo-700 via-violet-400 to-fuchsia-700 bg-[length:200%_100%] bg-clip-text text-transparent animate-shimmer italic px-2">
                Tanpa Kompromi
              </span>
            </span>
          </h2>
          
          <p className="text-sm md:text-base text-gray-500 max-w-2xl mx-auto mb-10 font-medium leading-relaxed font-sans">
            Hadirkan nuansa hotel bintang 5 langsung di kamar Anda. Terbuat dari serat pilihan yang ekstra lembut, sejuk, dan memanjakan kulit.
          </p>
          
          <Link href="/katalog" className="inline-flex items-center justify-center px-8 py-4 text-sm font-bold text-white rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 shadow-lg shadow-violet-200 transition-all transform hover:-translate-y-1 font-sans">
            Jelajahi Katalog Sprei
          </Link>
        </div>
      </section>

      {/* ========================================== */}
      {/* 2. EDITORIAL LOOKBOOK SECTION */}
      {/* ========================================== */}
      <section className="py-20 lg:py-32 bg-white relative border-t border-gray-50">
        <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-gray-100 -translate-x-1/2"></div>
        
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            
            <div className="flex flex-col">
              <div className="w-full aspect-[4/5] md:aspect-[3/4] rounded-sm overflow-hidden bg-gray-100 mb-8 relative group cursor-pointer shadow-md">
                <img 
                  src="https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=1471&auto=format&fit=crop" 
                  alt="Sprei Premium Main" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 mix-blend-multiply"
                />
              </div>

              <h3 className="text-3xl font-serif font-bold uppercase tracking-tight mb-4 text-gray-900 leading-tight">
                Perpaduan Mewah <br/> Katun & Sutra
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-6 font-medium font-sans">
                Sprei koleksi eksklusif **Sprei Wiwik** adalah pilihan tercanggih untuk wanita dan keluarga modern. Dibuat dari perpaduan bahan premium yang menyerap keringat.
              </p>
            </div>

            <div className="flex flex-col lg:pt-12">
              <div className="mb-10">
                <div className="flex items-center gap-2 text-[10px] font-bold text-gray-900 uppercase tracking-widest mb-4 font-sans">
                  <span>Koleksi Signature</span>
                  <span className="text-violet-600">▼</span>
                </div>
                <h2 className="text-5xl md:text-6xl font-serif font-bold uppercase tracking-tight mb-6 text-gray-900 leading-[1.1]">
                  Elegant Motif <br/> Blend Sprei
                </h2>
                <div className="text-3xl font-bold text-violet-700 font-sans">
                  Rp450.000
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 md:gap-6 mb-8 font-sans">
                {[
                  { name: "White Series", price: "Rp320.000", img: "https://images.unsplash.com/photo-1629949009765-40fc74c9aa27?q=80&w=1471&auto=format&fit=crop" },
                  { name: "Navy Blend", price: "Rp340.000", img: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=1470&auto=format&fit=crop" },
                  { name: "Pastel Pink", price: "Rp299.000", img: "https://images.unsplash.com/photo-1540518614846-7eded433c457?q=80&w=1457&auto=format&fit=crop" },
                  { name: "Luxury Grey", price: "Rp410.000", img: "https://images.unsplash.com/photo-1631679706909-1844bbd07221?q=80&w=1392&auto=format&fit=crop" }
                ].map((item, idx) => (
                  <Link href="/katalog" key={idx} className="group flex flex-col items-center">
                    <div className="w-full aspect-square bg-gray-100 overflow-hidden mb-3 relative rounded-sm shadow-sm border border-gray-50">
                      <img src={item.img} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 mix-blend-multiply" alt={item.name}/>
                      <div className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md p-2 text-center text-[10px] font-bold text-gray-800 uppercase tracking-widest truncate">{item.name}</div>
                    </div>
                    <div className="text-[11px] font-bold text-gray-500">Harga: <span className="text-violet-600">{item.price}</span></div>
                  </Link>
                ))}
              </div>
              <div className="w-full h-2 bg-gray-900 mt-2"></div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================== */}
      {/* 3. TENTANG KAMI (REVAMP: EDITORIAL COLLAGE) */}
      {/* ========================================== */}
      <section id="tentang-kami" className="py-24 bg-[#FAFAFA] border-t border-gray-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 font-sans">
          <div className="flex flex-col lg:flex-row gap-16 items-center lg:items-stretch">
            
            {/* Teks Deskripsi dengan Typewriter */}
            <div className="flex-1 flex flex-col justify-center lg:pr-10">
              <h3 className="text-violet-600 font-bold tracking-widest uppercase text-[10px] mb-4">Mengenal SpreiKu</h3>
              <h4 className="text-4xl md:text-5xl font-serif font-bold uppercase tracking-tight mb-6 leading-[1.1] text-gray-900">
                Kisah di Balik <br/> Lembaran Nyaman
              </h4>
              <div className="w-12 h-1 bg-violet-600 mb-6"></div>
              
              <div className="text-gray-500 text-sm mb-10 leading-relaxed font-medium min-h-[100px]">
                <Typewriter 
                  text="SpreiKu berawal dari sebuah kepercayaan sederhana: hari yang produktif dimulai dari tidur yang nyenyak. Kami berkomitmen menghadirkan perlengkapan tidur premium yang memeluk Anda dengan kelembutan yang menenangkan setiap malam." 
                  speed={30}
                />
              </div>

              <div className="flex flex-col gap-6">
                <div className="flex gap-4 items-start border-t border-gray-200 pt-6 group cursor-default">
                  <span className="text-2xl mt-1 transition-transform group-hover:scale-125 duration-300">🧵</span>
                  <div>
                    <h5 className="font-bold text-gray-900 text-sm mb-1 uppercase tracking-tight">Material Kelas Satu</h5>
                    <p className="text-xs text-gray-500 leading-relaxed">Ditenun dari benang pilihan untuk permukaan yang sejuk dan tahan lama.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Kolase Foto Owner */}
            <div className="flex-1 relative w-full min-h-[500px] flex items-center justify-center lg:justify-end mt-10 lg:mt-0">
              {/* Gambar Background (Dekorasi) */}
              <div className="absolute left-0 lg:-left-12 top-0 bottom-12 w-3/4 max-w-[300px] rounded-sm overflow-hidden shadow-xl z-0 hidden md:block border-4 border-white">
                 <img 
                    src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1470&auto=format&fit=crop" 
                    alt="Detail Kain Sprei" 
                    className="w-full h-full object-cover mix-blend-multiply opacity-70" 
                 />
              </div>

              {/* Box Utama Wiwiek Winarty */}
              <div className="w-full max-w-sm relative z-10 rounded-sm p-1 aspect-square bg-white shadow-2xl overflow-hidden group border border-gray-100">
                 <div className="w-full h-full relative flex flex-col justify-end p-8 text-left rounded-sm">
                   <img 
                      src="/owner.jpg" 
                      alt="Wiwiek Winarty" 
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/95 via-violet-900/40 to-transparent"></div>
                   
                   <div className="relative z-10 text-white">
                     <p className="text-[13px] leading-relaxed italic font-serif mb-6 opacity-0 group-hover:opacity-100 transition-all duration-700 transform translate-y-4 group-hover:translate-y-0">
                       "Tidur yang nyaman bukanlah kemewahan, melainkan fondasi dasar untuk hidup yang produktif dan bermakna."
                     </p>
                     <div>
                       <h5 className="text-xl font-bold uppercase tracking-widest mb-0.5">Wiwiek Winarty</h5>
                       <p className="text-[10px] text-violet-300 font-bold uppercase tracking-widest">Founder & Owner</p>
                     </div>
                   </div>
                 </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================== */}
      {/* 4. FOOTER */}
      {/* ========================================== */}
      <footer className="bg-gradient-to-b from-gray-900 to-black py-12 border-t-4 border-violet-600 font-sans">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center text-center">
          <h2 className="text-2xl font-serif font-bold tracking-widest uppercase mb-6 text-white">
            Sprei<span className="text-gray-500">Ku</span>.
          </h2>
          <div className="flex gap-6 mb-8">
            <Link href="/" className="text-xs font-bold text-gray-400 hover:text-white uppercase tracking-widest transition-colors">Beranda</Link>
            <Link href="/katalog" className="text-xs font-bold text-gray-400 hover:text-white uppercase tracking-widest transition-colors">Katalog</Link>
          </div>
          <p className="text-gray-600 text-[10px] uppercase tracking-widest">
            &copy; {new Date().getFullYear()} SpreiKu. Kesempurnaan Tidur Anda.
          </p>
        </div>
      </footer>
    </main>
  );
}