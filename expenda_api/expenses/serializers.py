from rest_framework.serializers import ModelSerializer

from expenses.models import Expense


class ListRetrieveExpenseSerializer(ModelSerializer):
    class Meta:
        model = Expense
        fields = '__all__'


class CreateExpenseSerializer(ModelSerializer):
    class Meta:
        model = Expense
        fields = ['name', 'description', 'price', 'quantity', 'purchased_timestamp', 'owner']


class UpdateExpenseSerializer(ModelSerializer):
    class Meta:
        model = Expense
        fields = ['name', 'description', 'price', 'quantity', 'purchased_timestamp']
