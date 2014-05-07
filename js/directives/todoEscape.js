angular
  .module('todomvc')
  .directive('todoEscape', function() {
    'use strict';

    var ESCAPE_KEY = 27;

    return function(scope, elem, attrs) {
      elem.bind('keydown', function(e) {
        if (e.keyCode === ESCAPE_KEY) {
          scope.$apply(attrs.todoEscape);
        }
      });
    }
  });
