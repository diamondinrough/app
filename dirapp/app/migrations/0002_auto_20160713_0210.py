# -*- coding: utf-8 -*-
# Generated by Django 1.9.7 on 2016-07-13 02:10
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='article',
            name='image',
            field=models.ImageField(default='articles/images/noimage.gif', upload_to='articles/images/'),
        ),
        migrations.AlterField(
            model_name='articlelink',
            name='image',
            field=models.ImageField(default='articles/images/noimage.gif', upload_to='articles/images/'),
        ),
    ]