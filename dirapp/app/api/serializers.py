from rest_framework import serializers
from rest_framework.serializers import ModelSerializer, DateTimeField

from ..models import *


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'last_name', 'dt_created', 'dt_updated')

class ArticleSerializer(ModelSerializer):
    dt_created = DateTimeField(format='%Y-%m-%d %H:%M:%S')
    dt_updated = DateTimeField(format='%Y-%m-%d %H:%M:%S')

    class Meta:
        model = Article
        fields = ('id', 'title', 'content', 'summary', 'author', 'image', 'views', 'tags', 'dt_created', 'dt_updated')

class ArticleLinkSerializer(ModelSerializer):
    dt_created = DateTimeField(format='%Y-%m-%d %H:%M:%S')

    class Meta:
        model = ArticleLink
        fields = ('id', 'title', 'link', 'summary', 'poster', 'image', 'views', 'tags', 'dt_created')

class VideoSerializer(ModelSerializer):
    dt_created = DateTimeField(format='%Y-%m-%d %H:%M:%S')

    class Meta:
        model = Video
        fields = ('id', 'title', 'videofile', 'summary', 'speaker', 'poster', 'views', 'tags', 'dt_created')

class ResourceSerializer(ModelSerializer):
    dt_created = DateTimeField(format='%Y-%m-%d %H:%M:%S')

    class Meta:
        model = Resource
        fields = ('id', 'title', 'resourcefile', 'filetype', 'summary', 'poster', 'views', 'downloads', 'tags', 'dt_created')