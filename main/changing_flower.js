
//Single flower
/*
var e, s;
function setup() {
  createCanvas(500,500); 
} 

function draw() {
  fill(0);
  rect(0,0,width,height);
  var t = millis()/3000;
  var b = 50;

  var w = (width |= b);
  var h = b-sin(t)*b*5;
  var d = 250-b;

  stroke(129,150,h,12);
  strokeWeight(20);

  for(e=6.283;e>0;line(width/2,height/2,d*cos(e-=.01)+h*cos(d/b*e)+250,d*sin(e)-h*sin(d/b*e)+250)){
  }

}
*/

var e, s;
function setup() {
  //createCanvas(1200,1200); 
  createCanvas(windowWidth, windowHeight);
} 

function draw() {
  background(0);
  var t = millis()/2000;
  var b = 50;

  var w = (width |= b);
  var h = b-sin(t)*b*5;
  var d = 250-b;

  stroke(129,150,h,12);
  strokeWeight(20);

  //Up_L
  for(e=6.283;e>0;line(width/4,height/4,d*cos(e-=0.01)+h*cos(d/b*e)+width/4,d*sin(e)-h*sin(d/b*e)+height/4)){
  }
  //Up_R
  for(e=6.283;e>0;line(width*3/4,height/4,d*cos(e-=0.01)+h*cos(d/b*e)+width*3/4,d*sin(e)-h*sin(d/b*e)+height/4)){
  }
  //Middle
  for(e=6.283;e>0;line(width/2,height/2,d*cos(e-=0.01)+h*cos(d/b*e)+width/2,d*sin(e)-h*sin(d/b*e)+height/2)){
  }
  //Down_L
  for(e=6.283;e>0;line(width/4,height*3/4,d*cos(e-=0.01)+h*cos(d/b*e)+width/4,d*sin(e)-h*sin(d/b*e)+height*3/4)){
  }
  //Down_R
  for(e=6.283;e>0;line(width*3/4,height*3/4,d*cos(e-=0.01)+h*cos(d/b*e)+width*3/4,d*sin(e)-h*sin(d/b*e)+height*3/4)){
  }

}