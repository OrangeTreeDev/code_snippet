/**
 * 返回一个绑定上下文的函数
 */
function bind(fn, thisArg) {
  return function wrap() {
    var args = Array.prototype.slice.call(arguments);
    return fn.apply(thisArg, args);
  }
}