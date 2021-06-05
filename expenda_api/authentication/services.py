from rest_framework import status
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken

from authentication.models import AppUser
from authentication.serializers import ProdexUserSerializer
from authentication.utils import get_refresh_token


def register(*, request: Request) -> Response:
    serializer = ProdexUserSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    created_user = serializer.save()

    return Response(
        ProdexUserSerializer(AppUser.objects.filter(username=created_user.username).first()).data,
        status=status.HTTP_201_CREATED
    )


def logout(*, request: Request) -> Response:
    refresh_token = RefreshToken(get_refresh_token(request=request), verify=False)
    refresh_token.blacklist()

    response = Response(
        {'detail': 'Logout successful'},
        status=status.HTTP_200_OK
    )
    response.delete_cookie('access')
    response.delete_cookie('refresh')

    return response
