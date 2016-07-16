#include <Wire.h>
#include <Ciao.h>


int buttonState; //this variable tracks the state of the button, low if not pressed, high if pressed
String command = "";

void setup() {
  pinMode(2, INPUT);
  pinMode(13, OUTPUT);
  Ciao.begin();
  
}
 
void loop() {
   buttonState = digitalRead(2);
  if(buttonState==HIGH){
      digitalWrite(13,HIGH);
      command = "/closed";
      Ciao.write("rest", "192.168.0.8", command);
  }else{
      digitalWrite(13,LOW);
      command = "/open";
      Ciao.write("rest", "192.168.0.8", command);  
  }
  delay(300);
}
