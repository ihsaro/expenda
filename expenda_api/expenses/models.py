from django.db import models

from authentication.models import AppUser
from utils.models import ExpendaBaseModel


class Expense(ExpendaBaseModel):
    name = models.CharField(max_length=100, blank=False, default='')
    description = models.CharField(max_length=1000, blank=True)
    price = models.FloatField(blank=False, default=0)
    quantity = models.IntegerField(blank=False, default=1)
    purchased_timestamp = models.DateTimeField()
    owner = models.ForeignKey(AppUser, on_delete=models.CASCADE)
