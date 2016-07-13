angular.module('starter.controllers', [])

.controller("ArticleListCtrl", ["$scope", "$ionicLoading", "ArticleListSvc", function($scope, $ionicLoading, ArticleListSvc) {
    $ionicLoading.show({template: "Loading articles..."});

    $scope.articles = [];
    $scope.$on("articlelist", function(_, data) {

        data.forEach(function(article) {
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
    $scope.$on("article", function(_, data) {
        console.log("loading article");
        $scope.article = {
            id: data.id,
            title: data.title,
            content: data.content,
            image: data.image
        };
    });
    
    ArticleSvc.loadArticle($stateParams.id);
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
/*
.controller("ItemCtrl", ["$scope", "$stateParams", "ItemSvc", function($scope, $stateParams, ItemSvc) {
    $scope.item = null;
    $scope.$on("item", function(_, data) {
        console.log("loading item");
        $scope.item = {
            item_name: data.item_name,
            item_desc: data.item_desc
        };
        console.log(data.item_name);
    });
    
    ItemSvc.loadItem($stateParams.id);
}]);*/