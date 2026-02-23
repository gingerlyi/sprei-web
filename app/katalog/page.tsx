// File: app/katalog/page.tsx
import Link from "next/link";
import prisma from "../../lib/prisma";
import Navbar from "../Navbar";

export const dynamic = "force-dynamic";

export default async function KatalogPage({ searchParams }: { searchParams: Promise<{ q?: string, category?: string, size?: string }> }) {
  const resolvedSP = await searchParams;
  const q = resolvedSP.q || "";
  const category = resolvedSP.category || "";
  const size = resolvedSP.size || "";

  const andConditions: any[] = [];
  if (q) andConditions.push({ name: { contains: q, mode: "insensitive" } });
  if (category) andConditions.push({ category: { contains: category, mode: "insensitive" } });
  if (size) andConditions.push({ size: { contains: size, mode: "insensitive" } });

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

  let pageTitle = "Koleksi SpreiKu";
  if (category === "polos") pageTitle = "Sprei Polos";
  else if (category === "motif") pageTitle = "Sprei Motif";
  else if (category === "bedcover") pageTitle = "Bedcover Set";

  return (
    <main className="min-h-screen bg-[#F3F4F5] font-sans text-slate-900 selection:bg-gray-200">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 md:px-6 pt-24 pb-12">
        <div className="flex gap-2 text-[10px] text-gray-500 mb-6 font-medium items-center uppercase tracking-widest">
          <Link href="/" className="hover:text-black transition-colors">Beranda</Link> <span className="text-gray-300">&gt;</span> <span className="text-black">Katalog Sprei</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 items-start">
          
          {/* ========================================== */}
          {/* SIDEBAR FILTER (DI KIRI)                     */}
          {/* ========================================== */}
          <aside className="w-full lg:w-60 flex-shrink-0 bg-white border border-gray-200 rounded-xl p-5 h-fit hidden lg:block sticky top-24 shadow-sm">
            <div className="flex justify-between items-center mb-4 border-b border-gray-100 pb-3">
              <h2 className="text-sm font-bold uppercase tracking-widest text-black">Filter</h2>
            </div>
            
            <div className="py-2 border-b border-gray-100">
              <h3 className="font-bold text-xs text-gray-400 uppercase tracking-widest mb-3">Kategori</h3>
              <div className="flex flex-col gap-2.5 text-xs text-gray-600 font-medium">
                <Link href={buildUrl({ newCategory: null })} className={`hover:text-[#FF3333] transition-colors ${!category ? 'text-[#FF3333] font-bold' : ''}`}>Semua Kategori</Link>
                <Link href={buildUrl({ newCategory: 'polos' })} className={`hover:text-[#FF3333] transition-colors ${category === 'polos' ? 'text-[#FF3333] font-bold' : ''}`}>Sprei Polos</Link>
                <Link href={buildUrl({ newCategory: 'motif' })} className={`hover:text-[#FF3333] transition-colors ${category === 'motif' ? 'text-[#FF3333] font-bold' : ''}`}>Sprei Motif</Link>
                <Link href={buildUrl({ newCategory: 'bedcover' })} className={`hover:text-[#FF3333] transition-colors ${category === 'bedcover' ? 'text-[#FF3333] font-bold' : ''}`}>Bedcover Set</Link>
              </div>
            </div>
            
            <div className="py-4 border-b border-gray-100 mb-4">
              <h3 className="font-bold text-xs text-gray-400 uppercase tracking-widest mb-3">Ukuran</h3>
              <div className="flex flex-wrap gap-2 text-[10px]">
                <Link href={buildUrl({ newSize: null })} className={`px-3 py-1.5 rounded-md border transition-all font-bold ${!size ? 'bg-black text-white border-black' : 'bg-white border-gray-200 text-gray-500 hover:border-black'}`}>SEMUA</Link>
                <Link href={buildUrl({ newSize: 'single' })} className={`px-3 py-1.5 rounded-md border transition-all font-bold ${size === 'single' ? 'bg-black text-white border-black' : 'bg-white border-gray-200 text-gray-500 hover:border-black'}`}>SINGLE</Link>
                <Link href={buildUrl({ newSize: 'queen' })} className={`px-3 py-1.5 rounded-md border transition-all font-bold ${size === 'queen' ? 'bg-black text-white border-black' : 'bg-white border-gray-200 text-gray-500 hover:border-black'}`}>QUEEN</Link>
                <Link href={buildUrl({ newSize: 'king' })} className={`px-3 py-1.5 rounded-md border transition-all font-bold ${size === 'king' ? 'bg-black text-white border-black' : 'bg-white border-gray-200 text-gray-500 hover:border-black'}`}>KING</Link>
                <Link href={buildUrl({ newSize: 'extra king' })} className={`px-3 py-1.5 rounded-md border transition-all font-bold ${size === 'extra king' ? 'bg-black text-white border-black' : 'bg-white border-gray-200 text-gray-500 hover:border-black'}`}>X-KING</Link>
              </div>
            </div>
            
            <Link href="/katalog" className="block text-center w-full bg-gray-50 border border-gray-200 text-black py-2.5 rounded-lg text-xs font-bold hover:bg-gray-100 transition-colors">Reset Filter</Link>
          </aside>

          {/* ========================================== */}
          {/* AREA KANAN: PRODUK (GRID)                    */}
          {/* ========================================== */}
          <div className="flex-1 w-full">
            
            {/* Header Kanan & Pencarian */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-5 gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
              <div>
                 <h1 className="text-lg font-bold text-black uppercase">{pageTitle}</h1>
                 <p className="text-[10px] text-gray-500 mt-1">{products.length} Produk ditemukan</p>
              </div>
              <form method="GET" action="/katalog" className="relative w-full md:w-72">
                {category && <input type="hidden" name="category" value={category} />}
                {size && <input type="hidden" name="size" value={size} />}
                <input type="text" name="q" defaultValue={q} placeholder="Cari di toko ini..." className="w-full bg-[#F8F8F8] border border-gray-200 text-xs rounded-lg py-2.5 pl-9 pr-4 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all" />
                <button type="submit" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg></button>
              </form>
            </div>

            {products.length === 0 ? (
               <div className="py-20 text-center flex flex-col items-center bg-white rounded-xl border border-gray-100 shadow-sm">
                 <span className="text-4xl mb-3 opacity-30">📦</span>
                 <p className="text-gray-400 text-xs font-bold mb-2 uppercase tracking-widest">Produk Tidak Ditemukan</p>
               </div>
            ) : (
              /* GRID PRODUK: Menyesuaikan sisa ruang (2 di HP, 3 di Tablet, 4/5 di Laptop) */
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
                {products.map((product) => {
                  return (
                    <Link href={`/product/${product.id}`} key={product.id} className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg hover:border-gray-300 transition-all duration-200 flex flex-col h-full cursor-pointer relative">
                      
                      {/* BINGKAI GAMBAR KOTAK */}
                      <div className="w-full aspect-square relative overflow-hidden bg-gray-50 border-b border-gray-100">
                        <img 
                          src={product.imageUrls?.[0] || ""} 
                          alt={product.name} 
                          className="w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-500" 
                        />
                        
                        {/* Badge Kategori Kiri Atas */}
                        <div className="absolute top-0 left-0 bg-[#FF3333] text-white px-2 py-1.5 rounded-br-lg text-[9px] font-bold tracking-wider uppercase z-10 shadow-sm">
                          {product.category}
                        </div>
                      </div>
                      
                      {/* DETAIL TEKS BAWAH */}
                      <div className="p-3 flex flex-col flex-grow">
                        
                        {/* Nama Produk */}
                        <h3 className="text-xs md:text-sm text-gray-800 leading-snug line-clamp-2 mb-2 group-hover:text-black">
                          {product.name}
                        </h3>
                        
                        <div className="mt-auto">
                          {/* Harga */}
                          <span className="font-bold text-sm md:text-base text-black block mb-2">
                            Rp{product.price.toLocaleString("id-ID")}
                          </span>
                          
                          {/* Baris Bawah: Ukuran & Stok */}
                          <div className="flex items-center justify-between pt-2 border-t border-dashed border-gray-200">
                             <span className="bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-widest">
                               {product.size}
                             </span>
                             <span className="text-[10px] text-gray-500 font-medium">
                               Stok: <span className={product.stock > 0 ? "text-black font-bold" : "text-red-500 font-bold"}>{product.stock || 0}</span>
                             </span>
                          </div>
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