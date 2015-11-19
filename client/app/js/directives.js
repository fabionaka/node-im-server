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
});  