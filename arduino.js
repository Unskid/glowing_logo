try{
}catch(e){
  console.log(e);
}
const etrJsFile = require("./externalScripts.js");
const temporal = require("temporal");
var b = null;
var five = require('johnny-five');
try{
var board = new five.Board({port:"COM3", repl: false});
}catch(e){
  console.log(e);
}
let is_board_ready = false;

board.on('ready',function(){
  is_board_ready = true;
  try{
  miniText.textContent = "Device connected!";
  }catch(e){console.log(e);}
  console.log("ready")
  b = new five.Led.RGB({
    pins:{
      red:11,
      green:5,
      blue:3
    },
    isAnode: true
  });
  b.color(getColor())
});

function SMOOTH(){
  let index = 0;
  const rainbow = ["FF0000", "FF7F00", "FFFF00", "00FF00", "0000FF", "4B0082", "8F00FF"];

  board.loop(1000, () => {
    lcd.bgColor(rainbow[index++]);
    if (index === rainbow.length) {
      index = 0;
    };
  });

}
function FLASH(){
  setInterval(() =>{
    b.toggle();
  },3000)
}
function FADE(){
  board.wait(3000,()=>{
    b.toggle();
  })
}
function RAINBOW(){
  var rainbow = ["FF0000", "FF7F00", "00FF00", "FFFF00", "0000FF", "4B0082", "8F00FF"];
  var index = 0;

  setInterval(function() {
    if (index + 1 === rainbow.length) {
      index = 0;
    }
    b.color(rainbow[index++]);
  }, 500);
}
/*ipcRenderer.on("change-color",(e,color)=>{
  lcd.bgColor(color);
})*/
function RANDOM(){
  let rgb = [];
  for (var i = 0;i<3;i++){
    rgb.push(Math.floor(Math.random()*255)+1)
  }
  console.log(rgb);
  if (is_board_ready){
    lcd.bgColor(rgbToHex(rgb[0],rgb[1],rgb[2]));
}
else{
}
  
}
