from rest_framework.serializers import ModelSerializer

from expenses.models import Expense, MonthlyBudget


class ListRetrieveExpenseSerializer(ModelSerializer):
    class Meta:
        model = Expense
        fields = '__all__'


class CreateExpenseSerializer(ModelSerializer):
    class Meta:
        model = Expense
        fields = ['name', 'description', 'amount', 'quantity', 'owner']


class UpdateExpenseSerializer(ModelSerializer):
    class Meta:
        model = Expense
        fields = ['name', 'description', 'amount', 'quantity']


class MonthlyBudgetSerializer(ModelSerializer):
    class Meta:
        model = MonthlyBudget
        fields = '__all__'
