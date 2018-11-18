function User(color_, img_, x_, y_) {
    this.color = color_;
    this.img = img_;
    this.x = x_;
    this.y = y_;
    this.frameIndex = 0;
    this.targetX = null;
    this.targetY = null;
    this.frameMove = 1 / 3;
    this.addBombEnabled = 1;
}
User.prototype = {

    nextFrame: function() {
        this.frameIndex++;

        if (this.frameIndex > 2) {
            this.frameIndex = 0;
        }
    },

    disableAddBomb: function() {
        this.addBombEnabled = 0;
    },
    enableAddBomb: function() {
        this.addBombEnabled = 1;
    },

    canAddBomb: function() {
        return this.addBombEnabled;
    },


    draw: function() {

        oCanvas.setLayer(3);
        oCanvas.clearRect(this.x * oGame.caseWidth, this.y * oGame.caseWidth, oGame.caseWidth, oGame.caseWidth);

        var delta = (this.frameMove);

        if (this.targetX !== null && this.targetX != this.x) {

            if (this.targetX > this.x) {

                if ((this.x + delta) > this.targetX) {
                    this.x = this.targetX;
                } else {
                    this.x += delta;
                }

            } else {

                if ((this.x - delta) < this.targetX) {
                    this.x = this.targetX;
                } else {
                    this.x -= delta;
                }
            }

        } else if (this.targetY !== null && this.targetY != this.y) {

            if (this.targetY > this.y) {

                if ((this.y + delta) > this.targetY) {
                    this.y = this.targetY;
                } else {
                    this.y += delta;
                }

            } else {

                if ((this.y - delta) < this.targetY) {
                    this.y = this.targetY;
                } else {
                    this.y -= delta;
                }
            }

        }
        oCanvas.drawSpriteAt('./css/images/' + this.img, this.x * oGame.caseWidth, this.y * oGame.caseWidth, oGame.caseWidth, oGame.caseWidth, this.frameIndex);

    }

};