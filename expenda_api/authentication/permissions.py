from rest_framework.permissions import BasePermission
from rest_framework_simplejwt.exceptions import TokenError
from rest_framework_simplejwt.tokens import AccessToken

from .utils import get_access_token


class IsJWTTokenValid(BasePermission):
    def has_permission(self, request, view):
        try:
            access_token = get_access_token(request=request)
            _ = AccessToken(token=access_token)
            return True
        except TokenError:
            return False
