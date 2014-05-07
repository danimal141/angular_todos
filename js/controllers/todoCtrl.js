angular
  .module('todomvc')
  .controller('TodoCtrl', function TodoCtrl($scope, $routeParams, $filter, todoStorage) {
    'use strict';

    var todos = $scope.todos = todoStorage.get();
    $scope.newTodo = '';
    $scope.editTodo = null;

    $scope.$watch('todos', function(newVal, oldVal) {
      $scope.remainingCount = $filter('filter')(todos, { completed: false }).length;
      $scope.completedCount = todos.length - $scope.remainingCount;
      $scope.allChecked = !$scope.remainingCount;
      if (newVal !== oldVal) {
        todoStorage.put(todos);
      }
    }, true);

    $scope.$on('$routeChangeSuccess', function() {
      var status = $scope.status = $routeParams.status || '';

      $scope.statusFilter = (status  === 'active') ?
        { completed: false } : (status === 'completed') ?
        { completed: true } : null;
    });

    $scope.addTodo = function() {
      var newTodo = $scope.newTodo.trim();
      if (!newTodo.length) {
        return;
      }
      todos.push({
        title: newTodo,
        completed: false
      });
      $scope.newTodo = '';
    }

    $scope.editTodo = function(todo) {
      $scope.editedTodo = todo;
      $scope.originalTodo = angular.extend({}, todo);
    }

    $scope.doneEditing = function(todo) {
      $scope.editedTodo = null;
      todo.title = todo.title.trim();

      if (!todo.title) {
        $scope.removeTodo(todo);
      }
    }

    $scope.revertEditing = function(todo) {
      todos[todos.indexOf(todo)] = $scope.originalTodo;
      $scope.doneEditing($scope.originalTodo);
    }

    $scope.removeTodo = function(todo) {
      todos.splice(todos.indexOf(todo), 1);
    }

    $scope.clearCompletedTodos = function() {
      $scope.todos = todos = todos.filter(function(val) {
        return !val.completed;
      });
    }

    $scope.markAll = function(completed) {
      todos.forEach(function(todo) {
        todo.completed = !completed;
      });
    }
  });
