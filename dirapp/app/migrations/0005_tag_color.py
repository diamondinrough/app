# -*- coding: utf-8 -*-
# Generated by Django 1.9.7 on 2016-07-27 15:54
from __future__ import unicode_literals

import colorfield.fields
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0004_feedback_help'),
    ]

    operations = [
        migrations.AddField(
            model_name='tag',
            name='color',
            field=colorfield.fields.ColorField(default='#000000', max_length=10),
        ),
    ]
