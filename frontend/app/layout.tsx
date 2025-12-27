// app/layout.tsx
import "./globals.css";
import { Metadata } from "next";
import ClientWrapper from "./ClientWrapper"; // Chúng ta sẽ tạo file này ở Bước 2

// ĐÂY LÀ CÁCH LÀM SEO CHUẨN NEXTJS
export const metadata: Metadata = {
  title: "Real Madrid CF | Blog Cá Nhân",
  description: "Hành trình chinh phục những đỉnh cao và đam mê bất diệt cùng Real Madrid. Hala Madrid!",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className="scroll-smooth">
      <body className="antialiased bg-white text-gray-900 overflow-x-hidden w-full font-serif">
        {/* Chúng ta đưa toàn bộ giao diện vào ClientWrapper */}
        <ClientWrapper>{children}</ClientWrapper>
      </body>
    </html>
  );
}