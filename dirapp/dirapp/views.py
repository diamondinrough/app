from django.shortcuts import redirect

# Create your views here.

def rootredirect(request):
    return redirect('/app/index/')