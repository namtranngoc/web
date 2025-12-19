from django.contrib import admin
from .models import Post
from .models import Service

@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    # Tự động điền slug khi bạn gõ tiêu đề (Title)
    prepopulated_fields = {'slug': ('title',)}
    # Hiển thị các cột thông tin trong danh sách bài viết
    list_display = ('title', 'slug', 'created_at')

@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ('title', 'order')
    list_editable = ('order',)