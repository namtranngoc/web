import os
from django.db import models
from django.db.models.signals import post_delete
from django.dispatch import receiver
from django.utils.text import slugify 
from unidecode import unidecode

class Post(models.Model):
    title = models.CharField(max_length=200, verbose_name="Tiêu đề bài viết")
    slug = models.SlugField(unique=True, blank=True, verbose_name="Đường dẫn (Slug)")
    content = models.TextField(verbose_name="Nội dung bài viết")
    image = models.ImageField(upload_to='blog_images/', verbose_name="Hình ảnh đại diện")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Ngày tạo")

    def save(self, *args, **kwargs):
        # Luôn tạo lại slug từ tiêu đề để dọn dẹp tiếng Việt (Điện -> dien)
        if self.title:
            self.slug = slugify(unidecode(self.title))
        super().save(*args, **kwargs)

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
        ordering = ['-created_at']

class Service(models.Model):
    title = models.CharField(max_length=200, verbose_name="Tên dịch vụ")
    slug = models.SlugField(unique=True, blank=True, verbose_name="Đường dẫn (Slug)")
    description = models.TextField(verbose_name="Mô tả dịch vụ")
    image = models.ImageField(upload_to='services/', verbose_name="Hình ảnh dịch vụ")
    order = models.IntegerField(default=0, verbose_name="Thứ tự ưu tiên")

    def save(self, *args, **kwargs):
        if self.title:
            self.slug = slugify(unidecode(self.title))
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = "Dịch vụ"
        verbose_name_plural = "Danh sách dịch vụ"
        ordering = ['order']

# --- SIGNALS ---
@receiver(post_delete, sender=Post)
def auto_delete_file_on_delete_post(sender, instance, **kwargs):
    if instance.image and os.path.isfile(instance.image.path):
        os.remove(instance.image.path)

@receiver(post_delete, sender=Service)
def auto_delete_file_on_delete_service(sender, instance, **kwargs):
    if instance.image and os.path.isfile(instance.image.path):
        os.remove(instance.image.path)