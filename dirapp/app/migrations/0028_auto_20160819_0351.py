# -*- coding: utf-8 -*-
# Generated by Django 1.9.7 on 2016-08-19 03:51
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0027_auto_20160818_2147'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='childcomment',
            options={'ordering': ['dt_created']},
        ),
    ]