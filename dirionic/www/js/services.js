angular.module('starter.services', [])

.service("ArticleListSvc", ["$http", "$rootScope", function($http, $rootScope) {
    this.loadArticles = function() {
        console.log("getting article list json");
        
        $http.get("http://localhost/api/app/articles/?format=json")
        .success(function(result) {
            $rootScope.$broadcast("articlelist", result);
        });
    }
}])

.service("ArticleSvc", ["$http", "$rootScope", function($http, $rootScope) {
    this.loadArticle = function(id) {
        console.log("getting article json");
        
        $http.get("http://localhost/api/app/articles/" + id + "/?format=json")
        .success(function(result) {
            $rootScope.$broadcast("article", result);
        });
    }
}])

.service("UserListSvc", ["$http", "$rootScope", function($http, $rootScope) {
    this.loadUsers = function() {
        console.log("getting list json");
        
        $http.get("http://localhost/api/app/users/?format=json")
        .success(function(result) {
            $rootScope.$broadcast("userlist", result);
        });
    }
}]);
/*
.service("ItemSvc", ["$http", "$rootScope", function($http, $rootScope) {
    this.loadItem = function(id) {
        console.log("getting item json");
        
        $http.get("http://localhost/api/testapp/items/" + id + "/?format=json")
        .success(function(result) {
            $rootScope.$broadcast("item", result);
        });
    }
}]);*/