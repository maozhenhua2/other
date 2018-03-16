/*
记忆化斐波那契函数
斐波那契数列指的是类似于以下的数列：

1, 1, 2, 3, 5, 8, 13, ....

也就是，第 n 个数由数列的前两个相加而来：f(n) = f(n - 1) + f(n -2)

请你完成 fibonacci 函数，接受 n 作为参数，可以获取数列中第 n 个数

*/
const fibonacci = ((memo = [0, 1]) => {
  const fib = (n) => {
    let result = memo[n]
    if (typeof result !== "number") {
      console.log('before--- result:' + result + ', n:' + n);
      result = fib(n - 1) + fib(n - 2);
      console.log('after --- result:' + result + ', n:' + n);
      memo[n] = result;
    }
    return result
  }
  return fib
})()

/*

著作权归作者所有。
商业转载请联系作者获得授权,非商业转载请注明出处。
链接:http://caibaojian.com/js-example.html
来源:http://caibaojian.com

解析字串
题目：完成一个 extractStr 函数，可以把一个字符串中所有的 : 到 . 的子串解析出来并且存放到一个数组当中，例如：

extractStr('My name is:Jerry. My age is:12.') // => ['Jerry', '12']

注意，: 和 . 之间不包含 : 和 .。也即是说，如果 ::abc..，则返回 ['abc']。
*/

const extractStr = (str) => {
  const ret = str.match(/:([^:\.])*?\./g) || []
  return ret.map((subStr) => subStr.replace(/[:\.]/g, ''))
}

/*
有时候我们需要访问一个对象较深的层次，但是如果这个对象某个属性不存在的话就会报错，例如：

var data = { a: { b: { c: 'ScriptOJ' } } }
data.a.b.c // => scriptoj
data.a.b.c.d // => 报错，代码停止执行
console.log('ScriptOJ') // => 不会被执行
请你完成一个 safeGet 函数，可以安全的获取无限多层次的数据，一旦数据不存在不会报错，会返回 undefined，例如：

var data = { a: { b: { c: 'ScriptOJ' } } }
safeGet(data, 'a.b.c') // => scriptoj
safeGet(data, 'a.b.c.d') // => 返回 undefined
safeGet(data, 'a.b.c.d.e.f.g') // => 返回 undefined
console.log('ScriptOJ') // => 打印 ScriptOJ
*/
const safeGet = (o, path) => {
  try {
    return path.split('.').reduce((o, k) => o[k], o)
  } catch (e) {
    return void 666
  }
}

/*
判断两个矩形是否重叠
用一个对象的数据来表示一个矩形的位置和大小：

{
  x: 100,
  y: 100,
  width: 150,
  height: 250
}
它表示一个宽为 150 高为 250 的矩形在页面上的 (100, 100) 的位置。

请你完成一个函数 isOverlap 可以接受两个矩形作为参数，判断这两个矩形在页面上是否重叠。例如：

const rect1 = { x: 100, y: 100, width: 100, height: 100 }
const rect2 = { x: 150, y: 150, width: 100, height: 100 }
isOverlap(rect1, rect2) // => true
*/
// 原理：http://www.geeksforgeeks.org/find-two-rectangles-overlap/
const isOverlap = (rect1, rect2) => {
  const l1 = {
    x: rect1.x,
    y: rect1.y
  }
  const r1 = {
    x: rect1.x + rect1.width,
    y: rect1.y + rect1.height
  }
  const l2 = {
    x: rect2.x,
    y: rect2.y
  }
  const r2 = {
    x: rect2.x + rect2.width,
    y: rect2.y + rect2.height
  }
  if (
    l1.x > r2.x ||
    l2.x > r1.x ||
    l1.y > r2.y ||
    l2.y > r1.y
  ) return false
  return true
}

/*
请你给字符串都添加上原型方法 spacify，可以让一个字符串的每个字母都多出一个空格的间隔：

"ScriptOJ".spacify() // => "S c r i p t O J"
*/
String.prototype.spacify = function() {
  return this.split('').join(' ')
}

/*
按下标插入
现在有一个数组存放字符串数据：

['item1', 'item2', 'item3', 'item4', 'item5']

有另外一个数组存放一组对象：

[
  { content: 'section1', index: 0 },
  { content: 'section2', index: 2 }
]
最后结果是：['section1', 'item1', 'item2', 'section2', 'item3', 'item4', 'item5']

injectSections(
  ['item1', 'item2', 'item3', 'item4', 'item5'],
  [
    { content: 'section1', index: 0 },
    { content: 'section2', index: 2 }
  ]
) // => ['section1', 'item1', 'item2', 'section2', 'item3', 'item4', 'item5']
*/
const injectSections = (items, sections) => {
  /* 需要插入坐标对应数据存放到 map 里面 */
  const sectionsMap = new Map(sections.map(({
    index,
    content
  }) => [index, content]))
  /* 新建一个数组，然后往里面 push 原来数组的数据 */
  return items.reduce((ret, item, index) => {
    /* push 的时候先检查 map 里面有没有，有的话先 push map 里面的数据 */
    if (sectionsMap.has(index)) ret.push(sectionsMap.get(index))
    /* 再 push 原来的数据 */
    ret.push(item)
    return ret
  }, [])
}

/*
数组拍平
编写一个 JavaScript generator 函数，接受一个仅包含数字的 多维数组 ，返回一个迭代器，可以遍历得到它拍平以后的结果。例如：

const numbers = flatten2([1, [[2], 3, 4], 5])
numbers.next().value // => 1
numbers.next().value // => 2
numbers.next().value // => 3
numbers.next().value // => 4
numbers.next().value // => 5
*/
function* flatten2(arr) {
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i]
    /* yield* 的使用可以大大简化程序编写 */
    Array.isArray(item) ? yield* flatten2(item): yield item;
  }
}

/* 用 flatten2 来完成 flatten 也是很方便的 */
// const flatten = (arr) => [...flatten2(arr)]

/*
判断两个 Set 是否相同

完成 isSameSet 函数，它接受了两个 Set 对象作为参数，请你返回 true/false 来表明这两个 set 的内容是否完全一致，例如：

const a = {}
const b = 1
const c = 'ScriptOJ'

const set1 = new Set([a, b, c])
const set2 = new Set([a, c, b])

isSameSet(set1, set2) // => true
*/
/* 这道题不能简单地使用 sort，使用 sort 并不靠谱。因为 Set 里面的内容可能有很多种类
 * 字符串、对象、数字，不同类型之间是不可对比的，所以排序结果并不会一致
 *
 * 最好的方式是按照数学上集合相等的定义：
 * A = B 当且仅当 A 是 B 的子集并且 B 是 A 的子集。
 *
 * 这种判断方式还可以用在 对象、map 等其他数据类型的判断当中。
 */

const isSameSet = (s1, s2) => {
  /* 获取一个集合所有的值，判断另外一个集合是否全部包含该这些值 */
  const isSame = (a, b) => {
    const values = [...a]
    for (let val of values) {
      /* 及时跳出循环，可以降低算法复杂度 */
      if (!b.has(val)) return false
    }
    return true
  }
  /* a 包含 b，b 包含 a，那么两个集合相同 */
  return isSame(s1, s2) && isSame(s2, s1)
}

/*
字体高亮函数
可以把模版字符串中的插入内容替换掉，并且插入文档以后显示红色
*/
// 考察的是 Tagged template literals 的使用
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
const highlight = (strings, ...args) => {
  return strings.reduce((str, cur, i) => {
    return `${str}${cur}${args[i] ? `<span class="highlight">${args[i]}</span>` : '' }`
  }, '')
}

/*
AOP
*/
Function.prototype.before = function(beforefn) {
  var __self = this; // 保存原函数的引用 
  return function() { // 返回包含了原函数和新函数的"代理"函数 
    beforefn.apply(this, arguments); // 执行新函数，修正 this 
    return __self.apply(this, arguments); // 执行原函数 
  }
};

Function.prototype.after = function(afterfn) {
  var __self = this;
  return function() {
    var ret = __self.apply(this, arguments);
    afterfn.apply(this, arguments);
    return ret;
  }
};

var func = function() {
  console.log(2);
};

console.log(func);

func = func.before(function() {
  console.log(1);
}).after(function() {
  console.log(3);
});

console.log(func);

// func();


/*
函数柯里化
*/
var currying = function(fn) {
  var args = [];

  return function() {
    if (arguments.length === 0) {
      return fn.apply(this, args);
    } else {
      [].push.apply(args, arguments);
      return arguments.callee;
    }
  }

};

//  函数节流
var throttle = function(fn, interval) {

  var __self = fn, // 保存需要被延迟执行的函数引用 
    timer, // 定时器 
    firstTime = true; // 是否是第一次调用 

  return function() {
    var args = arguments,
      __me = this;

    if (firstTime) { // 如果是第一次调用，不需延迟执行 
      __self.apply(__me, args);
      return firstTime = false;
    }

    if (timer) { // 如果定时器还在，说明前一次延迟执行还没有完成 
      return false;
    }

    timer = setTimeout(function() { // 延迟一段时间执行 
      clearTimeout(timer);
      timer = null;
      __self.apply(__me, args);

    }, interval || 500);

  };

};

// 命名空间
var MyApp = {};

MyApp.namespace = function(name) {
  var parts = name.split('.');
  var current = MyApp;
  for (var i in parts) {
    if (!current[parts[i]]) {
      current[parts[i]] = {};
    }
    current = current[parts[i]];
  }
};

/*
MyApp.namespace('event');
MyApp.namespace('dom.style');

console.dir(MyApp);

// 上述代码等价于： 

var MyApp = {
  event: {},
  dom: {
    style: {}
  }
};
*/

// 单例
var getSingle = function(fn) {
  var result;
  return function() {
    return result || (result = fn.apply(this, arguments));
  }
};


// 动画
var tween = {
  linear: function(t, b, c, d) {
    return c * t / d + b;
  },
  easeIn: function(t, b, c, d) {
    return c * (t /= d) * t + b;
  },
  strongEaseIn: function(t, b, c, d) {
    return c * (t /= d) * t * t * t * t + b;
  },
  strongEaseOut: function(t, b, c, d) {
    return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
  },
  sineaseIn: function(t, b, c, d) {
    return c * (t /= d) * t * t + b;
  },
  sineaseOut: function(t, b, c, d) {
    return c * ((t = t / d - 1) * t * t + 1) + b;
  }
};
var Animate = function(dom) {
  this.dom = dom; // 进行运动的 dom 节点 
  this.startTime = 0; // 动画开始时间 
  this.startPos = 0; // 动画开始时，dom 节点的位置，即 dom 的初始位置 
  this.endPos = 0; // 动画结束时，dom 节点的位置，即 dom 的目标位置 
  this.propertyName = null; // dom 节点需要被改变的 css 属性名 
  this.easing = null; // 缓动算法 
  this.duration = null; // 动画持续时间 
};

Animate.prototype.start = function(propertyName, endPos, duration, easing) {
  this.startTime = +new Date; // 动画启动时间 
  this.startPos = this.dom.getBoundingClientRect()[propertyName]; // dom 节点初始位置 
  this.propertyName = propertyName; // dom 节点需要被改变的 CSS 属性名 
  this.endPos = endPos; // dom 节点目标位置 
  this.duration = duration; // 动画持续时间 
  this.easing = tween[easing]; // 缓动算法 

  var self = this;
  var timeId = setInterval(function() { // 启动定时器，开始执行动画 
    if (self.step() === false) { // 如果动画已结束，则清除定时器 
      clearInterval(timeId);
    }
  }, 19);
};

Animate.prototype.step = function() {
  var t = +new Date; // 取得当前时间 
  if (t >= this.startTime + this.duration) { // (1) 
    this.update(this.endPos); // 更新小球的 CSS 属性值 
    return false;
  }
  var pos = this.easing(t - this.startTime, this.startPos,
    this.endPos - this.startPos, this.duration);
  // pos 为小球当前位置 
  this.update(pos); // 更新小球的 CSS 属性值 
};

Animate.prototype.update = function(pos) {
  this.dom.style[this.propertyName] = pos + 'px';
};

// 图片懒加载
var myImage = (function() {
  var imgNode = document.createElement('img');
  document.body.appendChild(imgNode);

  return function(src) {
    imgNode.src = src;
  }
})();

var proxyImage = (function() {
  var img = new Image;

  img.onload = function() {
    myImage(this.src);
  }

  return function(src) {
    myImage('file:// /C:/Users/svenzeng/Desktop/loading.gif');
    img.src = src;
  }
})();

proxyImage('http:// imgcache.qq.com/music// N/k/000GGDys0yA0Nk.jpg');

// 分批发送请求
var synchronousFile = function(id) {
  console.log('开始同步文件，id 为: ' + id);
};

var proxySynchronousFile = (function() {
  var cache = [], // 保存一段时间内需要同步的 ID 
    timer; // 定时器 

  return function(id) {
    cache.push(id);
    if (timer) { // 保证不会覆盖已经启动的定时器 
      return;
    }

    timer = setTimeout(function() {
      synchronousFile(cache.join(',')); // 2 秒后向本体发送需要同步的 ID 集合 
      clearTimeout(timer); // 清空定时器 
      timer = null;
      cache.length = 0; // 清空 ID 集合 
    }, 2000);
  }
})();

var checkbox = document.getElementsByTagName('input');

for (var i = 0, c; c = checkbox[i++];) {
  c.onclick = function() {
    if (this.checked === true) {
      proxySynchronousFile(this.id);
    }
  }
};


/*------浏览器同源政策及其规避方法------*/
// 加强版的子窗口接收消息
window.onmessage = function(e) {
  if (e.origin !== 'http://bbb.com') return;
  var payload = JSON.parse(e.data);
  switch (payload.method) {
    case 'set':
      localStorage.setItem(payload.key, JSON.stringify(payload.data));
      break;
    case 'get':
      var parent = window.parent;
      var data = localStorage.getItem(payload.key);
      parent.postMessage(data, 'http://aaa.com');
      break;
    case 'remove':
      localStorage.removeItem(payload.key);
      break;
  }
};
// 加强版的父窗口发送消息
var win = document.getElementsByTagName('iframe')[0].contentWindow;
var obj = {
  name: 'Jack'
};
// 存入对象
win.postMessage(JSON.stringify({
  key: 'storage',
  method: 'set',
  data: obj
}), 'http://bbb.com');
// 读取对象
win.postMessage(JSON.stringify({
  key: 'storage',
  method: "get"
}), "*");
window.onmessage = function(e) {
  if (e.origin != 'http://aaa.com') return;
  // "Jack"
  console.log(JSON.parse(e.data).name);
};