// File: app/Navbar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [hash, setHash] = useState("");

  // Memantau perubahan hash (#) di URL
  useEffect(() => {
    setHash(window.location.hash);
    
    const handleHashChange = () => setHash(window.location.hash);
    window.addEventListener("hashchange", handleHashChange);
    
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [pathname]);

  // Logika penanda garis hitam
  const isTentangKami = hash === "#tentang-kami";
  const isHome = pathname === "/" && !isTentangKami;
  const isKatalog = pathname.startsWith("/katalog") || pathname.startsWith("/product");

  return (
    <header className="fixed w-full top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 transition-all">
      <div className="max-w-7xl mx-auto px-6 h-14 md:h-16 flex items-center justify-between">
        
        <Link href="/" onClick={() => setHash("")} className="text-xl md:text-2xl font-black tracking-tighter uppercase">
          Sprei<span className="text-gray-400">Ku</span>.
        </Link>
        
        <nav className="hidden md:flex gap-6 text-xs font-medium">
          <Link 
            href="/" 
            onClick={() => setHash("")} 
            className={`transition-colors ${isHome ? 'font-bold border-b-2 border-black pb-1' : 'hover:text-gray-500'}`}
          >
            Beranda
          </Link>
          <Link 
            href="/katalog" 
            onClick={() => setHash("")} 
            className={`transition-colors ${isKatalog ? 'font-bold border-b-2 border-black pb-1' : 'hover:text-gray-500'}`}
          >
            Katalog
          </Link>
          <Link 
            href="/#tentang-kami" 
            onClick={() => setHash("#tentang-kami")} 
            className={`transition-colors ${isTentangKami ? 'font-bold border-b-2 border-black pb-1' : 'hover:text-gray-500'}`}
          >
            Tentang Kami
          </Link>
        </nav>
      </div>
    </header>
  );
}