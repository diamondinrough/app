# -*- coding: utf-8 -*-
# Generated by Django 1.9.7 on 2016-08-22 23:07
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0029_auto_20160822_1946'),
    ]

    operations = [
        migrations.AddField(
            model_name='team',
            name='description',
            field=models.TextField(blank=True),
        ),
    ]