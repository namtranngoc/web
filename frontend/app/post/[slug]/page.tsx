import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

async function getPost(slug: string) {
  const res = await fetch("https://namtranngoc.pythonanywhere.com/api/posts/", { cache: 'no-store' });
  const posts = await res.json();
  return posts.find((p: any) => p.slug === slug);
}

export default async function PostDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) return <div className="py-40 text-center italic text-xl">Dữ liệu đang tải...</div>;

  return (
    /* SỬA TẠI ĐÂY: Xóa pt-20 để không bị hở trắng trên đầu */
    <div className="min-h-screen bg-white text-gray-900 overflow-x-hidden">
      
      {/* SỬA TẠI ĐÂY: Tăng pt-32 để đẩy tiêu đề xuống dưới thanh Header cố định */}
      <header className="max-w-4xl mx-auto pt-32 md:pt-40 pb-12 px-5 text-center">
        <Link href="/" className="text-[15px] uppercase tracking-[0.2em] mb-3 block text-gray-500 hover:text-black transition-colors font-bold">
           — QUAY LẠI TRANG CHỦ 
        </Link>
        <h1 className="text-3xl sm:text-4xl md:text-7xl font-bold mb-6 italic leading-tight tracking-tight">{post.title}</h1>
        <div className="text-gray-500 italic text-base border-b border-gray-100 pb-8 inline-block px-10">
          Ngày {new Date(post.created_at).toLocaleDateString('vi-VN')}
        </div>
      </header>

      <figure className="max-w-2xl mx-auto px-5 mb-10">
        {post.image && (
          <img 
            src={post.image} 
            className="w-full h-200px max-h-[full] object-contain shadow-2xl rounded-sm mx-auto" 
            alt={post.title} 
          />
        )}
      </figure>

      <main className="max-w-3xl mx-auto pb-24 px-5">
        <article className="prose prose-neutral prose-lg md:prose-xl max-w-none leading-[1.8] font-serif">
          <ReactMarkdown
            components={{
              h2: ({children}) => <h2 className="text-2xl md:text-3xl font-bold mt-12 mb-6 border-b border-black pb-2 italic">{children}</h2>,
              p: ({children}) => <p className="mb-6 text-left break-words">{children}</p>,
              code({ node, inline, className, children, ...props }: any) {
                const match = /language-(\w+)/.exec(className || '');
                return !inline && match ? (
                  <div className="overflow-x-auto rounded-sm shadow-md my-8">
                    <SyntaxHighlighter style={vscDarkPlus} language={match[1]} PreTag="div" className="!m-0 border border-gray-800" {...props}>
                      {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                  </div>
                ) : (
                  <code className="bg-gray-100 px-1.5 py-0.5 text-red-600 font-mono text-sm" {...props}>{children}</code>
                );
              }
            }}
          >
            {post.content}
          </ReactMarkdown>
        </article>
      </main>
    </div>
  );
}