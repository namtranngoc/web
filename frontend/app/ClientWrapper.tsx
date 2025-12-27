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
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 bg-white shadow-md border-b border-gray-100 flex items-center h-[72px] ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 w-full flex justify-between items-center">
          <Link href="/" className="flex items-center group py-2">
            <img src="/logo.png" alt="Logo" className="h-10 md:h-12 w-auto transition-transform group-hover:scale-110" />
            <span className="ml-3 text-xl md:text-2xl font-bold text-blue-700 uppercase hidden xs:block">
              REAL MADRID
            </span>
          </Link>

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
            <Link href="/" className="text-lg font-medium hover:text-blue-600 uppercase">Trang chủ</Link>
            <Link href="/posts" className="text-lg font-medium hover:text-blue-600 uppercase">Bài Viết</Link>
            <Link href="/services" className="text-lg font-medium hover:text-blue-600 uppercase">Dịch Vụ</Link>
            <Link href="/contact" className="text-lg font-medium hover:text-blue-600 uppercase">Liên Hệ</Link>
          </div>
          
          {/* Mobile menu button logic giữ nguyên... */}
        </div>
      </nav>

      <main className="w-full min-h-screen">
        {/* QUAN TRỌNG: Bọc Suspense ở cấp độ cao nhất cho mọi trang con */}
        <Suspense fallback={<div className="pt-40 text-center">Đang tải...</div>}>
          {children}
        </Suspense>
      </main>

      <footer className="bg-white border-t border-gray-100 pt-20 pb-10 mt-20">
        <div className="max-w-[1400px] mx-auto px-6 text-center md:text-left">
           {/* Copy toàn bộ Footer cũ của bạn vào đây */}
           <p className="text-center text-gray-400 font-black uppercase text-sm">© Thiết kế web - Hala Madrid</p>
        </div>
      </footer>
    </>
  );
}