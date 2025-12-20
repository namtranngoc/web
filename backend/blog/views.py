from rest_framework import generics
from .models import Post, Service
from .serializers import PostSerializer, ServiceSerializer
from django.db.models import Q

# API CHO BÀI VIẾT (Giữ nguyên)
class PostList(generics.ListAPIView):
    serializer_class = PostSerializer
    def get_queryset(self):
        queryset = Post.objects.all().order_by('-created_at')
        query = self.request.query_params.get('q')
        if query:
            queryset = queryset.filter(
                Q(title__icontains=query) | Q(content__icontains=query)
            )
        return queryset

# API CHO DỊCH VỤ (SỬA TẠI ĐÂY để tìm kiếm nhảy)
class ServiceList(generics.ListAPIView):
    serializer_class = ServiceSerializer
    def get_queryset(self):
        queryset = Service.objects.all().order_by('order')
        query = self.request.query_params.get('q')
        if query:
            # Lọc dịch vụ theo tiêu đề hoặc mô tả
            queryset = queryset.filter(
                Q(title__icontains=query) | Q(description__icontains=query)
            )
        return queryset

# API CHI TIẾT DỊCH VỤ
class ServiceDetail(generics.RetrieveAPIView):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer
    lookup_field = 'slug'