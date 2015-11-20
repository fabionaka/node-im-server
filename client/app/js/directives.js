angular.element(document).ready(function () {
    angular.module('app.directives', [])
            .directive('appMenu', function () {
                return {
                    restrict: 'E',
                    replace: true,
                    transclude: true,
                    link: function () {
                    },
                    template: function () {
                        return '<nav ng-transclude></nav>';
                    }
                };
            })
            .directive('appMenuGroup', function () {
                return {
                    restrict: 'E',
                    replace: true,
                    transclude: true,
                    link: function () {
                    },
                    template: function () {
                        return '<ul ng-transclude></ul>';
                    }
                };
            })
            .directive('appMenuItem', function () {
                return {
                    restrict: 'E',
                    replace: true,
                    transclude: true,
                    link: function (Scope, Elem, Attrs) {
                        //console.log(Scope, Elem, Attrs);
                    },
                    template: function (Elem, Attrs) {
                        //console.log(Elem, Attrs);
                        return '<li ui-sref-active="active"><a ui-sref="' + Attrs.stateName + '">' + Attrs.label + '</a><ng-transclude /></li>';
                    }
                };
            })
            .directive('focusMe', function ($timeout) {
                return {
                    restrict: 'A',
                    link: function (scope, element, attr) {
                        attr.$observe('focusMe', function (value) {
                            if (value === "true") {
                                $timeout(function () {
                                    element[0].focus();
                                });
                            }
                        });
                    }
                };
            })
            .directive('form', function () {
                return {
                    restrict: 'E',
                    link: function (scope, elem) {
                        elem.on('submit', function () {
                            scope.$broadcast('form:submit');
                        });
                    }
                };
            })
            .directive('formSubmit', function ($timeout) {
                return {
                    require: '^form',
                    link: function (scope, elem, attr, form, ngModel) {
                        scope.$on('form:submit', function () {
                            elem[0].value = '';
                            form.$setPristine();
                        });
                    }
                };
            })
});  