import { Metadata } from 'next';
import Link from 'next/link';

// 1. Fetch dữ liệu trên Server (Tốt cho SEO)
async function getPost(slug: string) {
  const res = await fetch(`https://namtranngoc.pythonanywhere.com/api/posts/`, { cache: 'no-store' });
  const posts = await res.json();
  return posts.find((p: any) => p.slug === slug);
}

// 2. TẠO METADATA ĐỘNG (SEO CHỐT HẠ)
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) return { title: "Không tìm thấy bài viết" };

  return {
    title: `${post.title} | Real Madrid Blog`,
    description: post.summary?.replace(/<[^>]*>/g, '').slice(0, 160), // Xóa thẻ HTML cho mô tả chuẩn
    openGraph: {
      title: post.title,
      description: post.summary?.replace(/<[^>]*>/g, ''),
      images: [post.image || '/logo.png'],
      type: 'article',
    },
  };
}

export default async function PostDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) return <div className="py-40 text-center">Bài viết không tồn tại.</div>;

  return (
    <article className="min-h-screen bg-white">
      {/* Cấu trúc HTML Semantic: Dùng thẻ <header>, <article>, <time> */}
      <header className="max-w-4xl mx-auto pt-32 md:pt-40 pb-12 px-5 text-center">
        <h1 className="text-4xl md:text-7xl font-bold italic mb-6">{post.title}</h1>
        <time className="text-gray-500">
          Ngày {new Date(post.created_at).toLocaleDateString('vi-VN')}
        </time>
      </header>

      <main className="max-w-3xl mx-auto pb-24 px-5">
        <div 
          className="prose prose-lg max-w-none blog-content"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </main>
      
      <style>{`
        .blog-content strong, .blog-content b { font-weight: 900; color: #000; }
        .blog-content h2 { font-size: 2rem; font-weight: 800; margin-top: 2rem; }
      `}</style>
    </article>
  );
}