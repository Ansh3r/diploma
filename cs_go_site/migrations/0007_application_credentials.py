# Generated by Django 3.2.7 on 2022-05-07 10:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cs_go_site', '0006_alter_application_summary'),
    ]

    operations = [
        migrations.AddField(
            model_name='application',
            name='credentials',
            field=models.CharField(default='', max_length=255),
        ),
    ]
