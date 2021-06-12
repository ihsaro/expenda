from rest_framework.exceptions import PermissionDenied, NotAuthenticated
from rest_framework.response import Response
from rest_framework.views import exception_handler


class AppPermissionDenied(PermissionDenied):
    default_detail = {
        'detail': 'You do not have permission to perform this action.',
        'code': 'PERMISSION_DENIED'
    }


def custom_not_authenticated_handler_exception(exc, context):
    if isinstance(exc, NotAuthenticated):
        return Response({
            'detail': 'You are not authenticated',
            'code': 'NOT_AUTHENTICATED'
        }, status=401)

    # else
    # default case
    return exception_handler(exc, context)
