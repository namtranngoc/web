import Link from "next/link";

// 1. Hàm lấy bài viết (Giữ nguyên)
async function getPosts(q?: string) {
  const url = q
    ? `https://namtranngoc.pythonanywhere.com/api/posts/?q=${encodeURIComponent(q)}`
    : `https://namtranngoc.pythonanywhere.com/api/posts/`;

  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) return [];
  return res.json();
}
async function getServices(q?: string) {
  const url = q
    ? `https://namtranngoc.pythonanywhere.com/api/services/?q=${encodeURIComponent(q)}`
    : `https://namtranngoc.pythonanywhere.com/api/services/`;

  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) return [];
  return res.json();
}
// // 2. Hàm lấy dịch vụ (Thêm mới)
// async function getServices() {
//   const res = await fetch("https://namtranngoc.pythonanywhere.com/api/posts/services/", {
//     cache: "no-store",
//   });
//   if (!res.ok) return [];
//   const data = await res.json();
//   return data.slice(0, 3); // Lấy 3 cái
// }

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;

  // Gọi song song cả 2 nguồn dữ liệu
  const [allPosts, services] = await Promise.all([getPosts(q), getServices()]);

  const posts = allPosts.slice(0, 3);

  return (
    <div className="min-h-screen bg-white">
      {/* --- HERO SECTION (GIỮ NGUYÊN) --- */}
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

          <div className="flex justify-center mt-16">
            <a
              href="#services-section"
              className="group relative px-10 py-4 bg-blue-600 hover:bg-white text-white hover:text-blue-600 text-sm md:text-base font-bold uppercase tracking-widest transition-all duration-300 shadow-xl rounded-full overflow-hidden border-2 border-blue-600 hover:border-white"
            >
              <span className="relative z-10">Khám phá ngay</span>
              <div className="absolute inset-0 bg-white translate-y-[101%] group-hover:translate-y-0 transition-transform duration-300"></div>
            </a>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-1 h-12 bg-gradient-to-b from-blue-600 to-transparent"></div>
        </div>
      </div>

      {/* --- PHẦN DỊCH VỤ: HIỂN THỊ GIỐNG HỆT BÀI VIẾT --- */}
      <div
        id="services-section"
        className="max-w-[1400px] mx-auto px-4 sm:px-8 py-20 border-b border-gray-100"
      >
        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 uppercase tracking-tighter">
            Dịch vụ của chúng tôi
          </h2>
          <div className="h-2 w-32 bg-blue-600 mx-auto mt-4"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service: any) => (
            <div
              key={service.id}
              className="group relative block aspect-[3/4] overflow-hidden bg-black rounded-xl cursor-pointer"
            >
              {/* 1. ẢNH NỀN FULL KHUNG */}
              <img
                src={service.image}
                alt={service.title}
                className="absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-out group-hover:scale-110 group-hover:opacity-50 transform-gpu"
              />

              {/* 2. OVERLAY XANH KHI HOVER */}
              <div className="absolute inset-0 bg-blue-900/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* 3. NỘI DUNG CHỮ: TO VÀ BIẾN MẤT KHI HOVER */}
              <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12 bg-gradient-to-t from-black/95 via-black/40 to-transparent transition-all duration-700 group-hover:opacity-0 group-hover:translate-y-10">
                <div className="mb-4">
                  <span className="text-blue-400 text-[15px] font-black uppercase tracking-[0em]">
                    Dịch vụ
                  </span>
                </div>

                <h3 className="text-2xl md:text-2xl font-black text-white leading-[1] uppercase tracking-tighter mb-3">
                  {service.title}
                </h3>

                <div className="flex items-center justify-between border-t border-white/30 pt-6">
                  <span className="text-white text-[15px] font-black uppercase tracking-widest bg-blue-600 px-3 py-1 flex-shrink-0">
                    Chi tiết
                  </span>
                </div>
              </div>

              {/* 4. CHỮ HIỆN RA KHI HOVER */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="text-center">
                  <span className="border-2 border-white text-white px-8 py-3 font-bold uppercase tracking-[0.2em] text-sm backdrop-blur-sm">
                    Xem dịch vụ
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- DANH SÁCH BÀI VIẾT (GIỮ YÊN CODE CỦA ÔNG) --- */}
      <div
        id="posts-section"
        className="max-w-[1400px] mx-auto px-4 sm:px-8 py-20"
      >
        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 uppercase tracking-tighter">
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
                <img
                  src={post.image || "https://via.placeholder.com/800x1200"}
                  alt={post.title}
                  className="absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-out group-hover:scale-110 group-hover:opacity-50 transform-gpu"
                />
                <div className="absolute inset-0 bg-blue-900/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12 bg-gradient-to-t from-black/95 via-black/40 to-transparent transition-all duration-700 group-hover:opacity-0 group-hover:translate-y-10">
                  <div className="mb-4">
                    <span className="text-blue-400 text-[15px] font-black uppercase tracking-[0em]">
                      Bài viết
                    </span>
                  </div>
                  <h3 className="text-2xl md:text-2xl font-black text-white leading-[1] uppercase tracking-tighter mb-3">
                    {post.title}
                  </h3>
                  <div className="flex items-center justify-between border-t border-white/20 pt-6">
                    <span className="text-gray-300 text-[15px] font-bold uppercase tracking-widest">
                      {new Date(post.created_at).toLocaleDateString("vi-VN")}
                    </span>
                    <span className="text-white text-[15px] font-black uppercase tracking-widest bg-blue-600 px-3 py-1">
                      Xem ngay
                    </span>
                  </div>
                </div>
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
            Chưa có bài viết nào.
          </div>
        )}
      </div>
    </div>
  );
}
