import { Suspense } from 'react';
import PostsClient from './PostsClient';

export const dynamic = 'force-dynamic';

// SEO Metadata
export const metadata = {
  title: "Blog Real Madrid | Tin tức mới nhất",
  description: "Cập nhật tin tức, phân tích trận đấu của Real Madrid CF.",
};

async function getPosts(q?: string) {
  const apiUrl = q 
    ? `https://namtranngoc.pythonanywhere.com/api/posts/?q=${encodeURIComponent(q)}`
    : "https://namtranngoc.pythonanywhere.com/api/posts/";
  const res = await fetch(apiUrl, { cache: 'no-store' });
  return res.json();
}

export default async function PostsPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q } = await searchParams;
  const posts = await getPosts(q);
  const oldPosts = [...posts].reverse().slice(0, 5);

  return (
    <div className="min-h-screen bg-white">
      <div className="h-28"></div>
      
      {/* Không dùng hook useSearchParams nữa nên không bao giờ bị lỗi build */}
      <Suspense fallback={<div className="py-40 text-center font-bold uppercase">Đang tải...</div>}>
        <PostsClient posts={posts} q={q || ""} oldPosts={oldPosts} />
      </Suspense>

      <style dangerouslySetInnerHTML={{ __html: `
        .reveal-item { opacity: 0; transform: translateY(40px); transition: all 0.9s ease-out; }
        .reveal-item.active { opacity: 1; transform: translateY(0); }
      `}} />
    </div>
  );
}