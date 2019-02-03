/**
 * 遍历数组或者对象
 */
function forEach(obj, fn) {
  // 空值，不处理
  if (!obj) {
    return;
  }

  // 不处理非对象
  // typeof null === 'object'
  if (typeof obj !== 'object') {
    return;
  }

  var isArray = Object.prototype.toString.call(obj) === '[object Array]';
  if (isArray) {
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}