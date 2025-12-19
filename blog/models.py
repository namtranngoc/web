from django.db import models

class Post(models.Model):
    title = models.CharField(max_length=200, verbose_name="Tiêu đề bài viết")
    slug = models.SlugField(unique=True, verbose_name="Đường dẫn (Slug)")
    content = models.TextField(verbose_name="Nội dung bài viết")
    image = models.ImageField(upload_to='blog_images/', verbose_name="Hình ảnh đại diện")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Ngày tạo")

    # Hàm tóm tắt tự động lấy 150 ký tự từ nội dung
    @property
    def summary(self):
        if self.content:
            return self.content[:150] + "..." if len(self.content) > 150 else self.content
        return ""

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = "Bài viết"
        verbose_name_plural = "Danh sách bài viết"
        ordering = ['-created_at'] # Bài mới nhất hiện lên đầu


class Service(models.Model):
    title = models.CharField(max_length=200, verbose_name="Tên dịch vụ")
    description = models.TextField(verbose_name="Mô tả dịch vụ")
    image = models.ImageField(upload_to='services/', verbose_name="Hình ảnh dịch vụ")
    icon_name = models.CharField(max_length=50, blank=True, verbose_name="Mã định danh Icon", help_text="Ví dụ: star, heart, soccer-ball...")
    order = models.IntegerField(default=0, verbose_name="Thứ tự ưu tiên", help_text="Số càng nhỏ hiện càng trước")

    def __str__(self): # Sửa lại từ __clstr__ thành __str__ mới chuẩn Django
        return self.title

    class Meta:
        verbose_name = "Dịch vụ"
        verbose_name_plural = "Danh sách dịch vụ"
        ordering = ['order']