// File: app/admin/AdminClient.tsx
"use client";

import { useState, useRef } from "react";

type Product = {
  id: string;
  name: string;
  price: number;
  imageUrls: string[];
  category: string;
  size: string;
  description: string;
};

export default function AdminClient({ products, addAction, editAction, deleteAction }: any) {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [readData, setReadData] = useState<Product | null>(null);
  const [editData, setEditData] = useState<Product | null>(null);
  
  // State untuk Notifikasi & Loading
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "error" | "success" } | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // ==========================================
  // STATE BARU: UNTUK GALERI ADMIN (SWIPE & ZOOM)
  // ==========================================
  const [readImageIndex, setReadImageIndex] = useState(0);
  const [isAdminLightboxOpen, setIsAdminLightboxOpen] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const showToast = (message: string, type: "error" | "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  // Fungsi khusus saat Admin membuka popup "Read/Detail" agar gambar selalu mulai dari index 0
  const handleOpenRead = (p: Product) => {
    setReadData(p);
    setReadImageIndex(0);
  };

  // Fungsi Navigasi Galeri Admin
  const nextReadImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (readData) setReadImageIndex((prev) => (prev === readData.imageUrls.length - 1 ? 0 : prev + 1));
  };
  const prevReadImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (readData) setReadImageIndex((prev) => (prev === 0 ? readData.imageUrls.length - 1 : prev - 1));
  };

  // Fungsi Deteksi Geser (Swipe) untuk Admin
  const minSwipeDistance = 50;
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };
  const onTouchMove = (e: React.TouchEvent) => setTouchEnd(e.targetTouches[0].clientX);
  const onTouchEnd = () => {
    if (!touchStart || !touchEnd || !readData) return;
    const distance = touchStart - touchEnd;
    if (distance > minSwipeDistance) nextReadImage();
    if (distance < -minSwipeDistance) prevReadImage();
  };
  // ==========================================

  const validateFiles = (files: File[]) => {
    if (files.length > 4) {
      showToast("Maksimal hanya boleh upload 4 gambar sekaligus!", "error");
      return false;
    }
    for (const file of files) {
      if (file.size > 3 * 1024 * 1024) {
        showToast(`Gambar "${file.name}" terlalu besar! Maksimal 3 MB per gambar.`, "error");
        return false;
      }
    }
    return true;
  };

  const handleAddSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 
    const formData = new FormData(e.currentTarget);
    const files = formData.getAll("images") as File[];
    if (files[0].size > 0 && !validateFiles(files)) return;

    setIsSubmitting(true);
    try {
      await addAction(formData);
      setIsAddOpen(false); 
      showToast("Produk berhasil ditambahkan.", "success");
    } catch (error) {
      showToast("Terjadi kesalahan saat menyimpan.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 
    const formData = new FormData(e.currentTarget);
    const files = formData.getAll("images") as File[];
    if (files[0].size > 0 && !validateFiles(files)) return;

    setIsSubmitting(true);
    try {
      await editAction(formData);
      setEditData(null); 
      showToast("Produk berhasil diperbarui.", "success");
    } catch (error) {
      showToast("Terjadi kesalahan saat mengupdate.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Hapus sprei ini dari katalog?")) return;
    const formData = new FormData();
    formData.append("id", id);
    try {
      await deleteAction(formData);
      showToast("Produk berhasil dihapus.", "success");
    } catch (error) {
      showToast("Gagal menghapus produk.", "error");
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F8F8] p-6 md:p-10 font-sans text-slate-900 selection:bg-gray-200 relative">
      
      {toast && (
        <div className={`fixed top-6 left-1/2 -translate-x-1/2 px-6 py-3 rounded-full shadow-2xl flex items-center justify-center gap-2 text-sm font-bold z-[200] transition-all animate-in slide-in-from-top-4 ${toast.type === 'error' ? 'bg-[#FFEAEA] text-[#FF3333] border border-[#FF3333]/20' : 'bg-black text-white'}`}>
          {toast.type === 'error' ? '⚠️' : '✅'} {toast.message}
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        {/* HEADER ADMIN */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 bg-white p-6 md:p-8 rounded-[2rem] shadow-sm border border-gray-100">
          <div>
            <h1 className="text-3xl font-black uppercase tracking-tighter">Admin Workspace</h1>
            <p className="text-gray-500 font-medium mt-1">Kelola katalog SpreiKu dengan mudah.</p>
          </div>
          <div className="flex items-center gap-4">
            <a href="/" className="px-6 py-3.5 bg-gray-100 rounded-full text-sm font-bold hover:bg-gray-200 transition-all flex items-center justify-center">Lihat Web ↗</a>
            <button onClick={() => setIsAddOpen(true)} className="px-6 py-3.5 bg-black text-white rounded-full text-sm font-bold hover:bg-gray-800 hover:shadow-xl transition-all flex items-center gap-2">
              <span className="text-lg leading-none">+</span> Tambah Produk
            </button>
          </div>
        </div>

        {/* TABEL DAFTAR PRODUK */}
        <div className="bg-white p-6 md:p-8 rounded-[2rem] shadow-sm border border-gray-100">
          <div className="overflow-x-auto pb-6">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="border-b-2 border-gray-100 text-gray-400 text-xs uppercase tracking-widest">
                  <th className="pb-4 font-bold">Produk</th>
                  <th className="pb-4 font-bold">Kategori & Ukuran</th>
                  <th className="pb-4 font-bold text-right">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p: Product) => (
                  <tr key={p.id} className="border-b border-gray-50 hover:bg-[#F8F8F8] transition-colors group">
                    <td className="py-4 flex items-center gap-5 pr-4">
                      <div className="w-14 h-14 rounded-xl bg-[#F0EEED] overflow-hidden flex-shrink-0 border border-gray-200">
                        <img src={p.imageUrls?.[0] || ""} alt={p.name} className="w-full h-full object-cover mix-blend-multiply" />
                      </div>
                      <div>
                        <div className="font-bold text-base leading-tight uppercase tracking-tight mb-1">{p.name}</div>
                        <div className="text-sm font-bold text-gray-400">Rp{p.price.toLocaleString("id-ID")}</div>
                      </div>
                    </td>
                    <td className="py-4">
                      <div className="flex flex-wrap gap-2 items-center">
                        <span className="bg-[#F0EEED] px-3 py-1.5 rounded-md text-[10px] font-bold text-gray-600 uppercase tracking-wider">{p.category}</span>
                        <span className="bg-black text-white px-3 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-wider">{p.size}</span>
                      </div>
                    </td>
                    <td className="py-4 text-right">
                      <div className="flex justify-end items-center gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                        <button onClick={() => handleOpenRead(p)} className="p-2.5 bg-gray-100 hover:bg-black text-gray-600 hover:text-white rounded-xl transition-all" title="Lihat Detail"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg></button>
                        <button onClick={() => setEditData(p)} className="p-2.5 bg-blue-50 hover:bg-blue-600 text-blue-600 hover:text-white rounded-xl transition-all" title="Edit Produk"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg></button>
                        <button onClick={() => handleDelete(p.id)} className="p-2.5 bg-[#FF3333]/10 hover:bg-[#FF3333] text-[#FF3333] hover:text-white rounded-xl transition-all" title="Hapus Produk"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ========================================================== */}
      {/* 1. POPUP TAMBAH (Disembunyikan kodenya agar ringkas, sama seperti sebelumnya) */}
      {/* ========================================================== */}
      {isAddOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-2xl rounded-[2rem] p-8 max-h-[90vh] overflow-y-auto relative animate-in fade-in zoom-in-95 duration-200">
            <button onClick={() => setIsAddOpen(false)} className="absolute top-6 right-6 p-2 bg-gray-100 text-gray-600 rounded-full hover:bg-red-50 hover:text-red-500 transition-colors"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg></button>
            <h2 className="text-2xl font-black mb-6 border-b border-gray-100 pb-4 uppercase tracking-tighter">Tambah Produk Baru</h2>
            <form ref={formRef} onSubmit={handleAddSubmit} className="flex flex-col gap-5">
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 block">Foto Produk (Pilih max 4)</label>
                <input type="file" name="images" accept="image/*" multiple required className="block w-full text-sm text-gray-500 file:mr-4 file:py-3 file:px-6 file:rounded-xl file:border-0 file:text-sm file:font-bold file:bg-black file:text-white hover:file:bg-gray-800 file:cursor-pointer bg-[#F0EEED] rounded-xl outline-none" />
              </div>
              <div><label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 block">Nama Produk</label><input type="text" name="name" required className="w-full bg-[#F0EEED] rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-black outline-none" /></div>
              <div><label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 block">Harga (Rp)</label><input type="number" name="price" required className="w-full bg-[#F0EEED] rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-black outline-none" /></div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 block">Kategori</label>
                  <select name="category" required className="w-full bg-[#F0EEED] rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-black outline-none appearance-none"><option value="polos">Sprei Polos</option><option value="motif">Sprei Motif</option><option value="bedcover">Bedcover Set</option></select>
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 block">Ukuran</label>
                  <select name="size" required className="w-full bg-[#F0EEED] rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-black outline-none appearance-none"><option value="single">Single</option><option value="queen">Queen</option><option value="king">King</option><option value="extra king">Extra King</option></select>
                </div>
              </div>
              <div><label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 block">Deskripsi</label><textarea name="description" rows={3} required className="w-full bg-[#F0EEED] rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-black outline-none"></textarea></div>
              <button type="submit" disabled={isSubmitting} className="w-full bg-black text-white font-bold py-4 rounded-xl hover:bg-gray-800 transition-all mt-2 disabled:bg-gray-400">{isSubmitting ? "Menyimpan..." : "Simpan Produk"}</button>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================== */}
      {/* 2. POPUP EDIT */}
      {/* ========================================================== */}
      {editData && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-2xl rounded-[2rem] p-8 max-h-[90vh] overflow-y-auto relative animate-in fade-in zoom-in-95 duration-200">
            <button onClick={() => setEditData(null)} className="absolute top-6 right-6 p-2 bg-gray-100 text-gray-600 rounded-full hover:bg-red-50 hover:text-red-500 transition-colors"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg></button>
            <h2 className="text-2xl font-black mb-6 border-b border-gray-100 pb-4 uppercase tracking-tighter">Edit Produk</h2>
            <form onSubmit={handleEditSubmit} className="flex flex-col gap-5">
              <input type="hidden" name="id" value={editData.id} />
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 block">Foto Baru (Pilih max 4. Kosongkan jika tidak diganti)</label>
                <input type="file" name="images" accept="image/*" multiple className="block w-full text-sm text-gray-500 file:mr-4 file:py-3 file:px-6 file:rounded-xl file:border-0 file:text-sm file:font-bold file:bg-gray-200 file:text-black hover:file:bg-gray-300 file:cursor-pointer bg-[#F0EEED] rounded-xl outline-none" />
              </div>
              <div><label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 block">Nama Produk</label><input type="text" name="name" defaultValue={editData.name} required className="w-full bg-[#F0EEED] rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-black outline-none" /></div>
              <div><label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 block">Harga (Rp)</label><input type="number" name="price" defaultValue={editData.price} required className="w-full bg-[#F0EEED] rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-black outline-none" /></div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 block">Kategori</label>
                  <select name="category" defaultValue={editData.category} required className="w-full bg-[#F0EEED] rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-black outline-none appearance-none"><option value="polos">Sprei Polos</option><option value="motif">Sprei Motif</option><option value="bedcover">Bedcover Set</option></select>
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 block">Ukuran</label>
                  <select name="size" defaultValue={editData.size} required className="w-full bg-[#F0EEED] rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-black outline-none appearance-none"><option value="single">Single</option><option value="queen">Queen</option><option value="king">King</option><option value="extra king">Extra King</option></select>
                </div>
              </div>
              <div><label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 block">Deskripsi</label><textarea name="description" defaultValue={editData.description} rows={3} required className="w-full bg-[#F0EEED] rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-black outline-none"></textarea></div>
              <button type="submit" disabled={isSubmitting} className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition-all mt-2 disabled:bg-gray-400">{isSubmitting ? "Menyimpan Perubahan..." : "Update Produk"}</button>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================== */}
      {/* 3. POPUP READ (DETAIL) - DENGAN FITUR SWIPE & KLIK ZOOM */}
      {/* ========================================================== */}
      {readData && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-3xl rounded-[2.5rem] p-6 md:p-10 max-h-[90vh] overflow-y-auto relative animate-in fade-in zoom-in-95 duration-200">
            <button onClick={() => setReadData(null)} className="absolute top-6 right-6 p-2 bg-gray-100 text-gray-600 rounded-full hover:bg-red-50 hover:text-red-500 transition-colors z-20"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg></button>
            
            <div className="flex flex-col md:flex-row gap-8">
              
              <div className="w-full md:w-1/2 flex flex-col gap-3">
                {/* Gambar Utama (Bisa Swipe & Klik untuk Zoom) */}
                <div 
                  className="bg-[#F0EEED] rounded-3xl overflow-hidden aspect-square border border-gray-100 relative group cursor-zoom-in select-none"
                  onClick={() => setIsAdminLightboxOpen(true)}
                  onTouchStart={onTouchStart}
                  onTouchMove={onTouchMove}
                  onTouchEnd={onTouchEnd}
                >
                  <img src={readData.imageUrls[readImageIndex]} alt={readData.name} className="w-full h-full object-cover mix-blend-multiply transition-opacity duration-300" draggable="false" />
                  
                  {/* Label Jumlah Gambar */}
                  <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm text-white text-[10px] font-bold px-3 py-1.5 rounded-full z-10">
                    {readImageIndex + 1} / {readData.imageUrls.length}
                  </div>

                  {/* Tombol Panah (Desktop) */}
                  {readData.imageUrls.length > 1 && (
                    <>
                      <button onClick={prevReadImage} className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 bg-white/80 backdrop-blur-sm hover:bg-white rounded-full shadow-md text-black opacity-0 group-hover:opacity-100 transition-all hidden md:block">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                      </button>
                      <button onClick={nextReadImage} className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 bg-white/80 backdrop-blur-sm hover:bg-white rounded-full shadow-md text-black opacity-0 group-hover:opacity-100 transition-all hidden md:block">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                      </button>
                    </>
                  )}
                </div>

                {/* Thumbnails Bawah */}
                {readData.imageUrls.length > 1 && (
                  <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-2">
                     {readData.imageUrls.map((img, idx) => (
                       <img 
                         key={idx} 
                         src={img} 
                         onClick={() => setReadImageIndex(idx)}
                         className={`w-16 h-16 object-cover rounded-xl border cursor-pointer transition-all flex-shrink-0 ${readImageIndex === idx ? 'border-black opacity-100' : 'border-gray-200 opacity-50 hover:opacity-100'}`} 
                       />
                     ))}
                  </div>
                )}
              </div>

              <div className="w-full md:w-1/2 flex flex-col pt-2">
                <div className="flex gap-2 mb-3">
                  <span className="bg-gray-100 px-3 py-1 rounded-full text-[10px] font-bold text-gray-600 uppercase tracking-wider">{readData.category}</span>
                  <span className="bg-black text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">{readData.size}</span>
                </div>
                <h2 className="text-3xl font-black uppercase tracking-tighter mb-2 leading-tight">{readData.name}</h2>
                <div className="text-2xl font-bold text-gray-400 mb-6">Rp{readData.price.toLocaleString("id-ID")}</div>
                
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Deskripsi Produk</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">{readData.description}</p>
                
                <div className="mt-auto pt-6 border-t border-gray-100 grid grid-cols-2 gap-4">
                   <button onClick={() => { setEditData(readData); setReadData(null); }} className="py-3 bg-blue-50 text-blue-600 font-bold rounded-xl hover:bg-blue-600 hover:text-white transition-colors text-sm">Edit Produk</button>
                   <button onClick={() => { handleDelete(readData.id); setReadData(null); }} className="py-3 bg-[#FF3333]/10 text-[#FF3333] font-bold rounded-xl hover:bg-[#FF3333] hover:text-white transition-colors text-sm">Hapus</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================== */}
      {/* 4. POPUP LIGHTBOX (ZOOM FULLSCREEN) UNTUK ADMIN */}
      {/* ========================================================== */}
      {isAdminLightboxOpen && readData && (
        <div className="fixed inset-0 z-[110] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          
          <button onClick={() => setIsAdminLightboxOpen(false)} className="absolute top-6 right-6 md:top-10 md:right-10 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors z-50">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
          
          <div className="relative w-full h-full flex items-center justify-center select-none" onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
            <img 
              src={readData.imageUrls[readImageIndex]} 
              alt={`Zoom`} 
              className="max-w-full max-h-[85vh] object-contain drop-shadow-2xl animate-in zoom-in-95 duration-300" 
              draggable="false" 
            />
            
            {readData.imageUrls.length > 1 && (
              <>
                <button onClick={prevReadImage} className="absolute left-0 md:left-10 p-4 text-white/50 hover:text-white transition-colors transform hover:-translate-x-1">
                  <svg className="w-12 h-12 md:w-16 md:h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                </button>
                <button onClick={nextReadImage} className="absolute right-0 md:right-10 p-4 text-white/50 hover:text-white transition-colors transform hover:translate-x-1">
                  <svg className="w-12 h-12 md:w-16 md:h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                </button>
              </>
            )}
          </div>
        </div>
      )}

    </div>
  );
}