import Link from 'next/link';

// 1. Hàm lấy dữ liệu từ API Backend
async function getServices(q?: string) {
  const url = q
    ? `https://namtranngoc.pythonanywhere.com/api/services/?q=${encodeURIComponent(q)}`
    : `https://namtranngoc.pythonanywhere.com/api/services/`;

  try {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    console.error("Lỗi kết nối API:", error);
    return [];
  }
}

export default async function ServicesPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  // 2. Lấy tham số tìm kiếm từ URL
  const { q } = await searchParams;
  const services = await getServices(q);

  return (
    <div className="min-h-screen bg-white">
      {/* TỰ ĐỘNG CUỘN XUỐNG KHI CÓ KẾT QUẢ TÌM KIẾM */}
      {q && (
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.onload = function() {
                const target = document.getElementById('services-grid');
                if (target) {
                  target.scrollIntoView({ behavior: 'smooth' });
                }
              }
            `,
          }}
        />
      )}

      {/* --- HERO SECTION --- */}
      <div className="relative h-[40vh] md:h-[50vh] w-full flex items-center justify-center overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=2000" 
          alt="Services Background"
          className="absolute inset-0 w-full h-full object-cover brightness-[0.3]"
        />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-3xl md:text-7xl font-bold text-white mb-4 uppercase tracking-tighter">
            {q ? `Kết quả: ${q}` : "Dịch Vụ Của Chúng Tôi"}
          </h1>
          <div className="h-1.5 w-24 bg-blue-600 mx-auto"></div>
        </div>
      </div>

      {/* --- DANH SÁCH DỊCH VỤ --- */}
      <div id="services-grid" className="max-w-[1400px] mx-auto px-4 sm:px-8 py-20">
        {services.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service: any) => (
              <Link 
                key={service.id} 
                // KHẮC PHỤC LỖI UNDEFINED: dùng slug, nếu null thì dùng id
                href={`/services/${service.slug || service.id}`}
                className="group relative block aspect-[3/4] overflow-hidden bg-black rounded-lg cursor-pointer"
              >
                {/* ẢNH TỪ BACKEND */}
                <img
                  src={service.image} 
                  alt={service.title}
                  className="absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-out group-hover:scale-110 group-hover:opacity-50"
                />

                <div className="absolute inset-0 bg-blue-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="absolute inset-0 flex flex-col justify-end p-8 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-all duration-700 group-hover:opacity-0 group-hover:translate-y-10">
                  <h3 className="text-1xl font-black text-white leading-tight uppercase mb-4">
                    {service.title}
                  </h3>
                  {/* HIỂN THỊ DESCRIPTION DẠNG HTML TỪ BACKEND */}
                  <div className="flex justify-between items-center border-t border-white/20 pt-2">
                    <span className="text-blue-400 font-bold text-xs uppercase tracking-widest">
                      Chi tiết dịch vụ
                    </span>
                  </div>
                </div>

                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <span className="border-2 border-white text-white px-6 py-2 font-bold uppercase tracking-widest">
                    Tìm hiểu thêm
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-400 uppercase font-bold tracking-widest">
            Không tìm thấy dịch vụ nào cho "{q}"
          </div>
        )}

        {/* --- PHẦN LIÊN HỆ --- */}
        <div className="mt-24 bg-gray-50 p-12 text-center rounded-2xl border border-gray-100">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-6 uppercase">
            Bạn cần tư vấn riêng?
          </h2>
          <Link 
            href="/contact" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-full font-bold transition-all shadow-xl inline-block uppercase tracking-widest"
          >
            Liên hệ ngay
          </Link>
        </div>
      </div>
    </div>
  );
}