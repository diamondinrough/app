from django.shortcuts import HttpResponse, redirect

from rest_framework.generics import ListAPIView, RetrieveAPIView

from ..models import *
from .serializers import *

def rootredirect(request):
    return redirect('/api/app/')

def apiindex(request):
    return HttpResponse('api index')

class UserListView(ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class UserView(RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    lookup_field = 'username'

class ArticleListView(ListAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer

class ArticleView(RetrieveAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    lookup_field = 'id'