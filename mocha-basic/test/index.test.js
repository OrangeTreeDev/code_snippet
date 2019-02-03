/**
 * 不建议在mocha中，使用箭头函数，这样无法获取测试案例或者测试套件的this上下文
 */

/**
 * Node内置断言功能，报错提示不友好；
 * power-assert 提供良好的断言消息，并且保持接口和原生assert相同；
 * 为了获得power-assert的输出信息，使用者需要借助工具转译测试代码，如果仅仅在Node环境运行mocha，建议使用 intelli-espower-loader.
 * */
const assert = require('assert');

describe('Array', function() {
  console.log('still execute describe function whether the suit decorate with only');
  before(() => {
    console.log('execute describe function when the suit run');
  });
  let arr;
  beforeEach(() => {
    arr = [1, 2, 3];
  });
  describe('#indexOf()', function() {
    it('should return index when the value is present', function () {
      assert(arr.indexOf(1) === 0);
    });

    it('should return -1 when the value is not exist', function () {
      assert(arr.indexOf(4) === -1);
    })
  })
});

/**
 * 测试异步函数
 */
describe.only('Asynchronous test', function () {

  /**
   * 测试回调类型的异步函数
   */
  describe("callback style", function () {
    /**
     * 检查变量是否是一个字符串的异步函数
     */
    function isString(value, callback) {
      setTimeout(() => {
        if (typeof value === 'string') {
          callback(null, true);
        } else {
          callback(null, false);
        }
      }, 1000);
    }

    it('should return true when value is a string', function (done) {
      // mocha will wait the done function had been called before the test completes
      isString('c', (error, justify) => {
        if (error) done(error);
        assert(justify === true);
        done();
      });
    });

    it('should return false when value is a number', function (done) {
      isString(1, (error, justify) => {
        if (error) done(error);
        assert(justify === false);
        done();
      });
    })
  });

  /**
   * 测试promise类型的异步函数
   */
  describe('promise style', function () {
    /**
     * 检查变量是否是一个字符串
     */
    function isStringPromise(value) {
      return new Promise((resolve) => {
        setTimeout(() => {
          if (typeof value === 'string') {
            resolve(true);
          } else {
            resolve(false);
          }
        }, 1000);
      });
    }
    // return a promise directly, if a error occur, test failed, or test complete;
    it('should return true when value is a string', function () {
      return isStringPromise('sun').then(res => assert(res === true));
    })

    it('should return false when value is a number', function () {
      return isStringPromise(12).then(res => assert(res === false));
    })
  });

  describe('async function style', function () {
    /**
     * 检查变量是否是一个字符串
     */
    async function isStringAsync(value) {
      return new Promise((resolve) => {
        setTimeout(() => {
          if (typeof value === 'string') {
            resolve(true);
          } else {
            resolve(false);
          }
        }, 1000);
      });
    }

    it('should return true when value is a string', async function () {
      const res = await isStringAsync('sun');
      assert(res === true);
    });

    it('should return false when value is a number', async function () {
      const res = await isStringAsync(10);
      assert(res === false);
    });
  })
})
