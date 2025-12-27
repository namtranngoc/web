import Link from 'next/link';
import { Metadata } from 'next';

// 1. HÀM LẤY DỮ LIỆU
async function getPost(slug: string) {
  try {
    const res = await fetch("https://namtranngoc.pythonanywhere.com/api/posts/", { 
      cache: 'no-store' 
    });
    const posts = await res.json();
    return posts.find((p: any) => p.slug === slug);
  } catch (error) {
    console.error("Lỗi fetch post:", error);
    return null;
  }
}

// 2. METADATA ĐỘNG (SEO)
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Không tìm thấy bài viết" };

  return {
    title: `${post.title} | Real Madrid Blog`,
    description: post.summary || "Đọc bài viết mới nhất trên Real Madrid Blog",
    openGraph: {
      images: [post.image || '/logo.png'],
    },
  };
}

// 3. COMPONENT CHI TIẾT
export default async function PostDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) return <div className="py-40 text-center italic text-xl">Dữ liệu đang tải...</div>;

  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-x-hidden">
      
      {/* HEADER */}
      <header className="max-w-4xl mx-auto pt-32 md:pt-40 pb-12 px-5 text-center">
        <Link href="/posts" className="text-[15px] uppercase tracking-[0.2em] mb-3 block text-gray-500 hover:text-blue-600 transition-colors font-bold">
            — QUAY LẠI BLOG 
        </Link>
        <h1 className="text-3xl sm:text-4xl md:text-7xl font-bold mb-6 italic leading-tight tracking-tight text-black">
          {post.title}
        </h1>
        <div className="text-gray-500 italic text-base border-b border-gray-100 pb-8 inline-block px-10">
          Ngày {new Date(post.created_at).toLocaleDateString('vi-VN')}
        </div>
      </header>

      {/* ẢNH ĐẠI DIỆN */}
      <figure className="max-w-4xl mx-auto px-5 mb-10">
        {post.image && (
          <img 
            src={post.image} 
            className="w-full h-auto max-h-[600px] object-cover shadow-2xl rounded-sm mx-auto" 
            alt={post.title} 
          />
        )}
      </figure>

      {/* NỘI DUNG BÀI VIẾT (SÀI THẲNG HTML TỪ ADMIN) */}
      <main className="max-w-3xl mx-auto pb-24 px-5">
        <article 
          className="prose prose-neutral prose-lg md:prose-xl max-w-none leading-[1.8] font-serif blog-content"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </main>

      {/* CSS ĐỂ ÉP CHỮ IN ĐẬM VÀ CÁC THẺ HTML ĐẸP HƠN */}
      <style>{`
        .blog-content b, .blog-content strong {
          font-weight: 900 !important;
          color: #000 !important;
        }
        .blog-content h2 {
          font-size: 1.875rem;
          font-weight: 800;
          font-style: italic;
          margin-top: 2.5rem;
          margin-bottom: 1.25rem;
          border-bottom: 2px solid #000;
          padding-bottom: 0.5rem;
        }
        .blog-content p {
          margin-bottom: 1.5rem;
        }
        .blog-content u {
          text-underline-offset: 4px;
        }
      `}</style>
    </div>
  );
}