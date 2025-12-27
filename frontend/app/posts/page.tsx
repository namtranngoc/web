// app/posts/page.tsx
import { Suspense } from 'react';
import PostsClient from './PostsClient'; // Đảm bảo ông đã tạo file này như tôi chỉ lúc nãy

// Dòng này cực kỳ quan trọng: Nó bảo Vercel trang này là "Động", đừng cố tạo tĩnh lúc Build
export const dynamic = 'force-dynamic';

async function getPosts(q?: string) {
  const apiUrl = q 
    ? `https://namtranngoc.pythonanywhere.com/api/posts/?q=${encodeURIComponent(q)}`
    : "https://namtranngoc.pythonanywhere.com/api/posts/";
  
  const res = await fetch(apiUrl, { cache: 'no-store' });
  if (!res.ok) return [];
  return res.json();
}

// Trong Next.js 15/16, searchParams là một Promise
export default async function PostsPage({ 
  searchParams 
}: { 
  searchParams: Promise<{ q?: string }> 
}) {
  // Đợi lấy giá trị tìm kiếm ngay trên Server
  const { q } = await searchParams;
  const posts = await getPosts(q);
  const oldPosts = [...posts].reverse().slice(0, 5);

  return (
    <div className="min-h-screen bg-white">
      <div className="h-28"></div>
      
      {/* Bọc Suspense ở đây để Vercel không bao giờ báo lỗi nữa */}
      <Suspense fallback={<div className="py-40 text-center font-bold uppercase italic">Đang nạp bài viết...</div>}>
        <PostsClient posts={posts} q={q || ""} oldPosts={oldPosts} />
      </Suspense>

      <style dangerouslySetInnerHTML={{ __html: `
        .reveal-item { opacity: 0; transform: translateY(30px); transition: all 0.8s ease-out; }
        .reveal-item.active { opacity: 1; transform: translateY(0); }
      `}} />
    </div>
  );
}