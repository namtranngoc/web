import { Suspense } from 'react';
import PostsClient from './PostsClient';

export const dynamic = 'force-dynamic';

async function getPosts(q?: string) {
  const apiUrl = q 
    ? `https://namtranngoc.pythonanywhere.com/api/posts/?q=${encodeURIComponent(q)}`
    : "https://namtranngoc.pythonanywhere.com/api/posts/";
  const res = await fetch(apiUrl, { cache: 'no-store' });
  return res.json();
}

// Next.js 15+ yêu cầu searchParams là một Promise
export default async function PostsPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q } = await searchParams; 
  const posts = await getPosts(q);
  const oldPosts = [...posts].reverse().slice(0, 5);

  return (
    <div className="min-h-screen bg-white font-serif">
      <div className="h-28"></div>
      <Suspense fallback={<div className="py-40 text-center font-bold">ĐANG TẢI BLOG...</div>}>
        <PostsClient posts={posts} q={q || ""} oldPosts={oldPosts} />
      </Suspense>
    </div>
  );
}