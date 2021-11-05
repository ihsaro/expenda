from django.contrib import admin
from django.urls import include, path


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/authentication/', include('authentication.urls')),
    path('api/v1/expenses/', include('expenses.urls')),
    path('api/v1/monthly-budgets/', include('monthly_budgets.urls')),
]
