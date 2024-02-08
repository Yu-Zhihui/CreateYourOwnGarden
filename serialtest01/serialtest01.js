var serial;          // variable to hold an instance of the serialport library
var portName = '/dev/cu.usbserial-120';  // fill in the serial port name here
var inData;   // variable to hold the input data from Arduino
var outData = 0;  // variable to hold the output data to Arduino

function setup() {
    //set up canvas
    createCanvas(600, 400);
    noStroke();
    //

    //set up communication port
    serial = new SerialPort();       // make a new instance of the serialport library
    serial.on('list', printList);  // set a callback function for the serialport list event
    serial.on('connected', serverConnected); // callback for connecting to the server
    serial.on('open', portOpen);        // callback for the port opening
    serial.on('data', serialEvent);     // callback for when new data arrives
    serial.on('error', serialError);    // callback for errors
    serial.on('close', portClose);      // callback for the port closing

    serial.list();                      // list the serial ports
    serial.open(portName);              // open a serial port
}

function draw() {
    //test ultrasonic
    textSize(32);
    fill(0, 102, 153);
    text(inData, 10,30);

    // set up serial output, to write the control value to the port
    
    var blinkRate; //Suppose the need to output stroboscopic frequency to Arduino
    // outData = blinkRate;
    // serial.write(outData);
}


// Following functions print the serial communication status to the console for debugging purposes

function printList(portList) {
    // portList is an array of serial port names
    for (var i = 0; i < portList.length; i++) {
    // Display the list the console:
    print(i + " " + portList[i]);
    }
}

function serverConnected() {
    print('connected to server.');
}

function portOpen() {
    print('the serial port opened.')
}

function serialEvent() {
    inData = Number(serial.read());
}

function serialError(err) {
    print('Something went wrong with the serial port. ' + err);
}

function portClose() {
    print('The serial port closed.');
}
