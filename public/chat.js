
//make connection
var socket= io.connect("http://localhost:4000");

var text= document.getElementById("text");
var btn= document.getElementById("send");
var message= document.getElementById("message");
var user = document.getElementById("name");


btn.addEventListener("click", function(){
    //send socket data to server
    console.log("send");
    socket.emit("chat", {
        message: message.value,
        name: user.value
    });
   
    message.value="";
});

message.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
     event.preventDefault();
     socket.emit("chat", {
        message: message.value,
        name: user.value
    })
   
    message.value="";
     }
  });

//listen for data coming from server
socket.on("chat", function(data){
    var node= document.createElement("h3");
    var chatResponse= document.createTextNode(data.name+": "+ data.message);
    node.appendChild(chatResponse);
    document.getElementById("chat").appendChild(node);
    var box = document.getElementById('chat');
    box.scrollTop = box.scrollHeight;

})

