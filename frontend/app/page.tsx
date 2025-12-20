import Link from "next/link";

// 1. Hàm lấy bài viết từ PythonAnywhere
async function getPosts(q?: string) {
  const url = q
    ? `https://namtranngoc.pythonanywhere.com/api/posts/?q=${encodeURIComponent(q)}`
    : `https://namtranngoc.pythonanywhere.com/api/posts/`;

  try {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    return [];
  }
}

// 2. Hàm lấy dịch vụ từ PythonAnywhere (Đã sửa để nhận q)
async function getServices(q?: string) {
  const url = q
    ? `https://namtranngoc.pythonanywhere.com/api/services/?q=${encodeURIComponent(q)}`
    : `https://namtranngoc.pythonanywhere.com/api/services/`;

  try {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    return [];
  }
}

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;

  // Gọi đồng thời cả 2 nguồn dữ liệu dựa trên từ khóa tìm kiếm
  const [allPosts, allServices] = await Promise.all([getPosts(q), getServices(q)]);
  
  // Chỉ lấy 3 bài viết mới nhất cho trang chủ
  const posts = allPosts.slice(0, 3);

  return (
    <div className="min-h-screen bg-white">
      {/* SCRIPT TỰ ĐỘNG CUỘN XUỐNG KHI NGƯỜI DÙNG TÌM KIẾM */}
      {q && (
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.onload = function() {
                const target = document.getElementById('results-area');
                if (target) {
                  target.scrollIntoView({ behavior: 'smooth' });
                }
              }
            `,
          }}
        />
      )}

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

          <div className="flex justify-center mt-16">
            <a
              href="#results-area"
              className="group relative px-10 py-4 bg-blue-600 hover:bg-white text-white hover:text-blue-600 text-sm md:text-base font-bold uppercase tracking-widest transition-all duration-300 shadow-xl rounded-full overflow-hidden border-2 border-blue-600 hover:border-white"
            >
              <span className="relative z-10">Khám phá ngay</span>
              <div className="absolute inset-0 bg-white translate-y-[101%] group-hover:translate-y-0 transition-transform duration-300"></div>
            </a>
          </div>
        </div>
      </div>

      {/* ĐIỂM DỪNG KHI NHẢY XUỐNG */}
      <div id="results-area" className="pt-10"></div>

      {/* --- PHẦN DỊCH VỤ --- */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 py-20 border-b border-gray-100">
        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 uppercase tracking-tighter">
            Dịch vụ của chúng tôi
          </h2>
          <div className="h-2 w-32 bg-blue-600 mx-auto mt-4"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {allServices.length > 0 ? (
            allServices.map((service: any) => (
              <Link
                key={service.id}
                // SỬA LỖI UNDEFINED: dùng slug, nếu không có thì dùng id
                href={`/services/${service.slug || service.id}`}
                className="group relative block aspect-[3/4] overflow-hidden bg-black rounded-xl"
              >
                <img
                  src={service.image}
                  alt={service.title}
                  className="absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-out group-hover:scale-110 group-hover:opacity-50"
                />
                <div className="absolute inset-0 bg-blue-900/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12 bg-gradient-to-t from-black/95 via-black/40 to-transparent transition-all duration-700 group-hover:opacity-0 group-hover:translate-y-10">
                  <h3 className="text-2xl font-black text-white uppercase mb-3">{service.title}</h3>
                  <div className="flex items-center justify-between border-t border-white/30 pt-6">
                    <span className="text-white text-[15px] font-black uppercase bg-blue-600 px-3 py-1">Chi tiết</span>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-3 text-center py-10 text-gray-400 uppercase font-bold">Không tìm thấy dịch vụ nào cho "{q}"</div>
          )}
        </div>
      </div>

      {/* --- PHẦN BÀI VIẾT --- */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 py-20">
        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 uppercase tracking-tighter">Bài viết mới nhất</h2>
          <div className="h-2 w-32 bg-blue-600 mx-auto mt-4"></div>
        </div>

        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {posts.map((post: any) => (
              <Link
                key={post.id}
                href={`/post/${post.slug || post.id}`}
                className="group relative block aspect-[3/4] overflow-hidden bg-black rounded-xl"
              >
                <img
                  src={post.image}
                  alt={post.title}
                  className="absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-out group-hover:scale-110 group-hover:opacity-50"
                />
                <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12 bg-gradient-to-t from-black/95 via-black/40 to-transparent transition-all duration-700 group-hover:opacity-0 group-hover:translate-y-10">
                  <h3 className="text-2xl font-black text-white uppercase mb-3">{post.title}</h3>
                  <div className="flex items-center justify-between border-t border-white/20 pt-6">
                    <span className="text-gray-300 text-[15px] font-bold uppercase">
                      {new Date(post.created_at).toLocaleDateString("vi-VN")}
                    </span>
                    <span className="text-white text-[15px] font-black uppercase bg-blue-600 px-3 py-1">Xem ngay</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-400 uppercase font-bold">Không tìm thấy bài viết nào cho "{q}"</div>
        )}
      </div>
    </div>
  );
}