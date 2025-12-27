import { Suspense } from 'react';
import PostsClient from './PostsClient';

type Props = {
  params: Promise<{ [key: string]: string | string[] | undefined }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function PostsPage(props: Props) {
  const searchParams = await props.searchParams;
  const q = typeof searchParams.q === 'string' ? searchParams.q : "";
  const page = typeof searchParams.page === 'string' ? searchParams.page : "1";

  let posts = [];
  let totalPages = 1;
  let errorMessage = "";

  try {
    // API Của bạn - Lưu ý phải có dấu / ở cuối posts/
    const apiUrl = `https://namtranngoc.pythonanywhere.com/api/posts/?search=${encodeURIComponent(q)}&page=${page}`;
    
    const res = await fetch(apiUrl, { 
      cache: 'no-store',
      headers: {
        'Accept': 'application/json',
        // Thêm User-Agent để PythonAnywhere không chặn request từ server
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      }
    });

    if (!res.ok) {
      errorMessage = `Lỗi Server: ${res.status} ${res.statusText}`;
    } else {
      const data = await res.json();
      
      // XỬ LÝ DỮ LIỆU TÙY THEO CẤU TRÚC DJANGO
      if (data.results && Array.isArray(data.results)) {
        posts = data.results;
        totalPages = Math.ceil((data.count || 0) / 10);
      } else if (Array.isArray(data)) {
        posts = data;
        totalPages = 1;
      }
    }
  } catch (err: any) {
    errorMessage = `Lỗi kết nối: ${err.message}`;
  }

  return (
    <div className="min-h-screen bg-white pt-28">
      <div className="max-w-[1400px] mx-auto px-6">
        {/* NẾU CÓ LỖI THÌ HIỆN BẢNG ĐỎ NÀY */}
        {errorMessage && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-10" role="alert">
            <p className="font-bold">Cảnh báo lỗi:</p>
            <p>{errorMessage}</p>
            <p className="text-xs mt-2 italic">Hãy kiểm tra xem Django trên PythonAnywhere đã chạy chưa.</p>
          </div>
        )}

        <Suspense fallback={<div className="py-40 text-center font-bold">ĐANG TẢI...</div>}>
          <PostsClient 
            posts={posts} 
            q={q} 
            currentPage={parseInt(page)} 
            totalPages={totalPages} 
          />
        </Suspense>
      </div>
    </div>
  );
}