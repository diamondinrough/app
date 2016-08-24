// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'starter.directives'])

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


.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider, $sceDelegateProvider) {

  $stateProvider

  .state('cover', {
    url: '/cover',
    abstract: true,
    templateUrl: 'templates/cover.html',
  })

  .state('cover.title', {
    url: '/title',
    views: {
      'cover': {
        templateUrl: 'templates/title.html'
      }
    }
  })

  .state('cover.login', {
    url: '/login',
    views: {
      'cover': {
        templateUrl: 'templates/login.html',
        controller: 'LoginCtrl'
      }
    }
  })

  .state('cover.register', {
    url: '/register',
    views: {
      'cover': {
        templateUrl: 'templates/register.html',
        controller: 'RegisterCtrl'
      }
    }
  })

  /*
  .state('title', {
    url: '/title',
    templateUrl: 'templates/title.html'
  })

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl'
  })

  .state('register', {
    url: '/register',
    templateUrl: 'templates/register.html',
    controller: 'RegisterCtrl'
  })

  .state('logout', {
    url: '/logout',
    templateUrl: 'templates/logout.html',
    controller: 'LogoutCtrl'
  })
  */

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/tabs.html',
  })

  .state('app.home', {
    url: '/home',
    abstract: true,
    views: {
      'home': {
        templateUrl: 'templates/home.html',
      }
    }
  })

  .state('app.home.index', {
    url: '/index',
    views: {
      'home.index': {
        templateUrl: 'templates/index.html',
        controller: 'IndexCtrl'
      }
    }
  })

  .state('app.home.index-article', {
    url: '/index/article/:id',
    views: {
      'home.index': {
        templateUrl: 'templates/article.html',
        controller: 'ArticleCtrl'
      }
    }
  })

  .state('app.home.index-video', {
    url: '/index/video/:id',
    views: {
      'home.index': {
        templateUrl: 'templates/video.html',
        controller: 'VideoCtrl'
      }
    }
  })

  .state('app.home.index-search', {
    url: '/index/search',
    views: {
      'home.index': {
        templateUrl: 'templates/index-search.html',
        controller: 'IndexSearchCtrl'
      }
    }
  })

  .state('app.home.article-list', {
    url: '/articles',
    views: {
      'home.articles': {
        templateUrl: 'templates/article-list.html',
        controller: 'ArticleListCtrl'
      }
    }
  })
  
  .state('app.home.article-search', {
    url: '/articles/search',
    views: {
      'home.articles': {
        templateUrl: 'templates/article-search.html',
        controller: 'ArticleSearchCtrl'
      }
    }
  })

  .state('app.home.article-create', {
    url: '/articles/create',
    views: {
      'home.articles': {
        templateUrl: 'templates/article-create.html',
        controller: 'ArticleCreateCtrl'
      }
    }
  })

  .state('app.home.article', {
    url: '/article/:id',
    views: {
      'home.articles': {
        templateUrl: 'templates/article.html',
        controller: 'ArticleCtrl'
      }
    }
  })

  .state('app.home.video-list', {
    url: '/videos',
    views: {
      'home.videos': {
        templateUrl: 'templates/video-list.html',
        controller: 'VideoListCtrl'
      }
    }
  })

  .state('app.home.video-search', {
    url: '/videos/search',
    views: {
      'home.videos': {
        templateUrl: 'templates/video-search.html',
        controller: 'VideoSearchCtrl'
      }
    }
  })

  .state('app.home.video-create', {
    url: '/videos/create',
    views: {
      'home.videos': {
        templateUrl: 'templates/video-create.html',
        controller: 'VideoCreateCtrl'
      }
    }
  })

 .state('app.home.video', {
    url: '/video/:id',
    views: {
      'home.videos': {
        templateUrl: 'templates/video.html',
        controller: 'VideoCtrl'
      }
    }
  })

  .state('app.team-dash', {
    url: '/team-dash',
    views: {
      'teams': {
        templateUrl: 'templates/team-dash.html',
        controller: 'TeamDashCtrl'
      }
    }
  })

  .state('app.team-create', {
    url: '/team-create',
    views: {
      'teams': {
        templateUrl: 'templates/team-create.html',
        controller: 'TeamCreateCtrl'
      }
    }
  })

  .state('app.team-list', {
    url: '/team-list',
    views: {
      'teams': {
        templateUrl: 'templates/team-list.html',
        controller: 'TeamListCtrl'
      }
    }
  })

  .state('app.team', {
    url: '/team/:id',
    views: {
      'teams': {
        templateUrl: 'templates/team.html',
        controller: 'TeamCtrl'
      }
    }
  })

.state('app.profile', {
    url: '/profile',
    views: {
      'profile': {
        templateUrl: 'templates/profile.html',
        controller: 'ProfileCtrl'
      }
    }
  })

  .state('app.profile-info', {
    url: '/profile/info',
    views: {
      'profile': {
        templateUrl: 'templates/profile-info.html',
        controller: 'ProfileInfoCtrl'
      }
    }
  })

  .state('app.resourcelist', {
    url: '/resources',
    views: {
      'resources': {
        templateUrl: 'templates/resourcelist.html'
      }
    }
  })

  .state('app.resource', {
    url: '/resources/:id',
    views: {
      'resources': {
        templateUrl: 'templates/resource.html'
      }
    }
  })

  .state('app.help', {
    url: '/help',
    views: {
      'help': {
        templateUrl: 'templates/help.html',
        controller: 'HelpCtrl'
      }
    }
  })

  .state('app.help-question-list', {
    url: '/help/questions',
    views: {
      'help': {
        templateUrl: 'templates/question-list.html',
        controller: 'QuestionListCtrl'
      }
    }
  })

  .state('app.help-question', {
    url: '/help/questions/:id',
    views: {
      'help': {
        templateUrl: 'templates/question.html',
        controller: 'QuestionCtrl'
      }
    }
  })

  .state('app.help-head-of-info', {
    url: '/help/headofinfo',
    views: {
      'help': {
        templateUrl: 'templates/headofinfo.html',
        controller: 'HOICtrl'
      }
    }
  })

  .state('app.help-feedback', {
    url: '/help/feedback',
    views: {
      'help': {
        templateUrl: 'templates/feedback.html',
        controller: 'FeedbackCtrl'
      }
    }
  })

  $urlRouterProvider.otherwise('/cover/title');

  $ionicConfigProvider.tabs.position('bottom');

  $sceDelegateProvider.resourceUrlWhitelist(['self', 'https://youtube.com/**']);
});
