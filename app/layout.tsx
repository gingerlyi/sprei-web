// File: app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  // 👇 Mengubah Judul Tab Browser 👇
  title: "SpreiKu | Kenyamanan Tidur Tanpa Kompromi",
  
  // 👇 Deskripsi untuk Google/SEO 👇
  description: "Katalog sprei premium buatan lokal dengan kualitas hotel bintang 5.",
  
  // 👇 INI ADALAH KODE UNTUK MENGUBAH ICON TAB 👇
  icons: {
    // Pastikan ekstensi file Anda benar (.png, .jpg, atau .ico).
    // Jika file Anda adalah icon_tab.jpg, maka ubah tulisan .png di bawah menjadi .jpg
    icon: "/icon_tab.svg", // Icon untuk tab browser
    apple: "/icon_tab.svg", // Icon jika website disimpan di layar Home HP (Opsional)
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Mengubah bahasa website ke Indonesia agar ramah mesin pencari lokal
    <html lang="id">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}