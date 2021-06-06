from django.urls import path

from .apis import (
    ListCreateExpensesAPI,
    RetrieveUpdateDeleteExpenseAPI
)

urlpatterns = [
    path('', ListCreateExpensesAPI.as_view(), name='expenses_list_create_expenses'),
    path('<int:pk>', RetrieveUpdateDeleteExpenseAPI.as_view(), name='expenses_retrieve_update_delete_expense'),
]
