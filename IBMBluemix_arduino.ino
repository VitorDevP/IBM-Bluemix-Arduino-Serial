//int t;

void setup() {
  Serial.begin(9600);   //Start serial comunication
}

void loop() {  
  Temp();  
  Serial.flush();  //Clean Serial flow
  delay(10000);
}


int Temp(){
  unsigned int wadc;
  int t;
  
  ADMUX = (_BV(REFS1) | _BV(REFS0) | _BV(MUX3));
  ADCSRA |= _BV(ADEN);
  
  delay(100);

  ADCSRA |= _BV(ADSC); 

   while (bit_is_set(ADCSRA,ADSC)){}
    wadc = ADCW;
    t = (wadc - 351.31 ) / 1.22; 
  
    Serial.write(t);
}

