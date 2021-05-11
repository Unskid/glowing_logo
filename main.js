const electron = require('electron');
const etrJsFile = require("./externalScripts.js");
const e = require('express');
const {TouchBar} = require('electron');
const {TouchBarButton, TouchBarLabel, TouchBarSpacer} = TouchBar;
const app = electron.app
var lcd;
const BrowserWindow = electron.BrowserWindow
const ipcRenderer = electron.ipcMain
var five = require('johnny-five');
var board = new five.Board({port:"COM3"});
board.blink()
let is_board_ready = false;

const spin = new TouchBarButton({
  label:'Random Color 🎨',
  backgroundColor: '#7851A9',
});


function componentToHex(c){
  var hex = c.toString(16);
  return hex.length ==1 ? "0" + hex :hex;
}
function rgbToHex(r,g,b){
  return "#"+componentToHex(r) +componentToHex(g) + componentToHex(b)
}
const touchBar = new TouchBar([spin]);
function createWindow() {
  const win = new BrowserWindow({
    width: 1100,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    }
  })

  win.loadFile('index.html');
  win.webContents.openDevTools()
  win.setTouchBar(touchBar);
}
app.whenReady().then(createWindow)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
board.on('ready',function(){
    is_board_ready = true;
})
ipcRenderer.on("is-connected",function(event){
    if (is_board_ready){
        event.sender.send("is-connected",'Device connected!')
        lcd = new five.LCD({ pins: [7,8]});
    }
    else{
        event.sender.send('is-connected','Make sure your device is connected')
    }
})
ipcRenderer.on("SMOOTH",()=>{
  let index = 0;
  const rainbow = ["FF0000", "FF7F00", "FFFF00", "00FF00", "0000FF", "4B0082", "8F00FF"];

  board.loop(1000, () => {
    lcd.bgColor(rainbow[index++]);
    if (index === rainbow.length) {
      index = 0;
    };
  });
})
ipcRenderer.on("pages-list",(event)=>{

})
ipcRenderer.on("FLASH",(event)=>{
  lcd.bgColor("#000000");
  lcd.bgColor(etrJsFile.getColor());
})
ipcRenderer.on("FADE",(event)=>{

  board.wait(5000,()=>{
    led.fadeOut();
  })
})
ipcRenderer.on("change-color",(e,color)=>{
  lcd.bgColor(color);
})
ipcRenderer.on("RANDOM",(event)=>{
  let rgb = [];
  for (var i = 0;i<3;i++){
    rgb.push(Math.floor(Math.random()*255)+1)
  }
  console.log(rgb);
  if (is_board_ready){
    lcd.bgColor(rgbToHex(rgb[0],rgb[1],rgb[2]));
}
else{
  event.sender.send("random","Device is not connected")
}
  
})
