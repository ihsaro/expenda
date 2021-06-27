from rest_framework import status
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework_simplejwt.exceptions import TokenError
from rest_framework_simplejwt.tokens import AccessToken, RefreshToken

from authentication.serializers import ProdexUserSerializer
from authentication.utils import get_user_from_access_token, get_access_token, get_refresh_token


def get_logged_in_user_details(*, request: Request) -> Response:
    return Response(
        ProdexUserSerializer(get_user_from_access_token(request=request)).data,
        status=status.HTTP_200_OK
    )


def is_user_access_token_valid(*, request: Request) -> Response:
    try:
        AccessToken(get_access_token(request=request))
        return Response(
            {
                'detail': 'Access token valid',
                'code': 'ACCESS_TOKEN_VALID'
            },
            status=status.HTTP_200_OK
        )
    except TokenError:
        return Response(
            {
                'detail': 'Access token invalid',
                'code': 'ACCESS_TOKEN_INVALID'
            },
            status=status.HTTP_401_UNAUTHORIZED
        )


def is_user_refresh_token_valid(*, request: Request) -> Response:
    try:
        RefreshToken(get_refresh_token(request=request))
        return Response(
            {
                'detail': 'Refresh token valid',
                'code': 'REFRESH_TOKEN_VALID'
            },
            status=status.HTTP_200_OK
        )
    except TokenError:
        return Response(
            {
                'detail': 'Refresh token invalid',
                'code': 'REFRESH_TOKEN_INVALID'
            },
            status=status.HTTP_401_UNAUTHORIZED
        )
