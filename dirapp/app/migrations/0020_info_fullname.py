# -*- coding: utf-8 -*-
# Generated by Django 1.9.7 on 2016-08-12 18:43
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0019_auto_20160812_1839'),
    ]

    operations = [
        migrations.AddField(
            model_name='info',
            name='fullname',
            field=models.CharField(blank=True, max_length=100),
        ),
    ]