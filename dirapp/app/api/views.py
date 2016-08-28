from django.shortcuts import HttpResponse, redirect
from django.db.models import Q

from django.contrib.auth import get_user_model
from django.contrib.contenttypes.models import ContentType

from rest_framework.views import APIView
from rest_framework import status
from rest_framework.generics import ListAPIView, RetrieveAPIView, CreateAPIView, UpdateAPIView, DestroyAPIView
from rest_framework.response import Response

from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser, IsAuthenticatedOrReadOnly
from .permissions import *

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
        return Response(status=status.HTTP_200_OK)


class TestView(ListAPIView):
    def get(self, request, format=None):
        return Response(type(request.query_params))


AuthUser = get_user_model()

class UserCreateView(CreateAPIView):
    serializer_class = AuthUserCreateSerializer
    queryset = AuthUser.objects.all()


class UserProfileView(RetrieveAPIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsOwnerOrOptions,)

#    serializer_class = AuthUserProfileSerializer
#    queryset = AuthUser.objects.all()

    def retrieve(self, request):
        if request.user.is_authenticated():
            serializer = AuthUserProfileSerializer(request.user)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(status=status.HTTP_401_UNAUTHORIZED)


class UserProfileUpdateView(UpdateAPIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsOwnerOrOptions,)
    
#    serializer_class = AuthUserProfileSerializer
#    queryset = AuthUser.objects.all()

    def update(self, request, *args, **kwargs):
        if request.user.is_authenticated():
            instance = request.user
            serializer = AuthUserProfileSerializer(request.user, request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response(status=status.HTTP_401_UNAUTHORIZED)


class UserView(RetrieveAPIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticatedOrOptions,)

    serializer_class = AuthUserSerializer
    queryset = AuthUser.objects.all()
    lookup_field = 'username'


class TeamList(ListAPIView):
    serializer_class = TeamSerializer
    queryset = Team.objects.all().order_by('name')


class TeamView(RetrieveAPIView):
    serializer_class = TeamSerializer
    queryset = Team.objects.all()
    lookup_field = 'id'


class TeamCreate(CreateAPIView):
    queryset = Team.objects.all()
    serializer_class = TeamCreateSerializer

    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticatedOrOptions,)
    
    def perform_create(self, serializer):
        serializer.save(leader=self.request.user,members=[self.request.user,])


class TeamJoin(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticatedOrOptions,)
    
    def post(self, request, id=None, format=None):
        if request.user.is_authenticated():
            team = Team.objects.get(id=id)
            team.members.add(request.user)
            return Response(status=status.HTTP_200_OK)
        return Response(status=status.HTTP_401_UNAUTHORIZED)


class TeamLeave(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticatedOrOptions,)
    
    def post(self, request, id=None, format=None):
        if request.user.is_authenticated():
            team = Team.objects.get(id=id)
            if team.leader != request.user:
                team.members.remove(request.user)
                return Response(status=status.HTTP_200_OK)
            else:
                if team.members.count() == 1:
                    team.delete()
                else:
                    try:
                        newleader = request.data.get('newleader')
                        if newleader == request.user.username:
                            return Response('Can\'t choose yourself!', status=status.HTTP_400_BAD_REQUEST)
                        newleaderuser = AuthUser.objects.get(username=newleader)
                    except:
                        return Response('Can\'t get new leader!', status=status.HTTP_400_BAD_REQUEST)
                    team.leader = newleaderuser
                    team.save()
                    team.members.remove(request.user)
                return Response(status=status.HTTP_200_OK)
        return Response(status=status.HTTP_401_UNAUTHORIZED)


class TeamLeader(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticatedOrOptions,)
    
    def post(self, request, id=None, format=None):
        if request.user.is_authenticated():
            team = Team.objects.get(id=id)
            if (team.leader != request.user):
                return Response('You are not the team leader!', status=status.HTTP_400_BAD_REQUEST)
            try:
                newleader = request.data.get('newleader')
                if newleader == request.user.username:
                    return Response('Can\'t choose yourself!', status=status.HTTP_400_BAD_REQUEST)
                newleaderuser = AuthUser.objects.get(username=newleader)
            except:
                return Response('Can\'t get new leader!', status=status.HTTP_400_BAD_REQUEST)
            team.leader = newleaderuser
            team.save()
            return Response(status=status.HTTP_200_OK)
        return Response(status=status.HTTP_401_UNAUTHORIZED)


class TaskList(ListAPIView):
    serializer_class = TaskSerializer

    def get_queryset(self):
        qset = Task.objects.all().order_by('-dt_created')
        '''
        if 'tags' in self.request.query_params:
            tags = self.request.query_params.get('tags').split(',')
            for tag in tags:
                qset = qset.filter(tags__name=tag)
        '''
        if 'team' in self.request.query_params:
            qset = qset.filter(team__name=self.request.query_params.get('team'))
        return qset


class TaskView(RetrieveAPIView):
    serializer_class = TaskSerializer
    queryset = Task.objects.all()
    lookup_field = 'id'


class TaskCreate(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticatedOrOptions,)
    
    def post(self, request, format=None):
        if request.user.is_authenticated():
            serializer = TaskCreateSerializer(data=request.data)
            team = Team.objects.get(id=request.data.get('team'))
            if team.leader != self.request.user:
                return Response('You are not the team leader!', status=status.HTTP_400_BAD_REQUEST)
            if 'members' not in request.data:
                return Response('No members provided!', status=status.HTTP_400_BAD_REQUEST)
            for member in request.data.get('members'):
                try:
                    memberuser = AuthUser.objects.get(pk=member)
                    if memberuser not in team.members.all():
                        return Response('Member not in team!', status=status.HTTP_400_BAD_REQUEST)
                except:
                    return Response('Can\'t get member ' + str(member) + '!', status=status.HTTP_400_BAD_REQUEST)
            if serializer.is_valid():
                serializer.save(leader=self.request.user)
                return Response(status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response(status=status.HTTP_401_UNAUTHORIZED)


class TaskJoin(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticatedOrOptions,)
    
    def post(self, request, id=None, format=None):
        if request.user.is_authenticated():
            task = Task.objects.get(id=id)
            if request.user not in task.team.members.all():
                return Response('You are not part of this task\'s team!', status=status.HTTP_400_BAD_REQUEST)
            task.members.add(request.user)
            return Response(status=status.HTTP_200_OK)
        return Response(status=status.HTTP_401_UNAUTHORIZED)


class TaskLeave(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticatedOrOptions,)
    
    def post(self, request, id=None, format=None):
        if request.user.is_authenticated():
            task = Team.objects.get(id=id)
            if task.leader != request.user:
                task.members.remove(request.user)
                return Response(status=status.HTTP_200_OK)
            else:
                if task.members.count() == 1:
                    task.delete()
                else:
                    try:
                        newleader = request.data.get('newleader')
                        if newleader == request.user.username:
                            return Response('Can\'t choose yourself!', status=status.HTTP_400_BAD_REQUEST)
                        newleaderuser = AuthUser.objects.get(username=newleader)
                    except:
                        return Response('Can\'t get new leader!', status=status.HTTP_400_BAD_REQUEST)
                    task.leader = newleaderuser
                    task.save()
                    task.members.remove(request.user)
                return Response(status=status.HTTP_200_OK)
        return Response(status=status.HTTP_401_UNAUTHORIZED)


class TaskLeader(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticatedOrOptions,)
    
    def post(self, request, id=None, format=None):
        if request.user.is_authenticated():
            task = Team.objects.get(id=id)
            if task.leader != request.user:
                return Response('You are not the task leader!', status=status.HTTP_400_BAD_REQUEST)
            try:
                newleader = request.data.get('newleader')
                if newleader == request.user.username:
                    return Response('Can\'t choose yourself!', status=status.HTTP_400_BAD_REQUEST)
                newleaderuser = AuthUser.objects.get(username=newleader)
            except:
                return Response('Can\'t get new leader!', status=status.HTTP_400_BAD_REQUEST)
            task.leader = newleaderuser
            task.save()
            return Response(status=status.HTTP_200_OK)
        return Response(status=status.HTTP_401_UNAUTHORIZED)


class IndexView(MultipleModelAPIView):
    flat = True    #merges lists together

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
                article_qset = article_qset.filter(Q(title__icontains=search) | Q(summary__icontains=search) | Q(content__icontains=search) | Q(poster__username__icontains=search))
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
                qset = qset.filter(Q(title__icontains=search) | Q(summary__icontains=search) | Q(content__icontains=search) | Q(poster__username__icontains=search))
        return qset


class ArticleCreateView(CreateAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleCreateSerializer
    
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticatedOrOptions,)

    def perform_create(self, serializer):
        serializer.save(poster=self.request.user)


class ArticleView(RetrieveAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    lookup_field = 'id'


class ArticleCommentCreateView(CreateAPIView):
    serializer_class = CommentCreateSerializer
    queryset = Comment.objects.all()

    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticatedOrOptions,)

    def perform_create(self, serializer):
        serializer.save(poster=self.request.user, content_type=ContentType.objects.get(model='article'))


class ArticleCommentDeleteView(DestroyAPIView):
    queryset = Comment.objects.all()
    lookup_url_kwarg = 'comment_id'

    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsOwnerOrOptions,)


class ArticleReplyCreateView(CreateAPIView):
    serializer_class = ChildCommentCreateSerializer
    queryset = ChildComment.objects.all()

    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticatedOrOptions,)

    def perform_create(self, serializer):
        serializer.save(poster=self.request.user)


class ArticleReplyDeleteView(DestroyAPIView):
    queryset = ChildComment.objects.all()
    lookup_url_kwarg = 'reply_id'

    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsOwnerOrOptions,)


class VideoListView(ListAPIView):
    serializer_class = VideoSerializer
    pagination_class = TenPagination

    def get_queryset(self):
        qset = Video.objects.all().order_by('-dt_created')
        if 'tags' in self.request.query_params:
            tags = self.request.query_params.get('tags').split(',')
            for tag in tags:
                qset = qset.filter(tags__name=tag)
        if 'search' in self.request.query_params:
            searches = self.request.query_params.get('search').split(',')
            for search in searches:
                qset = qset.filter(Q(title__icontains=search) | Q(summary__icontains=search) | Q(poster__username__icontains=search))
        return qset


class VideoCreateView(CreateAPIView):
    queryset = Video.objects.all()
    serializer_class = VideoCreateSerializer

    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticatedOrOptions,)

    def perform_create(self, serializer):
        serializer.save(poster=self.request.user)


class VideoView(RetrieveAPIView):
    queryset = Video.objects.all()
    serializer_class = VideoSerializer
    lookup_field = 'id'


class VideoCommentCreateView(CreateAPIView):
    serializer_class = CommentCreateSerializer
    queryset = Comment.objects.all()

    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticatedOrOptions,)

    def perform_create(self, serializer):
        serializer.save(poster=self.request.user, content_type=ContentType.objects.get(model='video'))


class VideoCommentDeleteView(DestroyAPIView):
    queryset = Comment.objects.all()
    lookup_url_kwarg = 'comment_id'

    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsOwnerOrOptions,)


class VideoReplyCreateView(CreateAPIView):
    serializer_class = ChildCommentCreateSerializer
    queryset = ChildComment.objects.all()

    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticatedOrOptions,)

    def perform_create(self, serializer):
        serializer.save(poster=self.request.user)


class VideoReplyDeleteView(DestroyAPIView):
    queryset = ChildComment.objects.all()
    lookup_url_kwarg = 'reply_id'

    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsOwnerOrOptions,)


class ResourceListView(ListAPIView):
    serializer_class = ResourceSerializer
    
    def get_queryset(self):
        qset = Resource.objects.all().order_by('-dt_created')
        if 'tags' in self.request.query_params:
            tags = self.request.query_params.get('tags').split(',')
            for tag in tags:
                qset = qset.filter(tags__name=tag)
        if 'search' in self.request.query_params:
            searches = self.request.query_params.get('search').split(',')
            for search in searches:
                qset = qset.filter(Q(title__icontains=search) | Q(summary__icontains=search))
        return qset


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
