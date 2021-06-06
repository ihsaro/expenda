from rest_framework.views import APIView

from authentication.permissions import IsJWTTokenValid

from .selectors import (
    list_expenses_selector,
    retrieve_expense_selector,
    list_monthly_budgets_selector,
    retrieve_monthly_budget_selector
)

from .services import (
    create_expenses_service,
    update_expense_service,
    delete_expense_service,
    set_monthly_budget_service
)


class ListCreateExpensesAPI(APIView):
    permission_classes = [IsJWTTokenValid]

    def get(self, request):
        return list_expenses_selector(request=request)

    def post(self, request):
        return create_expenses_service(request=request)


class RetrieveUpdateDeleteExpenseAPI(APIView):
    permission_classes = [IsJWTTokenValid]

    def get(self, request, pk):
        return retrieve_expense_selector(request=request, pk=pk)

    def put(self, request, pk):
        return update_expense_service(request=request, pk=pk)

    def delete(self, request, pk):
        return delete_expense_service(request=request, pk=pk)


class ListSetMonthlyBudgetAPI(APIView):
    permission_classes = [IsJWTTokenValid]

    def get(self, request):
        return list_monthly_budgets_selector(request=request)

    def post(self, request):
        return set_monthly_budget_service(request=request)


class RetrieveMonthlyBudgetAPI(APIView):
    permission_classes = [IsJWTTokenValid]

    def get(self, request, pk):
        return retrieve_monthly_budget_selector(request=request, pk=pk)
