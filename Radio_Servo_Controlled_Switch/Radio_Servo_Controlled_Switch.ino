// When a specific code is received over radio (in this case the code is 22275), the arduino rotates the servo which flips the light switch on or off.
// Original code is from carjo3000 on thingiverse: http://www.thingiverse.com/thing:1156995. I modified it to suit my requirements.

#include <Servo.h>
#include <RCSwitch.h>
#include <JeeLib.h> // Low power functions library

//ISR(WDT_vect) { Sleepy::watchdogEvent(); } // Setup the watchdog

RCSwitch mySwitch = RCSwitch();
Servo myservo;  // create servo object to control a servo
int pos = 0;    // variable to store the servo position

void setup()
{
  //Serial.begin(9600);
  myservo.attach(9);  // attaches the servo to pin #9 of arduino
  mySwitch.enableReceive(digitalPinToInterrupt(3));  // attaches the radio receiver to inerrupt 0 => that is digital pin #2
  myservo.write(55);
}

void turnLightOn() {
for (pos = 55; pos <= 85; pos += 1)
  {
    myservo.write(pos);
    delay(15);
  }

  delay(500);

  // After the switch is flipped, go back to neutral position
  for (pos = 85; pos >= 55; pos -= 1)
  {
    myservo.write(pos);
    delay(15);
  }
}

void turnLightOff() {
for (pos = 55; pos >= 15; pos -= 1)
  {
    myservo.write(pos);
    delay(15);
  }

  delay(500);

  // After the switch is flipped, go back to neutral position
  for (pos = 15; pos <= 55; pos += 1)
  {
    myservo.write(pos);
    delay(15);
  }
}

void printValue() {
  Serial.print("Received ");
  Serial.print( mySwitch.getReceivedValue() );
  Serial.print(" / ");
  Serial.print( mySwitch.getReceivedBitlength() );
  Serial.print("bit ");
  Serial.print("Protocol: ");
  Serial.println( mySwitch.getReceivedProtocol() );
}

void loop()
{
  if (mySwitch.available()) {
    int code = mySwitch.getReceivedValue();
    //Serial.println(code);
    if (code == 22275) {
      turnLightOff();
    } else if (code == 22284) {
      turnLightOn();
    }
    mySwitch.resetAvailable();
  }
}
