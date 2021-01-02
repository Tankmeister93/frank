/*
 * Purl (A JavaScript URL parser) v2.3.1
 * Developed and maintanined by Mark Perkins, mark@allmarkedup.com
 * Source repository: https://github.com/allmarkedup/jQuery-URL-Parser
 * Licensed under an MIT-style license. See https://github.com/allmarkedup/jQuery-URL-Parser/blob/master/LICENSE for details.
 */
!function (t) {
    "function" == typeof define && define.amd ? define(t) : window.purl = t()
}(function () {
    function t(t, e) {
        for (var r = decodeURI(t), n = l[e ? "strict" : "loose"].exec(r), a = {
            attr: {},
            param: {},
            seg: {}
        }, i = 14; i--;) a.attr[h[i]] = n[i] || "";
        return a.param.query = o(a.attr.query), a.param.fragment = o(a.attr.fragment), a.seg.path = a.attr.path.replace(/^\/+|\/+$/g, "").split("/"), a.seg.fragment = a.attr.fragment.replace(/^\/+|\/+$/g, "").split("/"), a.attr.base = a.attr.host ? (a.attr.protocol ? a.attr.protocol + "://" + a.attr.host : a.attr.host) + (a.attr.port ? ":" + a.attr.port : "") : "", a
    }

    function e(t) {
        var e = t.tagName;
        return "undefined" != typeof e ? p[e.toLowerCase()] : e
    }

    function r(t, e) {
        if (0 === t[e].length) return t[e] = {};
        var r = {};
        for (var n in t[e]) r[n] = t[e][n];
        return t[e] = r, r
    }

    function n(t, e, a, o) {
        var i = t.shift();
        if (i) {
            var f = e[a] = e[a] || [];
            "]" == i ? u(f) ? "" !== o && f.push(o) : "object" == typeof f ? f[c(f).length] = o : f = e[a] = [e[a], o] : ~i.indexOf("]") ? (i = i.substr(0, i.length - 1), !m.test(i) && u(f) && (f = r(e, a)), n(t, f, i, o)) : (!m.test(i) && u(f) && (f = r(e, a)), n(t, f, i, o))
        } else u(e[a]) ? e[a].push(o) : "object" == typeof e[a] ? e[a] = o : "undefined" == typeof e[a] ? e[a] = o : e[a] = [e[a], o]
    }

    function a(t, e, r) {
        if (~e.indexOf("]")) {
            var a = e.split("[");
            n(a, t, "base", r)
        } else {
            if (!m.test(e) && u(t.base)) {
                var o = {};
                for (var f in t.base) o[f] = t.base[f];
                t.base = o
            }
            "" !== e && i(t.base, e, r)
        }
        return t
    }

    function o(t) {
        return s(String(t).split(/&|;/), function (t, e) {
            try {
                e = decodeURIComponent(e.replace(/\+/g, " "))
            } catch (r) {
            }
            var n = e.indexOf("="), o = f(e), i = e.substr(0, o || n), s = e.substr(o || n, e.length);
            return s = s.substr(s.indexOf("=") + 1, s.length), "" === i && (i = e, s = ""), a(t, i, s)
        }, {base: {}}).base
    }

    function i(t, e, r) {
        var n = t[e];
        "undefined" == typeof n ? t[e] = r : u(n) ? n.push(r) : t[e] = [n, r]
    }

    function f(t) {
        for (var e, r, n = t.length, a = 0; n > a; ++a) if (r = t[a], "]" == r && (e = !1), "[" == r && (e = !0), "=" == r && !e) return a
    }

    function s(t, e) {
        for (var r = 0, n = t.length >> 0, a = arguments[2]; n > r;) r in t && (a = e.call(void 0, a, t[r], r, t)), ++r;
        return a
    }

    function u(t) {
        return "[object Array]" === Object.prototype.toString.call(t)
    }

    function c(t) {
        var e = [];
        for (var r in t) t.hasOwnProperty(r) && e.push(r);
        return e
    }

    function d(e, r) {
        return 1 === arguments.length && e === !0 && (r = !0, e = void 0), r = r || !1, e = e || window.location.toString(), {
            data: t(e, r),
            attr: function (t) {
                return t = g[t] || t, "undefined" != typeof t ? this.data.attr[t] : this.data.attr
            },
            param: function (t) {
                return "undefined" != typeof t ? this.data.param.query[t] : this.data.param.query
            },
            fparam: function (t) {
                return "undefined" != typeof t ? this.data.param.fragment[t] : this.data.param.fragment
            },
            segment: function (t) {
                return "undefined" == typeof t ? this.data.seg.path : (t = 0 > t ? this.data.seg.path.length + t : t - 1, this.data.seg.path[t])
            },
            fsegment: function (t) {
                return "undefined" == typeof t ? this.data.seg.fragment : (t = 0 > t ? this.data.seg.fragment.length + t : t - 1, this.data.seg.fragment[t])
            }
        }
    }

    var p = {
            a: "href",
            img: "src",
            form: "action",
            base: "href",
            script: "src",
            iframe: "src",
            link: "href",
            embed: "src",
            object: "data"
        },
        h = ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "fragment"],
        g = {anchor: "fragment"}, l = {
            strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
            loose: /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
        }, m = /^[0-9]+$/;
    return d.jQuery = function (t) {
        null != t && (t.fn.url = function (r) {
            var n = "";
            return this.length && (n = t(this).attr(e(this[0])) || ""), d(n, r)
        }, t.url = d)
    }, d.jQuery(window.jQuery), d
});


/* ------------------------------------------------------------------------------------------------------------------ */

/********************* 1. General Client API functions *******************************/

/*Execution Methods*/
var SEND_METHOD_NONE = 0;
/*For simulation, will not send any command*/
var SEND_METHOD_ALERT = 1;
/*Will send commands to client with Javascript Alerts*/
var SEND_METHOD_INJECTION = 2;
/*will send commands by calling an injected Javascript function*/
var SEND_METHOD_PROTOCOL = 3;
/*will send command by a calling a a protocol hanndler cgcommand:// */
var SEND_METHOD_AUTO = 4;
/*Will determine the suitable method automatically*/
var SEND_METHOD_MESSAGE = 5;
/*GeckoFX Message*/

var LOG_LEVEL_NONE = 0;
var LOG_LEVEL_INFO = 1;
var LOG_LEVEL_WARNING = 2;
var LOG_LEVEL_ERROR = 3;


// ################################  Global error handler ################################
// TODO: Disable when debugging!
/*window.onerror = function (msg, url, line, col) {
 if (CLIENT_COMMAND && CLIENT_COMMAND.writeLog) {
 try {
 var log = "JS ERROR: in " + url + " on line " + line + " col " + col + " error message is: " + msg;
 CLIENT_COMMAND.writeLog(log, LOG_LEVEL_ERROR);

 if (console && console.error)
 console.log(log);

 // If you return true, then error alerts (like in older versions of
 // Internet Explorer) will be suppressed.
 return true;
 } catch (e) {
 }
 }

 return false;
 };*/


/* Constructor for the API
 *
 *
 * @param {Object) options
 */
function CG_ClientCommandInterface(options) {
    this.options = {
        "method": SEND_METHOD_AUTO
    };

    if ((typeof options != "undefined") && (options != null)) {
        $.extend(this.options, options);
    }
}

CG_ClientCommandInterface.prototype = {
    /*
     * Sends a command to the client
     *
     * @param (String) functionname Function to execute
     * @param (JSON) params  Optional parameters for the command
     * @param (String) callback_functionname Name of a Javascript Function in the Global Scope to execute upon completion
     */
    sendCommand: function (functionname, params, callback_functionname) {

        if (!functionname)
            return false;

        if (typeof params == "undefined") {
            params = "";
        }

        if (typeof callback_functionname == "undefined") {
            callback_functionname = "";
        }

        var callJSON = {
            "func": functionname,
            "params": params,
            "callback": callback_functionname,
            "r": Math.random() /* Prevent Caching for the function call*/
        };

        var command = JSON.stringify(callJSON);

        switch (this.options.method) {
            case SEND_METHOD_NONE:
                return true;
            case SEND_METHOD_ALERT:
                window.alert(command);
                return true;

            /*GeckoFX*/
            case SEND_METHOD_MESSAGE:
                try {
                    var event = new MessageEvent('ProcessCommand', {'data': command});
                    document.dispatchEvent(event);
                    return true;
                } catch (e) {
                    return false
                }
            case SEND_METHOD_INJECTION:
            case SEND_METHOD_AUTO:
                /*#NET injected object*/
                if ((window.external) && (typeof window.external.ProcessCommand != "undefined")) {
                    window.external.ProcessCommand(command);
                    return true;
                } else
                    if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.processCommand) {
                        window.webkit.messageHandlers.processCommand.postMessage(command);
                        return true;
                    } else
                /*Android injected object*/
                if ((typeof Android != "undefined") && (typeof Android.processCommand != "undefined")) {
                    (function () {
                        setTimeout(function () {
                            Android.processCommand(command);
                        }, 1)

                    })();

                    return true;
                } else

                /*UIWebview injected object*/
                if ((typeof Mac != "undefined") && (typeof Mac.processCommand != "undefined")) {
                    Mac.processCommand(command);
                    return true;
                } else
                    return false;
            case SEND_METHOD_PROTOCOL:
                url = "cgcommand://" + encodeURIComponent(command);
                window.location.href = url;
                return true;
        }
    },
    writeLog: function (data, loglevel, callback_functionname) {
        if (typeof loglevel == "undefined") {
            var loglevel = LOG_LEVEL_NONE
        }
        this.sendCommand("writeLog", {"message": data + "\r\n", "loglevel": loglevel}, callback_functionname);
    },
    openURL: function (url, additionalParams, callback_functionname) {
        if ((typeof additionalParams != "undefined") && (additionalParams)) {
            if (url.indexOf("?") == -1) {
                url = url + "?" + additionalParams;
            } else
                url = url + "&" + additionalParams;

        }

        this.sendCommand("openURL", {"url": url}, callback_functionname);
    },
    openAuthURL: function (url, additionalParams, callback_functionname) {
        if ((typeof additionalParams != "undefined") && (additionalParams)) {
            if (url.indexOf("?") == -1) {
                url = url + "?" + additionalParams;
            } else
                url = url + "&" + additionalParams;

        }

        this.sendCommand("openAuthURL", {"url": url}, callback_functionname);
    },
    openBrowser: function (url, additionalParams, inkognito, callback_functionname) {
        if ((typeof additionalParams != "undefined") && (additionalParams)) {
            if (url.indexOf("?") == -1) {
                url = url + "?" + additionalParams;
            } else
                url = url + "&" + additionalParams;

        }

        this.sendCommand("openURL", {"url": url, "incognito": inkognito}, callback_functionname);
    },
    openURLAdvanced: function (url, additionalParams, inkognito, trackAsConversion, callback_functionname) {
        if ((typeof additionalParams != "undefined") && (additionalParams)) {
            if (url.indexOf("?") == -1) {
                url = url + "?" + additionalParams;
            } else
                url = url + "&" + additionalParams;

        }

        this.sendCommand("openURL", {
            "url": url,
            "incognito": inkognito,
            "trackAsConversion": trackAsConversion
        }, callback_functionname);
    },
    /**#######################################################################*/
    /**####################### SETTINGS ######################################*/
    /**#######################################################################*/
    saveSetting: function (name, value, callback_functionname) {
        if (typeof value == "undefined")
            value = "";
        this.sendCommand('setSetting', {
            "settingname": name + "",
            "settingvalue": String(value)
        }, callback_functionname);
    },
    getSetting: function (name, callback_functionname) {
        this.sendCommand('getSetting', {
            "settingname": name
        }, callback_functionname);
    },
    fetchSettings: function (callback_functionname) {
        this.sendCommand("getSettings", null, callback_functionname);
    },
    /**#######################################################################*/
    /**######################## COOKIES ######################################*/
    /**#######################################################################*/
    setCookie: function (name, value, callback_functionname) {
        if (typeof value == "undefined")
            value = "";
        this.sendCommand('setCookie', {
            "name": name + "",
            "value": String(value)
        }, callback_functionname);
    },
    getCookie: function (name, callback_functionname) {
        this.sendCommand('getCookie', {
            "name": name
        }, callback_functionname);
    },
    getCookies: function (callback_functionname) {
        this.sendCommand("getCookies", null, callback_functionname);
    },
    /**#######################################################################*/
    /**####################### POPUPS ########################################*/
    /**#######################################################################*/
    showPopup: function (width, height, callback_functionname) {
        this.sendCommand("showPopup", {
                "width": width,
                "height": height,
                "bannerName": window.bannerName ? window.bannerName : ""
            },
            callback_functionname);
    },
    hidePopup: function (result, callback_functionname) {
        this.sendCommand("closePopup", {"popupResult": result}, callback_functionname);
    },
    setTitle: function (title, callback_functionname) {
        this.sendCommand("setTitle", {"title": title}, callback_functionname);
    },
    canClose: function (isCloseable, callback_functionname) {
        this.sendCommand("canClose", {"closeable": isCloseable}, callback_functionname);
    },
    forcePopup: function (force, callback_functionname) {
        this.sendCommand("forcePopup", {"setForce": force}, callback_functionname);
    },
    setSize: function (width, height, callback_functionname) {
        this.sendCommand("setSize", {"width": String(width), "height": String(height)}, callback_functionname);
    },
    setWindowPosition: function (position, callback_functionname) {
        this.sendCommand("setWindowPosition", {"position": position}, callback_functionname);
    },
    goMyAccount: function (callback_functionname) {
        this.sendCommand("openMyAccount", {}, callback_functionname);
    },
    goToPage: function (pageName, callback_functionname) {
        this.sendCommand("goToPage", {"page": pageName}, callback_functionname);
    },
    goUpgrade: function (upgradeReason, callback_functionname) {
        this.sendCommand("goUpgrade", {"upgradeReason": upgradeReason}, callback_functionname);
    },
    goLoginScreen: function (callback_functionname) {
        this.sendCommand("goLoginScreen", {}, callback_functionname);
    },
    goUpgradeWithParams: function (upgradeReason, additionalParams, callback_functionname) {
        this.sendCommand("goUpgrade", {
            "upgradeReason": upgradeReason,
            "additionalParams": additionalParams
        }, callback_functionname);
    },
    disconnect: function (callback_functionname) {
        this.sendCommand("disconnect", {}, callback_functionname);
    },
    showUi: function (callback_functionname) {
        this.sendCommand("showUi", {}, callback_functionname);
    },
    startClientUpgrade: function (callback_functionname) {
        this.sendCommand("startClientUpgrade", {}, callback_functionname);
    },
    /**#######################################################################*/
    /**############################### USER ##################################*/
    /**#######################################################################*/
    changeUserEMail: function (new_mail, callback_functionname) {
        this.sendCommand("ChangeUserEmail", {
            "email": new_mail
        }, callback_functionname);
    }
};

/* Provide a global instance of the client API*/
var CLIENT_COMMAND = new CG_ClientCommandInterface();

/* ------------------------------------------------------------------------------------------------------------------ */

decode64 = function (input) {
    if (!input)
        return "";

    var keyStr = "ABCDEFGHIJKLMNOP" +
        "QRSTUVWXYZabcdef" +
        "ghijklmnopqrstuv" +
        "wxyz0123456789+/" +
        "=";

    var output = "";
    var chr1, chr2, chr3 = "";
    var enc1, enc2, enc3, enc4 = "";
    var i = 0;

    // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
    var base64test = /[^A-Za-z0-9\+\/\=]/g;
    if (base64test.exec(input)) {
        alert("There were invalid base64 characters in the input text.\n" +
            "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
            "Expect errors in decoding.");
    }
    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

    do {
        enc1 = keyStr.indexOf(input.charAt(i++));
        enc2 = keyStr.indexOf(input.charAt(i++));
        enc3 = keyStr.indexOf(input.charAt(i++));
        enc4 = keyStr.indexOf(input.charAt(i++));

        chr1 = (enc1 << 2) | (enc2 >> 4);
        chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
        chr3 = ((enc3 & 3) << 6) | enc4;

        output = output + String.fromCharCode(chr1);

        if (enc3 != 64) {
            output = output + String.fromCharCode(chr2);
        }
        if (enc4 != 64) {
            output = output + String.fromCharCode(chr3);
        }

        chr1 = chr2 = chr3 = "";
        enc1 = enc2 = enc3 = enc4 = "";

    } while (i < input.length);

    return unescape(output);
};

closePopUp = function (reason) {

    if (typeof onHideBanner != "undefined") {
        onHideBanner();
    }

    CLIENT_COMMAND.hidePopup(reason);
};

/*Check if any content has been delivered*/
checkForPopUp = function () {
    if (typeof window.bannerid !== "undefined") {
        $('*').not(":input").addClass("noselect");
        $('*').not(":input").attr("unselectable", "on");

        var autoShow = true;
        if (typeof onShowBanner != "undefined") {
            var res = onShowBanner();

            if (typeof res !== "undefined")
                autoShow = res;
        }

        if (autoShow)
            CLIENT_COMMAND.showPopup();
    } else {
        var maxcounter = 10;
        window.checkCounter++;

        if (window.checkCounter > maxcounter) {
            closePopUp("TIMEOUT");
        } else {
            setTimeout(checkForPopUp, 500);
        }
    }
};