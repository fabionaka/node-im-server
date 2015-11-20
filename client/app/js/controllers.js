angular.element(document).ready(function () {
    angular.module('app.controllers', [])
            .controller("helloCtrl", function ($rootScope, $scope, $filter, imService) {


                $scope.hasIMuser = false;
                $scope.user = {};
                $scope.users = {};
                $scope.msg = '';

                $scope.submitUsser = (function (data) {
                    $scope.hasIMuser = !$scope.hasIMuser;
                    imService.setIMUser({
                        "username": data.username,
                        "name": data.name
                    });

                    $scope.user = imService.IMUser;

                });


                $rootScope.$on('user-updated', function () {
                    $scope.$apply(function () {
                        $scope.users = imService.IMUsers;
                    });
                });
                // conversations
                $scope.conversations = [];
                $scope.startChat = (function (user) {
                    //$scope.conversations.indexOf(user.socket);
                    if ($filter('filter')($scope.conversations, user.socket).length === 0) {
                        $scope.conversations.push(imService.startConversations(user));
                    }
                });

                $scope.sendMessage = (function (msg, to, socket) {
                    this.conversation = $filter('filter')($scope.conversations, socket)[0];

                    this.conversation.messages.push({
                        "message": msg,
                        "to": to,
                        "submitted": true});

                    imService.sendPvtMessage({
                        "message": msg,
                        "to": to,
                        "socket": socket,
                        "socketFrom": $scope.user.socket,
                        "date": new Date()
                    });
                });

                $rootScope.$on('pvt-msg', function (event, data) {
                    if (typeof $filter('filter')($scope.conversations, data.socket)[0] === 'undefined') {
                        $scope.startChat({alias: data.from.alias, socket: data.from.socket});
                    }
                    var pvtConversarion = $filter('filter')($scope.conversations, data.from.socket)[0];
                    pvtConversarion.messages.push({
                        "message": data.msg,
                        "from": data.from.alias,
                        "submitted": false});
//                    console.log(pvtConversarion.messages);
//                    console.log($scope.conversations);
                });
            });
});