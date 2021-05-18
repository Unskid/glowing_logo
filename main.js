const electron = require('electron');
const {TouchBar} = require('electron');
const {TouchBarButton, TouchBarLabel, TouchBarSpacer} = TouchBar;
const app = electron.app
const BrowserWindow = electron.BrowserWindow
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