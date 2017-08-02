App = angular.module("questionsApp",[]);

App.controller("questionsController", ["$scope",function($scope){
  var QA = question_array;
  $scope.scope_test = QA
   

}]);  //END CONTROLLER


