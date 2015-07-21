/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
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
    //                           REEL CLASS                             //
    //////////////////////////////////////////////////////////////////////
    export class Reel extends createjs.Bitmap {

        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++++++++++++
        constructor(stringImage: string, x: number, y: number) {
            super(stringImage);
            this.x = x;
            this.y = y;
        }

    }

}