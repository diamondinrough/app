from rest_framework.serializers import ModelSerializer, DateTimeField
#from taggit_serializer.serializers import TagListSerializerField, TaggitSerializer

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
        fields = ('id', 'title', 'content', 'author', 'image', 'tag', 'dt_created', 'dt_updated')

class ArticleLinkSerializer(ModelSerializer):
    dt_created = DateTimeField(format='%Y-%m-%d %H:%M:%S')

    class Meta:
        model = ArticleLink
        fields = ('id', 'title', 'link', 'poster', 'tag', 'dt_created')
