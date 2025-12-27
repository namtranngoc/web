'use client';
import Link from 'next/link';
import { useEffect, useRef } from 'react';

export default function PostsClient({ posts, q, currentPage, totalPages }: any) {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // 1. Xóa bỏ observer cũ nếu có để tránh trùng lặp
    if (observerRef.current) observerRef.current.disconnect();

    // 2. Cấu hình Observer
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Thêm class active để hiện phần tử
          entry.target.classList.add('is-visible');
        }
      });
    }, { 
      threshold: 0.05, // Chỉ cần 5% phần tử hiện ra là bắt đầu hiệu ứng
      rootMargin: '0px 0px -50px 0px' 
    });

    // 3. Đợi một chút để đảm bảo DOM đã sẵn sàng (vấn đề của React 19/Next 16)
    const timeoutId = setTimeout(() => {
      const items = document.querySelectorAll('.reveal-item');
      items.forEach((el) => observerRef.current?.observe(el));
    }, 150);

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
      clearTimeout(timeoutId);
    };
  }, [posts, q]); // Chạy lại khi danh sách bài viết hoặc từ khóa tìm kiếm thay đổi

  return (
    <div className="max-w-[1400px] mx-auto px-6 py-12 font-serif">
      <h1 className="text-4xl md:text-6xl font-black uppercase mb-16 reveal-item translate-y-10 opacity-0">
        {q ? `KẾT QUẢ: ${q}` : "BLOG"}
      </h1>

      <div className="flex flex-col gap-12">
        {posts && posts.length > 0 ? (
          posts.map((post: any, index: number) => (
            <article 
              key={post.id || index} 
              // Dùng class 'is-visible' để điều khiển qua CSS bên dưới
              className="reveal-item opacity-0 translate-y-10 flex flex-col md:flex-row gap-10 border-b pb-12"
              style={{ transitionDelay: `${(index % 5) * 100}ms` }} 
            >
              <Link href={`/post/${post.slug}`} className="w-full md:w-[250px] aspect-video overflow-hidden bg-gray-100">
                <img 
                  src={post.image.startsWith('http') ? post.image : `https://namtranngoc.pythonanywhere.com${post.image}`} 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" 
                  alt={post.title} 
                />
              </Link>
              <div className="flex-1">
                <Link href={`/post/${post.slug}`} className="text-2xl font-black uppercase hover:text-blue-600 block mb-4 transition-colors">
                  {post.title}
                </Link>
                <div 
                  className="text-gray-600 line-clamp-2 leading-relaxed" 
                  dangerouslySetInnerHTML={{ __html: post.summary }} 
                />
              </div>
            </article>
          ))
        ) : (
          <div className="py-20 text-center text-gray-400 italic">Không tìm thấy bài viết nào.</div>
        )}

        {/* PHÂN TRANG */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-12 reveal-item opacity-0">
            <Link
              href={`/posts?q=${q}&page=${currentPage - 1}`}
              className={`px-6 py-2 border-2 border-black font-bold uppercase transition-all ${currentPage <= 1 ? 'pointer-events-none opacity-20' : 'hover:bg-black hover:text-white'}`}
            >
              ← TRƯỚC
            </Link>
            <span className="font-bold text-xl">{currentPage} / {totalPages}</span>
            <Link
              href={`/posts?q=${q}&page=${currentPage + 1}`}
              className={`px-6 py-2 border-2 border-black font-bold uppercase transition-all ${currentPage >= totalPages ? 'pointer-events-none opacity-20' : 'hover:bg-black hover:text-white'}`}
            >
              SAU →
            </Link>
          </div>
        )}
      </div>

      {/* 4. CSS ĐIỀU KHIỂN HIỆU ỨNG (Gắn trực tiếp cho chắc chắn) */}
      <style jsx global>{`
        .reveal-item {
          transition: all 0.8s cubic-bezier(0.2, 1, 0.3, 1);
          will-change: transform, opacity;
        }
        .reveal-item.is-visible {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
      `}</style>
    </div>
  );
}