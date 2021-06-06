from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models

from authentication.models import AppUser


class Expense(models.Model):
    name = models.CharField(max_length=100, blank=False, default='')
    description = models.CharField(max_length=1000, blank=True)
    amount = models.FloatField(blank=False, default=0)
    quantity = models.IntegerField(blank=False, default=1)
    created_timestamp = models.DateTimeField(auto_now_add=True)
    last_modified_timestamp = models.DateTimeField(auto_now=True)
    owner = models.ForeignKey(AppUser, on_delete=models.CASCADE)


class MonthlyBudget(models.Model):

    JANUARY = 'JAN'
    FEBRUARY = 'FEB'
    MARCH = 'MAR'
    APRIL = 'APR'
    MAY = 'MAY'
    JUNE = 'JUN'
    JULY = 'JUL'
    AUGUST = 'AUG'
    SEPTEMBER = 'SEP'
    OCTOBER = 'OCT'
    NOVEMBER = 'NOV'
    DECEMBER = 'DEC'

    MONTH_CHOICES = [
        (JANUARY, 'January'),
        (FEBRUARY, 'February'),
        (MARCH, 'March'),
        (APRIL, 'April'),
        (MAY, 'May'),
        (JUNE, 'June'),
        (JULY, 'July'),
        (AUGUST, 'August'),
        (SEPTEMBER, 'September'),
        (OCTOBER, 'October'),
        (NOVEMBER, 'November'),
        (DECEMBER, 'December'),
    ]

    YEAR_MIN_VALUE = 1970
    YEAR_MAX_VALUE = 2050

    month = models.CharField(max_length=3, choices=MONTH_CHOICES, blank=False, default=JANUARY)
    year = models.IntegerField(blank=False, default=YEAR_MIN_VALUE, validators=[
        MinValueValidator(YEAR_MIN_VALUE),
        MaxValueValidator(YEAR_MAX_VALUE)
    ])
    budget = models.FloatField(blank=False, default=0)
    owner = models.ForeignKey(AppUser, on_delete=models.CASCADE)

    def save(self, *args, **kwargs):
        self.full_clean()
        return super().save(*args, **kwargs)
