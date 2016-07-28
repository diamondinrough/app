from rest_framework import serializers
from rest_framework.pagination import PageNumberPagination
from rest_framework.serializers import ModelSerializer, DateTimeField, CharField


from ..models import *


class StandardPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 10


class UserSerializer(ModelSerializer):
    dt_created = DateTimeField(format='%Y-%m-%d %H:%M:%S')
    dt_updated = DateTimeField(format='%Y-%m-%d %H:%M:%S')
    
    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'last_name', 'image', 'dt_created', 'dt_updated')


class TagSerializer(ModelSerializer):
    color = CharField()

    class Meta:
        model = Tag
        fields = ('name', 'color')


class IndexSlideSerializer(ModelSerializer):
    class Meta:
        model = IndexSlide
        fields = ('image', 'order')


class ArticleSerializer(ModelSerializer):
    author = UserSerializer()
    tags = TagSerializer(many=True)

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
    poster = UserSerializer()
    tags = TagSerializer(many=True)

    dt_created = DateTimeField(format='%Y-%m-%d %H:%M:%S')

    class Meta:
        model = Video
        fields = ('id', 'title', 'videolink', 'summary', 'speaker', 'poster', 'views', 'tags', 'dt_created')


class ResourceSerializer(ModelSerializer):
    poster = UserSerializer()
    tags = TagSerializer(many=True)

    dt_created = DateTimeField(format='%Y-%m-%d %H:%M:%S')

    class Meta:
        model = Resource
        fields = ('id', 'title', 'resourcefile', 'filetype', 'summary', 'poster', 'views', 'downloads', 'tags', 'dt_created')
        

class HelpSerializer(ModelSerializer):
    poster = UserSerializer()
    
    dt_created = DateTimeField(format='%Y-%m-%d %H:%M:%S')

    class Meta:
        model = Help
        fields = ('id', 'poster', 'question', 'detail', 'tags', 'dt_created')
        

class FeedbackSerializer(ModelSerializer):
    class Meta:
        model = Feedback
        fields = ('id', 'comments', 'contactinfo', 'name')


class HeadOfInfoSerializer(ModelSerializer):
    class Meta:
        model = HeadOfInfo
        fields = ('person', 'position', 'name', 'wechat', 'email')
