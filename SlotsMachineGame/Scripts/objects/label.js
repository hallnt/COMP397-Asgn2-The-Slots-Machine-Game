var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
// +++++++++++ MODULE TO PROVIDE ATTRIBUTES TO ALL LABELS +++++++++++++++
var objects;
(function (objects) {
    //////////////////////////////////////////////////////////////////////
    //                          LABEL CLASS                            //
    //////////////////////////////////////////////////////////////////////
    var Label = (function (_super) {
        __extends(Label, _super);
        // ++++++++++++++++++++++ CONSTRUCTOR +++++++++++++++++++++++++++
        function Label(Text, x, y) {
            _super.call(this, Text);
            this.regX = this.getBounds().width * 0.5;
            this.regY = this.getBounds().height * 0.5;
            this.x = x;
            this.y = y;
        }
        return Label;
    })(createjs.Text);
    objects.Label = Label; // end of label class  
})(objects || (objects = {})); // end of module 
//# sourceMappingURL=label.js.map