# -*- coding: utf-8 -*-
# Generated by Django 1.9.7 on 2016-08-24 00:26
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0003_auto_20160824_0025'),
    ]

    operations = [
        migrations.AlterField(
            model_name='task',
            name='leader',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='taskleaders', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='task',
            name='members',
            field=models.ManyToManyField(related_name='taskmembers', to=settings.AUTH_USER_MODEL),
        ),
    ]
