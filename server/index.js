var app = require('express')(),
        http = require('http').Server(app),
        io = require('socket.io')(http),
        path = require('path'),
        clients = {};


app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../', 'client', 'index.html'));
});

//io.emit('some event', {for : 'everyone'});


//connection
io.on('connection', function (socket) {
    socket.broadcast.emit('user_connect');
    socket.broadcast.emit('update-users', clients);

    socket.on('add-user', function (data) {
        clients[data.username] = {
            "socket": socket.id,
            "name": data.name,
            "alias": data.username
        };
        socket.broadcast.emit('update-users', clients);
    });

    socket.on('private-message', function (data) {
        console.log("Sending: " + data.content + " to " + data.username);
        if (clients[data.username]) {
            io.sockets.connected[clients[data.username].socket].emit("add-message", data);
        } else {
            console.log("User does not exist: " + data.username);
        }
    });

    //Removing the socket on disconnect
    socket.on('disconnect', function () {
        for (var name in clients) {
            if (clients[name].socket === socket.id) {
                delete clients[name];
                break;
            }
        }
        socket.broadcast.emit('update-users', clients);
    });

//message
    socket.on('chat message', function (msg) {
        io.emit('chat message', msg);
    });


//disconnect
    socket.on('disconnect', function () {
        socket.broadcast.emit('user_disconnect');
    });
});

http.listen(3000, function () {
    console.log('listening on *:3000');

});