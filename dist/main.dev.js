"use strict";

var canvas = document.getElementById("game");
var ctx = canvas.getContext("2d");
var ground = new Image();
ground.src = "img/fon.png";

function drawGame() {
  ctx.drawImage(ground, 0, 0);
}

var game = setInterval(drawGame, 100);
//# sourceMappingURL=main.dev.js.map
