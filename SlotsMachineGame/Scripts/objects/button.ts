﻿/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
+++ Source File: COMP397 Assignment 2 - Slot Machine Game                                                   +++
+++ Author: Teleisha Hall                                                                                   +++
+++ ID: 300820822                                                                                           +++
+++ Last Modified By: Teleisha Hall                                                                         +++
+++ Date Last Modified - July 20, 2015                                                                      +++
+++ Program Description: A slot machine game using the Createjs framework                                   +++
+++ Revision History: v5 - https://github.com/hallnt/COMP397-Asgn2-The-Slots-Machine-Game/commits/master    +++
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

module objects {   
    //////////////////////////////////////////////////////////////////////
    //                          BUTTON CLASS                            //
    //////////////////////////////////////////////////////////////////////
    export class Button extends createjs.Bitmap {

        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++++++++++++
        constructor(imageString: string, x: number, y: number) {
            super(imageString);
            this.regX = this.getBounds().width * 0.5;      //  find center of button  
            this.regY = this.getBounds().height * 0.5;     //  find center of button
            this.x = x;
            this.y = y;

            // CREATING EVENT LISTENERS FOR MOUSEOVER AND MOUSEOUT EVENTS
            this.on("mouseover", this.OnOver, this);
            this.on("mouseout", this.OnOut, this);
        }   //end of constructor

        // PUBLIC METHODS ++++++++++++++++++++++++++++++++++++++++++++++++
        public OnOver(event: createjs.MouseEvent): void {
            this.alpha = 0.8; // 80% opacity (20% transparent)
        }

        public OnOut(event: createjs.MouseEvent): void {
            this.alpha = 1.0; // 100% opacity (no transparency)
        }

    }   // end of button class  

}   // end of module