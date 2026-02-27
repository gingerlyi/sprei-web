// File: app/katalog/page.tsx
import Link from "next/link";
import prisma from "../../lib/prisma";
import Navbar from "../Navbar";
import ProductCard from "./ProductCard"; // Import komponen baru

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

  return (
    <main className="min-h-screen bg-[#F5F5F5] font-sans text-slate-900 selection:bg-violet-200">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 md:px-6 pt-24 pb-12">
        <div className="flex gap-2 text-[10px] text-gray-500 mb-4 font-bold items-center uppercase tracking-widest font-sans">
          <Link href="/" className="hover:text-black transition-colors">Beranda</Link> 
          <span className="text-gray-300">&gt;</span> 
          <span className="text-black">Katalog Sprei</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-5 items-start">
          
          <aside className="w-full lg:w-52 flex-shrink-0 bg-white rounded-sm p-4 h-fit hidden lg:block sticky top-24 shadow-sm border border-gray-100">
            <h2 className="text-sm font-serif font-bold text-black mb-4 border-b border-gray-100 pb-2 uppercase tracking-wide">Filter</h2>
            
            <div className="mb-4 font-sans">
              <h3 className="font-bold text-xs text-gray-700 mb-2">Kategori</h3>
              <div className="flex flex-col gap-2 text-xs text-gray-600">
                <Link href={buildUrl({ newCategory: null })} className={`hover:text-violet-600 ${!category ? 'text-violet-600 font-bold' : ''}`}>Semua Kategori</Link>
                <Link href={buildUrl({ newCategory: 'polos' })} className={`hover:text-violet-600 ${category === 'polos' ? 'text-violet-600 font-bold' : ''}`}>Sprei Polos</Link>
                <Link href={buildUrl({ newCategory: 'motif' })} className={`hover:text-violet-600 ${category === 'motif' ? 'text-violet-600 font-bold' : ''}`}>Sprei Motif</Link>
                <Link href={buildUrl({ newCategory: 'bedcover' })} className={`hover:text-violet-600 ${category === 'bedcover' ? 'text-violet-600 font-bold' : ''}`}>Bedcover Set</Link>
              </div>
            </div>
            
            <div className="mb-4 font-sans">
              <h3 className="font-bold text-xs text-gray-700 mb-2">Ukuran</h3>
              <div className="flex flex-wrap gap-1.5 text-[10px]">
                <Link href={buildUrl({ newSize: null })} className={`px-2 py-1 border rounded-sm transition-all ${!size ? 'border-violet-600 text-violet-600 font-bold bg-violet-50' : 'border-gray-200 text-gray-600 hover:border-violet-600 hover:text-violet-600'}`}>Semua</Link>
                <Link href={buildUrl({ newSize: 'single' })} className={`px-2 py-1 border rounded-sm transition-all ${size === 'single' ? 'border-violet-600 text-violet-600 font-bold bg-violet-50' : 'border-gray-200 text-gray-600 hover:border-violet-600 hover:text-violet-600'}`}>Single</Link>
                <Link href={buildUrl({ newSize: 'queen' })} className={`px-2 py-1 border rounded-sm transition-all ${size === 'queen' ? 'border-violet-600 text-violet-600 font-bold bg-violet-50' : 'border-gray-200 text-gray-600 hover:border-violet-600 hover:text-violet-600'}`}>Queen</Link>
                <Link href={buildUrl({ newSize: 'king' })} className={`px-2 py-1 border rounded-sm transition-all ${size === 'king' ? 'border-violet-600 text-violet-600 font-bold bg-violet-50' : 'border-gray-200 text-gray-600 hover:border-violet-600 hover:text-violet-600'}`}>King</Link>
              </div>
            </div>
            <Link href="/katalog" className="block text-center w-full bg-violet-50 text-violet-600 py-2 rounded-sm text-xs font-bold hover:bg-violet-100 transition-colors font-sans">Hapus Filter</Link>
          </aside>

          <div className="flex-1 w-full">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-3 bg-white p-3 rounded-sm shadow-sm border border-gray-100 font-sans">
              <div className="text-sm font-medium text-gray-600">
                 Menampilkan <span className="font-bold text-violet-600">{products.length}</span> produk
              </div>
              <form method="GET" action="/katalog" className="relative w-full md:w-64 font-sans">
                <input type="text" name="q" defaultValue={q} placeholder="Cari produk..." className="w-full bg-[#F5F5F5] border border-gray-200 text-xs rounded-sm py-2 pl-8 pr-3 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all" />
              </form>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-2 md:gap-3">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}