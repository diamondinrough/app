# -*- coding: utf-8 -*-
# Generated by Django 1.9.7 on 2016-08-26 01:37
from __future__ import unicode_literals

import app.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0005_auto_20160824_0255'),
    ]

    operations = [
        migrations.AlterField(
            model_name='article',
            name='image',
            field=models.ImageField(default='images/articles/no_image.png', upload_to=app.models.article_img_upload),
        ),
    ]
