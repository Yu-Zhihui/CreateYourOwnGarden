#include <Servo.h>

#define UPDATE_TIME 30
#define MAX_POS 180
#define MIN_POS 0

int ledPin = 5;
int servoPin = 9;
int times = 0;

//led
int brightness = 0;
int fadeRate = 2;

//servo
int pos = 0;
Servo myservo;

void setup() {
  pinMode(ledPin, OUTPUT);
  myservo.attach(servoPin,500,2500); 
}

void loop() {
  if (times <= 4) {
    for (pos = MIN_POS; pos <= MAX_POS; pos += 1){
      myservo.write(pos);
      if (brightness < 255) {
        analogWrite(ledPin,brightness);
        brightness = brightness + fadeRate;
      }
      else{
        digitalWrite(ledPin,HIGH);
      }  
      delay(UPDATE_TIME);
    }
    for (pos = MAX_POS; pos >= MIN_POS; pos -= 1){
      myservo.write(pos);
      if (brightness > 0) {
        analogWrite(ledPin,brightness);
        brightness = brightness - fadeRate;
      }
      else{
        digitalWrite(ledPin,LOW);
      }  
      delay(UPDATE_TIME);
    }
    times = times + 1;
    delay(1000);
  }
  else{
    digitalWrite(ledPin,HIGH);
    myservo.write(180);
  }
}