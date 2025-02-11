from django.urls import path, include
from .views import UserRegisterView, get_csrf_token, login_view, logout_view

urlpatterns = [
    path('api-auth/', include('rest_framework.urls')),
    path('register/', UserRegisterView.as_view(), name='register'),
    path("csrf/", get_csrf_token, name="get-csrf-token"),
    path('login/', login_view, name='login'),
    path('logout/', logout_view, name='logout'),
]
