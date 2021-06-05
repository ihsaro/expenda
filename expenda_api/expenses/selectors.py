from rest_framework import status
from rest_framework.request import Request
from rest_framework.response import Response

from authentication.utils import get_user_from_access_token

from .models import Expense
from .serializers import ListRetrieveExpenseSerializer


def list_expenses_selector(*, request: Request) -> Response:
    return Response(
        ListRetrieveExpenseSerializer(Expense.objects.filter(owner=get_user_from_access_token(request=request)),
                                      many=True).data,
        status=status.HTTP_200_OK
    )


def retrieve_expense_selector(*, request: Request, id: int) -> Response:
    expense = Expense.objects.filter(id=id).first()

    if not expense:
        return Response({'detail': 'Not found'}, status=status.HTTP_404_NOT_FOUND)

    if expense.owner != get_user_from_access_token(request=request):
        return Response({'detail': 'Forbidden'}, status=status.HTTP_403_FORBIDDEN)

    return Response(ListRetrieveExpenseSerializer(expense).data, status=status.HTTP_200_OK)
