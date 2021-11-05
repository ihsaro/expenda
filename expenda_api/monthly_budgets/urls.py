from django.urls import path

from .apis import (
    ListSetMonthlyBudgetAPI,
    RetrieveMonthlyBudgetAPI,
)

urlpatterns = [
    path('', ListSetMonthlyBudgetAPI.as_view(), name='monthly_budgets_list_set_monthly_budget'),
    path('<int:pk>', RetrieveMonthlyBudgetAPI.as_view(), name='monthly_budgets_retrieve_monthly_budget'),
]
