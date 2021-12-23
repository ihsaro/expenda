from rest_framework import status
from rest_framework.request import Request
from rest_framework.response import Response

from authentication.utils import get_user_from_access_token

from .models import MonthlyBudget
from .serializers import MonthlyBudgetSerializer


def set_monthly_budget_service(*, request: Request) -> Response:
    request.data.__setitem__('owner', get_user_from_access_token(request=request).pk)
    created = False
    try:
        serializer = MonthlyBudgetSerializer(
            MonthlyBudget.objects.get(owner=get_user_from_access_token(request=request), month=request.data['month'],
                                      year=request.data['year']),
            data=request.data
        )
    except MonthlyBudget.DoesNotExist:
        if 'reference_code' not in request.data:
            request.data.__setitem__(
                'reference_code', '{month}_{year}_{owner}'.format(
                    month=request.data['month'],
                    year=request.data['year'],
                    owner=request.data['owner']
                )
            )
        serializer = MonthlyBudgetSerializer(data=request.data)
        created = True

    if serializer.is_valid(raise_exception=True):
        serializer.save()
        if not created:
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
