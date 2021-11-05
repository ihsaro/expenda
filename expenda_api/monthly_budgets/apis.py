from rest_framework.views import APIView

from authentication.permissions import IsJWTTokenValid

from .services import set_monthly_budget_service
from .selectors import list_monthly_budgets_selector, retrieve_monthly_budget_selector


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
