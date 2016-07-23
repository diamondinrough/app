from django.conf.urls import url, include
from django.contrib import admin

from . import views

urlpatterns = [
    url(r'^$', views.rootredirect),
    url(r'^app/index/', views.IndexView.as_view(), name='apiindexview'),
    url(r'^app/users/(?P<username>\w+)/', views.UserView.as_view(), name='apiuserview'),
    url(r'^app/users/', views.UserListView.as_view(), name='apiuserlistview'),
    url(r'^app/articles/(?P<id>[0-9]+)/', views.ArticleView.as_view(), name='apiarticleview'),
    url(r'^app/articles/', views.ArticleListView.as_view(), name='apiarticlelistview'),
    url(r'^app/videos/(?P<id>[0-9]+)/', views.VideoView.as_view(), name='apivideoview'),
    url(r'^app/videos/', views.VideoListView.as_view(), name='apivideolistview'),
    url(r'^app/resources/(?P<id>[0-9]+)/', views.ResourceView.as_view(), name='apiresourceview'),
    url(r'^app/resources/', views.ResourceListView.as_view(), name='apiresourcelistview'),
    url(r'^app/help/(?P<id>[0-9]+)/', views.HelpView.as_view(), name='apihelpview'),
    url(r'^app/help/', views.HelpListView.as_view(), name='apihelplistview'),
    url(r'^app/feedback/(?P<id>[0-9]+)/', views.FeedbackView.as_view(), name='apifeedbackview'),
    url(r'^app/feedback/', views.FeedbackListView.as_view(), name='apifeedbacklistview'),
]
