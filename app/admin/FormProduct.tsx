// File: app/admin/FormProduct.tsx
"use client";

import { useState, useRef } from "react";

export default function FormProduct({ addAction }: { addAction: (formData: FormData) => Promise<void> }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  
  // State untuk Notifikasi (Toast)
  const [toast, setToast] = useState<{ message: string; type: "error" | "success" } | null>(null);

  // Fungsi untuk memunculkan notifikasi selama 4 detik
  const showToast = (message: string, type: "error" | "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 
    
    const formData = new FormData(e.currentTarget);
    const file = formData.get("image") as File;

    const maxSizeInBytes = 3 * 1024 * 1024; // Maks 3 MB
    
    if (file && file.size > maxSizeInBytes) {
      const fileSizeInMB = (file.size / (1024 * 1024)).toFixed(2);
      showToast(`Ukuran gambar ${fileSizeInMB} MB. Maksimal yang diizinkan 3 MB!`, "error");
      return; 
    }

    setIsSubmitting(true);
    try {
      await addAction(formData);
      formRef.current?.reset(); 
      showToast("Hore! Produk berhasil ditambahkan.", "success");
    } catch (error) {
      showToast("Terjadi kesalahan saat menyimpan data.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 xl:sticky xl:top-10 relative">
      <h2 className="text-xl font-black mb-6 border-b border-gray-100 pb-4 uppercase tracking-tighter">Tambah Produk</h2>
      
      {/* NOTIFIKASI TOAST CUSTOM */}
      {toast && (
        <div className={`absolute -top-16 left-0 right-0 p-4 rounded-xl shadow-xl flex items-center justify-center gap-2 text-sm font-bold z-50 transition-all ${toast.type === 'error' ? 'bg-[#FFEAEA] text-[#FF3333] border border-[#FF3333]/20' : 'bg-black text-white'}`}>
          {toast.type === 'error' ? '⚠️' : '✅'} {toast.message}
        </div>
      )}

      <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div>
          <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 block">Foto Produk</label>
          <div className="relative">
            <input 
              type="file" 
              name="image" 
              accept="image/jpeg, image/png, image/webp" 
              required 
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-3 file:px-6 file:rounded-xl file:border-0 file:text-sm file:font-bold file:bg-black file:text-white hover:file:bg-gray-800 file:cursor-pointer bg-[#F0EEED] rounded-xl outline-none transition-all"
            />
          </div>
          <p className="text-[10px] text-gray-400 font-medium mt-2">*Maksimal 3MB. Jika lebih dari 3MB, akan ditolak otomatis.</p>
        </div>

        <div>
          <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 block">Nama Produk</label>
          <input type="text" name="name" required placeholder="Contoh: Katun Jepang Motif Bunga" className="w-full bg-[#F0EEED] rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-black transition-all" />
        </div>
        
        <div>
          <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 block">Harga (Rp)</label>
          <input type="number" name="price" required placeholder="Contoh: 250000" className="w-full bg-[#F0EEED] rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-black transition-all" />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 block">Kategori</label>
            <select name="category" required className="w-full bg-[#F0EEED] rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-black cursor-pointer appearance-none">
              <option value="polos">Sprei Polos</option>
              <option value="motif">Sprei Motif</option>
              <option value="bedcover">Bedcover Set</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 block">Ukuran</label>
            <select name="size" required className="w-full bg-[#F0EEED] rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-black cursor-pointer appearance-none">
              <option value="single">Single</option>
              <option value="queen">Queen</option>
              <option value="king">King</option>
              <option value="extra king">Extra King</option>
            </select>
          </div>
        </div>

        <div>
          <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 block">Deskripsi</label>
          <textarea name="description" rows={3} required placeholder="Jelaskan detail bahan sprei..." className="w-full bg-[#F0EEED] rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-black transition-all"></textarea>
        </div>

        <button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full bg-black text-white font-bold py-4 rounded-xl hover:bg-gray-800 hover:shadow-xl transition-all mt-2 disabled:bg-gray-400 disabled:cursor-not-allowed flex justify-center items-center gap-2"
        >
          {isSubmitting ? (
            <><span className="animate-spin text-xl">↻</span> Menyimpan...</>
          ) : (
             "Simpan ke Database"
          )}
        </button>
      </form>
    </div>
  );
}