const canvas =document.getElementById("game");
const ctx = canvas.getContext("2d")

// const ground = new Image();
// ground.src ="img/fon.png"

function drawGame(){
    ctx.drawImage(ground, 0, 0);
}
//  let game = setInterval(drawGame, 100)