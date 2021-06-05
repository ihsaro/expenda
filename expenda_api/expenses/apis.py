from rest_framework.views import APIView

from authentication.permissions import IsJWTTokenValid

from .selectors import (
    list_expenses_selector,
    retrieve_expense_selector
)

from .services import (
    create_expenses_service,
    update_expense_service,
    delete_expense_service
)


class ListCreateExpensesAPI(APIView):
    permission_classes = [IsJWTTokenValid]

    def get(self, request):
        return list_expenses_selector(request=request)

    def post(self, request):
        return create_expenses_service(request=request)


class RetrieveUpdateDeleteExpenseAPI(APIView):
    permission_classes = [IsJWTTokenValid]

    def get(self, request, id):
        return retrieve_expense_selector(request=request, id=id)

    def put(self, request, id):
        return update_expense_service(request=request, id=id)

    def delete(self, request, id):
        return delete_expense_service(request=request, id=id)
