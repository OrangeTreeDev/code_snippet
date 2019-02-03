(function(window) {
  /**
   * 自定义错误类
   * @param {*} code 错误码
   * @param {*} message 错误描述信息
   */
  function CustomError(code, message, fileName, lineNumber) {
    var instance = new Error(message, fileName, lineNumber);
    instance.code = code;
    if (Error.captureStackTrace) {
      Error.captureStackTrace(instance, CustomError);
    }
    return instance;
  }

  CustomError.prototype = Object.create(Error.prototype, {
    constructor: {
      value: Error,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  // 错误码常量
  CustomError.Code = {
    'CALL_PARAM_ERROR': 'E0001', // callHandler参数错误
    'OS_ERROR': 'E0002', // 系统不支持
    'NATIVE_METHOD_ERROR': 'E0003', // native方法不存在
    'NATIVE_RESULT_ERROR': 'E0004', // native返回结果异常
    'SVW_FLAG_ERROR': 'E0005', // 当前app不包含svw标识
  };

  var uniqueId = 1;
  var responseCallbacks = {};
  var ua = window.navigator.userAgent;
  var isSVW = ua.indexOf('SVW') > -1;
  var isAndroid = ua.indexOf('Android') > -1;
  var isIOS = ua.indexOf('IOS') > -1;
  var key = ''; // js端签名

  /**
   * jsbridge初始化方法
   * @param {*} option
   * @param {String} option.key js端签名
   */
  function init(option) {
    option = option || {};
    key = option.key || '';
  }

  /**
   * 供native调用，传递执行结果
   * @param {*} messageJson native返回的结果
   * messageJson 的格式为
   * {
   *    error: '', // 错误描述
   *    data: {}, // 响应数据
   *    callbackId: '', 对应回调函数id
   * }
   */
  function dispatchMessageFromNative(messageJson) {
    setTimeout(function() {
      try {
        var message = JSON.parse(messageJson);
      } catch (e) {
        throw new CustomError(CustomError.Code.NATIVE_RESULT_ERROR, 'native返回结果是json字符串');
      }
      var responseCallBackId = message.callbackId;
      if (responseCallBackId) {
        var responseCallback = responseCallbacks[responseCallBackId];
        if (responseCallback) {
          responseCallback(message.error, message.data);
          delete responseCallbacks[responseCallBackId];
        } else {
          throw new CustomError(CustomError.Code.NATIVE_RESULT_ERROR, 'responseCallback回调方法不存在');
        }
      } else {
        throw new CustomError(CustomError.Code.NATIVE_RESULT_ERROR, 'callbackId不存在');
      }
    });
  }

  /**
   * 供JavaScript调用，执行指定native方法
   * @param {*} handlerName native方法名
   * @param {*} data native方法需要的参数
   * @param {*} responseCallback 匿名回调函数
   */
  function callHandler(handlerName, data, responseCallback) {
    if (!responseCallback && data) {
      responseCallback = data;
      data = null;
    }

    if (!responseCallback || typeof responseCallback !== 'function') {
      throw new CustomError(CustomError.Code.CALL_PARAM_ERROR, 'responseCallback是函数类型');
    }

    if (data && Object.prototype.toString.call(data) !== '[object Object]') {
      throw new CustomError(CustomError.Code.CALL_PARAM_ERROR, 'data是对象类型')
    }

    if (typeof handlerName !== 'string') {
      throw new CustomError(CustomError.Code.CALL_PARAM_ERROR, 'handlerName是字符串类型');
    }

    if (!key) {
      throw new CustomError(CustomError.Code.CALL_PARAM_ERROR, 'key参数未配置，调用init初始化');
    }

    var message = {
      key: key,
      data: '',
      callbackId: ''
    };
    if (data) {
      message.data = data;
    }
    if (responseCallback) {
      var callbackId = 'cb_' + (uniqueId++) + '_' + new Date().getTime();
      responseCallbacks[callbackId] = responseCallback;
      message.callbackId = callbackId
    }

    var messageStr = JSON.stringify(message);
    if (!isSVW) {
      throw new CustomError(CustomError.Code.SVW_FLAG_ERROR, '非SVW官方应用');
    }
    if (isAndroid) {
      if (window.oneapp && window.oneapp[handlerName]) {
        window.oneapp[handlerName](messageStr);
      } else {
        throw new CustomError(CustomError.Code.NATIVE_METHOD_ERROR, 'native方法' + handlerName + '不存在');
      }
    } else if (isIOS) {
      if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers[handlerName]) {
        window.webkit.messageHandlers[handlerName].postMessage(messageStr);
      } else {
        throw new CustomError(CustomError.Code.NATIVE_METHOD_ERROR, 'native方法' + handlerName + '不存在');
      }
    } else {
      throw new CustomError(CustomError.Code.OS_ERROR, '当前操作系统不被支持');
    }
  }

  var webViewJavascriptBridge = {
    init: init,
    callHandler: callHandler,
    dispatchMessageFromNative: dispatchMessageFromNative
  };
  window.webViewJavascriptBridge = webViewJavascriptBridge;
})(window);
