from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError

from rest_framework import serializers
from rest_framework.serializers import ModelSerializer, DateTimeField, CharField


from ..models import *


AuthUser = get_user_model()

class AuthUserSerializer(ModelSerializer):
    class Meta:
        model = AuthUser
        field = ('id', 'username', 'first_name', 'last_name')


class AuthUserCreateSerializer(ModelSerializer):
    class Meta:
        model = AuthUser
        fields = ('id', 'username', 'password', 'first_name', 'last_name')
        extra_kwargs = {
            'password': {'write_only': True},
        }

    def validate(self, data):
        username = data['username']
        qset = AuthUser.objects.filter(username=username)
        if qset.exists():
            raise ValidationError('This username is taken.')
        return data

    def create(self, validated_data):
        username = validated_data['username']
        password = validated_data['password']
        first_name = validated_data['first_name']
        last_name = validated_data['last_name']
        new_user = AuthUser(username=username, first_name=first_name, last_name=last_name)
        new_user.set_password(password)
        new_user.save()
        return validated_data


class UserSerializer(ModelSerializer):
    dt_created = DateTimeField(format='%Y-%m-%d %H:%M:%S')
    dt_updated = DateTimeField(format='%Y-%m-%d %H:%M:%S')
    
    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'last_name', 'image', 'position', 'email', 'wechat', 'dt_created', 'dt_updated')


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


class ArticleCreateSerializer(ModelSerializer):
    class Meta:
        model = Article
        fields = ('id', 'title', 'content', 'summary', 'author', 'image', 'tags')



class VideoSerializer(ModelSerializer):
    poster = UserSerializer()
    tags = TagSerializer(many=True)

    dt_created = DateTimeField(format='%Y-%m-%d %H:%M:%S')

    class Meta:
        model = Video
        fields = ('id', 'title', 'videolink', 'summary', 'speaker', 'poster', 'views', 'tags', 'dt_created')


class VideoCreateSerializer(ModelSerializer):
    dt_created = DateTimeField(format='%Y-%m-%d %H:%M:%S')

    class Meta:
        model = Video
        fields = ('id', 'title', 'videolink', 'summary', 'speaker', 'poster', 'tags')



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
