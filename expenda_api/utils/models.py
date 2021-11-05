from django.db import models
from django.utils import timezone


class ExpendaBaseModel(models.Model):
    created_timestamp = models.DateTimeField(auto_now_add=True)
    last_modified_timestamp = models.DateTimeField(auto_now=True)
    reference_code = models.CharField(max_length=100, unique=True)

    class Meta:
        abstract = True
