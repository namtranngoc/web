import Link from 'next/link';

async function getPosts(q?: string) {
  const url = q 
    ? `http://127.0.0.1:8000/api/posts/?q=${encodeURIComponent(q)}` 
    : 'http://127.0.0.1:8000/api/posts/';
    
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) return [];
  return res.json();
}

export default async function Home({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q } = await searchParams;
  const allPosts = await getPosts(q);
  const posts = allPosts.slice(0, 3);

  return (
    <div className="min-h-screen bg-white">
      {/* --- HERO SECTION --- */}
      <div className="relative h-[65vh] w-full flex items-center justify-center overflow-hidden">
        <img 
          src="home.png" 
          alt="Hero Background"
          className="absolute inset-0 w-full h-full object-cover brightness-[0.35] transform-gpu"
        />
        <div className="relative z-10 text-center px-4 w-full max-w-5xl">
          <h1 className="text-5xl md:text-6xl font-serif font-black text-white mb-6 drop-shadow-2xl tracking-tighter uppercase">
            REAL MADRID CF
          </h1>
          <p className="text-gray-300 text-base md:text-1xl px-4 md:px-20 font-light leading-relaxed uppercase tracking-widest">
            Hành trình chinh phục những đỉnh cao vĩ đại nhất.
          </p>
          
          {/* CHỈNH MT-16 ĐỂ NÚT LÙI XUỐNG DƯỚI THÊM 1 CHÚT */}
          <div className="flex justify-center mt-16">
            <a 
              href="#posts-section" 
              className="group relative px-10 py-4 bg-blue-600 hover:bg-white text-white hover:text-blue-600 text-sm md:text-base font-bold uppercase tracking-widest transition-all duration-300 shadow-xl rounded-full overflow-hidden border-2 border-blue-600 hover:border-white"
            >
              <span className="relative z-10">Khám phá ngay</span>
              {/* Lớp màu trắng trượt lên khi hover */}
              <div className="absolute inset-0 bg-white translate-y-[101%] group-hover:translate-y-0 transition-transform duration-300"></div>
            </a>
          </div>
        </div>
        
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
            <div className="w-1 h-12 bg-gradient-to-b from-blue-600 to-transparent"></div>
        </div>
      </div>

      {/* --- DANH SÁCH BÀI VIẾT: ĐỒNG BỘ HIỆU ỨNG VỚI DỊCH VỤ --- */}
      <div id="posts-section" className="max-w-[1400px] mx-auto px-4 sm:px-8 py-20">
        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-6xl font-black text-gray-900 uppercase tracking-tighter">
            Bài viết mới nhất
          </h2>
          <div className="h-2 w-32 bg-blue-600 mx-auto mt-4"></div>
        </div>

        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {posts.map((post: any) => (
              <Link 
                key={post.id} 
                href={`/post/${post.slug}`} 
                className="group relative block aspect-[3/4] overflow-hidden bg-black rounded-xl"
              >
                {/* 1. ẢNH NỀN FULL KHUNG */}
                <img
                  src={post.image || "https://via.placeholder.com/800x1200"} 
                  alt={post.title}
                  className="absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-out group-hover:scale-110 group-hover:opacity-50 transform-gpu"
                />

                {/* 2. OVERLAY XANH KHI HOVER (GIỐNG TRANG DỊCH VỤ) */}
                <div className="absolute inset-0 bg-blue-900/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* 3. NỘI DUNG CHỮ: TO VÀ BIẾN MẤT KHI HOVER */}
                <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12 bg-gradient-to-t from-black/95 via-black/40 to-transparent transition-all duration-700 group-hover:opacity-0 group-hover:translate-y-10">
                  <div className="mb-4">
                    <span className="text-blue-400 text-[12px] font-black uppercase tracking-[0.3em]">
                      Bản tin Real
                    </span>
                  </div>
                  
                  {/* TIÊU ĐỀ RẤT TO */}
                  <h3 className="text-3xl md:text-4xl font-black text-white leading-[1.1] uppercase tracking-tighter mb-6">
                    {post.title}
                  </h3>
                  
                  <div className="flex items-center justify-between border-t border-white/20 pt-6">
                    <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">
                        {new Date(post.created_at).toLocaleDateString('vi-VN')}
                    </span>
                    <span className="text-white text-[10px] font-black uppercase tracking-widest bg-blue-600 px-3 py-1">
                        Xem ngay
                    </span>
                  </div>
                </div>

                {/* 4. CHỮ HIỆN RA KHI DI CHUỘT VÀO (GIỐNG TRANG DỊCH VỤ) */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div className="text-center">
                        <span className="border-2 border-white text-white px-8 py-3 font-bold uppercase tracking-[0.2em] text-sm backdrop-blur-sm">
                            Đọc bài viết
                        </span>
                    </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-400 font-bold uppercase tracking-widest">
            Đang tải dữ liệu bài viết...
          </div>
        )}
      </div>
    </div>
  );
}