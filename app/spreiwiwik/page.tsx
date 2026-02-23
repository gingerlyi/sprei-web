// File: app/spreiwiwik/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");

    const formData = new FormData(e.currentTarget);
    const usernameInput = formData.get("username") as string;
    const passwordInput = formData.get("password") as string;

    // SIMULASI LOGIN (Username: admin | Password: sprei123)
    setTimeout(() => {
      if (usernameInput === "admin" && passwordInput === "sprei123") {
        document.cookie = "isLoggedIn=true; path=/; max-age=86400";
        router.push("/admin");
      } else {
        setErrorMsg("Username atau kata sandi salah!");
        setIsLoading(false);
      }
    }, 1000);
  };

  return (
    <main className="min-h-screen bg-[#F5F5F5] flex items-center justify-center p-4 font-sans text-slate-900 selection:bg-gray-200">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.05)] p-8 md:p-10 relative overflow-hidden">
        
        {/* Garis Hitam di Atas (Persis Screenshot) */}
        <div className="absolute top-0 left-0 w-full h-1.5 bg-black"></div>

        {/* Header LOGO & WORKSPACE */}
        <div className="text-center mb-8 mt-2">
          <h1 className="text-3xl font-black tracking-tighter uppercase mb-1 text-[#1A202C]">
            SPREI<span className="text-[#4A5568]">KU.</span>
          </h1>
          <p className="text-[10px] text-[#A0AEC0] font-bold uppercase tracking-widest">
            Admin Workspace
          </p>
        </div>

        {/* Pesan Error (Muncul jika salah password) */}
        {errorMsg && (
          <div className="mb-6 p-3 bg-red-50 border border-red-100 rounded-lg text-center">
             <p className="text-xs font-bold text-red-600 uppercase tracking-widest">{errorMsg}</p>
          </div>
        )}

        {/* FORM LOGIN */}
        <form onSubmit={handleLogin} className="flex flex-col gap-6">
          
          <div>
            <label className="text-[10px] font-bold text-[#A0AEC0] uppercase tracking-widest mb-2 block">
              Username / Email
            </label>
            <input 
              type="text" 
              name="username"
              required 
              placeholder="Masukkan identitas Anda..."
              className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3.5 text-sm font-medium focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all" 
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-[10px] font-bold text-[#A0AEC0] uppercase tracking-widest block">
                Kata Sandi
              </label>
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                className="text-[10px] text-[#A0AEC0] hover:text-black font-bold uppercase tracking-widest transition-colors"
              >
                {showPassword ? "SEMBUNYIKAN" : "LIHAT"}
              </button>
            </div>
            <input 
              type={showPassword ? "text" : "password"} 
              name="password"
              required 
              placeholder="••••••••"
              className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3.5 text-sm font-medium focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all" 
            />
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-black text-white font-bold py-4 rounded-lg hover:bg-gray-800 transition-all text-sm mt-2 disabled:bg-gray-400 flex justify-center items-center h-[52px]"
          >
            {isLoading ? (
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : "Masuk ke Dashboard"}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-100 text-center">
          <Link href="/katalog" className="text-[10px] text-[#A0AEC0] font-bold uppercase tracking-widest hover:text-black transition-colors">
            &larr; Kembali ke Katalog
          </Link>
        </div>

      </div>
    </main>
  );
}