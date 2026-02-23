// File: app/admin/AdminClient.tsx
"use client";

import { useState, useRef } from "react";

type Product = {
  id: string;
  name: string;
  price: number;
  stock: number; // <-- Tambahkan tipe stock
  imageUrls: string[];
  category: string;
  size: string;
  description: string;
};

export default function AdminClient({ products, addAction, editAction, deleteAction }: any) {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [readData, setReadData] = useState<Product | null>(null);
  const [editData, setEditData] = useState<Product | null>(null);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "error" | "success" } | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const [readImageIndex, setReadImageIndex] = useState(0);
  const [isAdminLightboxOpen, setIsAdminLightboxOpen] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const showToast = (message: string, type: "error" | "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const handleOpenRead = (p: Product) => { setReadData(p); setReadImageIndex(0); };
  const nextReadImage = (e?: React.MouseEvent) => { e?.stopPropagation(); if (readData) setReadImageIndex((prev) => (prev === readData.imageUrls.length - 1 ? 0 : prev + 1)); };
  const prevReadImage = (e?: React.MouseEvent) => { e?.stopPropagation(); if (readData) setReadImageIndex((prev) => (prev === 0 ? readData.imageUrls.length - 1 : prev - 1)); };

  const onTouchStart = (e: React.TouchEvent) => { setTouchEnd(null); setTouchStart(e.targetTouches[0].clientX); };
  const onTouchMove = (e: React.TouchEvent) => setTouchEnd(e.targetTouches[0].clientX);
  const onTouchEnd = () => {
    if (!touchStart || !touchEnd || !readData) return;
    const distance = touchStart - touchEnd;
    if (distance > 50) nextReadImage();
    if (distance < -50) prevReadImage();
  };

  const validateFiles = (files: File[]) => {
    if (files.length > 4) { showToast("Maksimal upload 4 gambar sekaligus!", "error"); return false; }
    for (const file of files) {
      if (file.size > 3 * 1024 * 1024) { showToast(`Gambar "${file.name}" terlalu besar! Maks 3 MB.`, "error"); return false; }
    }
    return true;
  };

  const handleAddSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 
    const formData = new FormData(e.currentTarget);
    const files = formData.getAll("images") as File[];
    if (files[0].size > 0 && !validateFiles(files)) return;
    setIsSubmitting(true);
    try { await addAction(formData); setIsAddOpen(false); showToast("Produk ditambahkan.", "success"); } 
    catch (error) { showToast("Gagal menyimpan.", "error"); } 
    finally { setIsSubmitting(false); }
  };

  const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 
    const formData = new FormData(e.currentTarget);
    const files = formData.getAll("images") as File[];
    if (files[0].size > 0 && !validateFiles(files)) return;
    setIsSubmitting(true);
    try { await editAction(formData); setEditData(null); showToast("Produk diperbarui.", "success"); } 
    catch (error) { showToast("Gagal mengupdate.", "error"); } 
    finally { setIsSubmitting(false); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Hapus produk ini?")) return;
    const formData = new FormData(); formData.append("id", id);
    try { await deleteAction(formData); showToast("Produk dihapus.", "success"); } 
    catch (error) { showToast("Gagal menghapus.", "error"); }
  };

  return (
    <div className="min-h-screen bg-[#F8F8F8] p-5 md:p-8 font-sans text-slate-900 selection:bg-gray-200 relative">
      
      {toast && (
        <div className={`fixed top-4 left-1/2 -translate-x-1/2 px-5 py-2.5 rounded-full shadow-2xl flex items-center justify-center gap-2 text-xs font-bold z-[200] transition-all animate-in slide-in-from-top-4 ${toast.type === 'error' ? 'bg-[#FFEAEA] text-[#FF3333] border border-[#FF3333]/20' : 'bg-black text-white'}`}>
          {toast.type === 'error' ? '⚠️' : '✅'} {toast.message}
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4 bg-white p-5 md:p-6 rounded-[1.5rem] shadow-sm border border-gray-100">
          <div>
            <h1 className="text-xl md:text-2xl font-black uppercase tracking-tighter">Admin Workspace</h1>
            <p className="text-gray-500 text-xs font-medium mt-1">Kelola katalog SpreiKu.</p>
          </div>
          <div className="flex items-center gap-3">
            <a href="/" className="px-5 py-2.5 bg-gray-100 rounded-full text-xs font-bold hover:bg-gray-200 transition-all flex items-center justify-center">Lihat Web ↗</a>
            <button onClick={() => setIsAddOpen(true)} className="px-5 py-2.5 bg-black text-white rounded-full text-xs font-bold hover:bg-gray-800 hover:shadow-xl transition-all flex items-center gap-1.5">
              <span className="text-base leading-none">+</span> Tambah
            </button>
          </div>
        </div>

        <div className="bg-white p-5 md:p-6 rounded-[1.5rem] shadow-sm border border-gray-100">
          <div className="overflow-x-auto pb-4">
            <table className="w-full text-left border-collapse min-w-[500px]">
              <thead>
                <tr className="border-b-2 border-gray-100 text-gray-400 text-[10px] uppercase tracking-widest">
                  <th className="pb-3 font-bold">Produk</th>
                  <th className="pb-3 font-bold">Kategori & Ukuran</th>
                  <th className="pb-3 font-bold text-right">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p: Product) => (
                  <tr key={p.id} className="border-b border-gray-50 hover:bg-[#F8F8F8] transition-colors group">
                    <td className="py-3 flex items-center gap-4 pr-3">
                      <div className="w-12 h-12 rounded-lg bg-[#F0EEED] overflow-hidden flex-shrink-0 border border-gray-200">
                        <img src={p.imageUrls?.[0] || ""} alt={p.name} className="w-full h-full object-cover mix-blend-multiply" />
                      </div>
                      <div>
                        <div className="font-bold text-sm leading-tight uppercase tracking-tight">{p.name}</div>
                        <div className="text-xs font-bold text-gray-400 mt-0.5">Rp{p.price.toLocaleString("id-ID")} • Stok: {p.stock}</div>
                      </div>
                    </td>
                    <td className="py-3">
                      <div className="flex flex-wrap gap-1.5 items-center">
                        <span className="bg-[#F0EEED] px-2.5 py-1 rounded text-[9px] font-bold text-gray-600 uppercase tracking-wider">{p.category}</span>
                        <span className="bg-black text-white px-2.5 py-1 rounded text-[9px] font-bold uppercase tracking-wider">{p.size}</span>
                      </div>
                    </td>
                    <td className="py-3 text-right">
                      <div className="flex justify-end items-center gap-1.5 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                        <button onClick={() => handleOpenRead(p)} className="p-2 bg-gray-100 hover:bg-black text-gray-600 hover:text-white rounded-lg transition-all"><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg></button>
                        <button onClick={() => setEditData(p)} className="p-2 bg-blue-50 hover:bg-blue-600 text-blue-600 hover:text-white rounded-lg transition-all"><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg></button>
                        <button onClick={() => handleDelete(p.id)} className="p-2 bg-[#FF3333]/10 hover:bg-[#FF3333] text-[#FF3333] hover:text-white rounded-lg transition-all"><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* POPUP TAMBAH */}
      {isAddOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-[1.5rem] p-6 max-h-[90vh] overflow-y-auto relative animate-in fade-in zoom-in-95 duration-200">
            <button onClick={() => setIsAddOpen(false)} className="absolute top-5 right-5 p-1.5 bg-gray-100 text-gray-600 rounded-full hover:bg-red-50 hover:text-red-500 transition-colors"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg></button>
            <h2 className="text-xl font-black mb-5 border-b border-gray-100 pb-3 uppercase tracking-tighter">Tambah Produk</h2>
            <form ref={formRef} onSubmit={handleAddSubmit} className="flex flex-col gap-4">
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 block">Foto (Max 4)</label>
                <input type="file" name="images" accept="image/*" multiple required className="block w-full text-xs text-gray-500 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-black file:text-white hover:file:bg-gray-800 bg-[#F0EEED] rounded-lg outline-none" />
              </div>
              <div><label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 block">Nama Produk</label><input type="text" name="name" required className="w-full bg-[#F0EEED] rounded-lg px-3 py-2 text-xs font-medium outline-none focus:ring-1 focus:ring-black" /></div>
              
              {/* Kolom Harga & Stok Bersebelahan */}
              <div className="grid grid-cols-2 gap-3">
                <div><label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 block">Harga (Rp)</label><input type="number" name="price" required className="w-full bg-[#F0EEED] rounded-lg px-3 py-2 text-xs font-medium outline-none focus:ring-1 focus:ring-black" /></div>
                <div><label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 block">Stok Barang</label><input type="number" name="stock" defaultValue={10} required className="w-full bg-[#F0EEED] rounded-lg px-3 py-2 text-xs font-medium outline-none focus:ring-1 focus:ring-black" /></div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div><label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 block">Kategori</label><select name="category" className="w-full bg-[#F0EEED] rounded-lg px-3 py-2 text-xs font-medium outline-none appearance-none"><option value="polos">Polos</option><option value="motif">Motif</option><option value="bedcover">Bedcover</option></select></div>
                <div><label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 block">Ukuran</label><select name="size" className="w-full bg-[#F0EEED] rounded-lg px-3 py-2 text-xs font-medium outline-none appearance-none"><option value="single">Single</option><option value="queen">Queen</option><option value="king">King</option><option value="extra king">Extra King</option></select></div>
              </div>
              <div><label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 block">Deskripsi</label><textarea name="description" rows={3} required className="w-full bg-[#F0EEED] rounded-lg px-3 py-2 text-xs font-medium outline-none focus:ring-1 focus:ring-black"></textarea></div>
              <button type="submit" disabled={isSubmitting} className="w-full bg-black text-white font-bold py-3 rounded-lg hover:bg-gray-800 transition-all text-xs disabled:bg-gray-400">{isSubmitting ? "Menyimpan..." : "Simpan"}</button>
            </form>
          </div>
        </div>
      )}

      {/* POPUP EDIT */}
      {editData && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-[1.5rem] p-6 max-h-[90vh] overflow-y-auto relative animate-in fade-in zoom-in-95 duration-200">
            <button onClick={() => setEditData(null)} className="absolute top-5 right-5 p-1.5 bg-gray-100 text-gray-600 rounded-full hover:bg-red-50 hover:text-red-500 transition-colors"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg></button>
            <h2 className="text-xl font-black mb-5 border-b border-gray-100 pb-3 uppercase tracking-tighter">Edit Produk</h2>
            <form onSubmit={handleEditSubmit} className="flex flex-col gap-4">
              <input type="hidden" name="id" value={editData.id} />
              <div><label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 block">Foto Baru (Opsional)</label><input type="file" name="images" accept="image/*" multiple className="block w-full text-xs text-gray-500 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-gray-200 file:text-black bg-[#F0EEED] rounded-lg outline-none" /></div>
              <div><label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 block">Nama Produk</label><input type="text" name="name" defaultValue={editData.name} required className="w-full bg-[#F0EEED] rounded-lg px-3 py-2 text-xs font-medium outline-none focus:ring-1 focus:ring-black" /></div>
              
              {/* Kolom Harga & Stok Bersebelahan */}
              <div className="grid grid-cols-2 gap-3">
                <div><label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 block">Harga (Rp)</label><input type="number" name="price" defaultValue={editData.price} required className="w-full bg-[#F0EEED] rounded-lg px-3 py-2 text-xs font-medium outline-none focus:ring-1 focus:ring-black" /></div>
                <div><label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 block">Stok Barang</label><input type="number" name="stock" defaultValue={editData.stock} required className="w-full bg-[#F0EEED] rounded-lg px-3 py-2 text-xs font-medium outline-none focus:ring-1 focus:ring-black" /></div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div><label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 block">Kategori</label><select name="category" defaultValue={editData.category} className="w-full bg-[#F0EEED] rounded-lg px-3 py-2 text-xs font-medium outline-none appearance-none"><option value="polos">Polos</option><option value="motif">Motif</option><option value="bedcover">Bedcover</option></select></div>
                <div><label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 block">Ukuran</label><select name="size" defaultValue={editData.size} className="w-full bg-[#F0EEED] rounded-lg px-3 py-2 text-xs font-medium outline-none appearance-none"><option value="single">Single</option><option value="queen">Queen</option><option value="king">King</option><option value="extra king">Extra King</option></select></div>
              </div>
              <div><label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 block">Deskripsi</label><textarea name="description" defaultValue={editData.description} rows={3} required className="w-full bg-[#F0EEED] rounded-lg px-3 py-2 text-xs font-medium outline-none focus:ring-1 focus:ring-black"></textarea></div>
              <button type="submit" disabled={isSubmitting} className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-all text-xs disabled:bg-gray-400">{isSubmitting ? "Menyimpan Perubahan..." : "Update"}</button>
            </form>
          </div>
        </div>
      )}

      {/* POPUP READ DENGAN SWIPE */}
      {readData && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-2xl rounded-[2rem] p-6 md:p-8 max-h-[90vh] overflow-y-auto relative animate-in fade-in zoom-in-95 duration-200">
            <button onClick={() => setReadData(null)} className="absolute top-5 right-5 p-2 bg-gray-100 text-gray-600 rounded-full hover:bg-red-50 hover:text-red-500 transition-colors z-20"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg></button>
            
            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-full md:w-1/2 flex flex-col gap-2.5">
                <div className="bg-[#F0EEED] rounded-2xl overflow-hidden aspect-square border border-gray-100 relative group cursor-zoom-in select-none" onClick={() => setIsAdminLightboxOpen(true)} onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
                  <img src={readData.imageUrls[readImageIndex]} alt={readData.name} className="w-full h-full object-cover mix-blend-multiply transition-opacity duration-300" draggable="false" />
                  <div className="absolute top-3 left-3 bg-black/50 backdrop-blur-sm text-white text-[9px] font-bold px-2 py-1 rounded-full z-10">{readImageIndex + 1} / {readData.imageUrls.length}</div>
                  {readData.imageUrls.length > 1 && (
                    <>
                      <button onClick={prevReadImage} className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 bg-white/80 backdrop-blur-sm hover:bg-white rounded-full shadow-md text-black opacity-0 group-hover:opacity-100 transition-all hidden md:block"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg></button>
                      <button onClick={nextReadImage} className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-white/80 backdrop-blur-sm hover:bg-white rounded-full shadow-md text-black opacity-0 group-hover:opacity-100 transition-all hidden md:block"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg></button>
                    </>
                  )}
                </div>
                {readData.imageUrls.length > 1 && (
                  <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1">
                     {readData.imageUrls.map((img, idx) => (
                       <img key={idx} src={img} onClick={() => setReadImageIndex(idx)} className={`w-12 h-12 object-cover rounded-lg border cursor-pointer transition-all flex-shrink-0 ${readImageIndex === idx ? 'border-black opacity-100' : 'border-gray-200 opacity-50 hover:opacity-100'}`} />
                     ))}
                  </div>
                )}
              </div>

              <div className="w-full md:w-1/2 flex flex-col pt-1">
                <div className="flex gap-1.5 mb-2">
                  <span className="bg-gray-100 px-2.5 py-1 rounded text-[9px] font-bold text-gray-600 uppercase tracking-wider">{readData.category}</span>
                  <span className="bg-black text-white px-2.5 py-1 rounded text-[9px] font-bold uppercase tracking-wider">{readData.size}</span>
                </div>
                <h2 className="text-xl font-black uppercase tracking-tighter mb-1.5 leading-tight">{readData.name}</h2>
                <div className="text-lg font-bold text-gray-400 mb-2">Rp{readData.price.toLocaleString("id-ID")}</div>
                
                <p className="text-xs font-bold text-gray-500 mb-4 bg-gray-50 inline-block px-3 py-1.5 rounded-lg w-max">Stok Barang: {readData.stock}</p>
                
                <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Deskripsi Produk</h3>
                <p className="text-gray-600 text-xs leading-relaxed mb-4">{readData.description}</p>
                
                <div className="mt-auto pt-4 border-t border-gray-100 grid grid-cols-2 gap-3">
                   <button onClick={() => { setEditData(readData); setReadData(null); }} className="py-2.5 bg-blue-50 text-blue-600 font-bold rounded-lg hover:bg-blue-600 hover:text-white transition-colors text-xs">Edit</button>
                   <button onClick={() => { handleDelete(readData.id); setReadData(null); }} className="py-2.5 bg-[#FF3333]/10 text-[#FF3333] font-bold rounded-lg hover:bg-[#FF3333] hover:text-white transition-colors text-xs">Hapus</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* POPUP LIGHTBOX ADMIN */}
      {isAdminLightboxOpen && readData && (
        <div className="fixed inset-0 z-[110] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <button onClick={() => setIsAdminLightboxOpen(false)} className="absolute top-6 right-6 md:top-10 md:right-10 p-2.5 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors z-50"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg></button>
          <div className="relative w-full h-full flex items-center justify-center select-none" onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
            <img src={readData.imageUrls[readImageIndex]} alt={`Zoom`} className="max-w-full max-h-[85vh] object-contain drop-shadow-2xl animate-in zoom-in-95 duration-300" draggable="false" />
            {readData.imageUrls.length > 1 && (
              <>
                <button onClick={prevReadImage} className="absolute left-0 md:left-10 p-4 text-white/50 hover:text-white transition-colors transform hover:-translate-x-1"><svg className="w-10 h-10 md:w-14 md:h-14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg></button>
                <button onClick={nextReadImage} className="absolute right-0 md:right-10 p-4 text-white/50 hover:text-white transition-colors transform hover:translate-x-1"><svg className="w-10 h-10 md:w-14 md:h-14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg></button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}