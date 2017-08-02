
n = 1;


App = angular.module("questionsApp",[]);

App.controller("questionsController", function($scope){
  var QA = question_array;
  $scope.scope_test = QA
});  //END CONTROLLER


function UpdatePage(element){
    QA["element"]

    $("#mainView").html();

}
