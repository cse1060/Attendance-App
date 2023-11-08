from django.contrib import admin
from django.urls import path
from . import views
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path('admin/', admin.site.urls),
    path('login/', views.login_page),
    path('signup/', views.signup),
    path('verifyuser/', views.verify_user),
    path('create_profile/<str:slug>/', views.create_profile),
    path('take_attendance/', views.take_attendance),
    path('create_class/', views.create_class),
    path('get_user/<str:slug>/', views.get_user),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
