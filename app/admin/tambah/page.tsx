import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";
import Link from "next/link";

const prisma = new PrismaClient();

export default function TambahProduk() {
  async function addProduct(formData: FormData) {
    "use server";
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const price = parseInt(formData.get("price") as string);
    const imageUrl = formData.get("imageUrl") as string;

    await prisma.product.create({
      data: { name, description, price, imageUrl },
    });
    redirect("/admin");
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-12">
      {/* Navbar Admin (Konsisten dengan Dashboard) */}
      <header className="bg-slate-900 text-white shadow-md">
        <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="font-bold text-xl tracking-wide">Panel <span className="text-blue-400">Admin</span></div>
          <Link href="/admin" className="text-sm text-slate-300 hover:text-white transition flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            Kembali
          </Link>
        </div>
      </header>

      <div className="p-6 md:p-10 max-w-4xl mx-auto mt-4">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-slate-800">Tambah Sprei Baru</h1>
          <p className="text-slate-500 mt-2 font-medium">Lengkapi detail produk di bawah ini untuk menampilkannya di katalog.</p>
        </div>
        
        <form action={addProduct} className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-8 md:p-10 space-y-8">
            
            {/* Grid untuk input 2 kolom di layar besar */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="block font-bold text-slate-700">Nama Produk Sprei</label>
                <input type="text" name="name" required className="w-full bg-slate-50 border border-slate-200 px-4 py-3.5 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all" placeholder="Misal: Sprei Katun Jepang Motif Daun" />
              </div>

              <div className="space-y-3">
                <label className="block font-bold text-slate-700">Harga (Rp)</label>
                <div className="relative">
                  <span className="absolute left-4 top-3.5 text-slate-500 font-bold">Rp</span>
                  <input type="number" name="price" required className="w-full bg-slate-50 border border-slate-200 pl-12 pr-4 py-3.5 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all" placeholder="150000" />
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <label className="block font-bold text-slate-700">Deskripsi & Ukuran</label>
              <textarea name="description" required className="w-full bg-slate-50 border border-slate-200 px-4 py-3.5 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all resize-none" placeholder="Masukkan bahan, ukuran (misal: 160x200), dan keunggulan sprei..." rows={4}></textarea>
            </div>

            <div className="space-y-3">
              <label className="block font-bold text-slate-700">Link URL Gambar</label>
              <input type="url" name="imageUrl" required className="w-full bg-slate-50 border border-slate-200 px-4 py-3.5 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all" placeholder="https://..." />
              <div className="bg-blue-50 rounded-lg p-4 flex gap-3 border border-blue-100">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <p className="text-sm text-blue-800 font-medium">Tips: Cari gambar sprei di Google, klik kanan pada gambar, lalu pilih <strong>"Copy image address"</strong> (Salin alamat gambar) dan paste di atas.</p>
              </div>
            </div>

          </div>

          {/* Area Tombol */}
          <div className="bg-slate-50 p-6 md:px-10 border-t border-slate-200 flex flex-col-reverse md:flex-row justify-end gap-4">
            <Link href="/admin" className="px-8 py-3.5 text-slate-600 font-bold rounded-xl hover:bg-slate-200 transition text-center">Batal</Link>
            <button type="submit" className="bg-blue-600 text-white font-bold px-10 py-3.5 rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-500/30 transition-all hover:-translate-y-0.5 text-center flex items-center justify-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
              Simpan Produk
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}