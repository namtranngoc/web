// frontend/app/services/[id]/page.tsx

async function getServiceDetail(slug: string) {
  try {
    const res = await fetch(`https://namtranngoc.pythonanywhere.com/api/services/${slug}/`, {
      cache: 'no-store',
    });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error("Lỗi fetch dịch vụ:", error);
    return null;
  }
}

export default async function ServiceDetailPage({ params }: { params: { id: string } }) {
  const service = await getServiceDetail(params.id);

  if (!service) {
    return <div className="p-10 text-center">Không tìm thấy dịch vụ hoặc lỗi kết nối.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{service.title}</h1>
      {service.image && (
        <img 
          src={service.image} 
          alt={service.title} 
          className="w-full h-auto rounded-lg mb-6" 
        />
      )}
      <div className="prose lg:prose-xl">
        <p className="text-gray-700 leading-relaxed">
          {service.description}
        </p>
      </div>
    </div>
  );
}