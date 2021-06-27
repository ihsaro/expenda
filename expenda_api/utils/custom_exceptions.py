from rest_framework import status
from rest_framework.exceptions import PermissionDenied, NotAuthenticated, APIException
from rest_framework.response import Response
from rest_framework.views import exception_handler


class AppPermissionDenied(PermissionDenied):
    default_detail = {
        'detail': 'You do not have permission to perform this action.',
        'code': 'PERMISSION_DENIED'
    }


class JWTRefreshTokenExpired(APIException):
    default_detail = {
        'detail': 'Refresh token expired',
        'code': 'REFRESH_TOKEN_EXPIRED'
    }

    status_code = 401


def custom_not_authenticated_handler_exception(exc, context):
    if isinstance(exc, NotAuthenticated):
        return Response({
            'detail': 'You are not authenticated',
            'code': 'NOT_AUTHENTICATED'
        }, status=status.HTTP_401_UNAUTHORIZED)

    # else
    # default case
    return exception_handler(exc, context)
