from django.db import models
from django.contrib.postgres.fields import ArrayField
from django.contrib.auth.models import AbstractUser

class MyUser(AbstractUser):
    trade_url = models.TextField(max_length=100)

class Help(models.Model):
    text_message = models.TextField(max_length=255)
    date = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(MyUser, on_delete=models.CASCADE, blank=True, null=True)
    email = models.TextField(max_length=50)

class Comment(models.Model):
    user = models.ForeignKey(MyUser, on_delete=models.CASCADE, blank=True, null=True)
    comment_text = models.CharField(max_length=255)
    rating = models.IntegerField()
    date_time = models.DateTimeField(auto_now_add=True)

class History(models.Model):
    object_name = ArrayField(models.CharField(max_length=255))
    date_time = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(MyUser, on_delete=models.CASCADE, blank=True, null=True)
    is_ok = models.BooleanField(default=False)
    is_cancel = models.BooleanField(default=False)
    total_price = models.FloatField(null=True)
    wallet = models.CharField(max_length=26, default='')