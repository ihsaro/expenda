from django.urls import path

from .apis import (
    ListCreateExpensesAPI,
    RetrieveUpdateDeleteExpenseAPI,
    BatchDeleteExpensesAPI,
    ListMonthlyExpensesTotalAPI
)

urlpatterns = [
    path('', ListCreateExpensesAPI.as_view(), name='expenses_list_create_expenses'),
    path('<int:pk>/', RetrieveUpdateDeleteExpenseAPI.as_view(), name='expenses_retrieve_update_delete_expense'),
    path('batch-delete/', BatchDeleteExpensesAPI.as_view(), name='expenses_batch_delete_expenses'),
    path('list-monthly-expenses-total/', ListMonthlyExpensesTotalAPI.as_view(),
         name='expenses_list_monthly_expenses_total'),
]
