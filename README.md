# IBMBlumix-Arduino-Serial
A little project to connect arduino with Bluemix, using node js and serial port.

# Installation 
1. Install `node js`.
2. Clone/download this folder to your computer.
3. Run `npm install` within this folder
4. Setup Ibm Bluemix.
5. Setup Node Red on Bluemix.
6. SetUp environment.
7. Setup Arduino.
8. Run `node app.js`
9. Go to node red running on bluemix and check debug tab.

# Setup Ibm Bluemix
1. Create new app internet of things platform starter.
2. On DashBoard app, open internet of things platform in services and click launch dashboard.
3. Open devices tab , click add new device.
4. Create new device Type.
5. Select device type that was just created and create new device.
6. Open node red on app.

>This [How to](https://developer.ibm.com/recipes/tutorials/how-to-register-devices-in-ibm-iot-foundation/) link must help you to Setup Bluemix.

# Node Red
1. Add new flow tab.
2. Drag and drop. `IBM iot module` and `Debug module`. Bond them.
3. Open `IBM iot module` and chosse Bluemix Service in Authentication, Device ID put `device Id` created.
4. Open Debug Tab on side of screen.

# Setup Environment
1. Open `.ENV` file from dowloaded folder.
2. Replace the values with parameters that you registered on device and Arduino.
3. Save file.

# Setup Arduino
1. Install `Arduino IDE`.
2. Verify if serial port is working and what is. Windows should be `'COM3'`, Mac `'/dev/tty.usbserial-A6007wOD`.
3. Download IBMBlumix Arduino file and upload it on arduino.

>This Sketch will read avr temperature from internal sensor and send to serial port.
