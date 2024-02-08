const int triPin = 7; // Trigger Pin of Ultrasonic Sensor
const int echoPin = 6; // Echo Pin of Ultrasonic Sensor

void setup() {
   Serial.begin(9600); // Starting Serial Terminal
}

void loop() {
   long duration, cm;
   pinMode(triPin, OUTPUT);
   digitalWrite(triPin, LOW);
   delayMicroseconds(2);
   digitalWrite(triPin, HIGH);
   delayMicroseconds(10);
   digitalWrite(triPin, LOW);
   pinMode(echoPin, INPUT);
   duration = pulseIn(echoPin, HIGH);
   cm = microsecondsToCentimeters(duration);
   
   //Distance judgement
   if (cm < 25){
    //Flowering procedure
    Serial.print(cm);
    Serial.print("cm");
    Serial.println();
   }else{
    Serial.println("No people detected!");
   }
   delay(100);
}

long microsecondsToCentimeters(long microseconds) {
   return microseconds / 29.155 / 2;
}
