try{
}catch(e){
  console.log(e);
}
const etrJsFile = require("./externalScripts.js");
var five = require('johnny-five');
try{
var board = new five.Board({port:"COM4", repl: false});
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
  var lcd = new five.LCD({ 
    controller: "PCF8574"
  })
  lcd.useChar("heart")
  //board.wait(5000)

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
  lcd.bgColor("#000000");
  lcd.bgColor(etrJsFile.getColor());
}
function FADE(){
  board.wait(5000,()=>{
    led.fadeOut();
  })
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
})