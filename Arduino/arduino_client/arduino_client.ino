// set pin numbers:
// Enable the selection on another Decoder
const int DecoderEnabled =  12;
// Adresse sur le bus pour les décodeurs
const int AdresseBus0 = 4;
const int AdresseBus1 = 3;
const int AdresseBus2 = 2;
// Adresse pour choisir les décodeurs
const int AdresseDecoder0 = 6;
const int AdresseDecoder1 = 5;
// Controle des transistors pour grounder les étages
const int Etage0 = 7;
const int Etage1 = 8;
const int Etage2 = 9;
const int Etage3 = 10;
const int Etage4 = 11;

// Constantes et variables
const int delayus = 100;
int temps = 200;
long n = 0;
boolean randomBool = true;
boolean pluie = true;
boolean UpState[5][5][5] ={
{
  {false, false, false, false, false},
  {false, false, false, false, false},
  {false, false, false, false, false},
  {false, false, false, false, false},
  {false, false, false, false, false} },
{
  {false, false, false, false, false},
  {false, false, false, false, false},
  {false, false, false, false, false},
  {false, false, false, false, false},
  {false, false, false, false, false} },
{
  {false, false, false, false, false},
  {false, false, false, false, false},
  {false, false, false, false, false},
  {false, false, false, false, false},
  {false, false, false, false, false} },
{
  {false, false, false, false, false},
  {false, false, false, false, false},
  {false, false, false, false, false},
  {false, false, false, false, false},
  {false, false, false, false, false} },
{
  {false, false, false, false, false},
  {false, false, false, false, false},
  {false, false, false, false, false},
  {false, false, false, false, false},
  {false, false, false, false, false} } 
};

// Thread
//static struct pt pt1;

//-------------------------------------------------------------------------------------------//
void setup() {
  // set the digital pin as output:
  pinMode(DecoderEnabled, OUTPUT);
  pinMode(AdresseBus0, OUTPUT);
  pinMode(AdresseBus1, OUTPUT);
  pinMode(AdresseBus2, OUTPUT);
  pinMode(AdresseDecoder0, OUTPUT);
  pinMode(AdresseDecoder1, OUTPUT);
  pinMode(Etage0, OUTPUT);
  pinMode(Etage1, OUTPUT);
  pinMode(Etage2, OUTPUT);
  pinMode(Etage3, OUTPUT);
  pinMode(Etage4, OUTPUT);
  
  //PT_INIT(&pt1);
  Serial.begin(9600);
}

// Loop principale---------------------------------------------------------------------------//
void loop()
{ 
  UpState[0][0][0] = true;
  while(true)
  {
    if (Serial.available()) 
    {
      light(Serial.readString());
    }
    lightCube();
  }
}

void light(String n){  
  int i = 0;
  while(i < sizeof(n)-1)
  {
    UpState[0][0][i+1] = true;
    /*if(isValidData(n.substring(i*3, i*3+3)))
      UpState[5][ n[i*3+1] - '0'][ n[i*3+2] - '0'] = true;
    i++;*/
  }
}

boolean isValidData(String data)
{
  if(sizeof(data) != 3)
    return false;
    
  for(int i=0; i < 3; i++)
  {
    if((data[i] <'0') || (data[i] > '4'))
    return false;
  }
}

// Éteindre tout-----------------------------------------------------------------------------//
void resetLights(){
     digitalWrite(Etage0, LOW); digitalWrite(Etage1, LOW); digitalWrite(Etage2, LOW); digitalWrite(Etage3, LOW); digitalWrite(Etage4, LOW);
}

// Remise à false de l'étage-----------------------------------------------------------------------------//
void resetUpState(int z){

  for(int x = 0 ; x < 5 ; x++){
   for(int y = 0 ; y < 5 ; y++){
    UpState[x][y][z] = false;
   } 
  }
}

//-------------------------------------------------------------------------------------------//
void lightCube(){
  
  for( int z = 0; z < 5 ; z++){
   for( int x = 0; x < 5 ; x++){
     for( int y = 0 ; y < 5 ; y++){
       if(UpState[x][y][z]){
         lightDEL(x,y,z);
       }
     }
   } 
  }
}

//-------------------------------------------------------------------------------------------//
void lightDEL(int x, int y, int z){
  
 digitalWrite(DecoderEnabled, HIGH);
  
 switch(x){
  
   case 0:
     digitalWrite(AdresseDecoder0, LOW); digitalWrite(AdresseDecoder1, LOW);
     
     switch(y){
       case 0:
        digitalWrite(AdresseBus0, LOW); digitalWrite(AdresseBus1, LOW); digitalWrite(AdresseBus2, LOW); break;
       case 1:
        digitalWrite(AdresseBus0, HIGH); digitalWrite(AdresseBus1, LOW); digitalWrite(AdresseBus2, LOW); break; 
       case 2: 
        digitalWrite(AdresseBus0, LOW); digitalWrite(AdresseBus1, HIGH); digitalWrite(AdresseBus2, LOW); break;
       case 3:
        digitalWrite(AdresseBus0, HIGH); digitalWrite(AdresseBus1, HIGH); digitalWrite(AdresseBus2, LOW); break;
       case 4:
        digitalWrite(AdresseBus0, LOW); digitalWrite(AdresseBus1, LOW); digitalWrite(AdresseBus2, HIGH); break;
     }
   break;
   
   case 1:
     digitalWrite(AdresseDecoder0, LOW); digitalWrite(AdresseDecoder1, LOW);
     
     switch(y){
       case 0:
        digitalWrite(AdresseBus0, HIGH); digitalWrite(AdresseBus1, LOW); digitalWrite(AdresseBus2, HIGH); break;
       case 1:
        digitalWrite(AdresseBus0, LOW); digitalWrite(AdresseBus1, HIGH); digitalWrite(AdresseBus2, HIGH); break;  
       case 2:
        digitalWrite(AdresseBus0, HIGH); digitalWrite(AdresseBus1, HIGH); digitalWrite(AdresseBus2, HIGH); break;
       case 3:
        digitalWrite(AdresseDecoder0, HIGH); digitalWrite(AdresseBus0, LOW); digitalWrite(AdresseBus1, LOW); digitalWrite(AdresseBus2, LOW);break;
       case 4:
        digitalWrite(AdresseDecoder0, HIGH); digitalWrite(AdresseBus0, HIGH); digitalWrite(AdresseBus1, LOW); digitalWrite(AdresseBus2, LOW);break;
     }
   break;
   
   case 2:
     digitalWrite(AdresseDecoder0, HIGH); digitalWrite(AdresseDecoder1, LOW);
     
     switch(y){
       case 0:
        digitalWrite(AdresseBus0, LOW); digitalWrite(AdresseBus1, HIGH); digitalWrite(AdresseBus2, LOW); break;
       case 1:
        digitalWrite(AdresseBus0, HIGH); digitalWrite(AdresseBus1, HIGH); digitalWrite(AdresseBus2, LOW); break;  
       case 2:
        digitalWrite(AdresseBus0, LOW); digitalWrite(AdresseBus1, LOW); digitalWrite(AdresseBus2, HIGH); break;   
       case 3:
        digitalWrite(AdresseBus0, HIGH); digitalWrite(AdresseBus1, LOW); digitalWrite(AdresseBus2, HIGH); break;
       case 4:
        digitalWrite(AdresseBus0, LOW); digitalWrite(AdresseBus1, HIGH); digitalWrite(AdresseBus2, HIGH); break;
     }
   break;
   
   case 3:
     digitalWrite(AdresseDecoder0, LOW); digitalWrite(AdresseDecoder1, HIGH);
     
     switch(y){
      case 0:
        digitalWrite(AdresseDecoder0, HIGH); digitalWrite(AdresseDecoder1, LOW); digitalWrite(AdresseBus0, HIGH); digitalWrite(AdresseBus1, HIGH); digitalWrite(AdresseBus2, HIGH); break;
       case 1:
        digitalWrite(AdresseDecoder0, HIGH); digitalWrite(AdresseBus0, LOW); digitalWrite(AdresseBus1, LOW); digitalWrite(AdresseBus2, LOW); break; 
       case 2:
        digitalWrite(AdresseBus0, LOW); digitalWrite(AdresseBus1, LOW); digitalWrite(AdresseBus2, LOW); break; 
       case 3:
        digitalWrite(AdresseBus0, HIGH); digitalWrite(AdresseBus1, LOW); digitalWrite(AdresseBus2, LOW); break;
       case 4:
        digitalWrite(AdresseBus0, LOW); digitalWrite(AdresseBus1, HIGH); digitalWrite(AdresseBus2, LOW); break;
     }
   break;
   
   case 4:
     digitalWrite(AdresseDecoder0, LOW); digitalWrite(AdresseDecoder1, HIGH);
     
     switch(y){  
       case 0:
        digitalWrite(AdresseBus0, HIGH); digitalWrite(AdresseBus1, HIGH); digitalWrite(AdresseBus2, LOW); break;
       case 1:
        digitalWrite(AdresseBus0, LOW); digitalWrite(AdresseBus1, LOW); digitalWrite(AdresseBus2, HIGH); break;
       case 2: 
        digitalWrite(AdresseBus0, HIGH); digitalWrite(AdresseBus1, LOW); digitalWrite(AdresseBus2, HIGH); break;
       case 3:
        digitalWrite(AdresseBus0, LOW); digitalWrite(AdresseBus1, HIGH); digitalWrite(AdresseBus2, HIGH); break;
       case 4:
        digitalWrite(AdresseBus0, HIGH); digitalWrite(AdresseBus1, HIGH); digitalWrite(AdresseBus2, HIGH); break;
     }
  break;
 } 

 // grounder une étage selon z
  switch(z){
  
   case 0: digitalWrite(Etage0, HIGH); break;
   case 1: digitalWrite(Etage1, HIGH); break;
   case 2: digitalWrite(Etage2, HIGH); break;
   case 3: digitalWrite(Etage3, HIGH); break;
   case 4: digitalWrite(Etage4, HIGH); break;
 } 
 
 delayMicroseconds(delayus);
 resetLights();
}
