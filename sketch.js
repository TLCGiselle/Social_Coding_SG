let aurora, eva, habanero, hr, patchwork, pochi, seadog;
let currentImage;
let logo, frontlayer, backlayer, front_layer;
let squishyfont, handfont;

let cards = [];
let cardInfo;
let cardImage;
let startButton;
let startButtonImage;
let speedRange;
let controls;
let animationSpeed = 5;
let currentIndex = 0;
let intervalId;
let chosenCard = -1;
let bgc;
let music;


function preload() {
    aurora = loadImage('Aurora2 (1).png');
    eva = loadImage("Eva2 (1).png");
    habanero = loadImage("Habanero2 (1).png");
    hr = loadImage("HR2 (1).png");
    patchwork = loadImage("patch work.png");
    pochi = loadImage("Pochi2 (1).png");
    seadog = loadImage("Seadog2 (1).png");
    logo = loadImage("DMA98_FinalfinalSquishyGrip.png");
    backlayer = loadImage("BackLayer.png");
    front_layer = loadImage('Front_Layer.png');
    squishyfont = loadFont("SquishyGrip-Regular (2).ttf");
    handfont = loadFont('KatHandwritten-Regular (1).ttf');
    music=loadSound('magic-sparkle-190030.mp3')
   

}

function setup() {
  createCanvas(1200, 850);
    
    
    
    // Creating card elements dynamically
    for (let i = 0; i < 6; i++) {
        let card = {
            image: null,
            info: null,
            x: 100 + i * 120,
            y: 400,
            w: 100,
            h: 150,
            borderColor: 'none',
            display: true
        };
        
        switch (i) {
            case 0:
                card.image = aurora;
                card.info = "Aurora2 (1).png";
                break;
            case 1:
                card.image = eva;
                card.info = "Eva2 (1).png";
                break;
            case 2:
                card.image = habanero;
                card.info = "Habanero2 (1).png";
                break;
            case 3:
                card.image = hr;
                card.info = "HR2 (1).png";
                break;
            case 4:
                card.image = seadog;
                card.info = "Seadog2 (1).png.";
                break;
            case 5:
                card.image = pochi;
                card.info = "Pochi2 (1).png";
                break;
        }
        
        cards.push(card);
    }

    // Creating controls dynamically
    controls = {
        x: width / 2,
        y: 800,
        speedRange: createSlider(1, 10, 5),
        
        startButton: createButton('Start'),

        visible: true
    };
    
    controls.speedRange.position(controls.x, controls.y);
    controls.startButton.position(controls.x + 500, controls.y);
    controls.startButton.mousePressed(startAnimation);
    controls.startButton.style('background-color', '#621d66'); 
    controls.startButton.style('color','white');
    controls.startButton.style('border','none');
    controls.speedRange.style('background-color','#621d66')

   
    bgc= createButton('Background');
    bgc.position(450, 800);
    bgc.style('background-color', '#621d66');
    bgc.style('color', 'white');
    bgc.style('border', 'none');
    bgc.size(100, 20);
    bgc.mousePressed(changeBackgroundColor);
    bgc = color(150, 25, 255);

    
}

function draw() {
    background(bgc);
   
        
        // Calculate positions to center the images
        let backLayerX = (width - 500) / 2;
        let backLayerY = (height - 700) / 2;
        
        // Draw backlayer image centered
        image(backlayer, backLayerX, backLayerY, 500, 700);
        
        let frontLayerX = (width - 500) / 2;
        let frontLayerY = (height - 700) / 2;
        
        // Draw front_layer image centered
        image(front_layer, frontLayerX, frontLayerY, 500, 700);
        
        // Display cards
        // ...
    
   
      
    
    // Display controls
    if (controls.visible) {
       
        controls.speedRange.position(controls.x, controls.y);
         controls.startButton.position(controls.x + 150, controls.y);
    
       
      
    }
    
    // Display card info
    if (chosenCard !== -1) {
        noFill();
        stroke(0);
        strokeWeight(0);
        rect(width / 2 - 150, height / 2 - 200, 300, 400);
        image(cards[chosenCard].image, width / 2 - 150, height / 2 - 200, 300, 400);
    }
}

function startAnimation() {
    // Hide the last chosen card if there is one
    if (chosenCard !== -1) {
        cards[chosenCard].display = false;
        chosenCard = -1; // Reset chosen card
        music.play()

    }

    controls.visible = false;
    
    animationSpeed = controls.speedRange.value();
    intervalId = setInterval(() => {
        currentIndex = (currentIndex + 1) % cards.length;
        cards[currentIndex].highlight = true;
        setTimeout(() => {
            cards[currentIndex].highlight = false;
        }, 1000 / animationSpeed);
    }, 1000 / animationSpeed);
    
    setTimeout(stopAnimation, 3000);
}
function stopAnimation() {
    clearInterval(intervalId);
    chosenCard = Math.floor(random(cards.length));
    cards.forEach(card => card.display = false);
    cards[chosenCard].display = true;
    controls.visible = true;
    music.stop()
}
function changeBackgroundColor() {
    bgc = color(random(255), random(255), random(255));
  }
