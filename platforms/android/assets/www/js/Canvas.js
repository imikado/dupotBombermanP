var oCanvas = {

    prefixId: '',
    tLayer: [],
    layerSelected: '',
    width: 0,
    height: 0,

    tImage: Array(),

    init: function(id_, width_, height_) {
        this.prefixId = id_;
        this.width = width_;
        this.height = height_;
    },

    getLayer: function(id_) {

        if (!this.tLayer[id_]) {
            var oCanvasLayer = document.getElementById(this.prefixId + id_);

            if (oCanvasLayer) {
                var oContextLayer = oCanvasLayer.getContext("2d");

                oContextLayer.canvas.width = this.width;
                oContextLayer.canvas.height = this.height;


                if (oContextLayer) {
                    this.tLayer[id_] = oContextLayer;
                }

            }
        }
        return this.tLayer[id_];
    },

    getCurrentLayer: function() {
        return this.getLayer(this.layerSelected);
    },

    setLayer: function(id_) {
        this.layerSelected = id_;
    },

    drawImage: function(src_, y_, x_, width_, height_) {

        var oCurrentLayer = this.getCurrentLayer();

        if (this.tImage[src_] && this.tImage[src_].complete) {
            oCurrentLayer.drawImage(this.tImage[src_], y_, x_, width_, height_);
        } else {
            var oImage = new Image(width_, height_);
            var that = this;
            oImage.onload = function() {
                that.drawImage(src_, y_, x_, width_, height_);
            }
            oImage.src = src_;
            this.tImage[src_] = oImage;
        }

    },

    clearRect: function(x_, y_, width_, height_) {

        var oCurrentLayer = this.getCurrentLayer();
        oCurrentLayer.clearRect(x_, y_, width_, height_);

    },

    drawSpriteAt: function(src_, y_, x_, width_, height_, frameIndex_) {

        var oCurrentLayer = this.getCurrentLayer();

        var spriteIndex = frameIndex_;

        var pixelsLeft = (spriteIndex * 80),
            pixelsTop = 0,
            canvasPosX = y_,
            canvasPosY = x_;

        if (this.tImage[src_] && this.tImage[src_].complete) {

            oCurrentLayer.clearRect(y_, x_, width_, height_);

            oCurrentLayer.drawImage(
                this.tImage[src_],
                pixelsLeft,
                pixelsTop,
                width_ * 3,
                height_ * 3,
                canvasPosX,
                canvasPosY,
                width_,
                height_);

        } else {

            var oImage = new Image(width_, height_);
            var that = this;
            oImage.onload = function() {
                that.drawSpriteAt(src_, y_, x_, width_, height_, frameIndex_);
            }
            oImage.src = src_;

            this.tImage[src_] = oImage;

        }
    },

    drawSprite: function(src_, y_, x_, width_, height_) {

        var spriteIndex = 0;

        var pixelsLeft = (spriteIndex * 80),
            pixelsTop = 0,

            canvasPosX = y_,
            canvasPosY = x_;

        var oCurrentLayer = this.getCurrentLayer();

        if (this.tImage[src_] && this.tImage[src_].complete) {
            oCurrentLayer.drawImage(
                this.tImage[src_],
                pixelsLeft,
                pixelsTop,
                width_ * 3,
                height_ * 3,
                canvasPosX,
                canvasPosY,
                width_,
                height_);
        } else {
            var oImage = new Image(width_, height_);
            that = this;
            oImage.onload = function() {
                that.drawSprite(src_, y_, x_, width_, height_);
            }
            oImage.src = src_;

            this.tImage[src_] = oImage;
        }



    }

};