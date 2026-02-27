"use client";

import Link from "next/link";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    price: number;
    imageUrls: string[];
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link 
      href={`/product/${product.id}`} 
      className="group bg-white rounded-sm border border-gray-100 shadow-sm hover:border-violet-500 transition-all flex flex-col h-full overflow-hidden relative"
    >
      {/* CONTAINER GAMBAR */}
      <div className="relative w-full pt-[100%] bg-gray-50 border-b border-gray-100 overflow-hidden">
        <img 
          src={product.imageUrls?.[0] || "https://images.unsplash.com/photo-1505693314120-0d443867891c?q=80&w=800"} 
          alt={product.name} 
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
          onError={(e) => {
            // Jika link mati, ganti ke gambar cadangan
            (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1505693314120-0d443867891c?q=80&w=800";
          }}
        />
      </div>
      
      {/* DETAIL PRODUK */}
      <div className="p-3 flex flex-col flex-grow justify-between overflow-hidden">
        <h3 className="text-sm font-bold text-gray-900 truncate mb-1.5 group-hover:text-violet-700 transition-colors uppercase tracking-tight w-full font-sans">
          {product.name}
        </h3>
        
        <div className="mt-auto">
          <span className="font-bold text-[14px] md:text-base text-violet-700 block font-sans">
            Rp{product.price.toLocaleString("id-ID")}
          </span>
        </div>
      </div>
    </Link>
  );
}