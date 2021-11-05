from rest_framework.serializers import ModelSerializer

from .models import MonthlyBudget


class MonthlyBudgetSerializer(ModelSerializer):
    class Meta:
        model = MonthlyBudget
        fields = '__all__'
