// When a specific code is received over radio, the arduino triggers the light servo to control the light switch.

#include <Servo.h>

#include <RCSwitch.h>

RCSwitch mySwitch = RCSwitch();

Servo myservo;  // create servo object to control a servo

int pos = 0;    // variable to store the servo position

boolean isLightOn = true;

void setup()
{
  myservo.attach(9);  // attaches the servo to pin 9 of arduino
  mySwitch.enableReceive(0);  // Receiver on inerrupt 0 => that is pin #2
  Serial.begin(9600);
}

void turnOn() {
  for (pos = 60; pos < 100; pos += 1) // goes from 60 degrees to 100 degrees
  { // in steps of 1 degree
    myservo.write(pos);              // tell servo to go to position in variable 'pos'
    delay(15);                       // waits 15ms for the servo to reach the position
  }
  for (pos = 100; pos >= 60; pos -= 1) // goes from 100 degrees to 60 degrees
  {
    myservo.write(pos);              // tell servo to go to position in variable 'pos'
    delay(15);                       // waits 15ms for the servo to reach the position
  }
  isLightOn = true;
}

void turnOff() {
  for (pos = 60; pos >= 10; pos -= 1) // goes from 60 degrees to 5 degrees
  {
    myservo.write(pos);              // tell servo to go to position in variable 'pos'
    delay(15);                       // waits 15ms for the servo to reach the position
  }

  for (pos = 10; pos < 60; pos += 1) // goes from 5 degrees to 60 degrees
  { // in steps of 1 degree
    myservo.write(pos);              // tell servo to go to position in variable 'pos'
    delay(15);                       // waits 15ms for the servo to reach the position
  }
  isLightOn = false;
}
void loop()
{
  if (mySwitch.available()) {

    int value = mySwitch.getReceivedValue();

    if (value == 0) {
      Serial.print("Unknown encoding");
    } else {
      Serial.print("Received ");
      Serial.print( mySwitch.getReceivedValue() );
      Serial.print(" / ");
      Serial.print( mySwitch.getReceivedBitlength() );
      Serial.print("bit ");
      Serial.print("Protocol: ");
      Serial.println( mySwitch.getReceivedProtocol() );
      
      if (value == 22275) {
        if (isLightOn == true) {
          turnOff();
        }
        else {
          turnOn();
        }
      }
    }

    mySwitch.resetAvailable();
  }
}


