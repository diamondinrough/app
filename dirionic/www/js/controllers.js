angular.module('starter.controllers', [])

.controller("ArticleListCtrl", ["$scope", "$ionicLoading", "ArticleListSvc", function($scope, $ionicLoading, ArticleListSvc) {
    $ionicLoading.show({template: "Loading articles..."});
    
    $scope.articles = [];
    $scope.$on("articlelist", function(_, result) {
        //console.log("loading users");
        
        result.forEach(function(article) {
            $scope.articles.push({
                id: article.id,
                title: article.title,
                content: article.content
            });
        });
        
        $ionicLoading.hide();
    });
    
    ArticleListSvc.loadArticles();
}])

.controller("ArticleCtrl", ["$scope", "$stateParams", "ArticleSvc", function($scope, $stateParams, ArticleSvc) {
    $scope.article = null;
    $scope.$on("article", function(_, result) {
        console.log("loading article");
        $scope.article = {
            id: result.id,
            title: result.title,
            content: result.content,
            image: result.image
        };
    });
    
    ArticleSvc.loadArticle($stateParams.id);
}])

.controller("UserListCtrl", ["$scope", "$ionicLoading", "UserListSvc", function($scope, $ionicLoading, UserListSvc) {
    $ionicLoading.show({template: "Loading users..."});
    
    $scope.users = [];
    $scope.$on("userlist", function(_, result) {
        //console.log("loading users");
        
        result.forEach(function(user) {
            $scope.users.push({
                id: user.id,
                username: user.username
            });
        });
        
        $ionicLoading.hide();
    });
    
    UserListSvc.loadUsers();
}]);
/*
.controller("ItemCtrl", ["$scope", "$stateParams", "ItemSvc", function($scope, $stateParams, ItemSvc) {
    $scope.item = null;
    $scope.$on("item", function(_, result) {
        console.log("loading item");
        $scope.item = {
            item_name: result.item_name,
            item_desc: result.item_desc
        };
        console.log(result.item_name);
    });
    
    ItemSvc.loadItem($stateParams.id);
}]);*/