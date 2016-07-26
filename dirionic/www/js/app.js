// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
  $stateProvider

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/tabs.html',
  })

  .state('app.index', {
    url: '/index',
    views: {
      'index': {
        templateUrl: 'templates/index.html',
        controller: 'IndexCtrl'
      }
    }
  })

  .state('app.articlelist', {
    url: '/articles',
    views: {
      'articles': {
        templateUrl: 'templates/articlelist.html',
        controller: 'ArticleListCtrl'
      }
    }
  })

  .state('app.article', {
    url: '/articles/:id',
    views: {
      'articles': {
        templateUrl: 'templates/article.html',
        controller: 'ArticleCtrl'
      }
    }
  })

  .state('app.videolist', {
    url: '/videos',
    views: {
      'videos': {
        templateUrl: 'templates/videolist.html',
        controller: 'VideoListCtrl'
      }
    }
  })

  .state('app.video', {
    url: '/videos/:id',
    views: {
      'videos': {
        templateUrl: 'templates/video.html',
        controller: 'VideoCtrl'
      }
    }
  })

  .state('app.resourcelist', {
    url: '/resources',
    views: {
      'resources': {
        templateUrl: 'templates/resourcelist.html',
        controller: 'ResourceListCtrl'
      }
    }
  })

  .state('app.resource', {
    url: '/resources/:id',
    views: {
      'resources': {
        templateUrl: 'templates/resource.html',
        controller: 'ResourceCtrl'
      }
    }
  })

  .state('app.help', {
    url: '/help',
    views: {
      'help': {
        templateUrl: 'templates/help.html'
      }
    }
  });

  $urlRouterProvider.otherwise('/app/index');

  $ionicConfigProvider.tabs.position('bottom');
});