function setup() { 
  //createCanvas(800, 800);
  createCanvas(windowWidth, windowHeight);
  frameRate(30);  //The number of times draw() executes in each second
} 

var i = 0;

// draw function is called repeatedly by the engine
function draw() { 
  background(0);
  
  // each time draw() is called, i is incremented by one  
  i = i + 1;
  
  // every 10th time, the condition is true
  if (i % 10 === 0){
    noStroke();
  	fill(255);  // fill with 0
    ellipse(width/2,height/2,25,25);
  } else {
    noStroke();
    // all the other times, fill with 255
    fill(0);
    ellipse(width/2,height/2,25,25);
  }
  
}