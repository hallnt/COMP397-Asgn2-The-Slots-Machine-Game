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
    //                          LABEL CLASS                            //
    //////////////////////////////////////////////////////////////////////
    var Label = (function (_super) {
        __extends(Label, _super);
        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++++++++++++
        function Label(labelText, x, y) {
            _super.call(this, labelText);
            this.x = x;
            this.y = y;
        } //end of constructor
        return Label;
    })(createjs.Text);
    objects.Label = Label; // end of label class  
})(objects || (objects = {})); // end of module 
//# sourceMappingURL=label.js.map