from django.conf.urls import url, include
from django.contrib import admin

from . import views

urlpatterns = [
    url(r'^$', views.rootredirect),
    url(r'^app/articles/(?P<id>[0-9]+)/', views.ArticleView.as_view(), name='apiarticleview'),
    url(r'^app/articles/', views.ArticleListView.as_view(), name='apiarticlelistview'),
    url(r'^app/users/(?P<username>\w+)/', views.UserView.as_view(), name='apiuserview'),
    url(r'^app/users/', views.UserListView.as_view(), name='apiuserlistview'),
    url(r'^app/', views.apiindex, name='apiindex')
]