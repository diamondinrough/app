from django.db import models

#from taggit.managers import TaggableManager
#from taggit.models import TagBase, GenericTaggedItemBase

# Create your models here.


class User(models.Model):
    id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=30)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)

    dt_created = models.DateTimeField(auto_now_add=True, editable=False)
    dt_updated = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ('id', 'username')

    def __str__(self):
        return self.username


class Team(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50)

    members = models.ManyToManyField(User, blank=False, related_name='teammembers')

    dt_created = models.DateTimeField(auto_now_add=True, editable=False)
    dt_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class Task(models.Model):
    id = models.AutoField(primary_key=True)
    leader = models.ForeignKey(User, related_name='taskleaders')
    members = models.ManyToManyField(User, blank=False, related_name='taskmembers')
    
    name = models.CharField(max_length=100)
    description = models.TextField()
    completed = models.BooleanField(default=False)

    dt_created = models.DateTimeField(auto_now_add=True, editable=False)
    dt_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class Tag(models.Model):
    name = models.CharField(max_length=20, primary_key=True)

    def __str__(self):
        return self.name



class Article(models.Model):
    id = models.AutoField(primary_key=True)
    author = models.ForeignKey(User, null=True, on_delete=models.SET_NULL, related_name='userarticles')
    
    title = models.CharField(max_length=200)
    content = models.TextField()
    summary = models.CharField(max_length=500, null=True)
    image = models.ImageField(upload_to='articles/images/', default='articles/images/noimage.gif')
    views = models.IntegerField(default=0)

    tags = models.ManyToManyField(Tag, blank=False, related_name='articletag')

    dt_created = models.DateTimeField(auto_now_add=True, editable=False)
    dt_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title


class ArticleLink(models.Model):
    id = models.AutoField(primary_key=True)
    poster = models.ForeignKey(User, null=True, on_delete=models.SET_NULL, related_name='userarticlelinks')    
    
    title = models.CharField(max_length=200)
    link = models.URLField(max_length=200)
    summary = models.CharField(max_length=500, null=True)
    image = models.ImageField(upload_to='articles/images/', default='articles/images/noimage.gif')
    views = models.IntegerField(default=0)

    tags = models.ManyToManyField(Tag, blank=False, related_name='articlelinktag')

    dt_created = models.DateTimeField(auto_now_add=True, editable=False)

    def __str__(self):
        return self.title


class Video(models.Model):
    id = models.AutoField(primary_key=True)
    poster = models.ForeignKey(User, null=True, on_delete=models.SET_NULL, related_name='uservideos')
    
    title = models.CharField(max_length=200)
    videolink = models.URLField(max_length=500)
    summary = models.CharField(max_length=500, null=True)
    speaker = models.CharField(max_length=50, null=True)
    views = models.IntegerField(default=0)

    tags = models.ManyToManyField(Tag, blank=False, related_name='videotag')

    dt_created = models.DateTimeField(auto_now_add=True, editable=False)

    def __str__(self):
        return self.title


class Resource(models.Model):
    id = models.AutoField(primary_key=True)
    poster = models.ForeignKey(User, null=True, on_delete=models.SET_NULL, related_name='userresources')
    team = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='teamresources')
    
    title = models.CharField(max_length=200)
    resourcefile = models.FileField(upload_to='resources/')
    filetype = models.CharField(max_length=5)
    summary = models.CharField(max_length=500, null=True)
    views = models.IntegerField(default=0)
    downloads = models.IntegerField(default=0)

    tags = models.ManyToManyField(Tag, blank=False, related_name='resourcetag')

    dt_created = models.DateTimeField(auto_now_add=True, editable=False)

    def __str__(self):
        return self.title

class Help(models.Model):
    id = models.AutoField(primary_key=True)
    poster = models.ForeignKey(User, null=True, on_delete=models.SET_NULL, related_name='helpresources')
    question = models.CharField(max_length=200)
    detail = models.TextField()
    
    tags = models.ManyToManyField(Tag, blank=False, related_name='helptag')
    
    dt_created = models.DateTimeField(auto_now_add=True, editable=False)

    def __str__(self):
        return self.title

class Feedback(models.Model):
    id = models.AutoField(primary_key=True)
    comments = models.TextField()
    contactinfo = models.CharField(max_length=200)
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name + ' feedback'
