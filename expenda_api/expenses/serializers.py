from rest_framework.serializers import ModelSerializer

from expenses.models import Expense


class ListRetrieveExpenseSerializer(ModelSerializer):
    class Meta:
        model = Expense
        fields = '__all__'
