from rest_framework import generics
from .models import Post, Service
from .serializers import PostSerializer, ServiceSerializer
from django.db.models import Q

# API CHO BÀI VIẾT
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

# API CHO DỊCH VỤ (THÊM MỚI TẠI ĐÂY)
class ServiceList(generics.ListAPIView):
    queryset = Service.objects.all().order_by('order')
    serializer_class = ServiceSerializer
    lookup_field = 'id'