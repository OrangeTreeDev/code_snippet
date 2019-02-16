import './style.css'; // 在js模块中引入css文件
// import { cube } from './math.js'; // 导入部分js方法

// function component() {
//   let element = document.createElement('div');
//   element.classList.add('hello');
//   element.innerHTML = ['hello webpack', '5 cubed is eqaul to ' + cube(5)].join('\n\n');
//   return element;
// }

function asyncComponent() {
  return import(/* webpackChunkName: "lodash" */ 'lodash').then(({default: _}) => {
    let element = document.createElement('div');
    element.classList.add('hello');
    element.innerHTML = _.join(['hello', 'webpack'], ' ');
    return element;
  })
}

function lazyLoad() {
  let element = document.createElement('div');
  element.classList.add('hello');
  let btn = document.createElement('button');
  btn.innerHTML = '懒加载按钮';
  element.appendChild(btn);
  btn.onclick = (e) => {
    import(/* webpackChunkName: "lodash" */ 'lodash').then(({default: _}) => {
      alert(_.join(['hello', 'webpack'], ' '));
    })
  }
  return element;
}
document.body.append(lazyLoad());

// document.body.append(component());
// asyncComponent().then(component => document.body.append(component));