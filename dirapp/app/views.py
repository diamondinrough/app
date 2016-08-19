from django.shortcuts import HttpResponse, render, redirect, get_object_or_404

from itertools import chain
from operator import attrgetter

from .models import *

# Create your views here.

def index(request):
    '''
    articlelist = Article.objects.all()
    videolist = Video.objects.all()
    resourcelist = Resource.objects.all()
    indexlist = sorted(chain(articlelist, videolist, resourcelist), key=attrgetter('dt_created'), reverse=True)
    context = {}
    items = []
    for item in indexlist:
        data = {}
        itemtype = type(item).__name__
        data['type'] = itemtype
        data['id'] = item.id
        data['title'] = item.title
        data['dt_created'] = item.dt_created

        if itemtype == 'Article':
            data['content'] = item.content
            data['poster'] = item.poster.username
        elif itemtype == 'Video':
            data['videolink'] = item.videolink
            data['poster'] = item.poster.username
        else:
            data['resourcefileURL'] = item.resourcefile.url
            data['poster'] = item.poster.username

        items.append(data)
    context['items'] = items
    return render(request, 'app/index.html', context)
    '''
    return HttpResponse('index')

def article(request, id):
    article = get_object_or_404(Article, pk=id)
    context = {
        'title': article.title,
        'content': article.content,
        'author': article.author,
        'image': article.image,
    }
    return render(request, 'app/article.html', context)

def rootredirect(request):
    return redirect('/app/index/')
