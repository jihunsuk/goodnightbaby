// Modified by John 2015 11 03
// MIT license

#include "DHT.h"
#include <SoftwareSerial.h>
#define DHTPIN 12
#define DHTTYPE DHT11
DHT dht(DHTPIN, DHTTYPE);

SoftwareSerial mySerial(2,3);
int time = 2000;
int c = 1;
void setup() {
  Serial.begin(9600);
  mySerial.begin(9600);
}
void loop() {
  delay(1000);
  if (c == 1){
    delay(time-1);
    char humid[3];
    char temp[3];
    int h = dht.readHumidity();
    int t = dht.readTemperature();
  
    String str = String(h);
    str.toCharArray(humid, 3);
    str = String(t);
    str.toCharArray(temp, 3);
    strcat(humid, ".");
    strcat(humid, temp);
    strcat(humid, ".");
    mySerial.write(humid);
  }
  
  if (mySerial.available()) {
    int a = (int)mySerial.read();
    int value = a-48;
    if (value == 0) {
      c = 0;
    } else if (value == 1) {
      c = 1;
    } else if (value == 2) { 
      char humid[3];
      char temp[3];
      int h = dht.readHumidity();
      int t = dht.readTemperature();
    
      String str = String(h);
      str.toCharArray(humid, 3);
      str = String(t);
      str.toCharArray(temp, 3);
      strcat(humid, ".");
      strcat(humid, temp);
      strcat(humid, ".");
      mySerial.write(humid);
    } else if (value == 3){
      delay(1000);
      char value[10];

      int tmp = (int)mySerial.read()-48;
      int i = 0;
      while(tmp>=0 && tmp<=9){
        delay(1000);
        value[i] = (char)(tmp+48);
        i++;
        tmp = (int)mySerial.read()-48;
      }
     time = atoi(value);
    }
  }
}

