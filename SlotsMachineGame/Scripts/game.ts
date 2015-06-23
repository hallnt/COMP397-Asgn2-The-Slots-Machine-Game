/// <reference path="typings/easeljs/easeljs.d.ts" />
/// <reference path="typings/tweenjs/tweenjs.d.ts" />
/// <reference path="typings/soundjs/soundjs.d.ts" />
/// <reference path="typings/preloadjs/preloadjs.d.ts" />

/// <reference path="objects/button.ts" />

///////////////////////////////////////////////////////////////
//                  GAME FRAMEWORK VARIABLES                 //
///////////////////////////////////////////////////////////////
var canvas = document.getElementById("canvas");
var stage: createjs.Stage;

var assets: createjs.LoadQueue;
var manifest = [    // load these images when the game starts up
    { id: "slotmachine", src: "assets/images/slot_machine.png" },
    { id: "1", src: "assets/images/blank slot.png" },
    { id: "2", src: "assets/images/banana slot.png" },
    { id: "3", src: "assets/images/cherry slot.png" },
    { id: "4", src: "assets/images/melon slot.png" },
    { id: "spinButton", src: "assets/images/spin button.png" },
    { id: "resetButton", src: "assets/images/reset button.png" },
    { id: "bet1Button", src: "assets/images/bet1 button.png" },
    { id: "bet10Button", src: "assets/images/bet10 button.png" },
    { id: "betmaxButton", src: "assets/images/betMax button.png" },
    { id: "powerButton", src: "assets/images/power.png" },
    { id: "spinSound", src: "assets/audio/spin.wav" }
];

///////////////////////////////////////////////////////////////
//                       GAME VARIABLES                      //
///////////////////////////////////////////////////////////////
var slotmachine: createjs.Bitmap;    //create a reference
var spinButton: objects.Button;
var resetButton: objects.Button;
var bet1Button: objects.Button;
var bet10Button: objects.Button;
var betmaxButton: objects.Button;
var powerButton: objects.Button;
var playerCreditLabel: createjs.Text;
var playerBetLabel: createjs.Text;
var jackpotLabel: createjs.Text;
var spinResultsLabel: createjs.Text;
var slot1: createjs.Bitmap;
var slot2: createjs.Bitmap;
var slot3: createjs.Bitmap;
var increment = 0;
var playerCredit = 1000;    // credit amount player has
var playerBet = 0;  // bet amount
var bet1 = 10;      // 1*10
var bet10 = 100;    // 10*10
var betMax = playerCredit;  // all of player's credit
var winRatio = 0;
var winNumber = 0;
var lossNumber = 0;
var winnings = 0;
var jackpot = 5000;
var turn = 0;

///////////////////////////////////////////////////////////////
//                     PRELOADER FUNCTION                    //
///////////////////////////////////////////////////////////////
function preload() {
    assets = new createjs.LoadQueue();
    assets.installPlugin(createjs.Sound);
    // event listener triggers when assets are completely loaded
    assets.on("complete", init, this);
    assets.loadManifest(manifest);
}

///////////////////////////////////////////////////////////////
//     CALLBACK FUNCTION THAT INITIALIZES GAME OBJECTS       //
///////////////////////////////////////////////////////////////
function init() {
    stage = new createjs.Stage(canvas);  // reference to the stage
    stage.enableMouseOver(20);
    createjs.Ticker.setFPS(60);     // framerate 60 fps for the game
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
function spinButtonClicked(event: createjs.MouseEvent) {
    show();     // call show() method when spin button is clicked
    createjs.Sound.play("spinSound");   // play sound when spin button is clicked

    playerCreditLabel = new createjs.Text(playerCredit.toString(), "16px Consolas", "#0F0FFF");
    playerCreditLabel.regX = playerCreditLabel.getMeasuredWidth() * 0.5;
    playerCreditLabel.regY = playerCreditLabel.getMeasuredHeight() * 0.5;
    playerCreditLabel.x = 91;
    playerCreditLabel.y = 290;
    stage.addChild(playerCreditLabel);

}

///////////////////////////////////////////////////////////////
//CALLBACK FUNCTION THAT RESPONDS TO RESETBUTTON CLICK EVENTS//
///////////////////////////////////////////////////////////////
function resetButtonClicked(event: createjs.MouseEvent) {
    main();     // call show() method when spin button is clicked
}

///////////////////////////////////////////////////////////////
//CALLBACK FUNCTION THAT RESPONDS TO POWERBUTTON CLICK EVENTS//
///////////////////////////////////////////////////////////////
function powerButtonClicked(event: createjs.MouseEvent) {
    if (confirm("Quit Game?")) {
        close();  // end game when power button is clicked    
    }    
}

///////////////////////////////////////////////////////////////
//CALLBACK FUNCTION THAT RESPONDS TO BET1 BUTTON CLICK EVENTS//
///////////////////////////////////////////////////////////////
function bet1ButtonClicked(event: createjs.MouseEvent) {
    stage.removeAllChildren;    // wipe away existing results
    // show '10' in player bet label if bet1 button is clicked
    playerBetLabel = new createjs.Text(bet1.toString(), "16px Consolas", "#0F0FFF");
    playerBetLabel.regX = playerBetLabel.getMeasuredWidth() * 0.5;
    playerBetLabel.regY = playerCreditLabel.getMeasuredHeight() * 0.5;
    playerBetLabel.x = 91;
    playerBetLabel.y = 340;
    stage.addChild(playerBetLabel);  
      
    playerCredit = playerCredit - bet1;   // subtract 10 from player's credit amount

    playerCreditLabel = new createjs.Text(playerCredit.toString(), "16px Consolas", "#0F0FFF");   
    playerCreditLabel.regX = playerCreditLabel.getMeasuredWidth() * 0.5;   
    playerCreditLabel.regY = playerCreditLabel.getMeasuredHeight() * 0.5;  
    playerCreditLabel.x = 91;
    playerCreditLabel.y = 290;
    stage.addChild(playerCreditLabel);    
}

///////////////////////////////////////////////////////////////
//CALLBACK FUNCTION THAT RESPONDS TO BET10BUTTON CLICK EVENTS//
///////////////////////////////////////////////////////////////
function bet10ButtonClicked(event: createjs.MouseEvent) {
    stage.removeChild(playerBetLabel);    // wipe away existing results
    // show '100' in player bet label if bet10 button is clicked
    playerBetLabel = new createjs.Text(bet10.toString(), "16px Consolas", "#0F0FFF");
    playerBetLabel.regX = playerBetLabel.getMeasuredWidth() * 0.5;
    playerBetLabel.regY = playerCreditLabel.getMeasuredHeight() * 0.5;
    playerBetLabel.x = 91;
    playerBetLabel.y = 340;
    stage.addChild(playerBetLabel);

    playerCredit = playerCredit - bet10;   // subtract 100 from player's credit amount

    playerCreditLabel = new createjs.Text(playerCredit.toString(), "16px Consolas", "#0F0FFF");
    playerCreditLabel.regX = playerCreditLabel.getMeasuredWidth() * 0.5;
    playerCreditLabel.regY = playerCreditLabel.getMeasuredHeight() * 0.5;
    playerCreditLabel.x = 91;
    playerCreditLabel.y = 290;
    stage.addChild(playerCreditLabel);
}

///////////////////////////////////////////////////////////////
//CALLBACK FUNCTION THAT RESPOND TO BETMAX BUTTON CLICK EVENT//
///////////////////////////////////////////////////////////////
function betmaxButtonClicked(event: createjs.MouseEvent) {
    stage.removeChild(playerBetLabel);    // wipe away existing results
    // show total player credit in player bet label if betmax button is clicked
    playerBetLabel = new createjs.Text(betMax.toString(), "16px Consolas", "#0F0FFF");
    playerBetLabel.regX = playerBetLabel.getMeasuredWidth() * 0.5;
    playerBetLabel.regY = playerCreditLabel.getMeasuredHeight() * 0.5;
    playerBetLabel.x = 91;
    playerBetLabel.y = 340;
    stage.addChild(playerBetLabel);

    playerCredit = playerCredit - betMax;   // subtract all of player's credit 

    playerCreditLabel = new createjs.Text(playerCredit.toString(), "16px Consolas", "#0F0FFF");
    playerCreditLabel.regX = playerCreditLabel.getMeasuredWidth() * 0.5;
    playerCreditLabel.regY = playerCreditLabel.getMeasuredHeight() * 0.5;
    playerCreditLabel.x = 91;
    playerCreditLabel.y = 290;
    stage.addChild(playerCreditLabel);
}

///////////////////////////////////////////////////////////////
//               FUNCTION TO SPIN SLOT MACHINE               //
///////////////////////////////////////////////////////////////
function Spin() {
    var slot = [" ", " ", " "];     //display images on slots
    var outcome = [0, 0, 0];        //store outcome values after 3 loops of random number generation
    for (var spin = 0; spin < 3; spin++) {      // loop 3 times
        outcome[spin] = Math.floor(Math.random() * 4) + 1;    // generate a random number from 1 to 4
        switch (outcome[spin]) {
            case 1:     // display blank on slot if 1 is generated
                slot[spin] = "1";
                increment++;
                break;
            case 2:     // display banana on slot if 2 is generated
                slot[spin] = "2";
                increment++;
                break;
            case 3:     // display cherry on slot if 3 is generated
                slot[spin] = "3";
                increment++;
                break;
            case 4:     // display melon on slot if 4 is generated
                slot[spin] = "4";
                increment++;
                break;
        }
    }
    return slot;    // return value of slot outcome

    playerCredit = playerCredit - playerBet;
}

///////////////////////////////////////////////////////////////
//              FUNCTION TO DISPLAY SLOT RESULTS             //
///////////////////////////////////////////////////////////////
function show() {
    stage.removeAllChildren;    // wipe away existing results
    var value = Spin();         // store result of Spin() function in variable value

    slot1 = new createjs.Bitmap(assets.getResult(value[0].toString())); // create slot1 object
    slot1.regX = slot1.getBounds().width * 0.5;     // find center of slot
    slot1.regY = slot1.getBounds().height * 0.5;    // find center of slot
    slot1.x = 78;
    slot1.y = 216;

    slot2 = new createjs.Bitmap(assets.getResult(value[1].toString())); // create slot2 object
    slot2.regX = slot2.getBounds().width * 0.5;
    slot2.regY = slot2.getBounds().height * 0.5;
    slot2.x = 161;
    slot2.y = 216;

    slot3 = new createjs.Bitmap(assets.getResult(value[2].toString())); // create slot3 object
    slot3.regX = slot3.getBounds().width * 0.5;
    slot3.regY = slot3.getBounds().height * 0.5;
    slot3.x = 244;
    slot3.y = 216;

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
    slotmachine = new createjs.Bitmap(assets.getResult("slotmachine"));     // create slotMachine object
    stage.addChild(slotmachine);        //add slotMachine object to stage

    slot1 = new createjs.Bitmap(assets.getResult("1")); // create new slot1 object
    slot1.regX = slot1.getBounds().width * 0.5;
    slot1.regY = slot1.getBounds().height * 0.5;
    slot1.x = 78;
    slot1.y = 216;
    stage.addChild(slot1);  // add blank slot to slot1 upon startup of game

    slot2 = new createjs.Bitmap(assets.getResult("1")); // create new slot2 object
    slot2.regX = slot2.getBounds().width * 0.5;
    slot2.regY = slot2.getBounds().height * 0.5;
    slot2.x = 161;
    slot2.y = 216;
    stage.addChild(slot2);  // add blank slot to slot2 upon startup of game

    slot3 = new createjs.Bitmap(assets.getResult("1")); // create new slot2 object
    slot3.regX = slot3.getBounds().width * 0.5;
    slot3.regY = slot3.getBounds().height * 0.5;
    slot3.x = 244;
    slot3.y = 216;
    stage.addChild(slot3);  // add blank to slot3 upon startup of game

    spinButton = new objects.Button(assets.getResult("spinButton"), 244, 438); // create spinButton object
    stage.addChild(spinButton);     // add spin button to stage
    spinButton.on("click", spinButtonClicked);  // add mouse click event to spin button
    
    resetButton = new objects.Button(assets.getResult("resetButton"), 46, 438); // create spinButton object
    stage.addChild(resetButton);     // add reset button to stage
    resetButton.on("click", resetButtonClicked);  // add mouse click event to reset button

    bet1Button = new objects.Button(assets.getResult("bet1Button"), 93, 438); // create bet1Button object
    stage.addChild(bet1Button);     // add bet1 button to stage
    bet1Button.on("click", bet1ButtonClicked);  // add mouse click event to bet1 button

    bet10Button = new objects.Button(assets.getResult("bet10Button"), 140, 438); // create bet10Button object
    stage.addChild(bet10Button);     // add bet10 button to stage
    bet10Button.on("click", bet10ButtonClicked);  // add mouse click event to bet10 button

    betmaxButton = new objects.Button(assets.getResult("betmaxButton"), 188, 438); // create betmaxButton object
    stage.addChild(betmaxButton);     // add betmax button to stage
    betmaxButton.on("click", betmaxButtonClicked);  // add mouse click event to betmax button

    powerButton = new objects.Button(assets.getResult("powerButton"), 285, 438); // create powerButton object
    stage.addChild(powerButton);     // add power button to stage
    powerButton.on("click", powerButtonClicked);  // add mouse click event to power button

    playerCreditLabel = new createjs.Text(playerCredit.toString(), "16px Consolas", "#0F0FFF");    // create playerCreditLabel object
    playerCreditLabel.regX = playerCreditLabel.getMeasuredWidth() * 0.5;    // find center of label
    playerCreditLabel.regY = playerCreditLabel.getMeasuredHeight() * 0.5;   // find center of label
    playerCreditLabel.x = 91;
    playerCreditLabel.y = 290;    
    stage.addChild(playerCreditLabel);     // add playerCreditLabel to stage

    playerBetLabel = new createjs.Text(playerBet.toString(), "16px Consolas", "#0F0FFF");    // create playerBetLabel object
    playerBetLabel.regX = playerBetLabel.getMeasuredWidth() * 0.5;  
    playerBetLabel.regY = playerCreditLabel.getMeasuredHeight() * 0.5;
    playerBetLabel.x = 91;
    playerBetLabel.y = 340;
    stage.addChild(playerBetLabel);     // add playerBetLabel to stage

    jackpotLabel = new createjs.Text(jackpot.toString(), "22px Consolas", "#FF0000");    // create jackpotLabel object
    jackpotLabel.regX = jackpotLabel.getMeasuredWidth() * 0.5;
    jackpotLabel.regY = jackpotLabel.getMeasuredHeight() * 0.5;
    jackpotLabel.x = 221;
    jackpotLabel.y = 290;
    stage.addChild(jackpotLabel);     // add jackpotLabel to stage

    spinResultsLabel = new createjs.Text("Spin", "20px Consolas", "#0000FF");    // create spinResultsLabel object
    spinResultsLabel.regX = spinResultsLabel.getMeasuredWidth() * 0.5;
    spinResultsLabel.regY = spinResultsLabel.getMeasuredHeight() * 0.5;
    spinResultsLabel.x = 221;
    spinResultsLabel.y = 336;
    stage.addChild(spinResultsLabel);     // add spinResultsLabel to stage
}

