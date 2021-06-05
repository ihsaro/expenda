from django.urls import path

from .apis import (
    LoginAPI,
    LogoutAPI,
    RegisterAPI,
    SlideTokenAPI
)

urlpatterns = [
    path('login/', LoginAPI.as_view(), name='authentication_login'),
    path('logout/', LogoutAPI.as_view(), name='authentication_logout'),
    path('register/', RegisterAPI.as_view(), name='authentication_register'),
    path('slide-token/', SlideTokenAPI.as_view(), name='authentication_slide_token'),
]
