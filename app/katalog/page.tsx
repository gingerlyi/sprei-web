// File: app/katalog/page.tsx
import Link from "next/link";
import prisma from "../../lib/prisma";

export const dynamic = "force-dynamic";

export default async function KatalogPage({ searchParams }: { searchParams: Promise<{ q?: string, category?: string, size?: string }> }) {
  const resolvedSP = await searchParams;
  
  const q = resolvedSP.q || "";
  const category = resolvedSP.category || "";
  const size = resolvedSP.size || "";

  const andConditions: any[] = [];
  
  if (q) {
    andConditions.push({ name: { contains: q, mode: "insensitive" } });
  }
  if (category) {
    andConditions.push({ category: { contains: category, mode: "insensitive" } });
  }
  if (size) {
    andConditions.push({ size: { contains: size, mode: "insensitive" } });
  }

  const products = await prisma.product.findMany({
    where: andConditions.length > 0 ? { AND: andConditions } : {},
    orderBy: { createdAt: "desc" },
  });

  const buildUrl = (updates: { newCategory?: string | null, newSize?: string | null }) => {
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    
    const finalCategory = updates.newCategory !== undefined ? updates.newCategory : category;
    if (finalCategory) params.set("category", finalCategory);
    
    const finalSize = updates.newSize !== undefined ? updates.newSize : size;
    if (finalSize) params.set("size", finalSize);

    return `/katalog?${params.toString()}`;
  };

  // --- LOGIKA JUDUL DINAMIS ---
  let pageTitle = "Sprei Premium"; // Judul Default
  if (category === "polos") pageTitle = "Sprei Polos";
  else if (category === "motif") pageTitle = "Sprei Motif";
  else if (category === "bedcover") pageTitle = "Bedcover Set";

  return (
    <main className="min-h-screen bg-white font-sans text-slate-900 selection:bg-gray-200">
      
      {/* NAVBAR */}
      <header className="fixed w-full top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 transition-all">
        <div className="max-w-7xl mx-auto px-6 h-16 md:h-20 flex items-center justify-between">
          <Link href="/" className="text-2xl md:text-3xl font-black tracking-tighter uppercase">
            Sprei<span className="text-gray-400">Ku</span>.
          </Link>
          <nav className="hidden md:flex gap-8 text-sm font-medium">
            <Link href="/" className="hover:text-gray-500 transition-colors">Beranda</Link>
            <Link href="/katalog" className="font-bold border-b-2 border-black pb-1">Katalog</Link>
            <Link href="/#tentang-kami" className="hover:text-gray-500 transition-colors">Tentang Kami</Link>
          </nav>
        </div>
      </header>

      {/* Konten Katalog */}
      <div className="max-w-7xl mx-auto px-6 pt-28 pb-12">
        
        {/* Breadcrumb */}
        <div className="flex gap-2 text-xs text-gray-500 mb-6 font-medium items-center">
          <Link href="/" className="hover:text-black">Beranda</Link> 
          <span className="text-gray-300">&gt;</span> 
          <span className="text-black">Katalog Sprei</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          
          {/* KOLOM KIRI: Sidebar Filters */}
          <aside className="w-full lg:w-64 flex-shrink-0 border border-gray-200 rounded-[20px] p-5 h-fit hidden md:block">
            <div className="flex justify-between items-center mb-2 border-b border-gray-100 pb-4">
              <h2 className="text-lg font-bold">Filters</h2>
            </div>
            
            <div className="py-4 border-b border-gray-100">
              <div className="flex justify-between items-center mb-4">
                 <h3 className="font-bold">Kategori</h3>
                 <svg className="w-4 h-4 text-black rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
              <div className="flex flex-col gap-3 text-sm text-gray-500">
                <Link href={buildUrl({ newCategory: null })} className={`flex justify-between hover:text-black transition-colors ${!category ? 'text-black font-bold' : ''}`}>
                  <span>Semua Kategori</span> <span className="text-gray-300">›</span>
                </Link>
                <Link href={buildUrl({ newCategory: 'polos' })} className={`flex justify-between hover:text-black transition-colors ${category === 'polos' ? 'text-black font-bold' : ''}`}>
                  <span>Sprei Polos</span> <span className="text-gray-300">›</span>
                </Link>
                <Link href={buildUrl({ newCategory: 'motif' })} className={`flex justify-between hover:text-black transition-colors ${category === 'motif' ? 'text-black font-bold' : ''}`}>
                  <span>Sprei Motif</span> <span className="text-gray-300">›</span>
                </Link>
                <Link href={buildUrl({ newCategory: 'bedcover' })} className={`flex justify-between hover:text-black transition-colors ${category === 'bedcover' ? 'text-black font-bold' : ''}`}>
                  <span>Bedcover Set</span> <span className="text-gray-300">›</span>
                </Link>
              </div>
            </div>

            <div className="py-4 border-b border-gray-100 mb-2">
              <div className="flex justify-between items-center mb-4">
                 <h3 className="font-bold">Ukuran</h3>
                 <svg className="w-4 h-4 text-black rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
              <div className="flex flex-wrap gap-2 text-sm">
                <Link href={buildUrl({ newSize: null })} className={`px-4 py-2 rounded-full transition-colors ${!size ? 'bg-black text-white font-medium' : 'bg-[#F0F0F0] text-gray-500 hover:bg-gray-200'}`}>Semua</Link>
                <Link href={buildUrl({ newSize: 'single' })} className={`px-4 py-2 rounded-full transition-colors ${size === 'single' ? 'bg-black text-white font-medium' : 'bg-[#F0F0F0] text-gray-500 hover:bg-gray-200'}`}>Single</Link>
                <Link href={buildUrl({ newSize: 'queen' })} className={`px-4 py-2 rounded-full transition-colors ${size === 'queen' ? 'bg-black text-white font-medium' : 'bg-[#F0F0F0] text-gray-500 hover:bg-gray-200'}`}>Queen</Link>
                <Link href={buildUrl({ newSize: 'king' })} className={`px-4 py-2 rounded-full transition-colors ${size === 'king' ? 'bg-black text-white font-medium' : 'bg-[#F0F0F0] text-gray-500 hover:bg-gray-200'}`}>King</Link>
                <Link href={buildUrl({ newSize: 'extra king' })} className={`px-4 py-2 rounded-full transition-colors ${size === 'extra king' ? 'bg-black text-white font-medium' : 'bg-[#F0F0F0] text-gray-500 hover:bg-gray-200'}`}>Extra King</Link>
              </div>
            </div>

            <Link href="/katalog" className="block text-center w-full bg-black text-white py-3.5 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors">
              Reset Filter
            </Link>
          </aside>

          {/* KOLOM KANAN: Grid Produk & Search Bar */}
          <div className="flex-1">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
              {/* === JUDUL SUDAH MENJADI DINAMIS DI SINI === */}
              <h1 className="text-2xl font-black uppercase tracking-tighter">{pageTitle}</h1>
              
              <form method="GET" action="/katalog" className="relative w-full md:w-64">
                {category && <input type="hidden" name="category" value={category} />}
                {size && <input type="hidden" name="size" value={size} />}
                
                <input 
                  type="text" 
                  name="q" 
                  defaultValue={q}
                  placeholder="Cari nama produk..." 
                  className="w-full bg-[#F0EEED] text-sm rounded-full py-2.5 pl-10 pr-4 focus:outline-none focus:ring-1 focus:ring-black transition-all"
                />
                <button type="submit" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </button>
              </form>
            </div>

            <div className="mb-6 flex flex-wrap gap-2 text-xs text-gray-500 font-medium items-center">
              <span>{products.length} Produk ditemukan</span>
              {(q || category || size) && <span className="text-gray-300">|</span>}
              {q && <span className="bg-gray-100 px-2 py-1 rounded text-black">Pencarian: "{q}"</span>}
              {category && <span className="bg-gray-100 px-2 py-1 rounded text-black flex items-center gap-1 capitalize">Kategori: {category}</span>}
              {size && <span className="bg-gray-100 px-2 py-1 rounded text-black flex items-center gap-1 capitalize">Ukuran: {size}</span>}
            </div>

            {products.length === 0 ? (
               <div className="p-16 bg-gray-50 rounded-2xl text-center border-2 border-dashed border-gray-200 flex flex-col items-center">
                 <p className="text-gray-500 text-sm font-bold mb-2">Produk tidak ditemukan.</p>
                 <Link href="/katalog" className="text-black text-xs font-bold border-b border-black pb-0.5 mt-2">
                   Hapus Semua Filter
                 </Link>
               </div>
            ) : (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
                {products.map((product) => {
                  const originalPrice = Math.round(product.price / 0.6); 
                  
                  return (
                    <Link href={`/product/${product.id}`} key={product.id} className="group cursor-pointer block">
                      <div className="bg-[#F0EEED] rounded-[16px] aspect-[4/5] overflow-hidden mb-3 relative">
                        <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover mix-blend-multiply transition-transform duration-500 group-hover:scale-110" />
                      </div>
                      <div>
                        <h3 className="font-bold text-base leading-tight mb-1 truncate text-black uppercase tracking-tight">{product.name}</h3>
                        <div className="flex items-center gap-1.5 mb-1.5">
                          <div className="text-[#FFC633] text-xs tracking-widest">★★★★★</div>
                          <span className="text-[10px] text-gray-500 font-medium">5.0/5</span>
                        </div>
                        <div className="flex flex-wrap items-baseline gap-1.5">
                          <span className="font-bold text-lg text-black">Rp{product.price.toLocaleString("id-ID")}</span>
                          <span className="text-gray-400 line-through text-xs font-bold">Rp{originalPrice.toLocaleString("id-ID")}</span>
                          <span className="bg-[#FF3333]/10 text-[#FF3333] px-1.5 py-0.5 rounded-full text-[10px] font-bold">-40%</span>
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}