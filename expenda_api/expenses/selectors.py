from rest_framework import status
from rest_framework.exceptions import NotFound
from rest_framework.request import Request
from rest_framework.response import Response

from authentication.models import AppUser
from authentication.utils import get_user_from_access_token
from utils.custom_exceptions import AppPermissionDenied

from .models import Expense, MonthlyBudget
from .serializers import ListRetrieveExpenseSerializer, MonthlyBudgetSerializer


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


def list_monthly_budgets_selector(*, request: Request) -> Response:
    return Response(
        MonthlyBudgetSerializer(MonthlyBudget.objects.filter(owner=get_user_from_access_token(request=request)),
                                      many=True).data,
        status=status.HTTP_200_OK
    )


def retrieve_monthly_budget_selector(*, request: Request, pk: int) -> Response:
    return Response(
        MonthlyBudgetSerializer(
            fetch_monthly_budget(pk=pk, current_user=get_user_from_access_token(request=request))).data,
        status=status.HTTP_200_OK
    )


def fetch_expense(*, pk: int, current_user: AppUser) -> Expense:
    try:
        expense = Expense.objects.get(pk=pk)
    except Expense.DoesNotExist:
        raise NotFound

    if expense.owner != current_user:
        raise AppPermissionDenied

    return expense


def fetch_expenses(*, list_pk: [], current_user: AppUser) -> []:
    expenses = Expense.objects.filter(pk__in=list_pk)

    if not expenses:
        return []

    if expenses[0].owner != current_user:
        raise AppPermissionDenied

    return expenses


def fetch_monthly_budget(*, pk: int, current_user: AppUser) -> MonthlyBudget:
    try:
        monthly_budget = MonthlyBudget.objects.get(pk=pk)
    except MonthlyBudget.DoesNotExist:
        raise NotFound

    if monthly_budget.owner != current_user:
        raise AppPermissionDenied

    return monthly_budget
