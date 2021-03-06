# Generated by Django 3.2.7 on 2022-03-27 15:47

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('cs_go_site', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Feedback',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('text', models.CharField(max_length=255)),
                ('rating', models.IntegerField()),
                ('data', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.AddField(
            model_name='myuser',
            name='feedback',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='cs_go_site.feedback'),
        ),
    ]
