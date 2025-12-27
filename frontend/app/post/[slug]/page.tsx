import Link from 'next/link';

// Hàm lấy dữ liệu bài viết từ Django
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
  const { slug } = await params; // Next.js 15+ yêu cầu await params
  const post = await getPost(slug);

  if (!post) return <div className="py-40 text-center">Không tìm thấy bài viết</div>;

  // FIX ẢNH: Dùng dấu huyền (backticks) để truyền biến domain vào
  const domain = "https://namtranngoc.pythonanywhere.com";
  const fixedContent = post.content.replaceAll('src="/media/', `src="${domain}/media/`);

  return (
    <div className="min-h-screen bg-white pt-32 px-5 font-serif">
      <h1 className="max-w-4xl mx-auto text-4xl md:text-7xl font-bold text-center mb-10 italic leading-tight">
        {post.title}
      </h1>
      <main className="max-w-3xl mx-auto pb-24">
        <div 
          className="prose prose-lg max-w-none blog-content"
          // Hiển thị nội dung HTML đã sửa link ảnh
          dangerouslySetInnerHTML={{ __html: fixedContent }} 
        />
      </main>
      <style>{`
        .blog-content img { width: 100% !important; height: auto !important; margin: 30px 0; display: block; border-radius: 4px; }
        .blog-content b, .blog-content strong { font-weight: 900 !important; color: #000; }
      `}</style>
    </div>
  );
}