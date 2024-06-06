let aurora;
let eva;
let habanero;
let hr;
let patchwork;
let pochi;
let seadog;
let currentImage;

let squishyfont, handfont;

function setup() {
  createCanvas(1080, 1920);
  background(255);

  currentImage=patchwork;


}

function draw() {
  background(220);
  
  
  //background(,0,0);
}

function preload(){
aurora= loadImage('Aurora2 (1).png')
eva = loadImage("Eva2 (1).png")
habanero = loadImage("Habanero2 (1).png")
hr= loadImage("HR2 (1).png")
patchwork = loadImage("patch work.png")
pochi= loadImage("Pochi2 (1).png")
seadog= loadImage("Seadog2 (1).png")
squishyfont = loadFont("SquishyGrip-Regular (2).ttf")
handfont= loadFont('KatHandwritten-Regular (1).ttf')
}
