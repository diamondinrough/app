var site = "http://localhost/"

angular.module('starter.services', [])

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
        console.log("getting list json");
        
        $http.get(site + "api/app/users/?format=json")
        .success(function(data) {
            $rootScope.$broadcast("userlist", data);
        });
    }
}]);
