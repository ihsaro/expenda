from rest_framework.exceptions import NotAuthenticated
from rest_framework.request import Request
from rest_framework_simplejwt.authentication import JWTAuthentication

from authentication.models import AppUser


def get_user_from_access_token(*, request: Request) -> AppUser:
    jwt_authentication = JWTAuthentication()
    return jwt_authentication.get_user(jwt_authentication.get_validated_token(get_access_token(request=request)))


def get_access_token(*, request: Request) -> str:
    raw_token = ''
    if 'Authorization' in request.headers and str(request.headers['Authorization']).startswith('Bearer '):
        raw_token = request.headers['Authorization'][7:]
    elif 'access' in request.COOKIES:
        raw_token = request.COOKIES['access']

    if raw_token == '':
        raise NotAuthenticated

    return raw_token


def get_refresh_token(*, request: Request) -> str:
    raw_token = ''

    if 'refresh' in request.data:
        raw_token = request.data['refresh']
    elif 'refresh' in request.COOKIES:
        raw_token = request.COOKIES['refresh']

    if raw_token == '':
        raise NotAuthenticated

    return raw_token
