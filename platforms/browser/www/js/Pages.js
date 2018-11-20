var oPages = {

    previousPage: null,

    hide: function(id_) {
        var oPage = document.getElementById(id_);
        if (oPage) {
            oPage.style.display = 'none';
        }
    },

    show: function(id_) {

        if (this.previousPage) {
            this.hide(this.previousPage);
        }

        var oPage = document.getElementById(id_);
        if (oPage) {
            console.log('found');
            oPage.style.display = 'block';

            this.previousPage = id_;
        }
    },

    gotoSplashScreen: function() {

        this.show('pageSplashscreen');

        setTimeout(function() {
            oPages.gotoPageLogo();
        }, 1000);

    },

    gotoPageLogo: function() {
        this.show('pageLogo');

        setTimeout(function() {
            oPages.gotoPageMenu();
        }, 1000);
    },

    gotoPageMenu: function() {
        this.show('pageMenu');

    },

    gotoPageServer: function() {
        this.show('pageServer');

        this.setInputValue('myIp', oGame.myIp);
    },


    setInputValue: function(id_, value_) {
        var a = document.getElementById(id_);
        if (a) {
            a.value = value_;
        }
    }



};