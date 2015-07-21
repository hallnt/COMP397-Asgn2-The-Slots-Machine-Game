/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
+++ Source File: COMP397 Assignment 2 - Slot Machine Game                                                   +++
+++ Author: Teleisha Hall                                                                                   +++
+++ ID: 300820822                                                                                           +++
+++ Last Modified By: Teleisha Hall                                                                         +++
+++ Date Last Modified - July 20, 2015                                                                      +++
+++ Program Description: A slot machine game using the Createjs framework                                   +++
+++ Revision History: v5 - https://github.com/hallnt/COMP397-Asgn2-The-Slots-Machine-Game/commits/master    +++
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
/// <reference path="typings/stats/stats.d.ts" />
/// <reference path="typings/easeljs/easeljs.d.ts" />
/// <reference path="typings/tweenjs/tweenjs.d.ts" />
/// <reference path="typings/soundjs/soundjs.d.ts" />
/// <reference path="typings/preloadjs/preloadjs.d.ts" />
/// <reference path="objects/button.ts" />
/// <reference path="objects/label.ts" />
/// <reference path="objects/reel.ts" />
///////////////////////////////////////////////////////////////
//                  GAME FRAMEWORK VARIABLES                 //
///////////////////////////////////////////////////////////////
var canvas = document.getElementById("canvas");
var stage;
var stats;
var assets;
var manifest = [
    { id: "slotmachine", src: "assets/images/slot_machine.png" },
    { id: "blank", src: "assets/images/blank slot.png" },
    { id: "banana", src: "assets/images/banana slot.png" },
    { id: "cherry", src: "assets/images/cherry slot.png" },
    { id: "melon", src: "assets/images/melon slot.png" },
    { id: "jpot", src: "assets/images/jackpot slot.png" },
    { id: "spinButton", src: "assets/images/spin button.png" },
    { id: "disabledSpinButton", src: "assets/images/disableSpin button.png" },
    { id: "resetButton", src: "assets/images/reset button.png" },
    { id: "bet1Button", src: "assets/images/bet1 button.png" },
    { id: "bet10Button", src: "assets/images/bet10 button.png" },
    { id: "betmaxButton", src: "assets/images/betMax button.png" },
    { id: "powerButton", src: "assets/images/power.png" },
    { id: "spinSound", src: "assets/audio/spin.wav" },
    { id: "winSound", src: "assets/audio/winSound.wav" },
    { id: "jackpotSound", src: "assets/audio/JackpotSound.wav" }
];
///////////////////////////////////////////////////////////////
//                       GAME VARIABLES                      //
///////////////////////////////////////////////////////////////
// slot machine
var slotmachine; //create a reference
// buttons
var spinButton;
var disabledSpinButton;
var resetButton;
var bet1Button;
var bet10Button;
var betmaxButton;
var powerButton;
// labels
var playerCreditLabel;
var playerBetLabel;
var jackpotLabel;
var spinResultsLabel;
var winsLabel;
var lossLabel;
var turnsLabel;
// reels
var reel1;
var reel2;
var reel3;
// score variables
var increment = 0;
var credit = 1000; // credit amount player has
var betAmount = 0; // bet amount
var bet1 = 1;
var bet10 = 10;
var jackpot = 5000;
var wins = 0;
var losses = 0;
var turns = 0;
var spinResult;
var result = " ";
///////////////////////////////////////////////////////////////
//                     PRELOADER FUNCTION                    //
///////////////////////////////////////////////////////////////
function preload() {
    assets = new createjs.LoadQueue();
    assets.installPlugin(createjs.Sound);
    // event listener triggers when assets are completely loaded
    assets.on("complete", init, this);
    assets.loadManifest(manifest);
    //Setup statistics object
    setupStats();
}
///////////////////////////////////////////////////////////////
//     CALLBACK FUNCTION THAT INITIALIZES GAME OBJECTS       //
///////////////////////////////////////////////////////////////
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
//              FUNCTION TO SETUP STAT COUNTING              //
///////////////////////////////////////////////////////////////
function setupStats() {
    stats = new Stats();
    stats.setMode(0); // set to fps
    // align bottom-right
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '850px';
    stats.domElement.style.top = '130px';
    document.body.appendChild(stats.domElement);
}
///////////////////////////////////////////////////////////////
//     CALLBACK FUNCTION THAT CREATES OUR MAIN GAME LOOP     //
///////////////////////////////////////////////////////////////
function gameLoop() {
    stats.begin(); // Begin measuring
    stage.update();
    stats.end(); // end measuring
}
///////////////////////////////////////////////////////////////
//              FUNCTION TO UPDATE GAME SCORES               //
///////////////////////////////////////////////////////////////
function updateScores() {
    playerCreditLabel.text = credit.toString();
    playerBetLabel.text = betAmount.toString();
    winsLabel.text = wins.toString();
    lossLabel.text = losses.toString();
    turnsLabel.text = turns.toString();
}
///////////////////////////////////////////////////////////////
//           FUNCTION TO SPIN SLOT MACHINE REELS             //
///////////////////////////////////////////////////////////////
function spin() {
    var betLine = [" ", " ", " "];
    var outcome = [0, 0, 0]; //store outcome values after 3 loops of random number generation
    for (var spin = 0; spin < 3; spin++) {
        outcome[spin] = Math.floor(Math.random() * 5) + 1; // generate a random number from 1 to 5
        switch (outcome[spin]) {
            case 1:
                betLine[spin] = "blank";
                increment++;
                break;
            case 2:
                betLine[spin] = "banana";
                increment++;
                break;
            case 3:
                betLine[spin] = "cherry";
                increment++;
                break;
            case 4:
                betLine[spin] = "melon";
                increment++;
                break;
            case 5:
                betLine[spin] = "jpot";
                increment++;
                break;
        }
    }
    return betLine; // return value of betLine outcome
}
///////////////////////////////////////////////////////////////
//       FUNCTION TO CHECK IF PLAYER HAS ENOUGH CREDIT       //
///////////////////////////////////////////////////////////////
function hasEnoughCredit(betAmt) {
    if (credit >= betAmt) {
        return true;
    }
    return false;
}
///////////////////////////////////////////////////////////////
//             FUNCTION TO DISPLAY SPIN RESULTS              //
///////////////////////////////////////////////////////////////
function displaySpinResults() {
    stage.removeAllChildren; // wipe away existing results
    spinResult = spin(); // store result of spin function in variable value
    reel1 = new objects.Reel(assets.getResult(spinResult[0].toString()), 41, 152);
    reel2 = new objects.Reel(assets.getResult(spinResult[1].toString()), 124, 152);
    reel3 = new objects.Reel(assets.getResult(spinResult[2].toString()), 207, 152);
    console.log(spinResult[0] + " " + spinResult[1] + " " + spinResult[2]);
    // add images to reels based on outcome from Spin() function
    stage.addChild(reel1);
    stage.addChild(reel2);
    stage.addChild(reel3);
    // player wins if all 3 reels are equal but IS NOT the jackpot slot image nor the blank slot image
    if (((spinResult[0] == spinResult[1]) && (spinResult[0] == spinResult[2])) && ((spinResult[1] != "jpot") && (spinResult[1] != "blank"))) {
        createjs.Sound.play("winSound"); // play sound when player wins
        credit = credit + (betAmount * 10);
        wins++;
        turns++;
        betAmount = 0;
        spinResultsLabel.text = "You Win!";
        updateScores();
    }
    // player hits jackpot if all 3 reels are equal and IS the jackpot slot image
    if (((spinResult[0] == spinResult[1]) && (spinResult[0] == spinResult[2])) && spinResult[1] == "jpot") {
        createjs.Sound.play("jackpotSound"); // play sound when player wins
        credit = credit + jackpot;
        wins++;
        turns++;
        betAmount = 0;
        spinResultsLabel.text = "JACKPOT!";
        updateScores();
    }
    // player loses
    if (spinResult[0] != spinResult[1]) {
        losses++;
        turns++;
        betAmount = 0;
        spinResultsLabel.text = "You Lose!";
        updateScores();
    }
    if (((spinResult[0] == spinResult[1]) && (spinResult[0] == spinResult[2])) && spinResult[1] == "blank") {
        losses++;
        turns++;
        betAmount = 0;
        spinResultsLabel.text = "You Lose!";
        updateScores();
    }
}
///////////////////////////////////////////////////////////////
//CALLBACK FUNCTION THAT RESPONDS TO SPIN BUTTON CLICK EVENTS//
///////////////////////////////////////////////////////////////
function spinButtonClicked(event) {
    // check if user placed a bet
    if (betAmount > 0) {
        createjs.Sound.play("spinSound"); // play sound when spin button is clicked
        displaySpinResults();
    }
    else {
        spinResultsLabel.text = "Place Bet";
    }
}
///////////////////////////////////////////////////////////////
//CALLBACK FUNCTION THAT RESPONDS TO RESETBUTTON CLICK EVENTS//
///////////////////////////////////////////////////////////////
function resetButtonClicked(event) {
    if (confirm("Reset Game?")) {
        credit = 1000;
        betAmount = 0;
        wins = 0;
        losses = 0;
        turns = 0;
        spinResultsLabel.text = "Place Bet";
        main();
    }
}
///////////////////////////////////////////////////////////////
//CALLBACK FUNCTION THAT RESPONDS TO POWERBUTTON CLICK EVENTS//
///////////////////////////////////////////////////////////////
function powerButtonClicked(event) {
    if (confirm("Quit Game?")) {
        window.close(); // end game when power button is clicked    
    }
}
///////////////////////////////////////////////////////////////
//CALLBACK FUNCTION THAT RESPONDS TO BET1 BUTTON CLICK EVENTS//
///////////////////////////////////////////////////////////////
function bet1ButtonClicked(event) {
    if (hasEnoughCredit(1)) {
        betAmount = bet1; // bet 1 credit
        credit = credit - betAmount;
        playerBetLabel.text = betAmount.toString();
        playerCreditLabel.text = credit.toString();
        spinResultsLabel.text = "Spin";
    }
    else {
        spinResultsLabel.text = "Insufficient Credit"; // player does not have enough credit to place bet
    }
}
///////////////////////////////////////////////////////////////
//CALLBACK FUNCTION THAT RESPONDS TO BET10BUTTON CLICK EVENTS//
///////////////////////////////////////////////////////////////
function bet10ButtonClicked(event) {
    if (hasEnoughCredit(10)) {
        betAmount = bet10; // bet 10 credits
        credit = credit - betAmount;
        playerBetLabel.text = betAmount.toString();
        playerCreditLabel.text = credit.toString();
        spinResultsLabel.text = "Spin";
    }
    else {
        spinResultsLabel.text = "Insufficient Credit"; // player does not have enough credit to place bet
    }
}
///////////////////////////////////////////////////////////////
//CALLBACK FUNCTION THAT RESPOND TO BETMAX BUTTON CLICK EVENT//
///////////////////////////////////////////////////////////////
function betmaxButtonClicked(event) {
    betAmount = credit; // bet total remaining credit
    credit = credit - betAmount;
    playerBetLabel.text = betAmount.toString();
    playerCreditLabel.text = credit.toString();
    spinResultsLabel.text = "Spin";
}
///////////////////////////////////////////////////////////////
//                     MAIN GAME FUNCTION                    //
///////////////////////////////////////////////////////////////
function main() {
    console.log("Game is Running");
    // create and add slot machine to the stage
    slotmachine = new createjs.Bitmap(assets.getResult("slotmachine")); // create slotMachine object
    stage.addChild(slotmachine); //add slotMachine object to stage
    // create and add reel objects to the stage
    reel1 = new objects.Reel(assets.getResult("blank"), 41, 152);
    stage.addChild(reel1); // add blank slot to reel1 upon startup of game
    reel2 = new objects.Reel(assets.getResult("blank"), 124, 152);
    stage.addChild(reel2); // add blank slot to reel2 upon startup of game
    reel3 = new objects.Reel(assets.getResult("blank"), 207, 152);
    stage.addChild(reel3); // add blank slot to reel3 upon startup of game
    // create and add button objects to the stage
    spinButton = new objects.Button(assets.getResult("spinButton"), 244, 438); // create spinButton object
    stage.addChild(spinButton); // add spin button to stage
    spinButton.on("click", spinButtonClicked); // add mouse click event to spin button
    resetButton = new objects.Button(assets.getResult("resetButton"), 46, 438); // create spinButton object
    stage.addChild(resetButton); // add reset button to stage
    resetButton.on("click", resetButtonClicked); // add mouse click event to reset button
    bet1Button = new objects.Button(assets.getResult("bet1Button"), 93, 438); // create bet1Button object
    stage.addChild(bet1Button); // add bet1 button to stage
    bet1Button.on("click", bet1ButtonClicked); // add mouse click event to bet1 button
    bet10Button = new objects.Button(assets.getResult("bet10Button"), 140, 438); // create bet10Button object
    stage.addChild(bet10Button); // add bet10 button to stage
    bet10Button.on("click", bet10ButtonClicked); // add mouse click event to bet10 button
    betmaxButton = new objects.Button(assets.getResult("betmaxButton"), 188, 438); // create betmaxButton object
    stage.addChild(betmaxButton); // add betmax button to stage
    betmaxButton.on("click", betmaxButtonClicked); // add mouse click event to betmax button
    powerButton = new objects.Button(assets.getResult("powerButton"), 285, 438); // create powerButton object
    stage.addChild(powerButton); // add power button to stage
    powerButton.on("click", powerButtonClicked); // add mouse click event to power button
    // create and add label objects to the stage
    playerCreditLabel = new objects.Label(credit.toString(), 77, 269); // create playerCreditLabel object
    stage.addChild(playerCreditLabel); // add playerCredit label to stage
    playerBetLabel = new objects.Label(betAmount.toString(), 80, 311); // create playerBetLabel object
    stage.addChild(playerBetLabel); // add playerBet ;abel to stage
    jackpotLabel = new objects.Label(jackpot.toString(), 208, 264); // create jackpotLabel object
    stage.addChild(jackpotLabel); // add jackpot label to stage
    spinResultsLabel = new objects.Label("Place Bet", 180, 310); // create spinResultsLabel object
    stage.addChild(spinResultsLabel); // add spinResultsLabel to stage
    winsLabel = new objects.Label(wins.toString(), 96, 347); // create winsLabel object
    stage.addChild(winsLabel); // add wins label to stage
    lossLabel = new objects.Label(losses.toString(), 176, 347); // create winsLabel object
    stage.addChild(lossLabel); // add losses label to stage
    turnsLabel = new objects.Label(turns.toString(), 242, 347); // create winsLabel object
    stage.addChild(turnsLabel); // add turns label to stage
}
//# sourceMappingURL=game.js.map