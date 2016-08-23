# -*- coding: utf-8 -*-
# Generated by Django 1.9.7 on 2016-08-18 21:43
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('app', '0025_auto_20160818_2132'),
    ]

    operations = [
        migrations.CreateModel(
            name='ChildComment',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('text', models.CharField(max_length=200)),
                ('edited', models.BooleanField(default=False)),
                ('dt_created', models.DateTimeField(auto_now_add=True)),
                ('parent', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='app.Comment')),
                ('poster', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='childcomments', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
