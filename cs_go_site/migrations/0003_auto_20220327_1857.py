# Generated by Django 3.2.7 on 2022-03-27 15:57

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('cs_go_site', '0002_auto_20220327_1847'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='myuser',
            name='feedback',
        ),
        migrations.AddField(
            model_name='feedback',
            name='owner',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]
