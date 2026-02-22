// File: app/product/[id]/ProductGallery.tsx
"use client";
import { useState } from "react";

export default function ProductGallery({ images = [], productName }: { images?: string[], productName: string }) {
  // Sistem Pengaman agar tidak pernah error
  const safeImages = Array.isArray(images) && images.length > 0 
    ? images 
    : ["https://via.placeholder.com/400x500?text=Sprei+Premium"];

  // State untuk melacak urutan gambar dan status Pop-up (Lightbox)
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // State untuk mendeteksi gesekan (Swipe) di layar HP
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // --- FUNGSI NAVIGASI GAMBAR ---
  const nextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation(); // Mencegah klik tombol memicu klik gambar
    setCurrentIndex((prev) => (prev === safeImages.length - 1 ? 0 : prev + 1));
  };

  const prevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? safeImages.length - 1 : prev - 1));
  };

  // --- FUNGSI DETEKSI SWIPE (GESER LAYAR) ---
  const minSwipeDistance = 50; 
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };
  const onTouchMove = (e: React.TouchEvent) => setTouchEnd(e.targetTouches[0].clientX);
  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe) nextImage();
    if (isRightSwipe) prevImage();
  };

  return (
    <>
      {/* ========================================== */}
      {/* 1. TAMPILAN HALAMAN DETAIL PRODUK          */}
      {/* ========================================== */}
      <div className="flex flex-col-reverse lg:flex-row gap-4 lg:gap-6 h-auto lg:h-[600px]">
        
        {/* Thumbnail Kecil di Kiri/Bawah */}
        <div className="flex lg:flex-col gap-4 overflow-x-auto lg:overflow-y-auto w-full lg:w-36 flex-shrink-0 hide-scrollbar py-2 lg:py-0">
          {safeImages.map((img, idx) => (
            <div 
              key={idx} 
              onClick={() => setCurrentIndex(idx)}
              className={`w-24 h-24 lg:w-full lg:h-36 bg-[#F0EEED] rounded-2xl overflow-hidden border-2 flex-shrink-0 cursor-pointer transition-all ${currentIndex === idx ? 'border-black opacity-100' : 'border-transparent opacity-50 hover:opacity-100 hover:border-gray-300'}`}
            >
              <img src={img} className="object-cover w-full h-full mix-blend-multiply" alt={`Thumbnail ${idx+1}`} />
            </div>
          ))}
        </div>

        {/* Kotak Gambar Utama (Bisa di-swipe & diklik untuk Zoom) */}
        <div 
          className="flex-1 bg-[#F0EEED] rounded-[2rem] overflow-hidden relative flex items-center justify-center cursor-zoom-in group select-none"
          onClick={() => setIsLightboxOpen(true)}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {/* Label jumlah gambar (Hanya muncul di HP) */}
          <div className="absolute top-6 left-6 bg-black/50 backdrop-blur-sm text-white text-[10px] font-bold px-3 py-1.5 rounded-full lg:hidden z-10">
            {currentIndex + 1} / {safeImages.length}
          </div>

          <img 
            src={safeImages[currentIndex]} 
            alt={productName} 
            className="object-cover w-full h-full mix-blend-multiply transition-opacity duration-300" 
            draggable="false"
          />

          {/* Tombol Panah Kiri & Kanan (Muncul jika gambar > 1) */}
          {safeImages.length > 1 && (
            <>
              <button onClick={prevImage} className="absolute left-4 p-3.5 bg-white/80 backdrop-blur-sm hover:bg-white rounded-full shadow-lg text-black opacity-0 group-hover:opacity-100 transition-all transform hover:scale-110 hidden md:block">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
              </button>
              <button onClick={nextImage} className="absolute right-4 p-3.5 bg-white/80 backdrop-blur-sm hover:bg-white rounded-full shadow-lg text-black opacity-0 group-hover:opacity-100 transition-all transform hover:scale-110 hidden md:block">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
              </button>
            </>
          )}
        </div>
      </div>

      {/* ========================================== */}
      {/* 2. POP-UP ZOOM (LIGHTBOX) FULL SCREEN      */}
      {/* ========================================== */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          
          {/* Tombol Tutup (X) */}
          <button 
            onClick={() => setIsLightboxOpen(false)} 
            className="absolute top-6 right-6 md:top-10 md:right-10 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors z-50"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
          
          {/* Area Gambar Zoom (Bisa di-swipe juga) */}
          <div 
            className="relative w-full h-full flex items-center justify-center select-none"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <img 
              src={safeImages[currentIndex]} 
              alt={`Zoom ${productName}`} 
              className="max-w-full max-h-[85vh] object-contain drop-shadow-2xl animate-in zoom-in-95 duration-300" 
              draggable="false"
            />
            
            {/* Tombol Panah di dalam Zoom */}
            {safeImages.length > 1 && (
              <>
                <button onClick={prevImage} className="absolute left-0 md:left-10 p-4 text-white/50 hover:text-white transition-colors transform hover:-translate-x-1">
                  <svg className="w-12 h-12 md:w-16 md:h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                </button>
                <button onClick={nextImage} className="absolute right-0 md:right-10 p-4 text-white/50 hover:text-white transition-colors transform hover:translate-x-1">
                  <svg className="w-12 h-12 md:w-16 md:h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                </button>
              </>
            )}
          </div>
          
          {/* Titik Indikator di bawah layar Zoom */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
             {safeImages.map((_, idx) => (
                <div 
                  key={idx} 
                  onClick={() => setCurrentIndex(idx)}
                  className={`rounded-full transition-all cursor-pointer ${currentIndex === idx ? 'w-8 h-2.5 bg-white' : 'w-2.5 h-2.5 bg-white/30 hover:bg-white/50'}`} 
                />
             ))}
          </div>

        </div>
      )}
    </>
  );
}