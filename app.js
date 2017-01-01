console.log('IBM Bluemix: Arduino Serial');
//Require the serialport module
var serialPort = require('serialport');

require('dotenv').load();//load .env file

//create a json to set up iot
var iotfConfig = {
    "org": process.env.iotf_org,
    "id": process.env.iotf_id,
    "auth-token": process.env.iotf_authtoken,
    "type": process.env.iotf_type,
    "auth-method": "token"
}

//create a json to set up arduino
var ArduinoConfig = {
    "Port": process.env.iotf_port,
    "BaudRate": process.env.iotf_baudrate
}

//Packet to iot
var datapacket = {    
    'arduinotemp': undefined        //initiate the variable as undefined
}

// Require the express framework
var express = require('express');

// Initialize the app as an express application
var app = express();

//---The ibmiotf package simplifies intractions with the IoT Foundation Service-
var Iotf = require("ibmiotf");

var cfenv = require('cfenv');

// get the application environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

console.log(" ");
console.log('--- DEBUG appENV: ---');
console.log(appEnv);

//Start Server express using cloud foundry environment as parameter
app.listen(appEnv.port, function () {
    console.log(" ");
    console.log("server started on", appEnv.url);
}).on('error', function (err) {
    if (err) {
        console.log("server not started, busy ", err);
    }
});

console.log(" ");
console.log('--- DEBUG iotConfig: ---');
console.log(iotfConfig);


var iotclient = new Iotf.IotfDevice(iotfConfig);
//call connect function to the IBM Watson IOT
iotclient.connect();

//List all ports available
serialPort.list(function (err, ports) {
    if (err) {
        console.log("no device or ports available")
        console.log(err);
    }
    ports.forEach(function (port) {
        console.log('Port:', port.comName, 'ID:', port.locationId);
    });
});

//Create Serial Port Connection
var serialport = new serialPort(ArduinoConfig.Port, {
    baudRate: parseInt(ArduinoConfig.BaudRate)          //'optional' Sync Serial bit rate with Arduino
});

//treat error from serial port
serialport.on('error', function (err) {
    console.log("No port available");
});

//Check connection between arduino and bluemix
iotclient.on("connect", function () {
    if (serialport.isOpen()) {
        console.log("Arduino device is connected to the IoT Foundation service");
    }
});

//listening data from arduino
serialport.on('data', function (data) {
    datatemp = (parseInt(data[0]));
    if (datapacket.arduinotemp === undefined) {
        datapacket.arduinotemp = datatemp;
        send();
    }
    else if (datatemp !== datapacket.arduinotemp) {
        datapacket.arduinotemp = datatemp;
        send();
    }
});

//treat client error from bluemix
iotclient.on('error', function (err) {
    console.log(err);
});

//send data to bluemix
function send() {
    iotclient.publish("status", "json", JSON.stringify(datapacket.arduinotemp));
    console.log(JSON.stringify(datapacket.arduinotemp));
}