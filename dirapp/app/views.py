from django.shortcuts import HttpResponse, render, redirect, get_object_or_404

from .models import *

# Create your views here.

def index(request):
	return HttpResponse('app index')

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