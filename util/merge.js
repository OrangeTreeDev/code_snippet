/**
 * 融合对象或者数组
 * 对象的相同的键值都是对象的时候，会对键值对象融合
 * 对象的相同键值都是数组的时候，会对键值数组融合
 * 否则后面的覆盖前面的
 * 例如: var a = {a: {b: 'b'}}, b = {a: {c: 'c'}}; merg(a, b); // {a: {b: 'b', c: 'c'}}
 * 例如: var a = {a: [1, 2, 3]}, b = {a: [4, 5]}; merg(a, b); // {a: [4, 5, 3]}
 */
function merge() {
  var result = {};
  // 遍历参数，进行融合操作
  for(var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], function assignValue(value, key) {
      if (isObject(result[key]) && isObject(value)) {
        result[key] = merge(result[key], value);
      } else if (isArray(result[key]) && isArray(value)) {
        result[key] = merge(result[key], value);
      } else {
        result[key] = value;
      }
    });
  }
  return result;
}