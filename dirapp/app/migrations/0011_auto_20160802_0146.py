# -*- coding: utf-8 -*-
# Generated by Django 1.9.7 on 2016-08-02 01:46
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0010_resource_image'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='headofinfo',
            name='email',
        ),
        migrations.RemoveField(
            model_name='headofinfo',
            name='name',
        ),
        migrations.RemoveField(
            model_name='headofinfo',
            name='position',
        ),
        migrations.RemoveField(
            model_name='headofinfo',
            name='wechat',
        ),
        migrations.AddField(
            model_name='user',
            name='email',
            field=models.CharField(default='no email', max_length=50),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='user',
            name='position',
            field=models.CharField(default='no position', max_length=50),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='user',
            name='wechat',
            field=models.CharField(default='no wechat', max_length=50),
            preserve_default=False,
        ),
    ]
