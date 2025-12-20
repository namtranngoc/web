'use client'; 

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function PostsPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [oldPosts, setOldPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts/`, { cache: 'no-store' });
        const data = await res.json();
        
        if (Array.isArray(data)) {
          setPosts(data);
          const reversedData = [...data].reverse();
          setOldPosts(reversedData.slice(0, 5));
        }
      } catch (e) {
        console.error("Lỗi lấy dữ liệu:", e);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // HIỆU ỨNG REVEAL: BAY LÊN KHI CUỘN CHUỘT
  useEffect(() => {
    if (loading || posts.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1 });

    const items = document.querySelectorAll('.reveal-item');
    items.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [loading, posts]);

  if (loading) return <div className="py-40 text-center text-2xl font-bold uppercase tracking-widest">Đang tải bài viết...</div>;

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: '"Times New Roman", Times, serif' }}>
      <div className="h-28"></div>

      <div className="max-w-[1400px] mx-auto px-6 py-12 font-serif">
        <div className="mb-16 border-b-2 border-gray-200 pb-4 reveal-item">
          <h1 className="text-4xl md:text-6xl font-black uppercase inline-block border-b-4 border-blue-600 pb-2">BLOG</h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-16">
          {/* CỘT TRÁI - DANH SÁCH BÀI VIẾT CHÍNH */}
          <div className="w-full lg:w-2/3 flex flex-col gap-12">
            {posts.map((post: any) => (
              <div key={post.id} className="reveal-item flex flex-col md:flex-row gap-10 items-start border-b border-gray-100 pb-12 last:border-none group">
                
                {/* 1. ẢNH NHỎ LẠI (200px) & HIỆU ỨNG HOVER */}
                <Link 
                  href={`/post/${post.slug}`} 
                  className="w-full md:w-[200px] aspect-square flex-shrink-0 block overflow-hidden rounded-sm bg-black relative shadow-lg"
                >
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-in-out group-hover:scale-125 group-hover:opacity-40"
                  />
                  {/* Lớp phủ xanh khi hover */}
                  <div className="absolute inset-0 bg-blue-900/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                    <span className="text-white font-black uppercase text-[10px] tracking-[0.2em] border-2 border-white px-3 py-1">XEM</span>
                  </div>
                </Link>

                {/* 2. NỘI DUNG CHỮ TO (BỎ XEM THÊM) */}
                <div className="flex-1">
                  <Link href={`/post/${post.slug}`} className="text-2xl md:text-3xl font-black hover:text-blue-600 uppercase block mb-4 leading-[1.1] transition-colors tracking-tighter">
                    {post.title}
                  </Link>
                  <div className="flex items-center gap-4 mb-5">
                    <span className="h-[2px] w-12 bg-blue-600"></span>
                    <p className="text-gray-400 text-[11px] font-bold uppercase tracking-[0.3em]">
                      Ngày {new Date(post.created_at).toLocaleDateString('vi-VN')}
                    </p>
                  </div>
                  <p className="text-gray-600 text-lg leading-relaxed text-justify line-clamp-3">
                    {post.summary}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* CỘT PHẢI (SIDEBAR) */}
          <div className="w-full lg:w-1/3">
            <div className="sticky top-32">
              <h3 className="text-2xl font-black uppercase border-b-4 border-blue-600 w-fit pb-2 mb-10 reveal-item">Tin cũ hơn</h3>
              <div className="flex flex-col gap-8">
                {oldPosts.map((p: any) => (
                  <div key={p.id} className="reveal-item flex gap-5 items-center group">
                    <Link href={`/post/${p.slug}`} className="w-24 h-16 flex-shrink-0 overflow-hidden border rounded-sm">
                      <img src={p.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="" />
                    </Link>
                    <Link href={`/post/${p.slug}`} className="text-base font-black text-gray-800 hover:text-blue-600 leading-tight uppercase line-clamp-2 transition-colors">
                      {p.title}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS CHO HIỆU ỨNG REVEAL */}
      <style jsx global>{`
        .reveal-item {
          opacity: 0;
          transform: translateY(40px);
          transition: all 0.9s ease-out;
        }
        .reveal-item.active {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </div>
  );
}