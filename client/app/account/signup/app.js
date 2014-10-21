var module = angular.module("app", ['ngMockE2E']);

module.factory("QuestionsResource", ['$http', '$q', function ($http, $q) {
    var get = function () {
        var defered = $q.defer();
        $http.get('json/questions.json').success(function (data) {
            defered.resolve(data);
        });
        return defered.promise;
    };
    return {
        get: get
    };

}]);
module.controller("QuizCtrl", ['$scope','$interval','QuestionsResource', function($scope,$interval, QuestionsResource) {
    var questions, 
        current = 0, 
        quiz = {},
        timer = {
            available: 30000,
            elapsed: 0
        };
    $scope.quiz = quiz;
    $scope.timer = timer;
    QuestionsResource.get().then(function(data) {
        questions = data;
        current = -1;
        quiz.points = 0;
        next();
    });
    next = function() {        
        current++;
        quiz.answer = {};
        quiz.question = questions[current];
        timer.elapsed = 0;
        timer.promise = $interval(function(){
            timer.elapsed+=1000;
        },1000,30);
        timer.promise.then($scope.answer);
    };
    $scope.answer = function () {
        if(quiz.answer && quiz.answer.correct) {
            quiz.points++;
        }
        if(timer.promise) {
            $interval.cancel(timer.promise);
        }
        if(current < questions.length - 1) {
            next();
        } else {
            end();
        }
    };
    end = function() {
        alert("You reached "+quiz.points+" Points");
    }
    

}]);
module.directive("progressbar", function () {
    return {
        restrict: "E",
        template: '<div class="progressbar">'+
                    '<div></div>'+
                 '</div>',
        replace: true,
        scope: {
            total: "=",
            current: "="
        },
        link: function (scope, element) {
            var bar = angular.element(element.children());
            scope.$watch("current", function (value) {
                bar.css("width", value / scope.total * 100 + "%");
            });
        }
    };
});

module.run(function ($httpBackend) {
    $httpBackend.whenGET("json/questions.json").respond(200, [{
        id: 1,
        question: "1+1?",
        answers: [{
            answer: "1",
            correct: false
        }, {
            answer: "2",
            correct: true
        }, {
            answer: "3",
            correct: false
        }]
    }, {
        id: 2,
        question: "1+2?",
        answers: [{
            answer: "1",
            correct: false
        }, {
            answer: "2",
            correct: false
        }, {
            answer: "3",
            correct: true
        }]
    }]);
});