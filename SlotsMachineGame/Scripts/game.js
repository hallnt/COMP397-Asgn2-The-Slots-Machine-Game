/// <reference path="typings/easeljs/easeljs.d.ts" />
/// <reference path="typings/tweenjs/tweenjs.d.ts" />
/// <reference path="typings/soundjs/soundjs.d.ts" />
/// <reference path="typings/preloadjs/preloadjs.d.ts" />
///////////////////////////////////////////////////////////////
//                  GAME FRAMEWORK VARIABLES                 //
///////////////////////////////////////////////////////////////
var canvas = document.getElementById("canvas");
var stage;
var assets;
var manifest = [
    { id: "slotmachine", src: "assets/images/slot_machine.png" },
    { id: "1", src: "assets/images/blank slot.png" },
    { id: "2", src: "assets/images/banana slot.png" },
    { id: "3", src: "assets/images/cherry slot.png" },
    { id: "4", src: "assets/images/mango slot.png" },
    { id: "spinButton", src: "assets/images/spin button.png" },
    { id: "resetButton", src: "assets/images/reset button.png" }
];
///////////////////////////////////////////////////////////////
//                       GAME VARIABLES                      //
///////////////////////////////////////////////////////////////
var slotmachine; //create a reference
var spinButton;
var resetButton;
var slot1;
var slot2;
var slot3;
var increment = 0;
///////////////////////////////////////////////////////////////
//                     PRELOADER FUNCTION                    //
///////////////////////////////////////////////////////////////
function preload() {
    assets = new createjs.LoadQueue();
    // event listener triggers when assets are completely loaded
    assets.on("complete", init, this);
    assets.loadManifest(manifest);
}
///////////////////////////////////////////////////////////////
//     CALLBACK FUNCTION THAT INITIALIZES GAME OBJECTS       //
///////////////////////////////////////////////////////////////
// Callback function that initializes game objects
function init() {
    stage = new createjs.Stage(canvas); // reference to the stage
    stage.enableMouseOver(20);
    createjs.Ticker.setFPS(60); // framerate 60 fps for the game
    // event listener triggers 60 times every second
    createjs.Ticker.on("tick", gameLoop);
    // calling main game function
    main();
}
///////////////////////////////////////////////////////////////
//     CALLBACK FUNCTION THAT CREATES OUR MAIN GAME LOOP     //
///////////////////////////////////////////////////////////////
function gameLoop() {
    stage.update();
}
///////////////////////////////////////////////////////////////
//CALLBACK FUNCTION THAT RESPONDS TO SPIN BUTTON CLICK EVENTS//
///////////////////////////////////////////////////////////////
function spinButtonClicked(event) {
    show(); //call show() method when spin button is clicked
}
///////////////////////////////////////////////////////////////
// CALLBACK FUNCTION THAT CHANGE ALPHA TRANSPARENCY OF BUTTON//
///////////////////////////////////////////////////////////////
// Mouse over event
function spinButtonOver() {
    spinButton.alpha = 0.8; //make button 80% transparent when hover over with the mouse
}
// Mouseout event
function spinButtonOut() {
    spinButton.alpha = 1.0; //remove transparency when mouse is moved off the button
}
///////////////////////////////////////////////////////////////
//CALLBACK FUNCTION THAT RESPONDS TO RESETBUTTON CLICK EVENTS//
///////////////////////////////////////////////////////////////
function resetButtonClicked(event) {
    main(); //call show() method when spin button is clicked
}
///////////////////////////////////////////////////////////////
//               FUNCTION TO SPIN SLOT MACHINE               //
///////////////////////////////////////////////////////////////
function Spin() {
    var slot = [" ", " ", " "]; //display images on slots
    var outcome = [0, 0, 0]; //store outcome values after 3 loops of random number generation
    for (var spin = 0; spin < 3; spin++) {
        outcome[spin] = Math.floor(Math.random() * 4) + 1; // generate a random number from 1 to 4
        switch (outcome[spin]) {
            case 1:
                slot[spin] = "1";
                increment++;
                break;
            case 2:
                slot[spin] = "2";
                increment++;
                break;
            case 3:
                slot[spin] = "3";
                increment++;
                break;
            case 4:
                slot[spin] = "4";
                increment++;
                break;
        }
    }
    return slot; // return value of slot outcome
}
///////////////////////////////////////////////////////////////
//              FUNCTION TO DISPLAY SLOT RESULTS             //
///////////////////////////////////////////////////////////////
function show() {
    stage.removeAllChildren; // wipe away existing results
    var value = Spin(); // soore result of Spin() function in variable value
    slot1 = new createjs.Bitmap(assets.getResult(value[0].toString())); // create slot1 object
    slot1.regX = slot1.getBounds().width * 0.5; // find center of slot
    slot1.regY = slot1.getBounds().height * 0.5; // find center of slot
    slot1.x = 80;
    slot1.y = 220;
    slot2 = new createjs.Bitmap(assets.getResult(value[1].toString())); // create slot2 object
    slot2.regX = slot2.getBounds().width * 0.5;
    slot2.regY = slot2.getBounds().height * 0.5;
    slot2.x = 162;
    slot2.y = 220;
    slot3 = new createjs.Bitmap(assets.getResult(value[2].toString())); // create slot3 object
    slot3.regX = slot3.getBounds().width * 0.5;
    slot3.regY = slot3.getBounds().height * 0.5;
    slot3.x = 247;
    slot3.y = 220;
    console.log(value[0] + " " + value[1] + " " + value[2]);
    // add images to slots based on outcome from Spin() function
    stage.addChild(slot1);
    stage.addChild(slot2);
    stage.addChild(slot3);
}
///////////////////////////////////////////////////////////////
//                     MAIN GAME FUNCTION                    //
///////////////////////////////////////////////////////////////
function main() {
    console.log("Game is Running");
    slotmachine = new createjs.Bitmap(assets.getResult("slotmachine")); // create slotMachine object
    stage.addChild(slotmachine); //add slotMachine object to stage
    slot1 = new createjs.Bitmap(assets.getResult("1")); // create new slot1 object
    slot1.regX = slot1.getBounds().width * 0.5;
    slot1.regY = slot1.getBounds().height * 0.5;
    slot1.x = 80;
    slot1.y = 220;
    stage.addChild(slot1); // add blank slot to slot1 upon startup of game
    slot2 = new createjs.Bitmap(assets.getResult("1")); // create new slot2 object
    slot2.regX = slot2.getBounds().width * 0.5;
    slot2.regY = slot2.getBounds().height * 0.5;
    slot2.x = 162;
    slot2.y = 220;
    stage.addChild(slot2); // add blank slot to slot2 upon startup of game
    slot3 = new createjs.Bitmap(assets.getResult("1")); // create new slot2 object
    slot3.regX = slot3.getBounds().width * 0.5;
    slot3.regY = slot3.getBounds().height * 0.5;
    slot3.x = 247;
    slot3.y = 220;
    stage.addChild(slot3); // add blank to slot3 upon startup of game
    spinButton = new createjs.Bitmap(assets.getResult("spinButton")); // create spinButton object
    spinButton.regX = spinButton.getBounds().width * 0.5; // find center of button
    spinButton.regY = spinButton.getBounds().height * 0.5; // find center of button
    spinButton.x = 244;
    spinButton.y = 438;
    stage.addChild(spinButton); // add spin button to stage
    spinButton.on("click", spinButtonClicked); // add mouse click event to spin button
    spinButton.on("mouseover", spinButtonOver); // add mouseover event to spin button
    spinButton.on("mouseout", spinButtonOut); // add mouseout event to spin button
    resetButton = new createjs.Bitmap(assets.getResult("resetButton")); // create spinButton object
    resetButton.regX = resetButton.getBounds().width * 0.5; // find center of button
    resetButton.regY = resetButton.getBounds().height * 0.5; // find center of button
    resetButton.x = 44;
    resetButton.y = 438;
    stage.addChild(resetButton); // add reset button to stage
    resetButton.on("click", resetButtonClicked); // add mouse click event to reset button
}
//# sourceMappingURL=game.js.map