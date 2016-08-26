from django.conf.urls import url, include
from django.contrib import admin

from rest_framework.authtoken import views as authviews

from . import views

urlpatterns = [
    url(r'^$', views.rootredirect),
    url(r'^app/index/slides', views.IndexSlidesListView.as_view(), name='apiindexslides'),
    url(r'^app/index/', views.IndexView.as_view(), name='api-index-view'),
    url(r'^app/users/(?P<username>\w+)/', views.UserView.as_view(), name='api-user-view'),
    url(r'^app/user/update/', views.UserProfileUpdateView.as_view()),
    url(r'^app/user/profile/', views.UserProfileView.as_view()),
    url(r'^app/user/register/', views.UserCreateView.as_view()),
    url(r'^app/user/auth/', authviews.obtain_auth_token),
#   url(r'^app/users/', views.UserListView.as_view(), name='api-user-list-view'),
    url(r'^app/team/(?P<id>[0-9]+)/join', views.TeamJoin.as_view()),
    url(r'^app/team/(?P<id>[0-9]+)/leave', views.TeamLeave.as_view()),
    url(r'^app/team/(?P<id>[0-9]+)/leader', views.TeamLeader.as_view()),
    url(r'^app/team/(?P<id>[0-9]+)/', views.TeamView.as_view()),
    url(r'^app/teams/create', views.TeamCreate.as_view()),
    url(r'^app/teams/', views.TeamList.as_view()),
    url(r'^app/tasks/', views.TaskList.as_view()),
    url(r'^app/viewcount/', views.ViewCount.as_view(), name='api-view-count'),
    url(r'^app/tags/', views.TagListView.as_view(), name='api-tag-list-view'),
    url(r'^app/article/(?P<id>[0-9]+)/comment/create', views.ArticleCommentCreateView.as_view()),
    url(r'^app/article/(?P<id>[0-9]+)/comment/delete/(?P<comment_id>[0-9]+)', views.ArticleCommentDeleteView.as_view()),
    url(r'^app/article/(?P<id>[0-9]+)/reply/create', views.ArticleReplyCreateView.as_view()),
    url(r'^app/article/(?P<id>[0-9]+)/reply/delete/(?P<reply_id>[0-9]+)', views.ArticleReplyDeleteView.as_view()),
    url(r'^app/article/(?P<id>[0-9]+)/', views.ArticleView.as_view(), name='api-article-view'),
    url(r'^app/articles/create/', views.ArticleCreateView.as_view(), name='api-article-create-view'),
    url(r'^app/articles/', views.ArticleListView.as_view(), name='api-article-list-view'),
    url(r'^app/video/(?P<id>[0-9]+)/comment/create', views.VideoCommentCreateView.as_view()),
    url(r'^app/video/(?P<id>[0-9]+)/comment/delete/(?P<comment_id>[0-9]+)', views.VideoCommentDeleteView.as_view()),
    url(r'^app/video/(?P<id>[0-9]+)/reply/create', views.VideoReplyCreateView.as_view()),
    url(r'^app/video/(?P<id>[0-9]+)/reply/delete/(?P<reply_id>[0-9]+)', views.VideoReplyDeleteView.as_view()),
    url(r'^app/video/(?P<id>[0-9]+)/', views.VideoView.as_view(), name='api-video-view'),
    url(r'^app/videos/create/', views.VideoCreateView.as_view(), name='api-video-create-view'),
    url(r'^app/videos/', views.VideoListView.as_view(), name='api-video-list-view'),
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

