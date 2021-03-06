# -*- coding: utf-8 -*-
# Generated by Django 1.9.7 on 2016-08-29 20:22
from __future__ import unicode_literals

import app.models
import colorfield.fields
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('contenttypes', '0002_remove_content_type_name'),
    ]

    operations = [
        migrations.CreateModel(
            name='Article',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('title', models.CharField(max_length=200)),
                ('content', models.TextField()),
                ('summary', models.CharField(max_length=500, null=True)),
                ('image', models.ImageField(default='images/articles/no_image.png', upload_to=app.models.article_img_upload)),
                ('views', models.IntegerField(default=0)),
                ('dt_created', models.DateTimeField(auto_now_add=True)),
                ('dt_updated', models.DateTimeField(auto_now=True)),
                ('poster', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='userarticles', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='ChildComment',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('text', models.CharField(max_length=200)),
                ('edited', models.BooleanField(default=False)),
                ('dt_created', models.DateTimeField(auto_now_add=True)),
            ],
            options={
                'ordering': ['dt_created'],
            },
        ),
        migrations.CreateModel(
            name='Comment',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('text', models.CharField(max_length=200)),
                ('edited', models.BooleanField(default=False)),
                ('dt_created', models.DateTimeField(auto_now_add=True)),
                ('object_id', models.PositiveIntegerField()),
                ('content_type', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='contenttypes.ContentType')),
                ('poster', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='comments', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'ordering': ['-dt_created'],
            },
        ),
        migrations.CreateModel(
            name='Feedback',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('comments', models.TextField()),
                ('contactinfo', models.CharField(max_length=200)),
                ('name', models.CharField(max_length=50)),
                ('dt_created', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='Help',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('question', models.CharField(max_length=200)),
                ('detail', models.TextField()),
                ('faq', models.BooleanField(default=False)),
                ('dt_created', models.DateTimeField(auto_now_add=True)),
                ('poster', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='helpresources', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='IndexSlide',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('image', models.ImageField(upload_to='index/slides/')),
                ('order', models.IntegerField(default=0)),
            ],
        ),
        migrations.CreateModel(
            name='Info',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('fullname', models.CharField(max_length=100)),
                ('email', models.EmailField(max_length=254)),
                ('wechat', models.CharField(blank=True, max_length=50)),
                ('image', models.ImageField(default='images/users/no_image.png', upload_to=app.models.info_img_upload)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Resource',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('image', models.ImageField(upload_to='resources/images/')),
                ('title', models.CharField(max_length=200)),
                ('resourcefile', models.FileField(upload_to='resources/')),
                ('filetype', models.CharField(max_length=5)),
                ('summary', models.CharField(max_length=500, null=True)),
                ('views', models.IntegerField(default=0)),
                ('downloads', models.IntegerField(default=0)),
                ('dt_created', models.DateTimeField(auto_now_add=True)),
                ('poster', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='userresources', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Tag',
            fields=[
                ('name', models.CharField(max_length=20, primary_key=True, serialize=False)),
                ('color', colorfield.fields.ColorField(default='#000000', max_length=10)),
            ],
            options={
                'ordering': ['name'],
            },
        ),
        migrations.CreateModel(
            name='Task',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=100)),
                ('description', models.TextField()),
                ('completed', models.BooleanField(default=False)),
                ('dt_created', models.DateTimeField(auto_now_add=True)),
                ('dt_updated', models.DateTimeField(auto_now=True)),
                ('leader', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='taskleaders', to=settings.AUTH_USER_MODEL)),
                ('members', models.ManyToManyField(related_name='taskmembers', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Team',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=50, unique=True)),
                ('color', colorfield.fields.ColorField(default='#000000', max_length=10)),
                ('description', models.TextField(blank=True)),
                ('summary', models.CharField(blank=True, max_length=300)),
                ('dt_created', models.DateTimeField(auto_now_add=True)),
                ('dt_updated', models.DateTimeField(auto_now=True)),
                ('leader', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='teamleaders', to=settings.AUTH_USER_MODEL)),
                ('members', models.ManyToManyField(related_name='teammembers', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Video',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('title', models.CharField(max_length=200)),
                ('videolink', models.URLField(max_length=500)),
                ('summary', models.CharField(max_length=500, null=True)),
                ('speaker', models.CharField(max_length=50, null=True)),
                ('views', models.IntegerField(default=0)),
                ('dt_created', models.DateTimeField(auto_now_add=True)),
                ('poster', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='uservideos', to=settings.AUTH_USER_MODEL)),
                ('tags', models.ManyToManyField(blank=True, related_name='videotag', to='app.Tag')),
            ],
        ),
        migrations.AddField(
            model_name='task',
            name='team',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='app.Team'),
        ),
        migrations.AddField(
            model_name='resource',
            name='tags',
            field=models.ManyToManyField(related_name='resourcetag', to='app.Tag'),
        ),
        migrations.AddField(
            model_name='resource',
            name='team',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='teamresources', to='app.Team'),
        ),
        migrations.AddField(
            model_name='help',
            name='tags',
            field=models.ManyToManyField(related_name='helptag', to='app.Tag'),
        ),
        migrations.AddField(
            model_name='childcomment',
            name='parent',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='app.Comment'),
        ),
        migrations.AddField(
            model_name='childcomment',
            name='poster',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='childcomments', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='article',
            name='tags',
            field=models.ManyToManyField(blank=True, related_name='articletag', to='app.Tag'),
        ),
    ]
