"use client";

import Link from "next/link";
import { useState, useEffect, useRef, Suspense } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  const [search, setSearch] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsVisible(currentScrollY <= lastScrollY.current || currentScrollY <= 100);
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = search.trim();
    if (query) {
      router.push(`/posts?q=${encodeURIComponent(query)}`);
    }
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* CSS INTERNAL */}
      <style>{`
        * { font-family: "Times New Roman", Times, serif !important; }
        .hover-bold-fix:hover { text-shadow: 0.6px 0px 0px currentColor; }
      `}</style>

      {/* --- NAVIGATION --- */}
      <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 bg-white shadow-md border-b border-gray-100 flex items-center h-[72px] ${isVisible ? "translate-y-0" : "-translate-y-full"}`}>
        <div className="max-w-[1400px] mx-auto px-6 w-full flex justify-between items-center">
          <Link href="/" className="flex items-center group py-2">
            <img src="/logo.png" alt="Logo" className="h-10 md:h-12 w-auto transition-transform group-hover:scale-110" />
            <span className="ml-3 text-xl md:text-2xl font-bold text-blue-700 uppercase hidden xs:block">REAL MADRID</span>
          </Link>

          {/* Menu Desktop */}
          <div className="hidden md:flex items-center gap-8">
            <form onSubmit={handleSearch} className="relative group">
              <input 
                type="text" 
                placeholder="Tìm bài viết..." 
                className="pl-2 pr-10 py-1 border-b border-gray-200 outline-none w-40 focus:w-60 transition-all text-black"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button type="submit" className="absolute right-2 top-1">🔍</button>
            </form>
            <Link href="/" className="text-lg font-medium hover-bold-fix hover:text-blue-600 uppercase">Trang chủ</Link>
            <Link href="/posts" className="text-lg font-medium hover-bold-fix hover:text-blue-600 uppercase">Bài Viết</Link>
            <Link href="/services" className="text-lg font-medium hover-bold-fix hover:text-blue-600 uppercase">Dịch Vụ</Link>
            <Link href="/contact" className="text-lg font-medium hover-bold-fix hover:text-blue-600 uppercase">Liên Hệ</Link>
          </div>

          {/* Nút Mobile Menu */}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden flex flex-col justify-center items-center w-10 h-10 border border-gray-100 rounded-md bg-gray-50">
            <div className={`w-6 h-0.5 bg-blue-700 transition-all ${isMenuOpen ? "rotate-45 translate-y-2" : ""}`}></div>
            <div className={`w-6 h-0.5 bg-blue-700 my-1.5 ${isMenuOpen ? "opacity-0" : ""}`}></div>
            <div className={`w-6 h-0.5 bg-blue-700 transition-all ${isMenuOpen ? "-rotate-45 -translate-y-2" : ""}`}></div>
          </button>
        </div>

        {/* Mobile Dropdown */}
        <div className={`md:hidden absolute top-[72px] left-0 right-0 bg-white border-b border-gray-100 shadow-2xl transition-all duration-500 overflow-hidden ${isMenuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}>
          <div className="flex flex-col p-6 gap-3 text-center">
            {["Trang chủ", "Bài Viết", "Dịch Vụ", "Liên Hệ"].map((item) => (
              <Link key={item} href={item === "Trang chủ" ? "/" : item === "Bài Viết" ? "/posts" : item === "Dịch Vụ" ? "/services" : "/contact"} onClick={() => setIsMenuOpen(false)} className="text-xl font-black text-gray-900 uppercase hover:text-blue-600">{item}</Link>
            ))}
          </div>
        </div>
      </nav>

      {/* --- PHẦN NỘI DUNG CHÍNH (FIX LỖI BUILD Ở ĐÂY) --- */}
      <main className="w-full pt-[72px] min-h-screen">
        <Suspense fallback={<div className="py-40 text-center font-bold uppercase tracking-widest">Đang tải nội dung...</div>}>
          {children}
        </Suspense>
      </main>

      {/* --- FOOTER ĐẦY ĐỦ --- */}
      <footer className="bg-white border-t border-gray-100 pt-20 pb-10 mt-20">
        <div className="max-w-[1400px] mx-auto px-6 text-center md:text-left">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-20 items-start">
            <div className="flex flex-col gap-6 items-center md:items-start">
              <div className="flex items-center">
                <img src="/logo.png" alt="Logo" className="h-16 w-auto" />
                <span className="ml-4 text-3xl font-black text-blue-700 uppercase">REAL MADRID</span>
              </div>
              <p className="text-gray-600 text-lg leading-relaxed max-w-md">
                Hành trình chinh phục những đỉnh cao và đam mê bất diệt cùng đội bóng vĩ đại nhất thế giới. Hala Madrid!
              </p>
            </div>

            <div className="flex flex-col items-center md:items-start">
              <h4 className="text-xl font-black text-gray-900 uppercase mb-8 border-b-4 border-blue-600 w-fit pb-2">Điều hướng</h4>
              <ul className="flex flex-col gap-5 text-gray-700 text-lg font-medium">
                <li><Link href="/" className="hover:text-blue-600 transition-all hover:pl-2">Trang chủ</Link></li>
                <li><Link href="/posts" className="hover:text-blue-600 transition-all hover:pl-2">Bài viết mới nhất</Link></li>
                <li><Link href="/services" className="hover:text-blue-600 transition-all hover:pl-2">Dịch vụ</Link></li>
                <li><Link href="/contact" className="hover:text-blue-600 transition-all hover:pl-2">Liên hệ hỗ trợ</Link></li>
              </ul>
            </div>

            <div className="flex flex-col items-center md:items-start">
              <h4 className="text-xl font-black text-gray-900 uppercase mb-8 border-b-4 border-blue-600 w-fit pb-2">Liên hệ</h4>
              <div className="flex flex-col gap-6 text-gray-700 text-lg font-medium">
                <p>● Madrid, Spain</p>
                <p>● contact@realmadrid-blog.com</p>
                <p>● Hotline: (+34) 91 398 43 00</p>
              </div>
            </div>
          </div>
          <div className="pt-10 border-t border-gray-100 text-center text-gray-400 font-black uppercase text-sm">
            <p>© Thiết kế bởi Madridista - Hala Madrid</p>
          </div>
        </div>
      </footer>
    </>
  );
}