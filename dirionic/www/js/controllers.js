function getname(author) {
    return author.first_name + " " + author.last_name;
}

angular.module('starter.controllers', [])

.controller("IndexCtrl", ["$scope", "$ionicLoading", "IndexSlideSvc", "ArticleListSvc", "VideoListSvc", "ResourceListSvc", "$ionicSlideBoxDelegate", function($scope, $ionicLoading, IndexSlideSvc, ArticleListSvc, VideoListSvc, ResourceListSvc, $ionicSlideBoxDelegate) {
    $ionicLoading.show({template: "Loading index..."});

    $scope.slides = [];
    $scope.itemlist = [];

    $scope.$on("indexslides", function(_, data) {
        data.forEach(function(slide) {
            $scope.slides.push(slide.image);
        });
        console.log('loading');

        $ionicSlideBoxDelegate.update();
        $ionicLoading.hide();
    });

    $scope.article = null;
    $scope.video = null;
    $scope.resource = null;

    $scope.$on("articlelist", function(_, data) {
        if (data.length > 0) {
            data = data[0];
            $scope.article = {
                id: data.id,
                title: data.title,
                content: data.content,
                summary: data.summary,
                image: data.image,
                author: getname(data.author),
                views: data.views,
                tags: data.tags,
                dt_created: data.dt_created,
                dt_updated: data.dt_updated
            };
        }
    });
    $scope.$on("videolist", function(_, data) {
        if (data.length > 0) {
            data = data[0];
            $scope.video = {
                id: data.id,
                title: data.title,
                summary: data.summary,
                videolink: data.videolink,
                videoid: data.videolink.split("=")[1],
                speaker: data.speaker,
                views: data.views,
                tags: data.tags,
                dt_created: data.dt_created,
            };
        }
    });
    $scope.$on("resourcelist", function(_, data) {
        if (data.length > 0) {
            data = data[0];
            $scope.resource = {
                id: data.id,
                title: data.title,
                resourcefile: data.resourcefile,
                filetype: data.filetype,
                summary: data.summary,
                poster: getname(data.poster),
                views: data.views,
                downloads: data.downloads,
                tags: data.tags,
                dt_created: data.dt_created
            };
        }
    });
    
    ArticleListSvc.loadArticles();
    VideoListSvc.loadVideos();
    ResourceListSvc.loadResources();

    IndexSlideSvc.loadSlides();
}])

.controller("ArticleListCtrl", ["$scope", "$ionicLoading", "ArticleListSvc", function($scope, $ionicLoading, ArticleListSvc) {
    $ionicLoading.show({template: "Loading articles..."});

    $scope.articles = [];
    $scope.$on("articlelist", function(_, data) {

        data.forEach(function(article) {
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

        $ionicLoading.hide();
    });
    
    ArticleListSvc.loadArticles();
}])

.controller("ArticleCtrl", ["$scope", "$stateParams", "ArticleSvc", function($scope, $stateParams, ArticleSvc) {
    $scope.article = null;
    $scope.$on("article", function(_, data) {
        $scope.article = {
            id: data.id,
            title: data.title,
            content: data.content,
            summary: data.summary,
            image: data.image,
            author: getname(data.author),
            views: data.views,
            tags: data.tags,
            dt_created: data.dt_created,
            dt_updated: data.dt_updated
        };
    });
    
    ArticleSvc.loadArticle($stateParams.id);
}])

.controller("VideoListCtrl", ["$scope", "$ionicLoading", "VideoListSvc", function($scope, $ionicLoading, VideoListSvc) {
	$ionicLoading.show({template: "Loading videos..."});

	$scope.videos = [];
	$scope.$on("videolist", function(_, data) {

    	data.forEach(function(video) {
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
    	});
   	 
    	$ionicLoading.hide();
	});
    
	VideoListSvc.loadVideos();
}])

.controller("VideoCtrl", ["$scope", "$stateParams", "VideoSvc", "$sce", function($scope, $stateParams, VideoSvc, $sce) {
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
	});
    
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

.controller("UserListCtrl", ["$scope", "$ionicLoading", "UserListSvc", function($scope, $ionicLoading, UserListSvc) {
    $ionicLoading.show({template: "Loading users..."});
    
    $scope.users = [];
    $scope.$on("userlist", function(_, data) {
        
        data.forEach(function(user) {
            $scope.users.push({
                id: user.id,
                username: user.username
            });
        });
        
        $ionicLoading.hide();
    });
    
    UserListSvc.loadUsers();
}])

.controller("HelpListCtrl", ["$scope", "$ionicLoading", "HelpListSvc", function($scope, $ionicLoading, HelpListSvc) {
    $ionicLoading.show({template: "Loading help..."});

    $scope.help = [];
    $scope.$on("helplist", function(_, data) {

        data.forEach(function(help) {
            $scope.help.push({
                id: help.id,
                poster: help.poster,
                question: help.question,
                detail: help.detail,
                tags: help.tags,
                dt_created: help.dt_created,
                dt_updated: help.dt_updated
            });
        });

        $ionicLoading.hide();
    });
    
    HelpListSvc.loadHelp();
}])

.controller("HelpCtrl", ["$scope", "$stateParams", "HelpSvc", function($scope, $stateParams, HelpSvc) {
    $scope.help = null;
    $scope.$on("help", function(_, data) {
        $scope.help = {
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
}]);
