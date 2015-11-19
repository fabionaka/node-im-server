angular.element(document).ready(function () {
    angular.module('app.factories', [])
            .factory('appFactory', function () {
                this.name = "default name";

                this.$get = function () {
                    this.name = "new name";
                    return "Hello from MyFunc.$get(). this.name = " + this.name;
                };

                return "Hello from MyFunc(). this.name = " + this.name;
            });
});