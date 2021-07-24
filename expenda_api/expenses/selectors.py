import calendar

from datetime import datetime
from typing import List

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


def list_monthly_expenses_total_selector(*, request: Request) -> Response:
    clustered_user_expenses = {}
    current_user_expenses = Expense.objects.filter(owner=get_user_from_access_token(request=request)).order_by('purchased_timestamp')
    for current_user_expense in current_user_expenses:
        expense_month_name = calendar.month_name[current_user_expense.purchased_timestamp.month]
        expense_year = current_user_expense.purchased_timestamp.year

        if f'{expense_month_name} {expense_year}' not in clustered_user_expenses:
            clustered_user_expenses[f'{expense_month_name} {expense_year}'] = 0.0
        clustered_user_expenses[f'{expense_month_name} {expense_year}'] += (current_user_expense.price *
                                                                            current_user_expense.quantity)

    clustered_user_expenses_response_list = []

    for key in clustered_user_expenses:
        clustered_user_expenses_response_list.append({
            'month': key,
            'value': clustered_user_expenses[key]
        })

    return Response(clustered_user_expenses_response_list)


def fetch_expense(*, pk: int, current_user: AppUser) -> Expense:
    try:
        expense = Expense.objects.get(pk=pk)
    except Expense.DoesNotExist:
        raise NotFound

    if expense.owner != current_user:
        raise AppPermissionDenied

    return expense


def fetch_expenses(*, list_pk: List[int], current_user: AppUser) -> List[int]:
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
