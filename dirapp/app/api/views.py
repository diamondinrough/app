from django.shortcuts import HttpResponse, redirect

from rest_framework.generics import ListAPIView, RetrieveAPIView
from drf_multiple_model.views import MultipleModelAPIView

from ..models import *
from .serializers import *
from . import serializers

def rootredirect(request):
    return redirect('/api/app/')


def apiindex(request):
    return HttpResponse('api index')


class IndexView(MultipleModelAPIView):
    flat = True    #merges lists together
    sorting_field = '-dt_created'

    queryList = [
        (Article.objects.all(), ArticleSerializer),
        (Video.objects.all(), VideoSerializer),
        (Resource.objects.all(), ResourceSerializer),
    ]


class UserListView(ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserView(RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    lookup_field = 'username'


class ArticleListTagView(ListAPIView):
    serializer_class = ArticleSerializer
    pagination_class = StandardPagination

    def get_queryset(self):
        tags = self.kwargs['tags'].split(',')
        qset = Article.objects.all()
        for tag in tags:
            qset = qset.filter(tags__name=tag)
        return qset


class ArticleListView(ListAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer


class ArticleView(RetrieveAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    lookup_field = 'id'


class VideoListTagView(ListAPIView):
    serializer_class = VideoSerializer
    pagination_class = StandardPagination

    def get_queryset(self):
        tags = self.kwargs['tags'].split(',')
        qset = Video.objects.all()
        for tag in tags:
            qset = qset.filter(tags__name=tag)
        return qset


class VideoListView(ListAPIView):
    queryset = Video.objects.all()
    serializer_class = VideoSerializer


class VideoView(RetrieveAPIView):
    queryset = Video.objects.all()
    serializer_class = VideoSerializer
    lookup_field = 'id'


class ResourceListTagView(ListAPIView):
    serializer_class = ResourceSerializer
    pagination_class = StandardPagination

    def get_queryset(self):
        tags = self.kwargs['tags'].split(',')
        qset = Resource.objects.all()
        for tag in tags:
            qset = qset.filter(tags__name=tag)
        return qset


class ResourceListView(ListAPIView):
    queryset = Resource.objects.all()
    serializer_class = ResourceSerializer


class ResourceView(RetrieveAPIView):
    queryset = Resource.objects.all()
    serializer_class = ResourceSerializer
    lookup_field = 'id'


class HelpListView(ListAPIView):
    queryset = Help.objects.all()
    serializer_class = HelpSerializer


class HelpView(RetrieveAPIView):
    queryset = Help.objects.all()
    serializer_class = HelpSerializer
    lookup_field = 'id'


class FeedbackListView(ListAPIView):
    queryset = Feedback.objects.all()
    serializer_class = FeedbackSerializer
    

class FeedbackView(RetrieveAPIView):
    queryset = Feedback.objects.all()
    serializer_class = FeedbackSerializer
    lookup_field = 'id'
