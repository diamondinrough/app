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

.controller("ArticleListCtrl", ["$scope", "$ionicLoading", "ArticleListSvc", "TagListSvc", "$ionicPopup", function($scope, $ionicLoading, ArticleListSvc, TagListSvc, $ionicPopup) {
    $ionicLoading.show({template: "Loading articles..."});

    $scope.articles = [];
    $scope.taglist = [];
    $scope.moreitems = false;

    $scope.$on("taglist", function(_, data) {
        data.forEach(function(tag) {
            $scope.taglist.push({
                name: tag.name,
                color: tag.color,
                checked: false
            });
        });
    });

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

        $scope.$broadcast("scroll.refreshComplete");
        $ionicLoading.hide();
    });
    
    $scope.showTags = function() {
        var tags = $ionicPopup.show({
            template: `
                <style>
                    .item-checkbox-right .checkbox input, .item-checkbox-right .checkbox-icon {
                        float: right;
                    }
                    .item-checkbox.item-checkbox-right {
                        padding: 15px;
                    }
                </style>
                <ion-checkbox ng-repeat="tag in taglist" ng-model="tag.checked" ng-checked="tag.checked"
                class="item-checkbox-right">
                <p style="color: {{tag.color}};">{{tag.name}}</p>
                </ion-checkbox>
            `,
            title: 'Tags',
            scope: $scope,
            buttons: [
                {
                    text: '<b>Reset</b>',
                    type: 'button-assertive',
                    onTap: function(e) {
                        for (i = 0; i < $scope.taglist.length; i++) {
                            $scope.taglist[i].checked = false;
                        }
                        $scope.reload();
                    }
                },
                {
                    text: '<b>Done</b>',
                    type: 'button-positive',
                    onTap: function(e) {
                        $scope.reload();   
                    }
                }
            ]
        });
    };
    
    $scope.loadMore = function() {
        console.log("load more");
    }

    $scope.reload = function() {
        $ionicLoading.show({template: "Loading articles..."});
        $scope.articles = [];
        $scope.moreitems = false;
        ArticleListSvc.loadArticles($scope.taglist);
    }

    TagListSvc.loadTags();
    ArticleListSvc.loadArticles($scope.taglist);
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

.controller("VideoListCtrl", ["$scope", "$ionicLoading", "VideoListSvc", "TagListSvc", "$ionicPopup", function($scope, $ionicLoading, VideoListSvc, TagListSvc, $ionicPopup) {
	$ionicLoading.show({template: "Loading videos..."});

	$scope.videos = [];
    $scope.taglist = [];
    $scope.moreitems = false;

    $scope.$on("taglist", function(_, data) {
        data.forEach(function(tag) {
            $scope.taglist.push({
                name: tag.name,
                color: tag.color,
                checked: false
            });
        });
    });

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
        
        $scope.$broadcast("scroll.refreshComplete");
    	$ionicLoading.hide();
	});

    $scope.showTags = function() {
        var tags = $ionicPopup.show({
            template: `
                <style>
                    .item-checkbox-right .checkbox input, .item-checkbox-right .checkbox-icon {
                        float: right;
                    }
                    .item-checkbox.item-checkbox-right {
                        padding: 15px;
                    }
                </style>
                <ion-checkbox ng-repeat="tag in taglist" ng-model="tag.checked" ng-checked="tag.checked"
                class="item-checkbox-right">
                <p style="color: {{tag.color}};">{{tag.name}}</p>
                </ion-checkbox>
            `,
            title: 'Tags',
            scope: $scope,
            buttons: [
                {
                    text: '<b>Reset</b>',
                    type: 'button-assertive',
                    onTap: function(e) {
                        for (i = 0; i < $scope.taglist.length; i++) {
                            $scope.taglist[i].checked = false;
                        }
                        $scope.reload();
                    }
                },
                {
                    text: '<b>Done</b>',
                    type: 'button-positive',
                    onTap: function(e) {
                        $scope.reload();   
                    }
                }
            ]
        });
    };
    
    $scope.loadMore = function() {
        console.log("load more");
    }

    $scope.reload = function() {
        $ionicLoading.show({template: "Loading videos..."});
        $scope.videos = [];
        $scope.moreitems = false;
        VideoListSvc.loadVideos($scope.taglist);
    }

    TagListSvc.loadTags();
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
}]);