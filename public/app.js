
var blogApp = angular.module('dBlogApp', ['ngRoute', 'ngMessages', 'angularUtils.directives.dirPagination', 'ngCookies',
 'ngAnimate', 'ui.bootstrap', 'textAngular', 'ngSanitize' ]);

    blogApp.config(['$routeProvider',
      function($routeProvider) {
        $routeProvider
          .when('/login', {
            templateUrl: 'partials/login.html',
            public: true,
            login: true
          })
          .when('/signup', {
            templateUrl: 'partials/signup.html',
            public: true
          })
          .when('/', {
            templateUrl: 'partials/blogs.html',
            controller: 'ArticlesController',
            public: true
          })
          .when('/article/:id', {
            templateUrl: 'partials/article.html',
            controller: 'ArticleDetailController',
            public: true
          })
          .when('/new-article', {
            templateUrl: 'partials/new-article.html',
            controller: 'NewArtController',
            public: true
          })
          .otherwise({
            redirectTo: '/'
          })
      }])
/*
blogApp.run(['user','$location', function(user, $location) {
    user.init({ appId: '572079a84afb4' });
     // redirect to login page if not logged in
            if ($location.path() !== '/login' && user.status().authenticated) {
              // allow just login and signup views to be available
              console.log("---------" + user.status().authenticated);
                $location.path('/login') && $location.path('/signup') ;
            }
}]);
*/
   
blogApp.run([   '$location', '$http',
  function (   $location, $http) {
       // user.init({ appId: '572079a84afb4' });
        // keep user logged in after page refresh
       // $rootScope.globals = $cookieStore.get('globals') || {};
     //   if ($rootScope.globals.currentUser) {
    //        $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
    //    }
  
       
       
    }]);

  
blogApp.filter('toTrusted', function ($sce) {
  return function (value) {
        return $sce.trustAsHtml(value);
  };
});

// Cut filter
blogApp.filter('cut', function(ArticleService) {
     return function (value, wordwise, max, tail) {
            if (!value) return '';

            max = parseInt(max, 10);
            if (!max) return value;
            if (value.length <= max) return value;

            value = value.substr(0, max);
            if (wordwise) {
                var lastspace = value.lastIndexOf(' ');
                if (lastspace != -1) {
                    value = value.substr(0, lastspace);
                }
            }
            return value + (tail || ' …');
        };
});

// compare password directive
var compareTo = function() {
    return {
        require: "ngModel",
        scope: {
            otherModelValue: "=compareTo"
        },
        link: function(scope, element, attributes, ngModel) {
             
            ngModel.$validators.compareTo = function(modelValue) {
                console.log("directive compareTo");
                return modelValue == scope.otherModelValue;
            };
 
            scope.$watch("otherModelValue", function() {
                ngModel.$validate();
            });
        }
    };
};
 var RegistrationController = 
 blogApp.directive("compareTo",['ArticleService', compareTo] );
 

// Articles Controller
    blogApp.controller('ArticlesController', ['$scope','$rootScope', '$routeParams', '$location', 'ArticleService', 
          
           function($scope, $rootScope, $routeParams, $location, ArticleService) {
                    
                   ArticleService.getArticles()       
                        .success(function(posts) {
                             $scope.articles = posts;
                  });
    }])

// OtherController pagination    
  blogApp.controller('OtherController', ['$scope', 'ArticleService',
     function($scope) {
        $scope.pageChangeHandler = function(num) {
            console.log('going to page ' + num);
          };
     }])

 
 
//  ArticleDetailController
  blogApp.controller('ArticleDetailController', ['$scope', '$location', '$routeParams', 'ArticleService', 
          
           function($scope, $location, $routeParams, ArticleService) {
             ArticleService.getArticle($routeParams.id)
              .success(function(post) {
                $scope.article = post;
             });
          
          $scope.addComment = function(){
            if($scope.comment.body === '') { return; }
            var comment = {
                body: $scope.comment.body,
                author: currentUser.first_name,
                createdAt: new Date(),
                picture: currentUser.picture
            }
            ArticleService.addArticleComment($scope.article._id, comment )
                .success(function(added_comment) {
                    $scope.article.comments.push(added_comment)
                    $scope.comment = {} ;   
                })
          }
           $scope.incrementUpvotes = function(comment) {
               ArticleService.upvotePostComment($scope.article._id, comment._id , 
                        comment.upvotes + 1 )
                  .success(function(updated_comment) {
                      comment.upvotes = updated_comment.upvotes
                  })
            }
            $scope.derementDownvotes = function(comment) {
               ArticleService.downvotePostComment($scope.article._id, comment._id , 
                        comment.downvotes - 1 )
                  .success(function(updated_comment) {
                      comment.downvotes = updated_comment.downvotes
                  })
            }
           
        
  }])

// NewArtController
blogApp.controller('NewArtController', ['$scope', '$rootScope', '$location','ArticleService', 
     function($scope, $rootScope, $location, ArticleService) {

              ArticleService.getArticles()
                  .success(function(articles) {
                         $scope.articles = articles;
                    });

              $scope.addArticle = function(){
             //  var currentUser = user.current;
                var article = { 
                              title: $scope.newPost.title,
                              data: $scope.htmlVariable,  
                              createdAt: new Date(),
                              by: null
                              }

               ArticleService.addArticle(article)
                    .success(function(added_article) {
                       $scope.articles.push(added_article);
                       $scope.newPost = { }
                    });
              $location.path('/');
              }     

    }]) 

// ArticleService
blogApp.factory('ArticleService',  ['$http', function($http){
    

         var api = {
          // Atricles part
             getArticles : function() {
                 return $http.get('/api/posts')
                 //return posts
             },
             getArticle : function(id) {
                return $http.get('/api/posts/' + id )
             },
             addArticle : function(article){
                return $http.post('/api/posts',article)
             },
             addArticleComment : function(id, comment){
                 return $http.post('/api/posts/' + id + '/comments' , comment)
             },
             upvotePostComment : function(article_id, comment_id, new_upvote_count ) {
                  return $http.post( '/api/posts/' +
                              article_id + '/comments/' +  comment_id + '/upvotes', 
                             {upvotes: new_upvote_count })
             },
             downvotePostComment : function(article_id, comment_id, new_upvote_count ) {
                  return $http.post( '/api/posts/' +
                              article_id + '/comments/' +  comment_id + '/downvotes', 
                             {downvotes: new_upvote_count })
             }
          }
          return api
    }])
 
  
