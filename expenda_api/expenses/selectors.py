from rest_framework import status
from rest_framework.exceptions import NotFound, PermissionDenied
from rest_framework.request import Request
from rest_framework.response import Response

from authentication.models import AppUser
from authentication.utils import get_user_from_access_token

from .models import Expense
from .serializers import ListRetrieveExpenseSerializer


def list_expenses_selector(*, request: Request) -> Response:
    return Response(
        ListRetrieveExpenseSerializer(Expense.objects.filter(owner=get_user_from_access_token(request=request)),
                                      many=True).data,
        status=status.HTTP_200_OK
    )


def retrieve_expense_selector(*, request: Request, pk: int) -> Response:
    return Response(
        ListRetrieveExpenseSerializer(fetch_expense(pk=pk, current_user=get_user_from_access_token(request=request))).data,
        status=status.HTTP_200_OK
    )


def fetch_expense(*, pk: int, current_user: AppUser) -> Expense:
    try:
        expense = Expense.objects.get(pk=pk)
    except Expense.DoesNotExist:
        raise NotFound

    if expense.owner != current_user:
        raise PermissionDenied

    return expense
