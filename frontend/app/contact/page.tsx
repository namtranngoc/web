'use client';

export default function ContactPage() {
  const CONTACT_INFO = {
    address: "a",
    phone: "0123 456 789",
    zalo_link: "https://zalo.me/0123456789", 
    fb_link: "https://facebook.com/madridista.it",
    insta: "https://instagram.com/madridista.it",
    mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3036.0042730164243!2d-3.690949223425301!3d40.45305405342131!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd4228e23705d39f%3A0xa8c06ad30b3554c3!2sSantiago%20Bernabéu%20Stadium!5e0!3m2!1svi!2s!4v1703666000000!5m2!1svi!2s"
  };

  return (
    <div className="min-h-screen bg-white pt-32 pb-20 font-serif">
      <div className="max-w-[1400px] mx-auto px-6">
        
        {/* TIÊU ĐỀ */}
        <div className="mb-16 border-b-2 border-gray-100 pb-8">
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter italic">
            LIÊN <span className="text-blue-600">HỆ</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-stretch">
          
          {/* CỘT TRÁI: BẢN ĐỒ */}
          <div className="w-full aspect-square md:aspect-auto bg-gray-50 rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
            <iframe
              src={CONTACT_INFO.mapEmbed}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '450px' }}
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>

          {/* CỘT PHẢI: THÔNG TIN */}
          <div className="flex flex-col justify-center gap-10">
            <div className="space-y-10">
              <h3 className="text-2xl font-black uppercase border-l-4 border-blue-600 pl-5 text-gray-900">Thông tin trực tiếp</h3>
              
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 text-white flex items-center justify-center rounded-full font-bold shrink-0"><img src="address.png" alt="" /></div>
                <div>
                  <p className="text-[10px] font-black uppercase text-blue-600 tracking-widest">Địa chỉ văn phòng</p>
                  <p className="text-xl font-bold uppercase text-gray-800">{CONTACT_INFO.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-12 h-12 text-white flex items-center justify-center rounded-full font-bold shrink-0"><img src="phone.png" alt="" /></div>
                <div>
                  <p className="text-[10px] font-black uppercase text-blue-600 tracking-widest">Hotline hỗ trợ</p>
                  <p className="text-3xl font-black italic tracking-tighter text-gray-900">{CONTACT_INFO.phone}</p>
                </div>
              </div>
            </div>

            {/* KHU VỰC ICON DÙNG ẢNH FULL SÁT VIỀN */}
            <div className="pt-10 border-t border-gray-100">
              <p className="text-[15px] font-black uppercase text-gray-700 mb-5 italic tracking-widest">Liên hệ qua mạng xã hội</p>
              <div className="flex gap-6">
                
                {/* ICON ZALO */}
                <a 
                  href={CONTACT_INFO.zalo_link} 
                  target="_blank" 
                  className="w-11 h-11 rounded-full overflow-hidden border-2 border-gray-100 shadow-md hover:scale-110 transition-transform active:scale-95 bg-white flex items-center justify-center"
                >
                  <img 
                    src="/zalo.svg" 
                    alt="Zalo Icon" 
                    className="w-full h-full object-cover" 
                    onError={(e) => { e.currentTarget.src = "https://placehold.co/100x100?text=Zalo"; }}
                  />
                </a>

                {/* ICON FACEBOOK */}
                <a 
                  href={CONTACT_INFO.insta} 
                  target="_blank" 
                  className="w-11 h-11 rounded-full overflow-hidden border-2 border-gray-100 shadow-md hover:scale-110 transition-transform active:scale-95 bg-white flex items-center justify-center"
                >
                  <img 
                    src="/instagram.png" 
                    alt="Instagram Icon" 
                    className="w-full h-full object-cover"
                    onError={(e) => { e.currentTarget.src = "https://placehold.co/100x100?text=FB"; }}
                  />
                </a>

                <a 
                  href={CONTACT_INFO.fb_link} 
                  target="_blank" 
                  className="w-11 h-11 rounded-full overflow-hidden border-2 border-gray-100 shadow-md hover:scale-110 transition-transform active:scale-95 bg-white flex items-center justify-center"
                >
                  <img 
                    src="/facebook.png" 
                    alt="Facebook Icon" 
                    className="w-full h-full object-cover"
                    onError={(e) => { e.currentTarget.src = "https://placehold.co/100x100?text=FB"; }}
                  />
                </a>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}