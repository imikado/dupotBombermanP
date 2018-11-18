function Flame(user_, x_, y_) {
    this.user = user_;
    this.x = x_;
    this.y = y_;
    this.frameIndex = 0;
    this.iCycleLeft = 3;
}
Flame.prototype = {
    nextFrame: function() {
        this.frameIndex++;

        if (this.frameIndex > 2) {
            this.frameIndex = 0;
        }

        //search for victim
        var oVictim = oGame.searchUserAt(this.x, this.y);
        if (oVictim) {
            oGame.UserBombKilled(this.user, oVictim.color);
        }
    },

    nextCycle: function() {
        this.iCycleLeft--;
        if (this.iCycleLeft <= 0) {
            console.log('remove flame');
            oGame.removeFlame(this);
        }
    },

    draw: function() {

        oCanvas.setLayer(2);
        oCanvas.clearRect(this.x * oGame.caseWidth, this.y * oGame.caseWidth, oGame.caseWidth, oGame.caseWidth);

        oCanvas.drawSpriteAt('./css/images/flame.png', this.x * oGame.caseWidth, this.y * oGame.caseWidth, oGame.caseWidth, oGame.caseWidth, this.frameIndex);

    }
}