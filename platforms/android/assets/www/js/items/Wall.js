function Wall(breakable_, x_, y_) {
    this.x = x_;
    this.y = y_;

    this.breakableEnabled = breakable_;
}
Wall.prototype = {

    isBreakable: function() {
        return this.breakableEnabled;
    },

    getImage: function() {
        var image;
        if (this.isBreakable()) {
            image = 'wallBreakable';
        } else {
            image = 'wall'
        }
        return './css/images/' + image + '.png'
    },

    draw: function() {

        oCanvas.setLayer(1);
        oCanvas.clearRect(this.x * oGame.caseWidth, this.y * oGame.caseWidth, oGame.caseWidth, oGame.caseWidth);

        oCanvas.drawImage(this.getImage(), this.x * oGame.caseWidth, this.y * oGame.caseWidth, oGame.caseWidth, oGame.caseWidth, this.frameIndex);

    }

};