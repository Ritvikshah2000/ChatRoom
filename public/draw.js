
//make connection
//var socket= io.connect("http://localhost:4000");

const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

let lineWidth = 10;
let lineColour = "red";
let lineCap = "round";

canvas.height = window.innerHeight / 2;
canvas.width = window.innerWidth / 4;

let drawing = false;
function startPosition(e) {
    drawing = true;
    draw(e)
}
function endPosition() {
    drawing = false;
    context.beginPath();
}
function draw(e) {
    if (!drawing) return;
    
    context.lineWidth = lineWidth;
    context.strokeStyle = lineColour;
    context.lineCap = lineCap;

    var rect = this.getBoundingClientRect();
    var left = e.clientX - rect.left - this.clientLeft + this.scrollLeft;
    var top = e.clientY - rect.top - this.clientTop + this.scrollTop;

    socket.emit("draw", {
        posX: left,
        posY: top,
        lineW: lineWidth,
        lineC: lineColour,
    });

    context.lineTo(left, top);
    context.stroke();
    context.beginPath();
    context.moveTo(left, top)
}

canvas.addEventListener("mousedown", startPosition)
canvas.addEventListener("mouseup", endPosition)
canvas.addEventListener("mousemove", draw)


//listen for data coming from server
socket.on("draw", function(data){
    context.lineWidth = data.lineW;
    context.strokeStyle = data.lineC;
    context.lineCap = lineCap;

    context.lineTo(data.posX, data.posY);
    context.stroke();
    context.beginPath();
    context.moveTo(data.posX, data.posY)

})
