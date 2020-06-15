var express = require('express');
var socket = require("socket.io");


var app = express();
//set up port
var port=process.env.PORT || 4000;
//allow server to listen to incoming messages on port
var server = app.listen(port,function(){
    console.log("listening for request");
});

app.use(express.static("public"));

//set up socekt connection to server
var io= socket(server);

io.on("connection", function(socket){
    //says twice figure out
    console.log("connected");

    //listen for data from a socket
    //param object name chat and function to manipulate data
    socket.on("chat", function(data){
        console.log(data);
        //send data to all sockets
        io.emit("chat", data);
    });
})