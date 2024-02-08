let serial;
let distance = 0;
let flowers = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  serial = new p5.SerialPort();
  serial.on('data', gotData);
  serial.list();
  serial.open('COM3'); // replace 'COM3' with the name of the serial port your Arduino is connected to
}

function draw() {
  background(255);
  if (distance < 20) { // if the distance is less than 20cm, generate a new flower
    flowers.push(new Flower(random(width), random(height), random(30, 80)));
  }
  for (let i = 0; i < flowers.length; i++) {
    flowers[i].display();
  }
}

function gotData() {
  let currentString = serial.readLine();
  if (currentString) {
    distance = Number(currentString);
  }
}

class Flower {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color(random(255), random(255), random(255));
  }

  display() {
    fill(this.color);
    noStroke();
    ellipse(this.x, this.y, this.size, this.size);
    for (let i = 0; i < 5; i++) {
      push();
      translate(this.x, this.y);
      rotate(i * TWO_PI / 5);
      rect(0, 0, this.size * 0.2, this.size * 0.8);
      pop();
    }
  }
}