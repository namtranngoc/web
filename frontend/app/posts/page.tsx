import { Suspense } from 'react';
import PostsClient from './PostsClient';

export const dynamic = 'force-dynamic'; // Ép Vercel bỏ qua kiểm tra tĩnh lúc Build

async function getPosts(q?: string) {
  const apiUrl = q 
    ? `https://namtranngoc.pythonanywhere.com/api/posts/?q=${encodeURIComponent(q)}`
    : "https://namtranngoc.pythonanywhere.com/api/posts/";
  const res = await fetch(apiUrl, { cache: 'no-store' });
  return res.json();
}

// Next.js 15+ yêu cầu searchParams phải xử lý Async
export default async function PostsPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q } = await searchParams; 
  const posts = await getPosts(q);
  const oldPosts = [...posts].reverse().slice(0, 5);

  return (
    <div className="min-h-screen bg-white">
      <div className="h-28"></div>
      {/* Bọc Suspense ở đây là bắt buộc để Vercel cho qua */}
      <Suspense fallback={<div className="py-40 text-center font-bold">ĐANG TẢI...</div>}>
        <PostsClient posts={posts} q={q || ""} oldPosts={oldPosts} />
      </Suspense>
    </div>
  );
}