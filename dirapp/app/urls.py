from django.conf.urls import url, include

from . import views

urlpatterns = [
    url(r'^articles/(?P<id>[0-9]+)/', views.article, name='articleview'),
    url(r'^index/$', views.index, name='index'),
    url(r'^$', views.rootredirect)
]
