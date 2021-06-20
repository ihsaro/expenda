from rest_framework import status
from rest_framework.request import Request
from rest_framework.response import Response

from authentication.serializers import ProdexUserSerializer
from authentication.utils import get_user_from_access_token


def get_logged_in_user_details(*, request: Request) -> Response:
    return Response(
        ProdexUserSerializer(get_user_from_access_token(request=request)).data,
        status=status.HTTP_200_OK
    )
