angular.module('starter', ['ionic'])
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state("app", {
        url: "/app",
        abstract: true,
        templateUrl: "templates/app.html",
        controller: "AppController"
      })
      .state("app.students", {
        url: "/students",
        views: {
          "students": {
            templateUrl: "templates/students.html",
            controller: "StudentsController"
          }
        }
      })
      .state("app.students.details", {
        url: "/details/:id/:age",
        views: {
          "details": {
            templateUrl: "templates/details.html",
            controller: "StudentDetailsController"
          }
        }
      })
      .state("app.classes", {
        url: "/classes",
        views: {
          "classes": {
            templateUrl: "templates/classes.html",
            controller: "ClassesController"
          }
        }
      })
      .state("app.classes.details", {
        url: "/details/:id"
      });

    $urlRouterProvider.otherwise("/app/students");
  })
  .controller("AppController", function ($scope, $rootScope, $ionicLoading, $timeout) {
    $rootScope.on("$stateChangeSuccess", function (event, toState, toParams, fromState, fromParams) {
      if (toState.name === "app.classes.details") {
        return;
      }

      $ionicLoading.show({
        template: "<b>Previous state:</b> " + fromState.name
        + "<bt /><b>Current state:</b> " + toState.name,
        noBackdrop: true
      });

      $timeout(function () {
        $ionicLoading.hide();
      }, 1000);
    });
  })
  .controller("StudentsController", function ($scope) {
    $scope.title = '<div class="round-icon"><i class="icon ion-person-stalker"></i></div>';
  })
  .controller("StudentDetailsController", function ($scope, $stateParams) {
    $scope.id = $stateParams.id;
    $scope.age = $stateParams.age;
  })
  .controller("ClassesController", function ($scope, $state) {
    $scope.title = '<div class="round-icon"><i class="icon ion-university"></i></div>';

    $scope.gotoStudents = function () {
      $state.go("app.students");
    }
  });
