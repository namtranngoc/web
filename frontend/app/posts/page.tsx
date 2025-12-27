'use client'; 

import Link from 'next/link';
import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

// --- PHẦN 1: TÁCH RIÊNG COMPONENT CON CHỨA LOGIC ---
// Component này "đụng chạm" đến useSearchParams nên phải đứng riêng
function PostsContent() {
  const [posts, setPosts] = useState<any[]>([]);
  const [oldPosts, setOldPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const searchParams = useSearchParams();
  const q = searchParams.get('q'); 

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const apiUrl = q 
          ? `https://namtranngoc.pythonanywhere.com/api/posts/?q=${encodeURIComponent(q)}`
          : "https://namtranngoc.pythonanywhere.com/api/posts/";

        const res = await fetch(apiUrl, { cache: 'no-store' });
        const data = await res.json();
        
        if (Array.isArray(data)) {
          setPosts(data);
          if (!q) {
            const reversedData = [...data].reverse();
            setOldPosts(reversedData.slice(0, 5));
          }
        }
      } catch (e) {
        console.error("Lỗi lấy dữ liệu:", e);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [q]);

  // Hiệu ứng cuộn và reveal (Giữ nguyên của bạn)
  useEffect(() => {
    if (!loading && q && posts.length > 0) {
      const target = document.getElementById('blog-content');
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [loading, q, posts]);

  useEffect(() => {
    if (loading || posts.length === 0) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('active');
      });
    }, { threshold: 0.1 });
    const items = document.querySelectorAll('.reveal-item');
    items.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [loading, posts]);

  if (loading) return <div className="py-40 text-center text-2xl font-bold uppercase tracking-widest italic">Đang tải bài viết...</div>;

  return (
    <div className="max-w-[1400px] mx-auto px-6 py-12 font-serif">
      <div id="blog-content" className="mb-16 border-b-2 border-gray-200 pb-4 reveal-item scroll-mt-32">
        <h1 className="text-4xl md:text-6xl font-black uppercase inline-block border-b-4 border-blue-600 pb-2">
          {q ? `KẾT QUẢ: ${q}` : "BLOG"}
        </h1>
      </div>

      <div className="flex flex-col lg:flex-row gap-16">
        <div className="w-full lg:w-2/3 flex flex-col gap-12">
          {posts.length > 0 ? (
            posts.map((post: any) => (
              <div key={post.id} className="reveal-item flex flex-col md:flex-row gap-10 items-start border-b border-gray-100 pb-12 group">
                <Link href={`/post/${post.slug}`} className="w-full md:w-[200px] aspect-square flex-shrink-0 block overflow-hidden rounded-sm bg-black relative shadow-lg">
                  <img src={post.image} alt={post.title} className="absolute inset-0 w-full h-full object-cover transition-all duration-1000 group-hover:scale-125 group-hover:opacity-40" />
                  <div className="absolute inset-0 bg-blue-900/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                    <span className="text-white font-black uppercase text-[10px] tracking-[0.2em] border-2 border-white px-3 py-1">XEM</span>
                  </div>
                </Link>
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
            ))
          ) : (
            <div className="py-20 text-center text-gray-400 uppercase font-bold tracking-widest">
              Không tìm thấy bài viết nào cho "{q}"
            </div>
          )}
        </div>

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
  );
}

// --- PHẦN 2: COMPONENT CHÍNH TRANG ---
// Thành phần này PHẢI là export default và bọc component con trong Suspense
export default function PostsPage() {
  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: '"Times New Roman", Times, serif' }}>
      <div className="h-28"></div>

      <Suspense fallback={<div className="py-40 text-center font-bold uppercase">Đang tải dữ liệu...</div>}>
        <PostsContent />
      </Suspense>

      <style jsx global>{`
        .reveal-item { opacity: 0; transform: translateY(40px); transition: all 0.9s ease-out; }
        .reveal-item.active { opacity: 1; transform: translateY(0); }
      `}</style>
    </div>
  );
}