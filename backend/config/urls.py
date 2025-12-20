from django.contrib import admin
from django.urls import path
from blog.views import PostList, ServiceList # Import thêm ServiceList
from django.conf import settings
from django.conf.urls.static import static
from blog.views import ServiceDetailView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/posts/', PostList.as_view()),
    path('api/services/', ServiceList.as_view()), # Đăng ký API Dịch vụ tại đây
    path('services/<int:id>/', ServiceDetailView.as_view(), name='service-detail'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)