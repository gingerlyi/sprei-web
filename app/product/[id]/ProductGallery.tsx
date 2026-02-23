// File: app/product/[id]/ProductGallery.tsx
"use client";
import { useState } from "react";

export default function ProductGallery({ images = [], productName }: { images?: string[], productName: string }) {
  const safeImages = Array.isArray(images) && images.length > 0 ? images : ["https://via.placeholder.com/400x500?text=Sprei+Premium"];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const nextImage = (e?: React.MouseEvent) => { e?.stopPropagation(); setCurrentIndex((prev) => (prev === safeImages.length - 1 ? 0 : prev + 1)); };
  const prevImage = (e?: React.MouseEvent) => { e?.stopPropagation(); setCurrentIndex((prev) => (prev === 0 ? safeImages.length - 1 : prev - 1)); };

  const onTouchStart = (e: React.TouchEvent) => { setTouchEnd(null); setTouchStart(e.targetTouches[0].clientX); };
  const onTouchMove = (e: React.TouchEvent) => setTouchEnd(e.targetTouches[0].clientX);
  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > 50) nextImage();
    if (distance < -50) prevImage();
  };

  return (
    <>
      {/* Ketinggian galeri dikurangi (h-[500px]) */}
      <div className="flex flex-col-reverse lg:flex-row gap-3 lg:gap-4 h-auto lg:h-[500px]">
        {/* Ukuran Thumbnail Diperkecil */}
        <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-y-auto w-full lg:w-28 flex-shrink-0 hide-scrollbar py-2 lg:py-0">
          {safeImages.map((img, idx) => (
            <div key={idx} onClick={() => setCurrentIndex(idx)} className={`w-20 h-20 lg:w-full lg:h-28 bg-[#F0EEED] rounded-xl overflow-hidden border-2 flex-shrink-0 cursor-pointer transition-all ${currentIndex === idx ? 'border-black opacity-100' : 'border-transparent opacity-50 hover:opacity-100 hover:border-gray-300'}`}>
              <img src={img} className="object-cover w-full h-full mix-blend-multiply" alt={`Thumbnail ${idx+1}`} />
            </div>
          ))}
        </div>

        <div className="flex-1 bg-[#F0EEED] rounded-[1.5rem] overflow-hidden relative flex items-center justify-center cursor-zoom-in group select-none" onClick={() => setIsLightboxOpen(true)} onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
          <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-1 rounded-full lg:hidden z-10">{currentIndex + 1} / {safeImages.length}</div>
          <img src={safeImages[currentIndex]} alt={productName} className="object-cover w-full h-full mix-blend-multiply transition-opacity duration-300" draggable="false" />
          
          {safeImages.length > 1 && (
            <>
              <button onClick={prevImage} className="absolute left-4 p-2.5 bg-white/80 backdrop-blur-sm hover:bg-white rounded-full shadow-lg text-black opacity-0 group-hover:opacity-100 transition-all transform hover:scale-110 hidden md:block"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg></button>
              <button onClick={nextImage} className="absolute right-4 p-2.5 bg-white/80 backdrop-blur-sm hover:bg-white rounded-full shadow-lg text-black opacity-0 group-hover:opacity-100 transition-all transform hover:scale-110 hidden md:block"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg></button>
            </>
          )}
        </div>
      </div>

      {isLightboxOpen && (
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <button onClick={() => setIsLightboxOpen(false)} className="absolute top-6 right-6 md:top-10 md:right-10 p-2.5 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors z-50"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg></button>
          <div className="relative w-full h-full flex items-center justify-center select-none" onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
            <img src={safeImages[currentIndex]} alt={`Zoom`} className="max-w-full max-h-[85vh] object-contain drop-shadow-2xl animate-in zoom-in-95 duration-300" draggable="false" />
            {safeImages.length > 1 && (
              <>
                <button onClick={prevImage} className="absolute left-0 md:left-10 p-4 text-white/50 hover:text-white transition-colors transform hover:-translate-x-1"><svg className="w-10 h-10 md:w-14 md:h-14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg></button>
                <button onClick={nextImage} className="absolute right-0 md:right-10 p-4 text-white/50 hover:text-white transition-colors transform hover:translate-x-1"><svg className="w-10 h-10 md:w-14 md:h-14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg></button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}