from django.conf.urls import url, include
from django.contrib import admin

from . import views

urlpatterns = [
    url(r'^$', views.rootredirect),
    url(r'^app/index/slides', views.IndexSlidesListView.as_view(), name='apiindexslides'),
    url(r'^app/index/', views.IndexView.as_view(), name='api-index-view'),
    url(r'^app/users/(?P<username>\w+)/', views.UserView.as_view(), name='api-user-view'),
    url(r'^app/users/', views.UserListView.as_view(), name='api-user-list-view'),
    url(r'^app/tags/', views.TagListView.as_view(), name='api-tag-list-view'),
    url(r'^app/articles/tags/(?P<tags>[a-zA-Z0-9,\-]+)/', views.ArticleListTagView.as_view(), name='api-article-list-tag-view'),
    url(r'^app/articles/(?P<id>[0-9]+)/', views.ArticleView.as_view(), name='api-article-view'),
    url(r'^app/articles/', views.ArticleListView.as_view(), name='api-article-list-view'),
    url(r'^app/videos/tags/(?P<tags>[a-zA-Z0-9,\-]+)/', views.VideoListTagView.as_view(), name='api-video-list-tag-view'),
    url(r'^app/videos/(?P<id>[0-9]+)/', views.VideoView.as_view(), name='api-video-view'),
    url(r'^app/videos/', views.VideoListView.as_view(), name='api-video-list-view'),
    url(r'^app/resources/tags/(?P<tags>[a-zA-Z0-9,\-]+)/', views.ResourceListTagView.as_view(), name='api-resource-list-tag-view'),
    url(r'^app/resources/(?P<id>[0-9]+)/', views.ResourceView.as_view(), name='api-resource-view'),
    url(r'^app/resources/', views.ResourceListView.as_view(), name='api-resource-list-view'),
    url(r'^app/help/(?P<id>[0-9]+)/', views.HelpView.as_view(), name='api-help-view'),
    url(r'^app/help/', views.HelpListView.as_view(), name='api-help-list-view'),
    url(r'^app/feedback/(?P<id>[0-9]+)/', views.FeedbackView.as_view(), name='api-feedback-view'),
    url(r'^app/feedback/', views.FeedbackListView.as_view(), name='api-feedback-list-view'),
    url(r'^app/headofinfo/(?P<person>\w+)/', views.HeadOfInfoView.as_view(), name='headofinfoview'),
    url(r'^app/headofinfo/', views.HeadOfInfoListView.as_view(), name='headofinfolistview'),
    url(r'^app/test/', views.TestView.as_view(), name='apitest'),
]
