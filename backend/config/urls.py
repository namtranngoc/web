from django.contrib import admin
from django.urls import path
from blog.views import PostList, ServiceList, ServiceDetail # Import đúng tên class
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/posts/', PostList.as_view()),
    path('api/services/', ServiceList.as_view()),
    # Thêm api/ vào trước để đồng bộ link gọi từ Frontend
    path('api/services/<int:id>/', ServiceDetail.as_view(), name='service-detail'),
]

# Đưa dòng này ra ngoài if DEBUG để đảm bảo ảnh luôn hiện trên PythonAnywhere
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)