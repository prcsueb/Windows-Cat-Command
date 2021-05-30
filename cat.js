#!/usr/bin/env node
let cmdLineArguments = process.argv.slice(2); //slice function returns an array
let fs = require("fs");


(function() {
    let options = []
    let filea = []

    for(let i=0;i<cmdLineArguments.length;i++) {
        if(cmdLineArguments[i].startsWith("-")) {
            options.push(cmdLineArguments[i]);
        } else {
            filea.push(cmdLineArguments[i]);
        }
    }

    let fileaData=``
    for(let i=0;i<filea.length;i++) {
        if(fs.existsSync(filea[i])) {
            fileaData += (fs.readFileSync(filea[i])).toString();
        } else {
            console.log("file don't exists");
            return; //if file do not exists then return
        }
    }

    fileaData = fileaData.split("\n");
    console.log(fileaData);

    //implementing command -s
    if(options.includes("-s")) {
        fileaData = removeLargeSpaces(fileaData);
    }

    //implement -b and -n
    if(options.includes("-n") && options.includes("-b")) {
        //ya to banne command input ma ave
        if(options.indexOf("-n") > options.indexOf("-b")){
            //use b command
            fileaData = addNonEmptyNumbering(fileaData);
        } else {
            //use -n command
            fileaData = addAllNumbering(fileaData);
        }
    }
    //ek jj command input ma avse -b or -n
    else {
        if(options.includes("-n")) {
            fileaData = addAllNumbering(fileaData);
        } else {
            fileaData = addNonEmptyNumbering(fileaData);
        }
    }
    
    fileaData = fileaData.join("\n");
    console.log(fileaData);
    // console.log(options);
    // console.log(filea);
})();

function removeLargeSpaces(st3) {
    y = []
    let counter=0;
    for(let i=0;i<st3.length;i++) {
        if(counter===1 && (st3[i]==='' || st3[i]==='\r')) {
            y.push(st3[i]);
            counter=0;
        }
        if(st3[i]!='' && st3[i]!='\r') {
            counter=1;
            y.push(st3[i]);
        }
    }
    st3=y;
    return st3;
}

function addAllNumbering(fileaData) {
    for(let i=1;i<fileaData.length;i++) {
        fileaData[i-1]  = i + " " + fileaData[i-1];
    }
    return fileaData;
}

function addNonEmptyNumbering(fileaData) {
    let line=1;
    for(let i=0;i<fileaData.length;i++) {
        if(fileaData[i]!=="" && fileaData[i]!=="\r") {
            fileaData[i]  = line + " " + fileaData[i];
            line++;
        }
    }
    return fileaData;
}




//reading material :
// javascript.info
// 2.1, 2.2, 2.4, 2.5, 2.8, 2.13, 2.15, 2.16


//difference between == and ===
//if('1' == 1)(sameness) here in this case '1' is converted into int and matched and it will return true
//if('1' === 1)(equality) here it will not perform type conversion and return false


//functionalities implemented
// -s = remove multiple spaces
// -b = numbering in non empty lines
// -n = numbering in all lines

//if in case -n and -b both are given as command then implement first one which is -n .

//how to make run this using global commmand
//remove node and use wcat
//how to add wcat as global command
//1.in terminal type "npm init" press enter jya sudhi package.json file ban jaye
//2.1st line of cat.js should be shebang path
//3.then bin: "object : filename"
//4.npm link

