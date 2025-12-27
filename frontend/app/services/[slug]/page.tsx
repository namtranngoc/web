// app/services/[slug]/page.tsx

async function getServiceDetail(slug: string) {
  try {
    // API của bạn cần slug để lấy chi tiết
    const res = await fetch(`https://namtranngoc.pythonanywhere.com/api/services/${slug}/`, {
      cache: 'no-store',
    });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    return null;
  }
}

export default async function ServiceDetailPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  // BẮT BUỘC có await params trong Next.js 15
  const { slug } = await params; 

  const service = await getServiceDetail(slug);

  if (!service) {
    return <div className="p-10 text-center">Không tìm thấy dịch vụ: {slug}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-3 pt-24">
      <h1 className="text-2xl font-black uppercase mb-5">{service.title}</h1>
      {service.image && (
        <img src={service.image} alt={service.title} className="w-full rounded-2xl mb-10" />
      )}
      <div 
        className="prose max-w-none text-gray-1000 text-lg"
        dangerouslySetInnerHTML={{ __html: service.description }}
      />
    </div>
  );
}