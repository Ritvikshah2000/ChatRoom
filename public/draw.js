
//make connection
//var socket= io.connect("http://localhost:4000");

const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

let lineWidth = 10;
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
    context.lineCap = lineCap;

    context.lineTo(e.clientX, e.clientY);
    context.stroke();
    context.beginPath();
    context.moveTo(e.clientX, e.clientY)
}

canvas.addEventListener("mousedown", startPosition)
canvas.addEventListener("mouseup", endPosition)
canvas.addEventListener("mousemove", draw)

