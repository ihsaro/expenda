from django.urls import path

from .apis import (
    ListCreateExpensesAPI,
    RetrieveUpdateDeleteExpenseAPI,
    ListSetMonthlyBudgetAPI,
    RetrieveMonthlyBudgetAPI
)

urlpatterns = [
    path('', ListCreateExpensesAPI.as_view(), name='expenses_list_create_expenses'),
    path('<int:pk>/', RetrieveUpdateDeleteExpenseAPI.as_view(), name='expenses_retrieve_update_delete_expense'),
    path('monthly-budget/', ListSetMonthlyBudgetAPI.as_view(), name='expenses_list_set_monthly_budget'),
    path('monthly-budget/<int:pk>/', RetrieveMonthlyBudgetAPI.as_view(), name='expenses_retrieve_monthly_budget')
]
