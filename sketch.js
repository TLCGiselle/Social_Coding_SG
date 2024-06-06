//Images
let aurora;
let eva;
let habanero;
let hr;
let patchwork;
let pochi;
let seadog;
let currentImage;
let logo;
let clawbod;

//Fonts
let squishyfont, handfont;

function preload(){
  aurora= loadImage('Aurora2 (1).png')
  eva = loadImage("Eva2 (1).png")
  habanero = loadImage("Habanero2 (1).png")
  hr= loadImage("HR2 (1).png")
  patchwork = loadImage("patch work.png")
  pochi= loadImage("Pochi2 (1).png")
  seadog= loadImage("Seadog2 (1).png")
  logo = loadImage("DMA98_FinalfinalSquishyGrip.png")
  //clawbod = loadImage("BoxArt.png")

  squishyfont = loadFont("SquishyGrip-Regular (2).ttf")
  handfont= loadFont('KatHandwritten-Regular (1).ttf')
  }

function setup() {
  createCanvas(1930, 2950);
  background(255);
  
  currentImage=patchwork;


}

function draw() {
  background(220);
  
  
  //background(,0,0);
}



