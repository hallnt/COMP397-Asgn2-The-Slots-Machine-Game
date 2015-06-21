/// <reference path="typings/easeljs/easeljs.d.ts" />
/// <reference path="typings/tweenjs/tweenjs.d.ts" />
/// <reference path="typings/soundjs/soundjs.d.ts" />
/// <reference path="typings/preloadjs/preloadjs.d.ts" />

///////////////////////////////////////////////////////
//              GAME FRAMEWORK VARIABLES             //
///////////////////////////////////////////////////////
var canvas = document.getElementById("canvas");
var stage: createjs.Stage;

var assets: createjs.LoadQueue;
var manifest = [
    { id: "slotmachine", src: "assets/images/slot_machine.png" },
    { id: "blank", src: "assets/images/blank slot.png" }
];

///////////////////////////////////////////////////////
//                   GAME VARIABLES                  //
///////////////////////////////////////////////////////
var slotmachine: createjs.Bitmap;    //create a reference
var start1: createjs.Bitmap;
var start2: createjs.Bitmap;
var start3: createjs.Bitmap;

///////////////////////////////////////////////////////
//                 PRELOADER FUNCTION                //
///////////////////////////////////////////////////////
function preload() {
    assets = new createjs.LoadQueue();
    // event listener triggers when assets are completely loaded
    assets.on("complete", init, this);
    assets.loadManifest(manifest);
}

///////////////////////////////////////////////////////
// CALLBACK FUNCTION THAT INITIALIZES GAME OBJECTS   //
///////////////////////////////////////////////////////

// Callback function that initializes game objects
function init() {
    stage = new createjs.Stage(canvas);  // reference to the stage
    //stage.enableMouseOver(20);
    createjs.Ticker.setFPS(60);     // framerate 60 fps for the game
    // event listener triggers 60 times every second
    createjs.Ticker.on("tick", gameLoop); 

    // calling main game function
    main();
}

///////////////////////////////////////////////////////
// CALLBACK FUNCTION THAT CREATES OUR MAIN GAME LOOP //
///////////////////////////////////////////////////////
function gameLoop() {
    stage.update();
}

///////////////////////////////////////////////////////
//                 MAIN GAME FUNCTION                //
///////////////////////////////////////////////////////
function main() {
    console.log("Game is Running");
    slotmachine = new createjs.Bitmap(assets.getResult("slotmachine"));
    stage.addChild(slotmachine);

    start1 = new createjs.Bitmap(assets.getResult("blank"));
    start1.regX = start1.getBounds().width * 0.5;
    start1.regY = start1.getBounds().height * 0.5;
    start1.x = 80;
    start1.y = 220;
    stage.addChild(start1);

    start2 = new createjs.Bitmap(assets.getResult("blank"));
    start2.regX = start2.getBounds().width * 0.5;
    start2.regY = start2.getBounds().height * 0.5;
    start2.x = 162;
    start2.y = 220;
    stage.addChild(start2);

    start3 = new createjs.Bitmap(assets.getResult("blank"));
    start3.regX = start3.getBounds().width * 0.5;
    start3.regY = start3.getBounds().height * 0.5;
    start3.x = 247;
    start3.y = 220;
    stage.addChild(start3);
}

