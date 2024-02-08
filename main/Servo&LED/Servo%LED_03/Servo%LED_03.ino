#include <TaskScheduler.h>
#include <Servo.h>

#define UPDATE_TIME 1666
#define MAX_POS 180
#define MIN_POS 0

int ledPin = 5;
int servoPin = 9;
bool flag = false; //判断花是否开到180度

// Callback methods prototypes
// void t1Callback();  //servo task
// void t2Callback();  //led task

//led
int brightness = 0;
int fadeRate = 25;

//servo
int pos = 0;
Servo myservo;

//Tasks (delay_ms,times,func)
// Task t1(0, TASK_FOREVER, &t1Callback);
// Task t2(0, TASK_FOREVER, &t2Callback);

// Scheduler Sch;

void setup() {
  pinMode(ledPin, OUTPUT);
  myservo.attach(servoPin,500,2500); 
  myservo.write(0);

  Serial.begin(9600);
  Serial.println("Scheduler Start");

  Sch.init();
  Serial.println("Initialized scheduler");
  
  Sch.addTask(task1,0,1666,1);
  Serial.println("added t1");
  
  Sch.addTask(task2,0,50,1);
  Serial.println("added t2");

  Sch.start();
  
  // t1.enable();
  // Serial.println("Enabled t1"); 
  // t2.enable();
  // Serial.println("Enabled t2");

}

void loop() {
  Sch.dispatchTasks();
  //runner.execute();
}

void task1() {  //花开180度
  if (myservo.read() == MAX_POS){
    flag = true;
  }
  else{
    myservo.write(pos);
    Serial.print("servo angle:");
    Serial.println(pos);
    pos = pos + 1;
    //delay(UPDATE_TIME);
  }
}

void task2() {  //led有规律亮
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