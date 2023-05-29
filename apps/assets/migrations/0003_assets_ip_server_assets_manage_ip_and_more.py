# Generated by Django 4.0.4 on 2023-05-24 02:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('assets', '0002_alter_assets_assets_type_alter_assets_cabinet_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='assets',
            name='ip',
            field=models.CharField(blank=True, max_length=100, null=True, unique=True, verbose_name='管理ip'),
        ),
        migrations.AddField(
            model_name='server_assets',
            name='manage_ip',
            field=models.CharField(blank=True, max_length=100, null=True, unique=True, verbose_name='管理ip'),
        ),
        migrations.AlterField(
            model_name='card_assets',
            name='ip',
            field=models.CharField(blank=True, max_length=100, null=True, unique=True, verbose_name='绑定的服务ip'),
        ),
    ]