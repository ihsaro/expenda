from rest_framework import status
from rest_framework.request import Request
from rest_framework.response import Response

from authentication.utils import get_user_from_access_token

from .models import MonthlyBudget
from .selectors import fetch_expense
from .serializers import CreateExpenseSerializer, UpdateExpenseSerializer, MonthlyBudgetSerializer


def create_expenses_service(*, request: Request) -> Response:
    request.data.__setitem__('owner', get_user_from_access_token(request=request).pk)
    serializer = CreateExpenseSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


def update_expense_service(*, request: Request, pk: int) -> Response:
    serializer = UpdateExpenseSerializer(
        fetch_expense(pk=pk, current_user=get_user_from_access_token(request=request)),
        data=request.data
    )

    if serializer.is_valid(raise_exception=True):
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


def delete_expense_service(*, request: Request, pk: int) -> Response:
    fetch_expense(pk=pk, current_user=get_user_from_access_token(request=request)).delete()
    return Response({'detail': 'Expense deleted'}, status=status.HTTP_204_NO_CONTENT)


def set_monthly_budget_service(*, request: Request) -> Response:
    request.data.__setitem__('owner', get_user_from_access_token(request=request).pk)
    try:
        serializer = MonthlyBudgetSerializer(
            MonthlyBudget.objects.get(owner=get_user_from_access_token(request=request), month=request.data['month'],
                                      year=request.data['year']),
            data=request.data
        )
    except MonthlyBudget.DoesNotExist:
        serializer = MonthlyBudgetSerializer(data=request.data)
        created = True

    if serializer.is_valid(raise_exception=True):
        serializer.save()
        if not created:
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
