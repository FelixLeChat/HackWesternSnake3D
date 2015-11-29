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

int snake[10][3] ={
{0,1,0},
{0,0,0},
{0,0,0},
{0,0,0},
{0,0,0},
{0,0,0},
{0,0,0},
{0,0,0},
{0,0,0},
{0,0,0}};
int snakelength = 2;
int goal[3] = {0,0,0};
long TEMPS = millis();

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
  
  randomSeed(analogRead(0));
  
  nextRandomPoint();
}

// Loop principale---------------------------------------------------------------------------//
void loop()
{ 
  resetAllUpState();
  insertSnake();
  UpState[goal[0]][goal[1]][goal[2]] = true;
  lightCube();
  
  if((millis() - TEMPS) > 5)
  {
    UpdatePosition();
    TEMPS = millis();
  }
}

void insertSnake()
{
  for(int i = 0; i < snakelength; i++)
  {
    UpState[snake[i][0]][snake[i][1]][snake[i][2]] = true;
  }
}


boolean onTarget = false;
int ending[3] = {0,0,0};
void UpdatePosition(){
  
  int deltaX = goal[0] - snake[0][0];
  int deltaY = goal[1] - snake[0][1];
  int deltaZ = goal[2] - snake[0][2];
  
  int movingX = 0, movingY = 0, movingZ = 0;
  boolean mouvement = false;
  
  // head cannot go over bounds in all directions
  int point1[3] = {snake[0][0]+1, snake[0][1], snake[0][2]};
  if(deltaX > 0 && !isPartOfSnake(point1))
  {
    if(!mouvement)
    {
      movingX = 1;
      mouvement = true;
    }
  }
  
  int point2[3] = {snake[0][0]-1, snake[0][1], snake[0][2]};
  if(deltaX < 0 && !isPartOfSnake(point2))
  {
    if(!mouvement)
    {
      movingX = -1;
      mouvement = true;
    }
  }
  
  int point3[3] = {snake[0][0], snake[0][1]+1, snake[0][2]};
  if(deltaY > 0 && !isPartOfSnake(point3))
  {
    if(!mouvement)
    {
      movingY = 1;
      mouvement = true;
    }
  }
  
  int point4[3] = {snake[0][0], snake[0][1]-1, snake[0][2]};
  if(deltaY < 0 && !isPartOfSnake(point4))
  {
    if(!mouvement)
    {
      movingY = -1;
      mouvement = true;
    }
  }
  
  int point5[3] = {snake[0][0], snake[0][1], snake[0][2]+1};
  if(deltaZ > 0 && !isPartOfSnake(point5))
  {
    if(!mouvement)
    {
      movingZ = 1;
      mouvement = true;
    }
  }
  
  int point6[3] = {snake[0][0], snake[0][1], snake[0][2]-1};
  if(deltaZ < 0 && !isPartOfSnake(point4))
  {
    if(!mouvement)
    {
      movingZ = -1;
      mouvement = true;
    }
  }
  
  // bring forward the snake
  if(mouvement)
  {
    if(onTarget)
    {
      if(snakelength < 9)
        snakelength++;
      onTarget = false;
    }
    
    // shift 
    for(int i=snakelength-1; i>0 ;i--)
    {
      snake[i][0] = snake[i-1][0];
      snake[i][1] = snake[i-1][1];
      snake[i][2] = snake[i-1][2];
    }
    
    snake[0][0] += movingX;
    snake[0][1] += movingY;
    snake[0][2] += movingZ;
    
    if(snake[0][0] == goal[0] && snake[0][1] == goal[1] && snake[0][2] == goal[2])
    {
      onTarget = true;
      goal[0] = random(0,5);
      goal[1] = random(0,5);
      goal[2] = random(0,5);
    }
    
    ending[0] = snake[snakelength-1][0];
    ending[1] = snake[snakelength-1][1];
    ending[2] = snake[snakelength-1][2];
  }
  else
  {
    snake[0][0]=0;
    snake[0][1]=1;
    snake[0][2]=0;
    
    snake[1][0]=0;
    snake[1][1]=0;
    snake[1][2]=0;
    snakelength = 2;
  }
}

boolean isPartOfSnake(int point[3])
{
  for(int i=0; i < snakelength; i++)
  {
    if(point[0] == snake[i][0] && point[1] == snake[i][1] && point[2] == snake[i][2])
      return true;
  }
  return false;
}

void nextRandomPoint()
{
  while(isPartOfSnake(goal)
  {
    goal[0] = random(0,5);
    goal[1] = random(0,5);
    goal[2] = random(0,5);
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

void resetAllUpState()
{
  for(int x=0; x < 5; x++)
    resetUpState(x);
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

void lightNumber(int number)
{
  switch(number)
  {
    case 0:
      UpState[0][1][0] = true;
      UpState[0][1][1] = true;
      UpState[0][1][2] = true;
      UpState[0][1][3] = true;
      UpState[0][1][4] = true;
      UpState[0][3][0] = true;
      UpState[0][3][1] = true;
      UpState[0][3][2] = true;
      UpState[0][3][3] = true;
      UpState[0][3][4] = true;
      UpState[0][2][0] = true;
      UpState[0][2][4] = true;
      break;
    case 1:
      UpState[0][1][0] = true;
      UpState[0][2][0] = true;
      UpState[0][3][0] = true;
      UpState[0][2][1] = true;
      UpState[0][2][2] = true;
      UpState[0][2][3] = true;
      UpState[0][2][4] = true;
      UpState[0][1][3] = true;
      break;
    case 2:
      UpState[0][1][0] = true;
      UpState[0][2][0] = true;
      UpState[0][3][0] = true;
      UpState[0][1][1] = true;
      UpState[0][1][2] = true;
      UpState[0][2][2] = true;
      UpState[0][3][2] = true;
      UpState[0][3][3] = true;
      UpState[0][1][4] = true;
      UpState[0][2][4] = true;
      UpState[0][3][4] = true;
      break;
    case 3:
      UpState[0][1][0] = true;
      UpState[0][2][0] = true;
      UpState[0][3][0] = true;
      UpState[0][3][1] = true;
      UpState[0][1][2] = true;
      UpState[0][2][2] = true;
      UpState[0][3][2] = true;
      UpState[0][3][3] = true;
      UpState[0][1][4] = true;
      UpState[0][2][4] = true;
      UpState[0][3][4] = true;
      break;
    case 4:
      UpState[0][3][0] = true;
      UpState[0][3][1] = true;
      UpState[0][3][2] = true;
      UpState[0][3][3] = true;
      UpState[0][3][4] = true;
      UpState[0][2][2] = true;
      UpState[0][1][2] = true;
      UpState[0][1][3] = true;
      UpState[0][1][4] = true;
      break;
    case 6:
      UpState[0][1][1] = true;
    case 5:
      UpState[0][1][0] = true;
      UpState[0][2][0] = true;
      UpState[0][3][0] = true;
      UpState[0][1][3] = true;
      UpState[0][1][2] = true;
      UpState[0][2][2] = true;
      UpState[0][3][2] = true;
      UpState[0][3][1] = true;
      UpState[0][1][4] = true;
      UpState[0][2][4] = true;
      UpState[0][3][4] = true;
      break;
    case 7:
      UpState[0][3][0] = true;
      UpState[0][3][2] = true;
      UpState[0][3][1] = true;
      UpState[0][3][4] = true;
      UpState[0][3][4] = true;
      UpState[0][2][4] = true;
      UpState[0][1][4] = true;
      break;
  }
}
