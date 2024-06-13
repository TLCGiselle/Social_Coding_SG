let aurora, eva, habanero, hr, patchwork, pochi, seadog;
let logo, frontlayer, backlayer, front_layer, claw;

let cards = [];
let controls;
let animationSpeed = 5;
let currentIndex = 0;
let intervalId;
let chosenCard = -1;
let bgc;
let music;
let bgmusic;
let clawYOffset = 0; // Variable to track the claw's vertical offset
let canClick = true; // Variable to control the click state
let canMove = true; // Variable to control the claw's horizontal movement
let musicButton; // Variable for music toggle button
let musicPlaying = true; // Variable to track music playing state
let showPopup = true; // Variable to control the visibility of the popup
let popupTimer; // Timer for popup visibility
let qr;
let clawX = 0; // Variable to store the claw's X position when clicked

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
    front_layer = loadImage('Front Layer.png');
    squishyfont = loadFont("SquishyGrip-Regular (2).ttf");
    handfont = loadFont('KatHandwritten-Regular (1).ttf');
    music = loadSound('magic-sparkle-190030.mp3');
    bgmusic = loadSound("merner-pop-117203.mp3");
    claw = loadImage("claw.png");
    qr = loadImage("LnkBioQr.svg");
}

function setup() {
    createCanvas(1200, 850);
    bgmusic.setVolume(1);
    bgmusic.loop();

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
            display: false // Start with cards hidden
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
        speedRange: createSlider(1, 10, 5)
    };

    controls.speedRange.position(controls.x, controls.y);

    bgc = createButton('Background');
    bgc.position(470, 800);
    bgc.style('background-color', '#621d66');
    bgc.style('color', 'white');
    bgc.style('border', 'none');
    bgc.size(100, 20);
    bgc.mousePressed(changeBackgroundColor);
    bgc = color(150, 25, 255);

    musicButton = createButton('Toggle Music');
    musicButton.position(350, 800);
    musicButton.style('background-color', '#621d66');
    musicButton.style('color', 'white');
    musicButton.style('border', 'none');
    musicButton.size(100, 20);
    musicButton.mousePressed(toggleMusic);
}

function draw() {
    background(bgc);

    // Calculate positions to center the images
    let backLayerX = (width - 500) / 2;
    let backLayerY = (height - 700) / 2;

    // Draw backlayer image centered
    image(backlayer, backLayerX, backLayerY, 500, 700);

       // QR Code
       image(qr, 780,710, 50, 50); // Draw the QR code at bottom right corner, 50x50 pixels
    
    // Draw the claw following the mouse cursor within the specified rectangle
    let rectX = 385;
    let rectY = 230;
    let rectWidth = 430;
    let rectHeight = 295;

    if (canMove) {
        clawX = constrain(mouseX - 50, rectX, rectX + rectWidth - 100); // Ensure claw stays within the rectangle
    }
    let clawY = rectY + rectHeight - 950 + clawYOffset; // Apply the vertical offset
    image(claw, clawX, clawY, 100, 800); // Draw the claw with the specified dimensions

    // Draw the rectangle in the center of the screen
    noFill();
    stroke(0);
    strokeWeight(1);
    rect(rectX, rectY, rectWidth, rectHeight);

    // Draw front_layer image centered
    let frontLayerX = (width - 500) / 2;
    let frontLayerY = (height - 700) / 2;
    image(front_layer, frontLayerX, frontLayerY, 500, 700);

    // Display cards only when animation is running or a card is chosen
    if (intervalId || chosenCard !== -1) {
        for (let card of cards) {
            if (card.display) {
                if (card.display && chosenCard === -1)
                image(card.image, card.x, card.y, card.w, card.h);
            }
        }
    }

    // Display chosen card info if applicable
    if (chosenCard !== -1) {
        noFill();
        stroke(0);
        strokeWeight(0);
        rect(width / 2 - 150, height / 2 - 200, 300, 400);
        image(cards[chosenCard].image, width / 2 - 150, height / 2 - 200, 300, 400);
    }
}

function mousePressed() {
    let rectX = 385;
    let rectY = 230;
    let rectWidth = 430;
    let rectHeight = 295;

    if (canClick && mouseX > rectX && mouseX < rectX + rectWidth && mouseY > rectY && mouseY < rectY + rectHeight) {
        canClick = false;
        canMove = false; // Disable horizontal movement
        clawX = constrain(mouseX - 50, rectX, rectX + rectWidth - 100); // Store the claw's X position
        clawYOffset += 100; // Increase the vertical offset by 100 pixels
        setTimeout(() => {
            clawYOffset -= 100; // Decrease the vertical offset back after 3 seconds
            canClick = true; // Re-enable clicking after 3 seconds
            canMove = true; // Re-enable horizontal movement after 3 seconds
        }, 3000); // 3 seconds delay
        // Start animation immediately when clicked
        startAnimation();
    }
}

function startAnimation() {
    // Hide the last chosen card if there is one
    if (chosenCard !== -1) {
        cards[chosenCard].display = false;
        chosenCard = -1; // Reset chosen card
        music.play(); // Play sound effect
    }

    animationSpeed = controls.speedRange.value();
    intervalId = setInterval(() => {
        currentIndex = (currentIndex +1) % cards.length;
        setTimeout(() => {
            cards[currentIndex].highlight = true;
        }, 1000 / animationSpeed);
    }, 1000 / animationSpeed);

    setTimeout(stopAnimation, 3000);
}

function stopAnimation() {
    clearInterval(intervalId);
    chosenCard = Math.floor(random(cards.length));
    cards.forEach(card => card.display = false);
    cards[chosenCard].display = true;
    music.stop();
}

function changeBackgroundColor() {
    bgc = color(random(255), random(255), random(255));
}

function toggleMusic() {
    if (musicPlaying) {
        bgmusic.stop(); // Stop background music
    } else {
        bgmusic.loop(); // Resume background music
    }
    musicPlaying = !musicPlaying; // Toggle music state
}
