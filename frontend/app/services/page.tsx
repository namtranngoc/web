import Link from 'next/link';

export default function ServicesPage() {
  const services = [
    {
      id: 1,
      title: "Học Viện Bóng Đá Trẻ",
      description: "Chương trình đào tạo theo tiêu chuẩn Real Madrid Foundation dành cho lứa tuổi từ 6 đến 18.",
      image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=2000",
      price: "Từ 2.000.000 VNĐ / tháng"
    },
    {
      id: 2,
      title: "Cho Thuê Sân Vận Động",
      description: "Hệ thống sân cỏ tự nhiên và nhân tạo đạt chuẩn FIFA cho các giải đấu và sự kiện lớn.",
      image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2000",
      price: "Liên hệ báo giá"
    },
    {
      id: 3,
      title: "Tổ Chức Sự Kiện Thể Thao",
      description: "Dịch vụ trọn gói từ khâu lên ý tưởng, vận hành giải đấu đến truyền thông chuyên nghiệp.",
      image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=2000",
      price: "Từ 10.000.000 VNĐ"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* --- HERO SECTION --- */}
      <div className="relative h-[40vh] md:h-[50vh] w-full flex items-center justify-center overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=2000" 
          alt="Services Background"
          className="absolute inset-0 w-full h-full object-cover brightness-[0.3]"
        />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 uppercase tracking-tighter">
            Dịch Vụ Của Chúng Tôi
          </h1>
          <div className="h-1.5 w-24 bg-blue-600 mx-auto"></div>
        </div>
      </div>

      {/* --- DANH SÁCH DỊCH VỤ --- */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service) => (
            <div 
              key={service.id} 
              className="group relative block aspect-[3/4] overflow-hidden bg-black rounded-lg"
            >
              {/* 1. ẢNH NỀN FULL */}
              <img
                src={service.image} 
                alt={service.title}
                className="absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-out group-hover:scale-110 group-hover:opacity-50"
              />

              {/* 2. OVERLAY XANH KHI HOVER */}
              <div className="absolute inset-0 bg-blue-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* 3. NỘI DUNG CHỮ - BIẾN MẤT KHI HOVER */}
              <div className="absolute inset-0 flex flex-col justify-end p-8 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-all duration-700 group-hover:opacity-0 group-hover:translate-y-10">
                <h3 className="text-3xl font-black text-white leading-tight uppercase mb-4">
                  {service.title}
                </h3>
                <p className="text-gray-300 text-sm mb-6 leading-relaxed line-clamp-2">
                  {service.description}
                </p>
                <div className="flex justify-between items-center border-t border-white/20 pt-4">
                  <span className="text-blue-400 font-bold text-xs uppercase tracking-widest">
                    {service.price}
                  </span>
                </div>
              </div>

              {/* 4. CHI TIẾT HIỆN RA KHI HOVER (TÙY CHỌN) */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <span className="border-2 border-white text-white px-6 py-2 font-bold uppercase tracking-widest">
                  Tìm hiểu thêm
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* --- PHẦN LIÊN HỆ NHANH --- */}
        <div className="mt-24 bg-gray-50 p-12 text-center rounded-2xl border border-gray-100">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-6 uppercase">
            Bạn cần tư vấn riêng?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-10 text-lg">
            Chúng tôi luôn sẵn sàng hỗ trợ bạn thiết kế những giải pháp thể thao tối ưu nhất theo nhu cầu cá nhân hoặc doanh nghiệp.
          </p>
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