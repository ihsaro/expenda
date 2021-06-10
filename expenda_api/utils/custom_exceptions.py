from rest_framework.exceptions import PermissionDenied


class AppPermissionDenied(PermissionDenied):
    default_detail = {
        'detail': 'You do not have permission to perform this action.',
        'code': 'PERMISSION_DENIED'
    }
