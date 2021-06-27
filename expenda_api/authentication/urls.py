from django.urls import path

from .apis import (
    LoginAPI,
    LogoutAPI,
    RegisterAPI,
    SlideTokenAPI,
    UserDetailsAPI,
    UserAccessTokenValidAPI,
    UserRefreshTokenValidAPI,
)

urlpatterns = [
    path('login/', LoginAPI.as_view(), name='authentication_login'),
    path('logout/', LogoutAPI.as_view(), name='authentication_logout'),
    path('register/', RegisterAPI.as_view(), name='authentication_register'),
    path('slide-token/', SlideTokenAPI.as_view(), name='authentication_slide_token'),
    path('user-details/', UserDetailsAPI.as_view(), name='authentication_user_details'),
    path('user-access-token-valid/', UserAccessTokenValidAPI.as_view(), name='authentication_user_access_token_valid'),
    path('user-refresh-token-valid/', UserRefreshTokenValidAPI.as_view(), name='authentication_user_refresh_token_valid'),
]
