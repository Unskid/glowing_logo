
const fs = require('fs');
const fileName = './data.json';
const file = require(fileName);
function writeToJson(){
    fs.writeFile(fileName, JSON.stringify(file), function writeJSON(err) {
        if (err) return console.log(err);
        console.log(JSON.stringify(file));
        console.log('writing to ' + fileName);
        })
}
function getColor(){
    console.log(file.currentLogoColor);
    return file.currentLogoColor;
}
function getAllDataJson(){
    console.log(file)
    return file;
}
