from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.exceptions import TokenError

from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from utils.custom_exceptions import JWTRefreshTokenExpired
from .models import AppUser
from .permissions import IsJWTTokenValid
from .selectors import (
    get_logged_in_user_details,
    is_user_access_token_valid,
    is_user_refresh_token_valid
)
from .serializers import ProdexUserSerializer
from .services import (
    register,
    logout
)
from .utils import get_refresh_token


class LoginAPI(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data

        response = Response({
            'access': data['access'],
            'refresh': data['refresh'],
            'user': ProdexUserSerializer(AppUser.objects.filter(username=request.data['username']).first()).data
        })
        response.set_cookie(key='access', value=data['access'], httponly=True, samesite='strict', secure=True)
        response.set_cookie(key='refresh', value=data['refresh'], httponly=True, samesite='strict', secure=True)

        return response


class RegisterAPI(APIView):
    def post(self, request):
        return register(request=request)


class SlideTokenAPI(TokenRefreshView):
    def post(self, request):
        serializer = self.get_serializer(data={
            'refresh': get_refresh_token(request=request)
        })

        try:
            serializer.is_valid(raise_exception=True)
        except TokenError:
            raise JWTRefreshTokenExpired

        data = serializer.validated_data
        response = Response({
            'access': data['access']
        })
        response.set_cookie(key='access', value=data['access'], httponly=True, samesite='strict', secure=True)
        return response


class LogoutAPI(APIView):
    def post(self, request):
        return logout(request=request)


class UserAccessTokenValidAPI(APIView):
    def post(self, request):
        return is_user_access_token_valid(request=request)


class UserRefreshTokenValidAPI(APIView):
    def post(self, request):
        return is_user_refresh_token_valid(request=request)


class UserDetailsAPI(APIView):
    permission_classes = [IsJWTTokenValid]

    def get(self, request):
        return get_logged_in_user_details(request=request)
