from rest_framework import status
from rest_framework.request import Request
from rest_framework.response import Response

from authentication.utils import get_user_from_access_token

from .selectors import fetch_expense, fetch_expenses
from .serializers import CreateExpenseSerializer, UpdateExpenseSerializer


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


def batch_delete_expenses_service(*, request: Request) -> Response:
    for expense in fetch_expenses(list_pk=request.data['list_pk'],
                                  current_user=get_user_from_access_token(request=request)):
        expense.delete()

    return Response({'detail': 'Expenses deleted'}, status=status.HTTP_200_OK)
