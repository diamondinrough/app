function getname(author) {
    return author.first_name + " " + author.last_name;
}

angular.module('starter.controllers', [])

.controller("IndexCtrl", ["$scope", "$ionicLoading", "IndexSvc", function($scope, $ionicLoading, IndexSvc) {
    $ionicLoading.show({template: "Loading index..."});

    $scope.itemlist = [];
    $scope.$on("index", function(_, data) {
        data.forEach(function(item) {
            var type = item.type;
            console.log(type);
            if (type == "article") {
                $scope.itemlist.push({
                    type: type,
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
            } else if (type == "video") {
                $scope.itemlist.push({
                    type: type,
                    id: item.id,
                    title: item.title,
                    // videos changed to urls rather than upload, waiting for database change
                    summary: item.summary,
                    speaker: item.speaker,
                    poster: getname(item.poster),
                    views: item.views,
                    tags: item.tags,
                    dt_created: item.dt_created
                });
            } else if (type == "resource") {
                $scope.itemlist.push({
                    type: type,
                    id: item.id,
                    title: item.title,
                    resourcefile: item.resourcefile,
                    summary: item.summary,
                    poster: getname(item.poster),
                    views: item.views,
                    downloads: item.downloads,
                    tags: item.tags,
                    dt_created: item.dt_created
                });
            } else {
                console.log("ERROR: Unknown type: " + type);
            }
        });

        $ionicLoading.hide();
   });
    
    IndexSvc.loadIndex();
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
                //json data
            });
        });
        
        $ionicLoading.hide();
    });
    
    VideoListSvc.loadVideos();
}])

.controller("VideoCtrl", ["$scope", "$stateParams", "VideoSvc", function($scope, $stateParams, VideoSvc) {
    $scope.video = null;
    $scope.$on("video", function(_, data) {
        $scope.video = {
            //json data
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
