let port;
let distance = 0;
let flowerGenerated = false;
let flowerX, flowerY;

function setup() {
  createCanvas(800, 600);
  port = new p5.SerialPort();
  port.open("COM3"); // Replace "COM3" with the port name of your ultrasonic sensor
  port.on("data", processData);
}

function processData() {
  distance = Number(port.readLine());
}

function draw() {
  background(255);

  if (distance < 10) { // Adjust this value based on the range of your ultrasonic sensor
    if (!flowerGenerated) {
      flowerX = random(width);
      flowerY = random(height);
      generateFlower(flowerX, flowerY);
      flowerGenerated = true;
    }
  } else {
    flowerGenerated = false;
  }
}

function generateFlower(x, y) {
  // Add your code here to generate a flower at the specified x and y coordinates
  // For example, you can create a flower using the createGraphics() function and then display it on the canvas using the image() function
  // You can also add animations and other effects to make the flower more dynamic
}
