# Tạo môi trường ảo (để quản lý thư viện riêng biệt)
python -m venv venv

# Kích hoạt môi trường ảo

Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
Trên Windows: venv\Scripts\activate

# Cài đặt các thư viện cần thiết
pip install django djangorestframework django-cors-headers
pip install -r requirements.txt
#

python manage.py makemigrations
python manage.py migrate
# Tạo tài khoản quản lý để đăng bài
python manage.py createsuperuser 
# Chạy server
python manage.py runserver
# chạy sv fe
npm install
npm install -D @tailwindcss/typography
npm run dev# ok
