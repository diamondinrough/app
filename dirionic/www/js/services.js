var site = "http://localhost/"

angular.module('starter.services', [])

.service("ArticleListSvc", ["$http", "$rootScope", "$ionicLoading", function($http, $rootScope, $ionicLoading) {

    this.loadArticles = function() {
        console.log("getting article list json");
        
        $http.get("http://localhost/api/app/articles/?format=json")
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
        console.log("getting article json");
        
        $http.get("http://localhost/api/app/articles/" + id + "/?format=json")
        .success(function(data) {
            $rootScope.$broadcast("article", data);
        });
    }
}])

.service("UserListSvc", ["$http", "$rootScope", function($http, $rootScope) {
    this.loadUsers = function() {
        console.log("getting list json");
        
        $http.get("http://localhost/api/app/users/?format=json")
        .success(function(data) {
            $rootScope.$broadcast("userlist", data);
        });
    }
}]);