function getname(author) {
    return author.first_name + " " + author.last_name;
}

angular.module('starter.controllers', [])

.controller("IndexCtrl", ["$scope", "$ionicLoading", "IndexSlideSvc", "IndexArticleSvc", "IndexVideoSvc", "IndexResourceSvc", "$ionicSlideBoxDelegate", "$sce", function($scope, $ionicLoading, IndexSlideSvc, IndexArticleSvc, IndexVideoSvc, IndexResourceSvc, $ionicSlideBoxDelegate, $sce) {
    $ionicLoading.show({template: "Loading index..."});

    $scope.slides = [];

    $scope.$on("indexslides", function(_, data) {
        data.forEach(function(slide) {
            $scope.slides.push(slide.image);
        });

        $scope.$broadcast("scroll.refreshComplete");
        $ionicSlideBoxDelegate.update();
        $ionicLoading.hide();
    });

    $scope.article = null;
    $scope.video = null;
    $scope.resource = null;

    $scope.$on("index-article", function(_, data) {
        if (data.results.length > 0) {
            data = data.results[0];
            $scope.article = {
                id: data.id,
                title: $sce.trustAsHtml(data.title),
                content: data.content,
                summary: $sce.trustAsHtml(data.summary),
                image: data.image,
                author: getname(data.author),
                views: data.views,
                tags: data.tags,
                dt_created: data.dt_created,
                dt_updated: data.dt_updated
            };
        }
    });
    $scope.$on("index-video", function(_, data) {
        if (data.results.length > 0) {
            data = data.results[0];
            $scope.video = {
                id: data.id,
                title: $sce.trustAsHtml(data.title),
                summary: $sce.trustAsHtml(data.summary),
                videolink: data.videolink,
                videoid: data.videolink.split("=")[1],
                speaker: data.speaker,
                views: data.views,
                tags: data.tags,
                dt_created: data.dt_created,
            };
        }
    });
    $scope.$on("index-resource", function(_, data) {
        if (data.length > 0) {
            data = data[0];
            $scope.resource = {
                id: data.id,
                title: $sce.trustAsHtml(data.title),
                resourcefile: data.resourcefile,
                filetype: data.filetype,
                summary: $sce.trustAsHtml(data.summary),
                poster: getname(data.poster),
                views: data.views,
                downloads: data.downloads,
                tags: data.tags,
                dt_created: data.dt_created
            };
        }
    });

    $scope.reload = function() {
        $ionicLoading.show({template: "Loading index..."});
        $scope.slides = [];
        $scope.article = null;
        $scope.video = null;
        $scope.resource = null;

        IndexArticleSvc.loadArticle();
        IndexVideoSvc.loadVideo();
        IndexResourceSvc.loadResource();

        IndexSlideSvc.loadSlides();
    }
    
    IndexArticleSvc.loadArticle();
    IndexVideoSvc.loadVideo();
    IndexResourceSvc.loadResource();

    IndexSlideSvc.loadSlides();
}])

.controller("IndexSearchCtrl", ["$scope", "IndexSvc", "TagListSvc", "$ionicPopup", "$ionicLoading", "$sce", "TagPopupSvc", function($scope, IndexSvc, TagListSvc, $ionicPopup, $ionicLoading, $sce, TagPopupSvc) {
    $scope.search = { text: "" };

    $scope.items = [];
    $scope.taglist = [];
    $scope.count = 0;
    $scope.moreitems = false;
    $scope.next = null;
    
    $scope.$on("index-search-list", function(_, data) {
        data.results.forEach(function(item) {
            switch(item.type) {
                case "article":
                    $scope.items.push({
                        type: item.type,
                        id: item.id,
                        title: item.title,
                        content: item.content,
                        summary: item.summary,
                        image: item.image,
                        author: getname(item.author),
                        views: item.views,
                        tags: item.tags,
                        dt_created: item.dt_created,
                        dt_updated: item.dt_updated
                    });
                    break;
                case "video":
                    $scope.items.push({
                        type: item.type,
                        id: item.id,
                        title: $sce.trustAsHtml(item.title),
                        summary: $sce.trustAsHtml(item.summary),
                        videolink: item.videolink,
                        videoid: item.videolink.split("=")[1],
                        speaker: item.speaker,
                        views: item.views,
                        tags: item.tags,
                        dt_created: item.dt_created,
                    });
                    break;
                case "resource":
                    $scope.items.push({
                        type: item.type,
                        id: item.id,
                        title: $sce.trustAsHtml(item.title),
                        resourcefile: item.resourcefile,
                        filetype: item.filetype,
                        summary: $sce.trustAsHtml(item.summary),
                        poster: getname(item.poster),
                        views: item.views,
                        downloads: item.downloads,
                        tags: item.tags,
                        dt_created: item.dt_created
                    });
                    break;
                default:
                    console.error("Unknown type: " + item.type);
            }
        });
        $scope.count = data.count;
        $scope.next = data.next;
        if ($scope.next != null) $scope.moreitems = true;
        else $scope.moreitems = false;

        $scope.$broadcast("scroll.refreshComplete")
        $scope.$broadcast("scroll.infiniteScrollComplete");
        $ionicLoading.hide();
    });

    $scope.$on("taglist", function(_, data) {
        if ($scope.taglist.length == 0) {
            data.forEach(function(tag) {
                $scope.taglist.push({
                    name: tag.name,
                    color: tag.color,
                    checked: false
                });
            });
        }
    });

    $scope.showTags = function() {
        var tags = $ionicPopup.show(TagPopupSvc.tagPopup($scope));
    }

    $scope.loadSearches = function() {
        $scope.items = [];
        $scope.count = 0;
        $scope.moreitems = false;
        $scope.next = null;

        $ionicLoading.show({template: "Loading searches..."});

        if ($scope.search.text != '') {
            IndexSvc.loadItems($scope.taglist, $scope.search.text, null, 'index-search-list');
        } else {
            $scope.$broadcast("scroll.refreshComplete");
            $scope.$broadcast("scroll.infiniteScrollComplete");
            $ionicLoading.hide();
        }
    }

    $scope.loadMore = function() {
        IndexSvc.loadItems(null, null, $scope.next, "index-search-list");
    }

    $scope.reload = function() {
        $ionicLoading.show({template: "Loading searches..."});
        $scope.articles = [];
        $scope.moreitems = false;
        $scope.loadSearches();
    }

    TagListSvc.loadTags();
    $scope.loadSearches();
}])

.controller("RegisterCtrl", function($scope, $ionicLoading, $ionicHistory, UserSvc) {
    $scope.user = { username:"", password:"", first_name:"", last_name:"" }

    $scope.register = function() {
        $ionicLoading.show({template: "Registering..."});
        UserSvc.register($scope.user);
    }

    $scope.$on("user-register-success", function(_, __) {
        $ionicLoading.show({template: "You are registered!", duration: 1000});
        $ionicHistory.goBack(-2);
    });

    $scope.$on("user-register-fail", function(_, __) {
        $ionicLoading.show({template: "Failed to register.", duration: 1000});
    });
})

.controller("LoginCtrl", function($scope, $ionicLoading, $ionicHistory, AuthSvc) {
    $scope.user = { username:"", password:"" };
    $scope.authenticated = AuthSvc.authenticated();
    $scope.currentuser = AuthSvc.currentuser();

    $scope.login = function() {
        $ionicLoading.show({template: "Logging in..."});
        AuthSvc.authorize($scope.user);
    }

    $scope.logout = function() {
        $ionicLoading.show({template: "Logging out..."});
        AuthSvc.unauthorize();
    }

    $scope.$on("authorize-success", function(_, __) {
        $ionicLoading.show({template: "Logged in!", duration: 1000});
        $ionicHistory.goBack();
    });

    $scope.$on("authorize-fail", function(_, __) {
        $ionicLoading.show({template: "Failed to login.", duration: 1000});
    });

    $scope.$on("unauthorize-success", function(_, __) {
        $ionicLoading.show({template: "Logged out!", duration: 1000});
        $ionicHistory.goBack();
    });
})

.controller("ProfileCtrl", function($scope, $ionicLoading, AuthSvc, UserSvc) {
    $scope.user = null;

    $scope.$on("index-profile", function(_, data) {
        $scope.user = {
            username: data.username,
            first_name: data.first_name,
            last_name: data.last_name
        };
    });
    if (AuthSvc.authenticated()) {
        UserSvc.loadUser(AuthSvc.currentuser(), "index-profile");
    }
})


.controller("ArticleListCtrl", ["$scope", "$ionicLoading", "ArticleListSvc", "TagListSvc", "$ionicPopup", "TagPopupSvc", function($scope, $ionicLoading, ArticleListSvc, TagListSvc, $ionicPopup, TagPopupSvc) {
    $ionicLoading.show({template: "Loading articles..."});

    $scope.articles = [];
    $scope.taglist = [];
    $scope.count = 0;
    $scope.moreitems = false;
    $scope.next = null;

    $scope.$on("taglist", function(_, data) {
        if ($scope.taglist.length == 0) {
            data.forEach(function(tag) {
                $scope.taglist.push({
                    name: tag.name,
                    color: tag.color,
                    checked: false
                });
            });
        }
    });

    $scope.$on("article-list", function(_, data) {
        data.results.forEach(function(article) {
            $scope.articles.push({
                id: article.id,
                title: article.title,
                content: article.content,
                summary: article.summary,
                image: article.image,
                author: getname(article.author),
                views: article.views,
                tags: article.tags,
                dt_created: article.dt_created,
                dt_updated: article.dt_updated
            });
        });
        $scope.count = data.count;
        $scope.next = data.next;
        if ($scope.next != null) $scope.moreitems = true;
        else $scope.moreitems = false;

        $scope.$broadcast("scroll.refreshComplete");
        $scope.$broadcast("scroll.infiniteScrollComplete");
        $ionicLoading.hide();
    });
    
    $scope.showTags = function() {
        var tags = $ionicPopup.show(TagPopupSvc.tagPopup($scope));
    }

    $scope.loadMore = function() {
        ArticleListSvc.loadArticles(null, null, $scope.next, "article-list");
    }

    $scope.reload = function() {
        $ionicLoading.show({template: "Loading articles..."});
        $scope.articles = [];
        $scope.moreitems = false;
        ArticleListSvc.loadArticles($scope.taglist, null, null, "article-list");
    }

    TagListSvc.loadTags();
    ArticleListSvc.loadArticles($scope.taglist, null, null, "article-list");
}])

.controller("ArticleCtrl", ["$scope", "$stateParams", "ArticleSvc", "ViewCountSvc", "$sce", function($scope, $stateParams, ArticleSvc, ViewCountSvc, $sce) {
    $scope.article = null;
    $scope.$on("article", function(_, data) {
        $scope.article = {
            id: data.id,
            title: $sce.trustAsHtml(data.title),
            content: $sce.trustAsHtml(data.content),
            summary: $sce.trustAsHtml(data.summary),
            image: data.image,
            author: getname(data.author),
            views: data.views,
            tags: data.tags,
            dt_created: data.dt_created,
            dt_updated: data.dt_updated
        };

        ViewCountSvc.viewed("Article", data.id);
    });
    
    ArticleSvc.loadArticle($stateParams.id);
}])

.controller("ArticleSearchCtrl", ["$scope", "ArticleListSvc", "TagListSvc", "$ionicPopup", "$ionicLoading", "TagPopupSvc", function($scope, ArticleListSvc, TagListSvc, $ionicPopup, $ionicLoading, TagPopupSvc) {
    $scope.search = { text: "" };

    $scope.articles = [];
    $scope.taglist = [];
    $scope.count = 0;
    $scope.moreitems = false;
    $scope.next = null;

    $scope.$on("article-search-list", function(_, data) {
        data.results.forEach(function(article) {
            $scope.articles.push({
                id: article.id,
                title: article.title,
                content: article.content,
                summary: article.summary,
                image: article.image,
                author: getname(article.author),
                views: article.views,
                tags: article.tags,
                dt_created: article.dt_created,
                dt_updated: article.dt_updated
            });
        });
        $scope.count = data.count;
        $scope.next = data.next;
        if ($scope.next != null) $scope.moreitems = true;
        else $scope.moreitems = false;

        $scope.$broadcast("scroll.refreshComplete")
        $scope.$broadcast("scroll.infiniteScrollComplete");
        $ionicLoading.hide();
    });

    $scope.$on("taglist", function(_, data) {
        if ($scope.taglist.length == 0) {
            data.forEach(function(tag) {
                $scope.taglist.push({
                    name: tag.name,
                    color: tag.color,
                    checked: false
                });
            });
        }
    });

    $scope.showTags = function() {
        var tags = $ionicPopup.show(TagPopupSvc.tagPopup($scope));
    }

    $scope.loadSearches = function() {
        $scope.articles = [];
        $scope.count = 0;
        $scope.moreitems = false;
        $scope.next = null;

        $ionicLoading.show({template: "Loading searches..."});

        if ($scope.search.text != '') {
            ArticleListSvc.loadArticles($scope.taglist, $scope.search.text, null, 'article-search-list');
        } else {
            $scope.$broadcast("scroll.refreshComplete");
            $scope.$broadcast("scroll.infiniteScrollComplete");
            $ionicLoading.hide();
        }
    }

    $scope.loadMore = function() {
        ArticleListSvc.loadArticles(null, null, $scope.next, "article-search-list");
    }

    $scope.reload = function() {
        $ionicLoading.show({template: "Loading searches..."});
        $scope.articles = [];
        $scope.moreitems = false;
        $scope.loadSearches();
    }

    TagListSvc.loadTags();
    $scope.loadSearches();
}])

.controller("VideoListCtrl", ["$scope", "$ionicLoading", "VideoListSvc", "TagListSvc", "$ionicPopup", "TagPopupSvc", function($scope, $ionicLoading, VideoListSvc, TagListSvc, $ionicPopup, TagPopupSvc) {
	$ionicLoading.show({template: "Loading videos..."});

	$scope.videos = [];
    $scope.taglist = [];
    $scope.count = 0;
    $scope.moreitems = false;
    $scope.next = null;

    $scope.$on("taglist", function(_, data) {
        if ($scope.taglist.length == 0) {
            data.forEach(function(tag) {
                $scope.taglist.push({
                    name: tag.name,
                    color: tag.color,
                    checked: false
                });
            });
        }
    });

	$scope.$on("video-list", function(_, data) {
    	data.results.forEach(function(video) {
        	$scope.videos.push({
            	id: video.id,
            	title: video.title,
            	summary: video.summary,
            	videolink: video.videolink,
                videoid: video.videolink.split("=")[1],
            	speaker: video.speaker,
            	views: video.views,
            	tags: video.tags,
                dt_created: video.dt_created,
        	});

            $scope.count = data.count;
            $scope.next = data.next;
            if ($scope.next != null) $scope.moreitems = true;
            else $scope.moreitems = false;

            $scope.$broadcast("scroll.refreshComplete")
            $scope.$broadcast("scroll.infiniteScrollComplete");
            $ionicLoading.hide();
    	});
        
        $scope.$broadcast("scroll.refreshComplete");
    	$ionicLoading.hide();
	});

    $scope.showTags = function() {
        var tags = $ionicPopup.show(TagPopupSvc.tagPopup($scope));
    }
    
    $scope.loadMore = function() {
        VideoListSvc.loadVideos(null, null, $scope.next, "video-list");
    }

    $scope.reload = function() {
        $ionicLoading.show({template: "Loading videos..."});
        $scope.videos = [];
        $scope.moreitems = false;
        VideoListSvc.loadVideos($scope.taglist, null, null, "video-list");
    }

    TagListSvc.loadTags();
    VideoListSvc.loadVideos($scope.taglist, null, null, "video-list");
}])

.controller("VideoSearchCtrl", ["$scope", "VideoListSvc", "TagListSvc", "$ionicPopup", "$ionicLoading", "TagPopupSvc", function($scope, VideoListSvc, TagListSvc, $ionicPopup, $ionicLoading, TagPopupSvc) {
    $scope.search = { text: "" };

    $scope.videos = [];
    $scope.taglist = [];
    $scope.count = 0;
    $scope.moreitems = false;
    $scope.next = null;

    $scope.$on("video-search-list", function(_, data) {
        data.results.forEach(function(video) {
            $scope.videos.push({
                id: video.id,
                title: video.title,
                summary: video.summary,
                videolink: video.videolink,
                videoid: video.videolink.split("=")[1],
                speaker: video.speaker,
                views: video.views,
                tags: video.tags,
                dt_created: video.dt_created,
            });

            $scope.count = data.count;
            $scope.next = data.next;
            if ($scope.next != null) $scope.moreitems = true;
            else $scope.moreitems = false;

            $scope.$broadcast("scroll.refreshComplete")
            $scope.$broadcast("scroll.infiniteScrollComplete");
            $ionicLoading.hide();
        });
        
        $scope.$broadcast("scroll.refreshComplete");
        $ionicLoading.hide();
    });

    $scope.$on("taglist", function(_, data) {
        if ($scope.taglist.length == 0) {
            data.forEach(function(tag) {
                $scope.taglist.push({
                    name: tag.name,
                    color: tag.color,
                    checked: false
                });
            });
        }
    });

    $scope.showTags = function() {
        var tags = $ionicPopup.show(TagPopupSvc.tagPopup($scope));
    }

    $scope.loadSearches = function() {
        $scope.videos = [];
        $scope.count = 0;
        $scope.moreitems = false;
        $scope.next = null;

        $ionicLoading.show({template: "Loading searches..."});

        if ($scope.search.text != '') {
            VideoListSvc.loadVideos($scope.taglist, $scope.search.text, null, 'video-search-list');
        } else {
            $scope.$broadcast("scroll.refreshComplete");
            $scope.$broadcast("scroll.infiniteScrollComplete");
            $ionicLoading.hide();
        }
    }

    $scope.loadMore = function() {
        VideoListSvc.loadVideos(null, null, $scope.next, "video-search-list");
    }

    $scope.reload = function() {
        $ionicLoading.show({template: "Loading searches..."});
        $scope.videos = [];
        $scope.moreitems = false;
        $scope.loadSearches();
    }

    TagListSvc.loadTags();
    $scope.loadSearches();
}])

.controller("VideoCtrl", ["$scope", "$stateParams", "VideoSvc", "$sce", "$ionicTabsDelegate", "ViewCountSvc", function($scope, $stateParams, VideoSvc, $sce, $ionicTabsDelegate, ViewCountSvc) {
	$scope.video = null;

	$scope.$on("video", function(_, data) {
    	$scope.video = {
          	id: data.id,
        	title: data.title,
        	summary:data.summary,
        	videolink: data.videolink,
            videoid: data.videolink.split('=')[1],
            embed: $sce.getTrustedResourceUrl("https://youtube.com/embed/" + data.videolink.split('=')[1]),
        	speaker: data.speaker,
        	views: data.views,
        	tags: data.tags,
            dt_created: data.dt_created,
    	};

        ViewCountSvc.viewed("Video", data.id);
	});
    
    $scope.tabs = [
    { selected: true, ngclass: "active" },
    { selected: false, ngclass: "" }
    ];
    $scope.infotab = function() {
        $scope.tabs[0].selected = true;
        $scope.tabs[0].ngclass = "active";
        $scope.tabs[1].selected = false;
        $scope.tabs[1].ngclass = "";
    }
    $scope.recommendtab = function() {
        $scope.tabs[1].selected = true;
        $scope.tabs[1].ngclass = "active";
        $scope.tabs[0].selected = false;
        $scope.tabs[0].ngclass = "";
    }

	VideoSvc.loadVideo($stateParams.id);
}])

.controller("ResourceListCtrl", ["$scope", "$ionicLoading", "ResourceListSvc", function($scope, $ionicLoading, ResourceListSvc) {
    $ionicLoading.show({template: "Loading videos..."});

    $scope.resources = [];
    $scope.$on("resourcelist", function(_, data) {

        data.forEach(function(resource) {
            $scope.resources.push({
                //json data
            });
        });
        
        $ionicLoading.hide();
    });
    
    ResourceListSvc.loadResources();
}])

.controller("ResourceCtrl", ["$scope", "$stateParams", "ResourceSvc", function($scope, $stateParams, ResourceSvc) {
    $scope.resource = null;
    $scope.$on("resource", function(_, data) {
        $scope.resource = {
            //json data
        };
    });
    
    ResourceSvc.loadResource($stateParams.id);
}])

.controller("HOICtrl", ["$scope", "$ionicLoading", "UserListSvc", function($scope, $ionicLoading, UserListSvc) {
    $ionicLoading.show({template: "Loading contacts..."});
    
    $scope.contacts = [];
    $scope.$on("hoi-users", function(_, data) {
        data.forEach(function(user) {
            $scope.contacts.push({
                id: user.id,
                username: user.username,
                wechat: user.wechat,
                email: user.email,
                picture: user.image
            });
        });
        $ionicLoading.hide();
    });
    
    UserListSvc.loadUsers("hoi-users");
}])

.controller("HelpCtrl", ["$scope", "$ionicLoading", "HelpListSvc", function($scope, $ionicLoading, HelpListSvc) {
    $ionicLoading.show({template: "Loading help page..."});

    $scope.count = 0;
    $scope.moreitems = false;
    $scope.next = null;

    $scope.faq = [];
    $scope.$on("faq-list", function(_, data) {
        data.results.forEach(function(help) {
            $scope.faq.push({
                id: help.id,
                poster: help.poster,
                question: help.question,
                detail: help.detail,
                tags: help.tags,
                dt_created: help.dt_created,
                dt_updated: help.dt_updated
            });
        });

        $scope.count = data.count;
        $scope.next = data.next;
        if ($scope.next != null) $scope.moreitems = true;
        else $scope.moreitems = false;

        $scope.$broadcast("scroll.refreshComplete");
        $scope.$broadcast("scroll.infiniteScrollComplete");
        $ionicLoading.hide();
    });
    
    $scope.loadMore = function() {
        HelpListSvc.loadHelpList(null, $scope.next, "faq-list");
    }

    $scope.reload = function() {
        $ionicLoading.show({template: "Loading help page..."});
        $scope.faq = [];
        $scope.moreitems = false;
        HelpListSvc.loadHelpList(true, null, "faq-list");
    }

    HelpListSvc.loadHelpList(true, null, "faq-list");
}])

.controller("QuestionListCtrl", ["$scope", "$ionicLoading", "HelpListSvc", function($scope, $ionicLoading, HelpListSvc) {
    $ionicLoading.show({template: "Loading questions..."});

    $scope.count = 0;
    $scope.moreitems = false;
    $scope.next = null;

    $scope.questions = [];
    $scope.$on("question-list", function(_, data) {
        data.results.forEach(function(question) {
            $scope.questions.push({
                id: question.id,
                poster: question.poster,
                question: question.question,
                detail: question.detail,
                tags: question.tags,
                dt_created: question.dt_created,
                dt_updated: question.dt_updated
            });
        });

        $scope.count = data.count;
        $scope.next = data.next;
        if ($scope.next != null) $scope.moreitems = true;
        else $scope.moreitems = false;

        $scope.$broadcast("scroll.refreshComplete");
        $scope.$broadcast("scroll.infiniteScrollComplete");
        $ionicLoading.hide();
    });
    
    $scope.loadMore = function() {
        HelpListSvc.loadHelpList(null, $scope.next, "question-list");
    }

    $scope.reload = function() {
        $ionicLoading.show({template: "Loading questions..."});
        $scope.questions = [];
        $scope.moreitems = false;
        HelpListSvc.loadHelpList(false, null, "question-list");
    }

    HelpListSvc.loadHelpList(false, null, "question-list");
}])

.controller("QuestionCtrl", ["$scope", "$stateParams", "HelpSvc", function($scope, $stateParams, HelpSvc) {
    $scope.question = null;
    $scope.$on("question", function(_, data) {
        $scope.question = {
                id: data.id,
                poster: data.poster,
                question: data.question,
                detail: data.detail,
                tags: data.tags,
                dt_created: data.dt_created,
                dt_updated: data.dt_updated
        };
    });
    
    HelpSvc.loadHelp($stateParams.id);
}])

.controller("FeedbackCtrl", ["$scope", "FeedbackSvc", "$ionicLoading", "$ionicHistory", function($scope, FeedbackSvc, $ionicLoading, $ionicHistory) {
    $scope.feedback = { comments: "", contactinfo: "", name: "" }

    $scope.submit = function() {
        $ionicLoading.show({template: "Submitting feedback..."});
        FeedbackSvc.post($scope.feedback);
    }

    $scope.$on("feedback-success", function(_, __) {
        $ionicLoading.show({template: "Feedback Successful!", duration: 2000});
        $ionicHistory.goBack();
    });

    $scope.$on("feedback-error", function(_, __) {
        $ionicLoading.show({template: "Feedback Failed<br>Please fill out all fields", duration: 2000});
    })
}]);