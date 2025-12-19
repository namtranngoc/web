from rest_framework import serializers
from .models import Post, Service

class PostSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = ['id', 'title', 'slug', 'summary', 'content', 'image', 'created_at']

    def get_image(self, obj):
        if obj.image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.image.url)
            return f"http://127.0.0.1:8000{obj.image.url}"
        return None

class ServiceSerializer(serializers.ModelSerializer):
    # Thêm xử lý ảnh giống bài viết để không bị lỗi hiển thị
    image = serializers.SerializerMethodField()

    class Meta:
        model = Service
        fields = ['id', 'title', 'description', 'image', 'icon_name', 'order']

    def get_image(self, obj):
        if obj.image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.image.url)
            return f"http://127.0.0.1:8000{obj.image.url}"
        return None