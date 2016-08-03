from django.shortcuts import HttpResponse, redirect
from django.db.models import Q

from rest_framework.views import APIView
from rest_framework import status
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.response import Response
from drf_multiple_model.views import MultipleModelAPIView

from ..models import *
from .serializers import *
from .pagination import *
from . import serializers


def rootredirect(request):
    return redirect('/api/app/')


def apiindex(request):
    return HttpResponse('api index')


class ViewCount(APIView):
    def put(self, request, format=None):
        try:
            item = None
            type = request.data.get('type')
            pk = request.data.get('pk')
            if type == 'Article':
                item = Article.objects.get(pk=pk)
            elif type == 'Video':
                item = Video.objects.get(pk=pk)
            elif type == 'Resource':
                item = Resource.objects.get(pk=pk)
            if item:
                item.views += 1
                item.save()
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class TestView(ListAPIView):
    def get(self, request, format=None):
        return Response(type(request.query_params))


class IndexView(MultipleModelAPIView):
    flat = True    #merges lists together
#    sorting_field = '-dt_created'

#    queryList = [
#        (Article.objects.all(), ArticleSerializer),
#        (Video.objects.all(), VideoSerializer),
#        (Resource.objects.all(), ResourceSerializer),
#    ]

    def get_queryList(self):
        article_qset = Article.objects.all().order_by('-dt_created')
        video_qset = Video.objects.all().order_by('-dt_created')
        resource_qset = Resource.objects.all().order_by('-dt_created')

        if 'tags' in self.request.query_params:
            tags = self.request.query_params.get('tags').split(',')
            for tag in tags:
                article_qset = article_qset.filter(tags__name=tag)
                video_qset = video_qset.filter(tags__name=tag)
                resource_qset = resource_qset.filter(tags__name=tag)
        if 'search' in self.request.query_params:
            searches = self.request.query_params.get('search').split(',')
            for search in searches:
                article_qset = article_qset.filter(Q(title__icontains=search) | Q(summary__icontains=search) | Q(content__icontains=search) | Q(author__username__icontains=search))
                video_qset = video_qset.filter(Q(title__icontains=search) | Q(summary__icontains=search) | Q(poster__username__icontains=search))
                resource_qset = resource_qset.filter(Q(title__icontains=search) | Q(summary__icontains=search) | Q(poster__username__icontains=search))
        qlist = [
            (article_qset, ArticleSerializer),
            (video_qset, VideoSerializer),
            (resource_qset, ResourceSerializer),
        ]
        return qlist


class IndexSlidesListView(ListAPIView):
    queryset = IndexSlide.objects.all().order_by('order')
    serializer_class = IndexSlideSerializer


class TagListView(ListAPIView):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer


class UserListView(ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserView(RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    lookup_field = 'username'


class ArticleListView(ListAPIView):
    serializer_class = ArticleSerializer
    pagination_class = TenPagination

    def get_queryset(self):
        qset = Article.objects.all().order_by('-dt_created')
        if 'tags' in self.request.query_params:
            tags = self.request.query_params.get('tags').split(',')
            for tag in tags:
                qset = qset.filter(tags__name=tag)
        if 'search' in self.request.query_params:
            searches = self.request.query_params.get('search').split(',')
            for search in searches:
                qset = qset.filter(Q(title__icontains=search) | Q(summary__icontains=search) | Q(content__icontains=search) | Q(author__username__icontains=search))
        return qset


class ArticleView(RetrieveAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    lookup_field = 'id'


class VideoListTagView(ListAPIView):
    serializer_class = VideoSerializer

    def get_queryset(self):
        tags = self.kwargs['tags'].split(',')
        qset = Video.objects.all().order_by('-dt_created')
        for tag in tags:
            qset = qset.filter(tags__name=tag)
        return qset


class VideoListView(ListAPIView):
    queryset = Video.objects.all().order_by('-dt_created')
    serializer_class = VideoSerializer
    
    def get_queryset(self):
        qset = Video.objects.all().order_by('-dt_created')
        if 'tags' in self.request.query_params:
            tags = self.request.query_params.get('tags').split(',')
            for tag in tags:
                qset = qset.filter(tags__name=tag)
        if 'search' in self.request.query_params:
            searches = self.request.query_params.get('search').split(',')
            for search in searches:
                qset = qset.filter(Q(title__icontains=search) | Q(summary__icontains=search) | Q(content__icontains=search) | Q(author__username__icontains=search))
        return qset


class VideoView(RetrieveAPIView):
    queryset = Video.objects.all()
    serializer_class = VideoSerializer
    lookup_field = 'id'


class ResourceListTagView(ListAPIView):
    serializer_class = ResourceSerializer

    def get_queryset(self):
        tags = self.kwargs['tags'].split(',')
        qset = Resource.objects.all().order_by('-dt_created')
        for tag in tags:
            qset = qset.filter(tags__name=tag)
        return qset


class ResourceListView(ListAPIView):
    queryset = Resource.objects.all().order_by('-dt_created')
    serializer_class = ResourceSerializer


class ResourceView(RetrieveAPIView):
    queryset = Resource.objects.all()
    serializer_class = ResourceSerializer
    lookup_field = 'id'


class HelpListView(ListAPIView):
    serializer_class = HelpSerializer
    pagination_class = TenPagination

    def get_queryset(self):
        qset = Help.objects.all().order_by('-dt_created')
        if 'faq' in self.request.query_params:
            qset = qset.filter(faq=True)
        return qset


class HelpView(RetrieveAPIView):
    queryset = Help.objects.all()
    serializer_class = HelpSerializer
    lookup_field = 'id'


class FeedbackListView(APIView):
    def get(self, request, format=None):
        qset = Feedback.objects.all().order_by('-dt_created')
        serializer = FeedbackSerializer(qset, many=True)
        return Response(serializer.data)
    
    def post(self, request, format=None):
        serializer = FeedbackSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class FeedbackView(RetrieveAPIView):
    queryset = Feedback.objects.all()
    serializer_class = FeedbackSerializer
    lookup_field = 'id' 


class HeadOfInfoListView(ListAPIView):
    queryset = HeadOfInfo.objects.all()
    serializer_class = HeadOfInfoSerializer
    lookup_field = 'person'

class HeadOfInfoView(RetrieveAPIView):
    queryset = HeadOfInfo.objects.all()
    serializer_class = HeadOfInfoSerializer
    lookup_field = 'person'
