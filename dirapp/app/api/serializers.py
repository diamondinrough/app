from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError

from rest_framework import serializers
from rest_framework.serializers import ModelSerializer, DateTimeField, CharField


from ..models import *


class InfoSerializer(ModelSerializer):
    class Meta:
        model = Info
        fields = ('fullname',)


class InfoProfileSerializer(ModelSerializer):
    class Meta:
        model = Info
        fields = ('fullname', 'email', 'wechat')



AuthUser = get_user_model()


class AuthUserSerializer(ModelSerializer):
    info = InfoSerializer()

    class Meta:
        model = AuthUser
        fields = ('id', 'username', 'info')


class AuthUserProfileSerializer(ModelSerializer):
    info = InfoProfileSerializer()

    class Meta:
        model = AuthUser
        fields = ('id', 'username', 'info')

    def update(self, instance, validated_data):
        instance.username = validated_data.get('username', instance.username)
        instance.save()
        info = InfoProfileSerializer(instance.info, validated_data.get('info'))
        if info.is_valid():
            info.save()

        return instance


class AuthUserCreateSerializer(ModelSerializer):
    info = InfoProfileSerializer()

    class Meta:
        model = AuthUser
        fields = ('id', 'username', 'password', 'info')
        extra_kwargs = {
            'password': {'write_only': True},
        }

    def create(self, validated_data):
        username = validated_data['username']
        password = validated_data['password']
        new_user = AuthUser(username=username)
        new_user.set_password(password)
        new_user.save()
        fullname = validated_data['info']['fullname']
        email = validated_data['info']['email']
        wechat = validated_data['info']['wechat']
        user_info = Info(user=new_user, fullname=fullname, email=email, wechat=wechat)
        user_info.save()
        return validated_data


class UserSerializer(ModelSerializer):
    dt_created = DateTimeField(format='%m/%d/%y')
    dt_updated = DateTimeField(format='%m/%d/%y')
    
    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'last_name', 'image', 'position', 'email', 'wechat', 'dt_created', 'dt_updated')


class ChildCommentSerializer(ModelSerializer):
    poster = AuthUserSerializer()
    dt_created = DateTimeField(format='%m/%d/%y')

    class Meta:
        model = ChildComment
        fields = ('id', 'text', 'poster', 'edited', 'dt_created')


class CommentSerializer(ModelSerializer):
    childcomment_set = ChildCommentSerializer(many=True)
    poster = AuthUserSerializer()
    dt_created = DateTimeField(format='%m/%d/%y')
    
    class Meta:
        model = Comment
        fields = ('id', 'text', 'poster', 'edited', 'childcomment_set', 'dt_created')

class ChildCommentCreateSerializer(ModelSerializer):
    class Meta:
        model = ChildComment
        fields = ('text', 'edited', 'parent')


class CommentCreateSerializer(ModelSerializer):
    class Meta:
        model = Comment
        fields = ('text', 'object_id')


class TagSerializer(ModelSerializer):
    color = CharField()

    class Meta:
        model = Tag
        fields = ('name', 'color')


class TeamSerializer(ModelSerializer):
    leader = AuthUserSerializer()
    members = AuthUserSerializer(many=True)
    color = CharField()
    dt_created = DateTimeField(format='%m/%d/%y')

    class Meta:
        model = Team
        fields = ('id', 'name', 'leader', 'members', 'description', 'summary', 'color', 'dt_created')


class TeamCreateSerializer(ModelSerializer):
    class Meta:
        model = Team
        fields = ('name', 'color', 'description', 'summary')


class TaskSerializer(ModelSerializer):
    team = TeamSerializer()
    leader = AuthUserSerializer()
    members = AuthUserSerializer(many=True)
    dt_created = DateTimeField(format='%m/%d/%y')

    class Meta:
        model = Task
        fields = ('id', 'team', 'name', 'leader', 'members', 'description', 'dt_created')


class TaskCreateSerializer(ModelSerializer):
    class Meta:
        model = Task
        fields = ('team', 'name', 'description', 'members')

    '''
    def create(self, instance, validated_data):
        instance.name = validated_data.get('name')
        instance.description = validated_data.get('description')
        team = Team.objects.get(id=validated_data.get('team'))
        instance.team = team
        members = []
        for member in validated_data.get('members'):
            members.append(AuthUser.objects.get(username=member)
        instance.members = members;
        instance.save()
    '''


class IndexSlideSerializer(ModelSerializer):
    class Meta:
        model = IndexSlide
        fields = ('image', 'order')


class ArticleSerializer(ModelSerializer):
    poster = AuthUserSerializer()
    comments = CommentSerializer(many=True)
    tags = TagSerializer(many=True)

    dt_created = DateTimeField(format='%m/%d/%y')
    dt_updated = DateTimeField(format='%m/%d/%y')

    class Meta:
        model = Article
        fields = ('id', 'title', 'content', 'summary', 'poster', 'image', 'views', 'comments', 'tags', 'dt_created', 'dt_updated')


class ArticleCreateSerializer(ModelSerializer):
    class Meta:
        model = Article
        fields = ('title', 'content', 'summary', 'tags')


class VideoSerializer(ModelSerializer):
    poster = AuthUserSerializer()
    tags = TagSerializer(many=True)
    comments = CommentSerializer(many=True)

    dt_created = DateTimeField(format='%m/%d/%y')

    class Meta:
        model = Video
        fields = ('id', 'title', 'videolink', 'summary', 'speaker', 'poster', 'views', 'comments', 'tags', 'dt_created')


class VideoCreateSerializer(ModelSerializer):
    class Meta:
        model = Video
        fields = ('id', 'title', 'videolink', 'summary', 'speaker', 'tags')



class ResourceSerializer(ModelSerializer):
    poster = UserSerializer()
    tags = TagSerializer(many=True)

    dt_created = DateTimeField(format='%m/%d/%y')

    class Meta:
        model = Resource
        fields = ('id', 'title', 'resourcefile', 'filetype', 'summary', 'poster', 'views', 'downloads', 'tags', 'dt_created')
        

class HelpSerializer(ModelSerializer):
    poster = UserSerializer()
    
    dt_created = DateTimeField(format='%m/%d/%y')

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
