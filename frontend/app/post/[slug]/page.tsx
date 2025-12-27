import Link from 'next/link';
import { Metadata } from 'next';

async function getPost(slug: string) {
  try {
    const res = await fetch("https://namtranngoc.pythonanywhere.com/api/posts/", { cache: 'no-store' });
    const posts = await res.json();
    return posts.find((p: any) => p.slug === slug);
  } catch (error) {
    return null;
  }
}

export default async function PostDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) return <div className="py-40 text-center">Không tìm thấy bài viết</div>;

  // --- CÁCH FIX ẢNH TRIỆT ĐỂ ---
  const domain = "https://namtranngoc.pythonanywhere.com";
  
  // Regex này sẽ tìm tất cả các thẻ src="/media/..." và thay bằng link tuyệt đối
  const fixedContent = post.content.replace(
    /src="\/media\//g, 
    `src="${domain}/media/`
  );

  return (
    <div className="min-h-screen bg-white pt-32 px-5 font-serif">
      <header className="max-w-4xl mx-auto text-center mb-10">
        <Link href="/posts" className="text-blue-600 font-bold uppercase tracking-widest text-sm mb-4 block">
          ← TRỞ LẠI BLOG
        </Link>
        <h1 className="text-4xl md:text-7xl font-bold italic leading-tight">{post.title}</h1>
      </header>

      {/* Ảnh đại diện (Thường lấy từ trường image riêng của API) */}
      <figure className="max-w-4xl mx-auto mb-10">
        <img src={post.image} className="w-full h-auto rounded shadow-xl" alt={post.title} />
      </figure>

      <main className="max-w-3xl mx-auto pb-24">
        <div 
          className="prose prose-lg max-w-none blog-content"
          // Truyền nội dung đã được fix đường dẫn ảnh
          dangerouslySetInnerHTML={{ __html: fixedContent }} 
        />
      </main>

      <style>{`
        /* Đảm bảo ảnh trong bài viết không bị ẩn hoặc quá nhỏ */
        .blog-content img {
          display: block;
          max-width: 100% !important;
          height: auto !important;
          margin: 2rem auto;
          border-radius: 8px;
        }
        .blog-content b, .blog-content strong { font-weight: 900 !important; color: #000; }
      `}</style>
    </div>
  );
}