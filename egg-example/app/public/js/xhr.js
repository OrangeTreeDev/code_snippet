'use strict';
(function(window) {
  /**
   * 浏览器端请求基于XMLHttpRequest
   * @param {*} config 
   */
  function xhrAdapter(config) {
    /**
     * 创建异常对象
     * @param {*} message 
     */
    function createError(message, config, request, response) {
      let err = new Error(message);
      err.config = config;
      err.request = request;
      if (response) {
        err.response = response;
      }
      return err;
    }
  
    /**
     * 解析XMLHttpRequest.headers
     * @param {*} headers 
     */
    function parseHeader(headers) {
      const parsed = {};
      const components = headers.split('\n');
      components.forEach(function parser(line) {
        const colonIndex = line.indexOf(':');
        const key = line.substring(0, colonIndex).replace(/^\s+|\s+$/g, '');
        const value = line.substring(colonIndex + 1).replace(/^\s+|\s+$/g, '');
        parsed[key] = value;
      });
      return parsed;
    }

    /**
     * 转换request body
     * @param {*} data 
     * @param {*} headers 
     */
    function transformRequestData(data, headers) {
      const type = Object.prototype.toString.call(data);
      if (type === '[object URLSearchParams]') {
        headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
        return data;
      }

      if (type === '[object Object]') {
        headers['Content-Type'] = 'application/json;charset=utf-8';
        return JSON.stringify(data);
      }
      return data;
    }
  
    return new Promise(function dispatchXhrRequest(resolve, reject) {
      let url = config.url;
      if (!url) {
        return;
      } 
      // 拼接查询字符串
      if (config.params) {
        url += '?' + config.params;
      }
      let requestData = config.data || null;
      var requestHeaders = config.headers || {};
      if (requestData) {
        requestData = transformRequestData(requestData, requestHeaders);
      }
      const method = config.method || 'GET';
      
      let request = new XMLHttpRequest();
      request.open(method.toUpperCase(), url);

      // 设置请求头,在open之后，send之前
      Object.keys(requestHeaders).forEach(function setHeaders(key) {
        if (!requestHeaders[key]) {
          return;
        }
        request.setRequestHeader(key, requestHeaders[key]);
      });
      
      // 只处理服务器成功响应(不论status为2xx，还是4xx，5xx)
      request.onreadystatechange = function handleLoaded() {
        // 响应未接受完成
        if (!request || request.readyState !== 4) {
          return;
        }
  
        const status = request.status;
        const responseHeaders = parseHeader(request.getAllResponseHeaders());
        const response = {
          data: request.response,
          status: status,
          headers: responseHeaders,
          config: config,
          request: request
        };
        // 仅仅2xx，promise的状态变成完成
        if ( status >= 200 && status < 300) {
          resolve(response);
        } else {
          // 其他状态码，promise的状态是拒绝，和其他异常的区别在于，包含response属性
          reject(createError(
            'Request failed with status code ' + status,
            config,
            request,
            response
          ));
        }
  
        request = null;
      }
      
      /**
       * 请求失败，底层原因很多，对外暴露网络原因
       */
      request.onerror = function handleError() {
        reject(createError('network error', config, request));
        request = null; // 清除请求对象
      }
      /**
       * 请求超时
       */
      request.ontimeout = function handleTimeout() {
        reject(createError('timeout error', config, request));
        request = null;
      }
      
      // 发送请求体
      request.send(requestData);
    });
  }
  
  /**
   * 包含拦截器对象
   */
  function Axios() {
    this.interceptors = {
      request: [],
      response: []
    };
  }
  
  Axios.prototype.request = function (config) {
    const chain = [xhrAdapter, null];
    if (this.interceptors.request.length >= 2) {
      chain.unshift(this.interceptors.request[0], this.interceptors.request[1]);
    }
    if (this.interceptors.response.length >= 2) {
      chain.push(this.interceptors.response[0], this.interceptors.response[1]);
    }
    // 响应拦截器通过promise链连接
    let promise = Promise.resolve(config);
    while(chain.length > 0) {
      promise = promise.then(chain.shift(), chain.shift());
    }
    return promise;
  }
  
  function createInstance() {
    const context = new Axios();
    const instance = context.request.bind(context);
    Object.keys(context).forEach(prop => {
      instance[prop] = context[prop];
    });
    return instance;
  }

  // 导出axios实例
  window.axios = createInstance();
})(window);