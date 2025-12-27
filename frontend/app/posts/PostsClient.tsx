'use client';
import Link from 'next/link';
import { useEffect } from 'react';

export default function PostsClient({ posts, q, oldPosts }: { posts: any[], q: string, oldPosts: any[] }) {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('active');
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal-item').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [posts]);

  return (
    <div className="max-w-[1400px] mx-auto px-6 py-12">
      <h1 className="text-4xl md:text-6xl font-black uppercase border-b-4 border-blue-600 w-fit pb-2 mb-16 reveal-item">
        {q ? `KẾT QUẢ: ${q}` : "BLOG"}
      </h1>
      <div className="flex flex-col lg:flex-row gap-16">
        <div className="w-full lg:w-2/3 flex flex-col gap-12">
          {posts.map((post: any) => (
            <div key={post.id} className="reveal-item flex flex-col md:flex-row gap-10 border-b pb-12 group">
              <Link href={`/post/${post.slug}`} className="w-full md:w-[200px] aspect-square overflow-hidden bg-black relative">
                <img src={post.image} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-all duration-700" alt={post.title} />
              </Link>
              <div className="flex-1">
                <Link href={`/post/${post.slug}`} className="text-2xl md:text-3xl font-black hover:text-blue-600 uppercase block mb-4 transition-colors">
                  {post.title}
                </Link>
                {/* HIỆN IN ĐẬM Ở ĐÂY */}
                <div className="text-gray-600 text-lg line-clamp-3" dangerouslySetInnerHTML={{ __html: post.summary }} />
              </div>
            </div>
          ))}
        </div>
        {/* Sidebar cũ... */}
      </div>
      <style jsx global>{`
        .reveal-item { opacity: 0; transform: translateY(30px); transition: all 0.8s ease-out; }
        .reveal-item.active { opacity: 1; transform: translateY(0); }
      `}</style>
    </div>
  );
}