#include <Servo.h>
#include <TaskScheduler.h>

#define UPDATE_TIME 1666
#define MAX_POS 180
#define MIN_POS 0

int ledPin = 5;
int servoPin = 9;
bool flag = false; //Judge whether the flower bloom to 180 degrees

// Callback methods prototypes
void t1Callback();  //servo task
void t2Callback();  //led task

//led
int brightness = 0;
int fadeRate = 25;

//servo
int pos = 0;
Servo myservo;

//Tasks (delay_ms,times,func)
Task t1(0, TASK_FOREVER, &t1Callback);
Task t2(0, TASK_FOREVER, &t2Callback);

Scheduler runner;  //Instantiation of Scheduler

void t1Callback() {  //flower bloom to 180
  if (myservo.read() == MAX_POS){
    flag = true;
  }
  else{
    myservo.write(pos);
    Serial.print("servo angle:");
    Serial.println(pos);
    pos = pos + 1;
    delay(UPDATE_TIME);
  }
}

void t2Callback() {  //LED emits light regularly
  if (flag == false) {
    analogWrite(ledPin,brightness);
    Serial.print("led brightness:");
    Serial.println(brightness);
    brightness = brightness + fadeRate;
    if (brightness <= 0 || brightness >= 100) {
      fadeRate = -fadeRate;
    }
    //delay(50);
  }
  else{
    digitalWrite(ledPin,HIGH);
  }
}

void setup() {
  pinMode(ledPin, OUTPUT);
  myservo.attach(servoPin,500,2500); 
  myservo.write(0);

  Serial.begin(9600);
  Serial.println("Scheduler Start");

  runner.init();
  Serial.println("Initialized scheduler");
  
  runner.addTask(t1);
  Serial.println("added t1");
  
  runner.addTask(t2);
  Serial.println("added t2");
  
  t1.enable();
  Serial.println("Enabled t1"); 
  t2.enable();
  Serial.println("Enabled t2");

}

void loop() {
  runner.execute();
}
