var oClient = {

    sep: '###',

    //send/receive socket
    receiveMessage: function(sMessage_) {

        var tMessage = this.decodeMessage(sMessage_);
        var sUser = tMessage[0];
        var sAction = tMessage[1];
        if (sUser) {
            if (sAction == 'move') {
                var xSide = parseInt(tMessage[2]);
                var ySide = parseInt(tMessage[3]);

                oGame.moveUser(sUser, xSide, ySide);
            } else if (sAction == 'addBomb') {
                oGame.addBombForUser(sUser);
            }
        }

    },
    encodeMessage: function(tParam_) {
        return tParam_.join(this.sep);
    },
    decodeMessage: function(sParam_) {
        return sParam_.split(this.sep);
    },
    sendMessage: function(msg_) {
        console.log('send:' + msg_);

        //code websocket send
        oServer.receiveMessage(msg_);
    },

    //actions
    sendMoveUser: function(user_, xDelta_, yDelta_) {
        var sMessage = this.encodeMessage([user_, 'move', xDelta_, yDelta_]);

        this.sendMessage(sMessage);
    },

    sendAddBomb: function(user_) {
        var sMessage = this.encodeMessage([user_, 'addBomb']);

        this.sendMessage(sMessage);
    },


};