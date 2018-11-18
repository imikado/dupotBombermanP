function Bomb(user_, x_, y_) {
    this.user = user_;
    this.x = x_;
    this.y = y_;
    this.frameIndex = 0;
    this.iCycleLeft = 4;
}
Bomb.prototype = {
    nextFrame: function() {
        this.frameIndex++;

        if (this.frameIndex > 2) {
            this.frameIndex = 0;
        }
    },

    addFlameToCoord: function(x_, y_) {
        if (!oGame.isWalkable(x_, y_)) {
            if (oGame.isWallBreakable(x_, y_)) {
                oGame.addFlameForUser(this.user, x_, y_);
            }
            return false;
        }
        oGame.addFlameForUser(this.user, x_, y_);
        return true;
    },

    addFlameLeft: function(iStart_, iMax_) {
        for (var i = iStart_; i > iMax_; i--) {

            if (!this.addFlameToCoord(this.x + i, this.y)) {
                break;
            }
        }
    },
    addFlameRight: function(iStart_, iMax_) {
        for (var i = iStart_; i < iMax_; i++) {

            if (!this.addFlameToCoord(this.x + i, this.y)) {
                break;
            }
        }
    },
    addFlameBottom: function(iStart_, iMax_) {
        for (var i = iStart_; i < iMax_; i++) {

            if (!this.addFlameToCoord(this.x, this.y + i)) {
                break;
            }
        }
    },
    addFlameTop: function(iStart_, iMax_) {
        for (var i = iStart_; i > iMax_; i--) {

            if (!this.addFlameToCoord(this.x, this.y + i)) {
                break;
            }
        }
    },

    nextCycle: function() {
        this.iCycleLeft--;
        if (this.iCycleLeft <= 0) {
            console.log('remove bomb');

            oGame.addFlameForUser(this.user, this.x, this.y);

            this.addFlameLeft(-1, -3);
            this.addFlameRight(1, 3);
            this.addFlameBottom(1, 3);
            this.addFlameTop(-1, -3);

            oGame.removeBomb(this);
        }
    },

    draw: function() {

        oCanvas.setLayer(2);
        oCanvas.clearRect(this.x * oGame.caseWidth, this.y * oGame.caseWidth, oGame.caseWidth, oGame.caseWidth);

        oCanvas.drawSpriteAt('./css/images/bomb.png', this.x * oGame.caseWidth, this.y * oGame.caseWidth, oGame.caseWidth, oGame.caseWidth, this.frameIndex);

    }
}