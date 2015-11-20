angular.element(document).ready(function () {
    angular.module('app.services', [])
            .service('appService', function () {
                this.name = "default name";

                this.$get = function () {
                    this.name = "new name";
                    return "Hello from MyFunc.$get(). this.name = " + this.name;
                };

                return "Hello from MyFunc(). this.name = " + this.name;
            })

            .service('imService', function ($rootScope, $filter) {
                var service = {};
                service.socket = socket;
                service.IMUser = {};
                service.IMUsers = false;
                service.timeInterval = 2500;

                // Init client in Server
                service.setIMUser = function (fnUserInfo) {
                    angular.extend(service.IMUser, {
                        "username": fnUserInfo.username,
                        "alias": fnUserInfo.username,
                        "name": fnUserInfo.name,
                        "socket": socket.id
                    });
                    return service.addUser({"username": fnUserInfo.username, "name": fnUserInfo.name});
                };

                // Save the client data on Socket.io server
                service.addUser = (function (fnParams) {
                    return socket.emit("add-user", {
                        "username": fnParams.username,
                        name: fnParams.name
                    });
                });

                // Update event
                service.userUpdate = socket.on('update-users', function (data) {
                    service.IMUsers = data;
                    return $rootScope.$emit('user-updated');
                });

                // request em intervalos
                setInterval(function () {
                    if (typeof service.IMUser.username !== 'undefined') {

                        // Request to the server an update status
                        socket.emit("request-user-list", {
                            "username": service.IMUser.username
                        });


                    }
                }, service.timeInterval);



                /*
                 *  Chats, conversations and messages
                 */
                service.startConversations = function (data) {
                    return {
                        to: data.alias,
                        socket: data.socket,
                        date: new Date(),
                        messages: []
                    }
                };

                // Emit the message to the server
                service.sendPvtMessage = (function (data) {
                    socket.emit('send-pvt-message', {
                        "msg": data.message,
                        "to": {
                            "alias": data.to,
                            "socket": data.socket
                        },
                        "from": {
                            "alias": service.IMUser.alias,
                            "socket": data.socketFrom
                        },
                        "date": data.date
                    });
                });

                socket.on("pvt-message", function (data) {
                    $rootScope.$emit('pvt-msg', data);
                });
                
                service.addToConversation = (function(){
                    
                });
                
                return service;
            });
});