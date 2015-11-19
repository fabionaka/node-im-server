angular.element(document).ready(function () {
    angular.module('app.controllers', [])
            .controller("helloCtrl", function ($rootScope, $scope, $filter, appProvider, appFactory, appService, imService) {


                $scope.hasIMuser = false;
                $scope.user = {};
                $scope.users = {};

                $scope.submitUsser = (function (data) {
                    $scope.hasIMuser = !$scope.hasIMuser;
                    imService.setIMUser({
                        "username": data.username,
                        "name": data.name
                    });
                    return imService.IMUser;
                });


                $rootScope.$on('user-updated', function () {
                    $scope.$apply(function () {
                        $scope.users = imService.IMUsers;
                    });
                });
                // conversations
                $scope.conversations = [];
                $scope.startChat = (function (user) {
                    console.log(user);
                    //$scope.conversations.indexOf(user.socket);
                    if ($filter('filter')($scope.conversations, user.socket).length === 0) {
                        $scope.conversations.push(imService.startConversations(user));
                    }
                    //console.log($scope.conversations)
                });
                
                $scope.sendMessage = (function(msg, to, socket){
                    imService.sendPvtMessage({
                        "message": msg,
                        "to": to,
                        "socket": socket,
                        "date": new Date()
                    });
                });
                
                $rootScope.$on('pvt-msg', function (event, data) {
                    
                    var pvtConversarion = $filter('filter')($scope.conversations, data.socket)[0];
                    pvtConversarion.messages.push({message: data.msg, from: data.from});
                    console.log(data);
                    console.log(pvtConversarion.messages);
                    console.log($scope.conversations);
                });
            });
});