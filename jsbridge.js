(function(win) {
    var isAndroid = navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Adr') > -1;
    var isIos = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    win.callbackId = 0;
    win.callbackQueue = {};
    win.jsBridge = {
        callNative: function(methodName, data, callback) {
            if (isAndroid) {
                var isExist = win.androidJS && win.androidJS[methodName];
                win.callbackId = win.callbackId + 1;
                win.callbackQueue[win.callbackId] = callback;
                data = Object.assign({}, data, {id: win.callbackId});
                win.androidJS[methodName](data);
            }

            if (isIos) {

            }
        },
        callJS: function(callbackId, res) {
            var isExist = Object.prototype.hasOwnProperty.call(win.callbackQueue, callbackId);
            if (isExist) {
                win.callbackQueue[callbackId](res);
            }
        }
    };
})(window);