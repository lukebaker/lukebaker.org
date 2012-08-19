(function(){

var Compat = {
    keywordsDiv : 'photoKeywords',
    YAHOO : YAHOO,
    host : function() {
        return (typeof webServer != 'undefined') ? webServer : null;
    },
    albumId : function () { return AlbumID; },
    imageId : function () { return ImageID; },
    sessionId : function () { return this.getCookie('SMSESS'); },
    getKeywords : function () {
        if (typeof photoInfo == 'undefined') {
            el = this.YAHOO.util.Dom.get('newKeywords');
            return (el !== null) ? el.innerHTML : '';
        }
        else if (photoInfo[this.imageId()]) {
            return photoInfo[this.imageId()].editKeywords;
        }
    },

    setKeywords : function(keywords, imageId) {
        if (typeof photoInfo == 'undefined') {
            this.YAHOO.util.Dom.get('newKeywords').innerHTML = keywords;
        }
        else if (photoInfo[this.imageId()]) {
            photoInfo[imageId].editKeywords = keywords;
        }
        
    },
    
    getCookie : function (name) {
        var re = new RegExp(name + "=([^;]+)");
        var value = re.exec(document.cookie);
        return (value !== null) ? unescape(value[1]) : null;
    },

    setCookie : function (name, value) {
        var today = new Date();
        // plus 12 hours
        var expiry = new Date(today.getTime() + 12 * 60 * 60 * 1000);
                                                                                
        document.cookie = name + "=" + escape(value) +
            "; expires=" + expiry.toGMTString() +
            "; path=/";
    },

    userOnOwnSite : function () {
        if (this.host() && typeof smugmugUserHomepage != 'undefined') {
            return (this.host() == smugmugUserHomepage);
        }
        else {
            return false;
        }
    }

};

var SmugMugApi = {
    host : Compat.host(),
    url : '/services/api/json/1.2.1/?',
    key: 'N522AF0WzH3uwk7CdlTER8uU5M3qHxYK',
    YC : Compat.YAHOO.util.Connect,
    sessionId : Compat.getCookie('SmugMugApiSessionId'),

    query : function(method, args, callback) {
        /* assume we are logged in for now
        */
        var apiUrl = this.host + this.url + "APIKey=" + this.key +
                    "&method=" + method;
        apiUrl += (this.sessionId) ? "&SessionID=" + this.sessionId : '';
        apiUrl += (args) ? "&" + args : '';

        this.YC.asyncRequest('GET', apiUrl, {
            success : function(o) {
                o.json = (o.responseText) ? eval("("+ o.responseText +")") : '';
                callback(o);
            },
            failure : function(o) {
                o.json = (o.responseText) ? eval("("+ o.responseText +")") : '';
                callback(o);
            }
        });
    },

    isLoggedIn : function () {
        if (Compat.userOnOwnSite()) {
            return (this.sessionId == Compat.sessionId());
        }
        else {
            return false;
        }
    },

    login : function() {
        var that = this;
        this.query('smugmug.login.anonymously', null, function(o) {
            that.YC.asyncRequest('GET', that.host, {
                success : function(ou) {
                    that.sessionId = Compat.sessionId();
                    Compat.setCookie('SmugMugApiSessionId', that.sessionId);
                },
                failure : function(ou) {
                    that.sessionId = Compat.sessionId();
                    Compat.setCookie('SmugMugApiSessionId', that.sessionId);
                }
            });
        });
    }
};

var AdminRating = {
    starIds : ['rating1star', 'rating2star', 'rating3star',
               'rating4star', 'rating5star'],
    starIdsRe : / ?\\?"?(rating[1-5]star)\\?"?/,
    YAHOO : Compat.YAHOO,
    YD : Compat.YAHOO.util.Dom,
    YE : Compat.YAHOO.util.Event,
    hovering : false,

    init : function () {
        if (!Compat.userOnOwnSite()) { return; }
        this.keywordsDiv = this.YD.get(Compat.keywordsDiv);
        if (!this.keywordsDiv) { return; }
        this.attachRating();
        if (!SmugMugApi.isLoggedIn()) { SmugMugApi.login(); }
        /* use YAHOO.util.later when 2.4.0 is available */
        this.later(600, this, function(data) {
            if (!this.hovering) {
                this.highlightStars(this.getRating());
            }
        }, null, true);
    },

    getRating : function () {
        var value = this.starIdsRe.exec(Compat.getKeywords());
        return (value !== null) ? value[1] : null;
    },

    attachRating : function () {
        var ratingDiv = document.createElement('div');
        var imagesHtml = '';
        for (var i = 0; i < this.starIds.length; i++) {
            imagesHtml += '<img style="cursor: pointer;" id="' + this.starIds[i]
                + '" src="http://cdn.smugmug.com/img/star_big.png"/>';
        }
        ratingDiv.innerHTML = '<span class="title">rating: </span>'
                           + '<span id="rating-stars">'+ imagesHtml + '</span>';
        this.keywordsDiv.parentNode.insertBefore(ratingDiv, this.keywordsDiv);
        this.attachRatingEvents();
        this.highlightStars(this.getRating());
    },
    
    attachRatingEvents : function () {
        this.YE.addListener('rating-stars', 'mouseout', this.starOut, this);
        this.YE.addListener(this.starIds, 'mouseover', this.starOver, this);
        this.YE.addListener(this.starIds, 'click', this.starClick, this);
    },

    highlightStars : function (id) {
        var found = (id === null) ? true : false;
        for (var i = 0; i < this.starIds.length; i++) {
            if (!found) {
                if (this.starIds[i] == id) { found = true; }
                this.YD.get(this.starIds[i]).src =
                    'http://cdn.smugmug.com/img/star_big.png';
            }
            else {
                this.YD.get(this.starIds[i]).src =
                    'http://cdn.smugmug.com/img/star_big_outline.png';
            }
        }
    },

    starOver : function  (ev, that) {
        that.hovering = true;
        that.highlightStars(this.id);
    },

    starOut : function (ev, that) {
        that.hovering = false;
        that.highlightStars(that.getRating());
    },

    starClick : function (ev, that) {
        that.addRatingKeyword(Compat.imageId(), this.id);
    },

    addRatingKeyword : function (imageId, keyword) {
        var starIdsRe = this.starIdsRe;
        /* TODO: Use existing image data from page (see photoInfo)*/
        SmugMugApi.query('smugmug.images.getInfo', 'ImageID='+imageId,
            function(resp) {
                var keywords = resp.json.Image.Keywords;
                var newKeywords = keywords.replace(starIdsRe, '') +
                                    ' "' + keyword +'"';
                Compat.setKeywords(newKeywords, imageId);
                newKeywords = escape(newKeywords);
                SmugMugApi.query('smugmug.images.changeSettings',
                    'ImageID=' + imageId + '&Keywords=' + newKeywords,
                    function() {}
                );
            }
        );
    },

    /* lifted from YAHOO.lang 2.4.0 */
    later: function(when, o, fn, data, periodic) {
        when = when || 0;
        o = o || {};
        var m=fn, d=data, f, r;

        if (YAHOO.lang.isString(fn)) {
            m = o[fn];
        }

        if (!m) {
            throw new TypeError("method undefined");
        }

        if (!YAHOO.lang.isArray(d)) {
            d = [data];
        }

        f = function() {
            m.apply(o, d);
        };

        r = (periodic) ? setInterval(f, when) : setTimeout(f, when);

        return {
            interval: periodic,
            cancel: function() {
                if (this.interval) {
                    clearInterval(r);
                } else {
                    clearTimeout(r);
                }
            }
        };
    }
};

AdminRating.init();
})();
