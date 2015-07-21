/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
+++ Source File: COMP397 Assignment 2 - Slot Machine Game                                                   +++
+++ Author: Teleisha Hall                                                                                   +++
+++ ID: 300820822                                                                                           +++
+++ Last Modified By: Teleisha Hall                                                                         +++
+++ Date Last Modified - July 20, 2015                                                                      +++
+++ Program Description: A slot machine game using the Createjs framework                                   +++
+++ Revision History: v5 - https://github.com/hallnt/COMP397-Asgn2-The-Slots-Machine-Game/commits/master    +++
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var objects;
(function (objects) {
    //////////////////////////////////////////////////////////////////////
    //                           REEL CLASS                             //
    //////////////////////////////////////////////////////////////////////
    var Reel = (function (_super) {
        __extends(Reel, _super);
        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++++++++++++
        function Reel(stringImage, x, y) {
            _super.call(this, stringImage);
            this.x = x;
            this.y = y;
        }
        return Reel;
    })(createjs.Bitmap);
    objects.Reel = Reel;
})(objects || (objects = {}));
//# sourceMappingURL=reel.js.map