// File: app/page.tsx
import Link from "next/link";
import Navbar from "./Navbar";

export default function Home() {
  return (
    <main className="min-h-screen bg-white font-sans text-slate-900 selection:bg-violet-200 scroll-smooth">
      <Navbar />

      {/* ========================================== */}
      {/* 1. HERO SECTION (Nuansa Ungu Mewah) */}
      {/* ========================================== */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden text-center">
        {/* Latar Belakang Gradasi Lembut Ungu */}
        <div className="absolute inset-0 -z-10 h-full w-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-violet-50 via-fuchsia-50/50 to-white"></div>
        
        <div className="relative max-w-7xl mx-auto px-6">
          
          {/* --- BADGE "BUATAN LOKAL" (Gradasi Ungu Emas) --- */}
          <div className="inline-flex items-center gap-1.5 mb-8 px-6 py-2.5 rounded-full bg-gradient-to-r from-violet-50/80 to-fuchsia-50/80 backdrop-blur-md border border-violet-200/50 shadow-[0_8px_20px_-5px_rgba(124,58,237,0.2)] group hover:scale-105 hover:shadow-[0_12px_25px_-5px_rgba(124,58,237,0.3)] transition-all duration-300 cursor-default ring-1 ring-white/50">
            <span className="text-base animate-pulse">✨</span>
            <span className="text-[11px] font-extrabold uppercase tracking-[0.25em] bg-clip-text text-transparent bg-gradient-to-r from-violet-600 via-fuchsia-500 to-indigo-600 drop-shadow-sm">
              Buatan Lokal
            </span>
          </div>

          {/* Judul Teks */}
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-black uppercase tracking-tighter mb-6 leading-[1.1]">
            Kenyamanan Tidur <br className="hidden md:block"/> 
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-700 to-gray-500">
              Tanpa Kompromi
            </span>
          </h2>
          
          <p className="text-sm md:text-base text-gray-500 max-w-2xl mx-auto mb-10 font-medium leading-relaxed">
            Hadirkan nuansa hotel bintang 5 langsung di kamar Anda. Terbuat dari serat pilihan yang ekstra lembut, sejuk, dan memanjakan kulit.
          </p>
          
          {/* Tombol Gradasi Ungu */}
          <Link href="/katalog" className="inline-flex items-center justify-center px-8 py-4 text-sm font-bold text-white rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 shadow-[0_10px_25px_rgba(124,58,237,0.3)] hover:shadow-[0_15px_35px_rgba(124,58,237,0.4)] transition-all transform hover:-translate-y-1">
            Jelajahi Katalog Sprei
          </Link>
        </div>
      </section>

      {/* ========================================== */}
      {/* 2. FITUR & PROFIL OWNER */}
      {/* ========================================== */}
      <section id="tentang-kami" className="py-24 bg-white border-t border-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Bagian Teks Kiri */}
            <div>
              <h3 className="text-violet-600 font-bold tracking-widest uppercase text-[10px] mb-3">Tentang SpreiKu</h3>
              <h4 className="text-3xl md:text-4xl font-black uppercase tracking-tighter mb-5 leading-tight text-gray-900">
                Dedikasi Kami untuk <br/> Kualitas Tidur Anda
              </h4>
              <p className="text-gray-500 text-sm mb-8 leading-relaxed">
                SpreiKu berawal dari sebuah kepercayaan sederhana: hari yang produktif dimulai dari tidur yang nyenyak. Kami berkomitmen menghadirkan perlengkapan tidur premium yang cantik dan memeluk Anda dengan kelembutan.
              </p>
              
              <div className="grid grid-cols-2 gap-5 mt-8">
                {/* Fitur 1 (Ikon Ungu) */}
                <div className="group bg-white border border-gray-100 p-6 rounded-2xl hover:border-transparent hover:bg-gradient-to-br hover:from-violet-50 hover:to-fuchsia-50 transition-all duration-300">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-500 flex items-center justify-center text-white mb-4 shadow-md">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  <h5 className="font-bold text-gray-900 text-sm mb-1 uppercase tracking-tight">Bahan Premium</h5>
                  <p className="text-xs text-gray-500 group-hover:text-gray-700 transition-colors">Terbuat dari katun berkualitas tinggi yang tahan lama.</p>
                </div>
                
                {/* Fitur 2 (Ikon Ungu) */}
                <div className="group bg-white border border-gray-100 p-6 rounded-2xl hover:border-transparent hover:bg-gradient-to-br hover:from-violet-50 hover:to-fuchsia-50 transition-all duration-300">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-500 flex items-center justify-center text-white mb-4 shadow-md">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                  </div>
                  <h5 className="font-bold text-gray-900 text-sm mb-1 uppercase tracking-tight">Ekstra Sejuk</h5>
                  <p className="text-xs text-gray-500 group-hover:text-gray-700 transition-colors">Material breathable yang menyerap keringat di malam hari.</p>
                </div>
              </div>
            </div>

            {/* Bagian Kanan: Kotak Profil Owner (Gradasi Ungu Premium) */}
            <div className="w-full max-w-sm mx-auto lg:ml-auto relative rounded-[2rem] p-1 aspect-square flex flex-col justify-center items-center bg-gradient-to-br from-violet-600 via-fuchsia-600 to-indigo-600 shadow-2xl transform lg:rotate-2 hover:rotate-0 transition-transform duration-500 group">
               
               <div className="w-full h-full rounded-[1.8rem] relative overflow-hidden flex flex-col justify-end p-6 text-left">
                 
                 <img 
                    src="/owner.jpg" 
                    alt="Foto Wiwiek Winarty" 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                 />

                 {/* Lapisan Overlay Ungu Gelap */}
                 <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/90 via-violet-900/40 to-black/10"></div>

                 <div className="relative z-10">
                   <h5 className="text-2xl font-black uppercase tracking-tighter mb-0.5 text-white">
                     Wiwiek Winarty
                   </h5>
                   {/* Badge Owner Ungu */}
                   <p className="text-[10px] text-violet-700 font-bold uppercase tracking-widest mb-3 bg-white/95 inline-block px-2 py-0.5 rounded-sm">
                     Owner
                   </p>
                   <p className="text-white/90 text-xs leading-relaxed italic font-medium">
                     "Tidur yang nyaman bukanlah kemewahan, melainkan kebutuhan dasar untuk hidup yang lebih produktif."
                   </p>
                 </div>
               </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================== */}
      {/* 3. FOOTER (Garis Ungu) */}
      {/* ========================================== */}
      <footer className="bg-gradient-to-b from-gray-900 to-black py-12 border-t-4 border-violet-600">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
          <h2 className="text-2xl font-black tracking-tighter uppercase mb-6 text-white">
            Sprei<span className="text-gray-500">Ku</span>.
          </h2>
          <div className="flex gap-6 mb-8">
            <Link href="/" className="text-xs font-bold text-gray-400 hover:text-white uppercase tracking-widest transition-colors">Beranda</Link>
            <Link href="/katalog" className="text-xs font-bold text-gray-400 hover:text-white uppercase tracking-widest transition-colors">Katalog</Link>
            <Link href="/spreiwiwik" className="text-xs font-bold text-gray-400 hover:text-violet-500 uppercase tracking-widest transition-colors">Admin</Link>
          </div>
          <p className="text-gray-600 text-[10px] uppercase tracking-widest">
            &copy; {new Date().getFullYear()} SpreiKu. Kesempurnaan Tidur Anda.
          </p>
        </div>
      </footer>
    </main>
  );
}