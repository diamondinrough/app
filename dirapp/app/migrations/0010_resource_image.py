# -*- coding: utf-8 -*-
# Generated by Django 1.9.7 on 2016-08-02 01:19
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0009_auto_20160728_2032'),
    ]

    operations = [
        migrations.AddField(
            model_name='resource',
            name='image',
            field=models.ImageField(default='no image', upload_to='resources/images/'),
            preserve_default=False,
        ),
    ]
