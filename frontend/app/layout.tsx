import "./globals.css";
import { Metadata } from "next";
import ClientWrapper from "./components/ClientWrapper"; 

export const metadata: Metadata = {
  title: "Real Madrid CF | Blog Cá Nhân",
  description: "Hành trình chinh phục những đỉnh cao và đam mê bất diệt cùng đội bóng vĩ đại nhất thế giới. Hala Madrid!",
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
      <body className="antialiased bg-white text-gray-900 overflow-x-hidden w-full">
        {/* Wrapper này sẽ xử lý toàn bộ phần Client như Nav, Footer, Scroll */}
        <ClientWrapper>{children}</ClientWrapper>
      </body>
    </html>
  );
}