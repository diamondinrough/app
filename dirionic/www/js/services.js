var site = "http://0.0.0.0/";

angular.module('starter.services', [])

.service("IndexSlideSvc", ["$http", "$rootScope", function($http, $rootScope) {
    this.loadSlides = function() {
        $http.get(site + "api/app/index/slides/?format=json")
        .success(function(data) {
            $rootScope.$broadcast("indexslides", data);
        })
        .error(function() {
            console.error("Failed to load slides from " + site);
        });
    }
}])

.service("IndexSvc", ["$http", "$rootScope", "$ionicLoading", function($http, $rootScope, $ionicLoading) {
    this.loadIndex = function() {
        $http.get(site + "api/app/index/?format=json")
        .success(function(data) {
            $rootScope.$broadcast("index", data);
        })
        .error(function() {
            $ionicLoading.hide();
        });
    }
}])

.service("ArticleListSvc", ["$http", "$rootScope", "$ionicLoading", function($http, $rootScope, $ionicLoading) {
    this.loadArticles = function() {
        $http.get(site + "api/app/articles/?format=json")
        .success(function(data) {
            $rootScope.$broadcast("articlelist", data);
        })
        .error(function() {
            $ionicLoading.hide();
        });
    }
}])

.service("ArticleSvc", ["$http", "$rootScope", function($http, $rootScope) {
    this.loadArticle = function(id) {
        $http.get(site + "api/app/articles/" + id + "/?format=json")
        .success(function(data) {
            $rootScope.$broadcast("article", data);
        });
    }
}])

.service("VideoListSvc", ["$http", "$rootScope", "$ionicLoading", function($http, $rootScope, $ionicLoading) {
    this.loadVideos = function() {
        $http.get(site + "api/app/videos/?format=json")
        .success(function(data) {
            $rootScope.$broadcast("videolist", data);
        })
        .error(function() {
            $ionicLoading.hide();
        });
    }
}])

.service("VideoSvc", ["$http", "$rootScope", function($http, $rootScope) {
    this.loadVideo = function(id) {
        $http.get(site + "api/app/videos/" + id + "/?format=json")
        .success(function(data) {
            $rootScope.$broadcast("video", data);
        });
    }
}])

.service("ResourceListSvc", ["$http", "$rootScope", "$ionicLoading", function($http, $rootScope, $ionicLoading) {
    this.loadResources = function() {
        $http.get(site + "api/app/resources/?format=json")
        .success(function(data) {
            $rootScope.$broadcast("resourcelist", data);
        })
        .error(function() {
            $ionicLoading.hide();
        });
    }
}])

.service("ResourceSvc", ["$http", "$rootScope", function($http, $rootScope) {
    this.loadResource = function(id) {
        $http.get(site + "api/app/resources/" + id + "/?format=json")
        .success(function(data) {
            $rootScope.$broadcast("resource", data);
        });
    }
}])

.service("UserListSvc", ["$http", "$rootScope", function($http, $rootScope) {
    this.loadUsers = function() {
        $http.get(site + "api/app/users/?format=json")
        .success(function(data) {
            $rootScope.$broadcast("userlist", data);
        });
    }
}])

.service("HelpListSvc", ["$http", "$rootScope", "$ionicLoading", function($http, $rootScope, $ionicLoading) {
    this.loadResources = function() {
        $http.get(site + "api/app/help/?format=json")
        .success(function(data) {
            $rootScope.$broadcast("helplist", data);
        })
        .error(function() {
            $ionicLoading.hide();
        });
    }
}])

.service("HelpSvc", ["$http", "$rootScope", function($http, $rootScope) {
    this.loadResource = function(id) {
        $http.get(site + "api/app/help/" + id + "/?format=json")
        .success(function(data) {
            $rootScope.$broadcast("help", data);
        });
    }
}]);
