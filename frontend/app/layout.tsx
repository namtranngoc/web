"use client";

import "./globals.css";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [search, setSearch] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsVisible(
        currentScrollY <= lastScrollY.current || currentScrollY <= 100
      );
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = search.trim();
    router.push(
      query ? `${pathname}?q=${encodeURIComponent(query)}` : pathname
    );
    setIsMenuOpen(false);
  };

  return (
    <html lang="vi" className="scroll-smooth">
      <head>
        <title>Real Madrid CF | Blog Cá Nhân</title>
        <link rel="icon" href="/logo.png" />
        <style>{`
          * { font-family: "Times New Roman", Times, serif !important; font-style: normal !important; }
          html, body { margin: 0; padding: 0; background-color: white; }
          .hover-bold-fix:hover { text-shadow: 0.6px 0px 0px currentColor; }
          nav { height: 72px; }
        `}</style>
      </head>
      <body className="antialiased bg-white text-gray-900 overflow-x-hidden w-full">
        {/* --- NAVIGATION --- */}
        <nav
          className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 bg-white shadow-md border-b border-gray-100 flex items-center ${
            isVisible ? "translate-y-0" : "-translate-y-full"
          }`}
        >
          <div className="max-w-[1400px] mx-auto px-6 w-full flex justify-between items-center">
            {/* Logo */}
            <Link href="/" className="flex items-center group py-2">
              <img
                src="/logo.png"
                alt="Logo"
                className="h-10 md:h-12 w-auto transition-transform group-hover:scale-110"
              />
              <span className="ml-3 text-xl md:text-2xl font-bold text-blue-700 tracking-tighter hidden xs:block uppercase">
                REAL MADRID
              </span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              <form onSubmit={handleSearch} className="relative group">
                <input
                  type="text"
                  placeholder="Tìm bài viết..."
                  className="pl-2 pr-10 py-1 border-b border-gray-200 outline-none w-40 focus:w-60 transition-all text-black"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1 text-gray-500"
                >
                  🔍
                </button>
              </form>
              {["Trang chủ", "Bài Viết", "Dịch Vụ", "Liên Hệ"].map((item) => (
                <Link
                  key={item}
                  href={
                    item === "Trang chủ"
                      ? "/"
                      : item === "Bài Viết"
                      ? "/posts"
                      : item === "Dịch Vụ"
                      ? "/services"
                      : item === "Liên Hệ"
                      ? "/contact"
                      :"#"
                  }
                  className="text-lg font-medium hover-bold-fix hover:text-blue-600 transition-all uppercase"
                >
                  {item}
                </Link>
              ))}
            </div>

            {/* MOBILE MENU BUTTON */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden flex flex-col justify-center items-center w-10 h-10 border border-gray-100 rounded-md bg-gray-50"
              aria-label="Toggle Menu"
            >
              <div
                className={`w-6 h-0.5 bg-blue-700 transition-all duration-300 ${
                  isMenuOpen ? "rotate-45 translate-y-2" : ""
                }`}
              ></div>
              <div
                className={`w-6 h-0.5 bg-blue-700 my-1.5 transition-all duration-300 ${
                  isMenuOpen ? "opacity-0" : "opacity-100"
                }`}
              ></div>
              <div
                className={`w-6 h-0.5 bg-blue-700 transition-all duration-300 ${
                  isMenuOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              ></div>
            </button>
          </div>

          {/* MOBILE DROPDOWN */}
          <div
            className={`md:hidden absolute top-[72px] left-0 right-0 bg-white border-b border-gray-100 shadow-2xl transition-all duration-500 ease-in-out overflow-hidden ${
              isMenuOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="flex flex-col p-6 gap-3 text-center">
              {["Trang chủ", "Bài Viết", "Dịch Vụ", "Liên Hệ"].map((item) => (
                <Link
                  key={item}
                  href={
                    item === "Trang chủ"
                      ? "/"
                      : item === "Bài Viết"
                      ? "/posts"
                      : item === "Dịch Vụ"
                      ? "/services"
                      : item === "Liên Hệ"
                      ? "/contact"
                      : "#"
                  }
                  onClick={() => setIsMenuOpen(false)}
                  className="text-1xl font-black text-gray-900 uppercase hover:text-blue-600"
                >
                  {item}
                </Link>
              ))}
              {/* Ô tìm kiếm cho mobile */}
              <form onSubmit={handleSearch} className="mt-4 relative">
                <input
                  type="text"
                  placeholder="Tìm kiếm..."
                  className="w-full px-4 py-3 bg-gray-50 rounded-full border border-gray-200 outline-none focus:border-blue-600"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button type="submit" className="absolute right-4 top-3.5">
                  🔍
                </button>
              </form>
            </div>
          </div>
        </nav>

        <main className="w-full pt-[72px] min-h-screen">{children}</main>

        {/* --- FOOTER (Giữ nguyên cấu trúc đã tối ưu của ông) --- */}
        <footer className="bg-white border-t border-gray-100 pt-20 pb-10">
          <div className="max-w-[1400px] mx-auto px-6 text-center md:text-left">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-20 items-start">
              <div className="flex flex-col gap-6 items-center md:items-start">
                <div className="flex items-center">
                  <img src="/logo.png" alt="Logo" className="h-16 w-auto" />
                  <span className="ml-4 text-3xl font-black text-blue-700 uppercase tracking-tighter">
                    REAL MADRID
                  </span>
                </div>
                <p className="text-gray-600 text-lg leading-relaxed max-w-md">
                  Hành trình chinh phục những đỉnh cao và đam mê bất diệt cùng
                  đội bóng vĩ đại nhất thế giới. Hala Madrid!
                </p>
              </div>

              <div className="flex flex-col items-center md:items-start">
                <h4 className="text-xl font-black text-gray-900 uppercase mb-8 border-b-4 border-blue-600 w-fit pb-2">
                  Điều hướng
                </h4>
                <ul className="flex flex-col gap-5 text-gray-700 text-lg font-medium">
                  {[
                    "Trang chủ",
                    "Bài viết mới nhất",
                    "Dịch vụ",
                    "Liên hệ hỗ trợ",
                  ].map((link) => (
                    <li key={link}>
                      <Link
                        href={
                          link === "Trang chủ"
                            ? "/"
                            : link === "Bài viết mới nhất"
                            ? "/posts"
                            : link === "Dịch vụ"
                            ? "/services"
                            : link === "Liên hệ hỗ trợ"
                            ? "/contact"
                            :"#"

                        }
                        className="hover:text-blue-600 transition-all hover:pl-2"
                      >
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col items-center md:items-start">
                <h4 className="text-xl font-black text-gray-900 uppercase mb-8 border-b-4 border-blue-600 w-fit pb-2">
                  Liên hệ
                </h4>
                <div className="flex flex-col gap-6 text-gray-700 text-lg font-medium">
                  {[
                    "Madrid, Spain",
                    "contact@realmadrid-blog.com",
                    "Hotline: (+34) 91 398 43 00",
                  ].map((info) => (
                    <div
                      key={info}
                      className="flex items-center md:items-start gap-3"
                    >
                      <span className="text-blue-600 text-2xl mt-[-4px]">
                        ●
                      </span>
                      <span>{info}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-10 border-t border-gray-100 text-center text-gray-400 font-black uppercase text-sm">
              <p>© Thiết kế web</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
