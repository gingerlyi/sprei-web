import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function LoginPage() {
  async function loginAction(formData: FormData) {
    "use server";
    const password = formData.get("password") as string;
    
    if (password === "sprei123") {
      const cookieStore = await cookies();
      cookieStore.set("admin_logged_in", "true", { httpOnly: true });
      redirect("/admin");
    } else {
      redirect("/login");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-blue-50 p-6">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-xl rounded-[2rem] shadow-2xl shadow-blue-900/5 border border-white p-10">
        
        {/* Header Login */}
        <div className="text-center mb-10">
          <div className="bg-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-500/30">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight mb-2">Selamat Datang</h1>
          <p className="text-slate-500 font-medium">Silakan login untuk mengelola katalog sprei Anda.</p>
        </div>

        {/* Form */}
        <form action={loginAction} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 ml-1">Password Rahasia</label>
            <div className="relative">
              <input 
                type="password" 
                name="password" 
                required 
                placeholder="Masukkan password..." 
                className="w-full bg-slate-50 border border-slate-200 text-slate-800 px-5 py-4 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white outline-none transition-all duration-300 font-medium placeholder:font-normal"
              />
            </div>
          </div>
          
          <button 
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg py-4 rounded-xl transition-all duration-300 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-0.5"
          >
            Masuk ke Dashboard
          </button>
        </form>
        
        <div className="mt-8 text-center">
          <a href="/" className="text-sm text-slate-500 hover:text-blue-600 font-semibold transition-colors flex items-center justify-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Kembali ke Katalog Publik
          </a>
        </div>

      </div>
    </div>
  );
}