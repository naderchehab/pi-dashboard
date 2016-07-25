// When a specific code is received over radio (in this case the code is 22275), the arduino rotates the servo which flips the light switch on or off.
// Original code is from carjo3000 on thingiverse: http://www.thingiverse.com/thing:1156995. I modified it to suit my requirements.

#include <Servo.h>
#include <RCSwitch.h>
#include <JeeLib.h> // Low power functions library

ISR(WDT_vect) { Sleepy::watchdogEvent(); }

RCSwitch mySwitch = RCSwitch();
Servo myservo;  // create servo object to control a servo
int pos = 0;    // variable to store the servo position
boolean isLightOn = true;

void setup()
{
  myservo.attach(9);  // attaches the servo to pin #9 of arduino
  mySwitch.enableReceive(0);  // attaches the radio receiver to inerrupt 0 => that is pin #2
  Serial.begin(9600);
}

void turnLightOn() {
  // To turn the lights on, the servo goes from 60 degrees to 100 degrees. In this case, 60 degrees is the "neutral" position and 100 degrees is the "on" position.
  for (pos = 60; pos < 100; pos += 1)
  {
    myservo.write(pos);
    delay(15);                       // waits 15ms for the servo to reach the position
  }

  // After the switch is flipped, go back to neutral position
  for (pos = 100; pos >= 60; pos -= 1)
  {
    myservo.write(pos);
    delay(15);
  }
  isLightOn = true;
}

void turnLightOff() {
  for (pos = 60; pos >= 10; pos -= 1)
  {
    myservo.write(pos);
    delay(15);
  }

  for (pos = 10; pos < 60; pos += 1)
  {
    myservo.write(pos);
    delay(15);
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
          turnLightOff();
        }
        else {
          turnLightOn();
        }
      }
    }

    mySwitch.resetAvailable();
    Sleepy::powerDown();
  }
}
