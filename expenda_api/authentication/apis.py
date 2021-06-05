from rest_framework.exceptions import NotAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.exceptions import TokenError

from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from .models import AppUser
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
            raise NotAuthenticated('Refresh token invalid')

        data = serializer.validated_data
        response = Response({
            'access': data['access']
        })
        response.set_cookie(key='access', value=data['access'], httponly=True, samesite='strict', secure=True)
        return response


class LogoutAPI(APIView):
    def post(self, request):
        return logout(request=request)
