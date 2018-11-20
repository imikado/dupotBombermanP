var oGame = {

    width: null,
    height: null,

    startX: null,
    startY: null,

    user: 'blue',

    tUsers: Array(),
    tMap: Array(),

    frameIndex: 0,

    tBombs: Array(),
    tFlames: Array(),

    myIp: null,

    init: function(width_, height_) {
        this.width = width_;
        this.height = height_;
    },

    // Application Constructor
    start: function() {
        console.log('Game width:' + this.width + ' height:' + this.height);

        oCanvas.init('layer', this.width, this.height);

        this.caseWidth = (this.width / 13);

        this.loadUsers();
        this.build();

        window.requestAnimationFrame(cycleAnimation);

        setTimeout(cycle, 2000);
    },

    animation: function() {
        for (var i in this.tUsers) {

            var oUser = this.tUsers[i];
            oUser.nextFrame();
            oUser.draw();

        }

        for (var i in this.tBombs) {
            var oBomb = this.tBombs[i];
            oBomb.nextFrame();
            oBomb.draw();
        }

        for (var i in this.tFlames) {
            var oFlame = this.tFlames[i];
            oFlame.nextFrame();
            oFlame.draw();
        }
    },

    cycle: function() {
        console.log('cycle');

        for (var i in this.tBombs) {
            this.tBombs[i].nextCycle();
        }

        for (var i in this.tFlames) {
            this.tFlames[i].nextCycle();
        }
    },



    loadUsers: function() {

        this.tUsers = Array();

        var oUserBlue = new User('blue', 'persoBlue.png', 1, 1);
        var oUserRed = new User('red', 'persoRed.png', 4, 1);
        var oUseYellow = new User('yellow', 'persoYellow.png', 1, 15);
        var oUserGreen = new User('green', 'persoGreen.png', 11, 15);

        this.tUsers['blue'] = oUserBlue;
        this.tUsers['red'] = oUserRed;
        this.tUsers['yellow'] = oUseYellow;
        this.tUsers['green'] = oUserGreen;

    },

    searchUserAt: function(x_, y_) {
        for (var i in this.tUsers) {

            var oUser = this.tUsers[i];

            if (oUser.x == x_ && oUser.y == y_) {
                return oUser;
            }

        }
        return null;
    },

    isWalkable: function(x_, y_) {
        if (this.tMap[x_ + '_' + y_] === null) {
            return true;
        }
        console.log(this.tMap[x_ + '_' + y_]);
        return false;
    },

    isWallBreakable: function(x_, y_) {
        if (this.tMap[x_ + '_' + y_] === null) {
            return false;
        }
        if (this.tMap[x_ + '_' + y_].isBreakable()) {
            return true;
        }
    },

    moveUser: function(user_, xSide_, ySide_) {

        var oUser = this.tUsers[user_];

        if (this.isWalkable(oUser.x + xSide_, oUser.y + ySide_)) {

            oUser.targetX = oUser.x + xSide_;
            oUser.targetY = oUser.y + ySide_;

            console.log('can move');
        }


    },

    clearRect: function(layer_, x_, y_) {

        oCanvas.setLayer(layer_);
        oCanvas.clearRect(x_ * this.caseWidth, y_ * this.caseWidth, this.caseWidth, this.caseWidth);
    },

    removeBomb: function(oBomb_) {
        var user = oBomb_.user;
        delete this.tBombs[oBomb_.x + '_' + oBomb_.y];

        this.clearRect(2, oBomb_.x, oBomb_.y);

        this.tUsers[user].enableAddBomb();
    },

    removeFlame: function(oFlame_) {
        delete this.tFlames[oFlame_.x + '_' + oFlame_.y];

        this.clearRect(2, oFlame_.x, oFlame_.y);

        if (this.isWallBreakable(oFlame_.x, oFlame_.y)) {
            this.tMap[oFlame_.x + '_' + oFlame_.y] = null;

            this.clearRect(1, oFlame_.x, oFlame_.y);
        }


    },

    UserBombKilled: function(user_, userVictim_) {
        var oVictim = this.tUsers[userVictim_];

        delete this.tUsers[userVictim_];

        this.clearRect(3, oVictim.x, oVictim.y);
    },

    addBombForUser: function(user_) {
        var oUser = this.tUsers[user_];

        var oBomb = new Bomb(user_, oUser.x, oUser.y);

        this.tBombs[oBomb.x + '_' + oBomb.y] = oBomb;

    },

    addFlameForUser: function(user_, x_, y_) {
        var oFlame = new Flame(user_, x_, y_);

        this.tFlames[oFlame.x + '_' + oFlame.y] = oFlame;
    },

    getCurrentUser: function() {
        return this.tUsers[this.user];
    },

    //user actions

    userAddBomb: function() {
        var oCurrentUser = this.getCurrentUser();

        if (oCurrentUser.canAddBomb()) {

            oCurrentUser.disableAddBomb();
            oClient.sendAddBomb(this.user);
        }

    },

    userGoRight: function() {
        oClient.sendMoveUser(this.user, 1, 0);
    },
    userGoLeft: function() {
        oClient.sendMoveUser(this.user, -1, 0);
    },
    userGoUp: function() {
        oClient.sendMoveUser(this.user, 0, -1);
    },
    userGoDown: function() {
        oClient.sendMoveUser(this.user, 0, 1);
    },






    build: function() {

        var tStartMap = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 2, 0, 2, 0, 0, 0, 0, 1],
            [1, 0, 1, 2, 1, 2, 1, 0, 1, 0, 1, 0, 1],
            [1, 2, 2, 0, 0, 0, 2, 2, 0, 2, 2, 0, 1],
            [1, 2, 1, 2, 1, 0, 1, 0, 1, 0, 1, 2, 1],
            [1, 0, 0, 0, 2, 0, 2, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 0, 2, 0, 0, 0, 0, 0, 2, 0, 2, 1],
            [1, 2, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 2, 0, 2, 0, 2, 0, 2, 2, 2, 0, 1],
            [1, 0, 1, 2, 1, 0, 1, 0, 1, 0, 1, 2, 1],
            [1, 0, 2, 2, 0, 0, 0, 2, 0, 0, 0, 2, 1],
            [1, 2, 1, 0, 1, 0, 1, 0, 1, 2, 1, 2, 1],
            [1, 0, 0, 2, 0, 2, 0, 2, 2, 0, 0, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 2, 1, 2, 1, 0, 1],
            [1, 0, 0, 2, 0, 0, 2, 0, 0, 2, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],

        ];

        console.log('build');

        for (var yLoop = 0; yLoop < 17; yLoop++) {

            for (var xLoop = 0; xLoop < 13; xLoop++) {

                if (tStartMap[yLoop][xLoop] == 1) {

                    var oWall = new Wall(false, xLoop, yLoop);
                    oWall.draw();

                    this.tMap[xLoop + '_' + yLoop] = oWall;

                } else if (tStartMap[yLoop][xLoop] == 2) {
                    var oWall = new Wall(true, xLoop, yLoop);
                    oWall.draw();

                    this.tMap[xLoop + '_' + yLoop] = oWall;
                } else if (tStartMap[yLoop][xLoop] == 0) {
                    this.tMap[xLoop + '_' + yLoop] = null;
                } else {
                    console.error('Value unknown for tMap: ' + tStartMap[yLoop][xLoop]);
                }

            }

        }




    },

    onmouseup: function(e) {
        console.log('mouse up');

        var touchobj = e.changedTouches[0];
        var endX = touchobj.pageX;
        var endY = touchobj.pageY;

        var deltaHoriz = (endX - this.startX);
        var deltaVert = (endY - this.startY);

        if (Math.abs(deltaHoriz) > Math.abs(deltaVert)) {
            if (deltaHoriz > 0) {
                console.log('droite');
                this.userGoRight();
            } else {
                console.log('gauche');
                this.userGoLeft();
            }
        } else {
            if (deltaVert > 0) {
                console.log('bas');
                this.userGoDown();
            } else {
                console.log('haut');
                this.userGoUp();
            }
        }
    },

    onmousedown: function(e) {

        var touchobj = e.changedTouches[0];
        this.startX = touchobj.pageX;
        this.startY = touchobj.pageY;

    }
};