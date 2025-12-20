from django.contrib import admin
from django.urls import path
from blog.views import PostList, ServiceList, ServiceDetail  # Đổi lại tên cho khớp với Views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/posts/', PostList.as_view()),
    path('api/services/', ServiceList.as_view()), 
    path('api/services/<int:id>/', ServiceDetail.as_view(), name='service-detail'),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)