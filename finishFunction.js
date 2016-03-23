/*
dom操作
*/
// 根据id
function getId() {
  var elements = [];
  for (var i = 0; i < arguments.length; i++) {
    var element = arguments[i];
    if (typeof element == "string") element = document.getElementById(element);
    if (arguments.length == 1) return element;
    elements.push(element);
  }
  return elements;
}

// 根据class
/*
function getElementsByClassName(obj, className) {
  var classNames, classArr = [],
    objArr = [];
  for (var i = 0, l = obj.length; i < l; i++) {
    classNames = obj[i].className;
    if (!classNames) continue;
    classArr = classNames.split(' ');

    for (var j = 0, k = classArr.length; j < k; j++) {
      if (classArr[j] === className) {
        objArr.push(obj[i]);
      }
    }
  }
  return objArr;
}
*/
function getElementsByClass(searchClass, node, tag) {
  var classElements = new Array();
  if (node == null) node = document;
  if (tag == null) tag = "*";
  var els = node.getElementsByTagName(tag);
  var elsLen = els.length;
  var pattern = new RegExp("(^|\\s)" + searchClass + "(\\s|$)");
  for (i = 0, j = 0; i < elsLen; i++) {
    if (pattern.test(els[i].className)) {
      classElements[j] = els[i];
      j++;
    }
  }
  return classElements;
}

// 获取元素节点的class
function getClassNames(element) {
  if (!(element = getId(element))) return false;
  return element.className.replace(/\s+/, " ").split(" ");
}

// 判断元素节点有没有class
function hasClassName(element, className) {
  if (!(element = getId(element))) return false;
  var classes = getClassNames(element),
    i = 0,
    l = classes.length;
  for (; i < l; i++) {
    if (classes[i] === className) {
      return true;
    }
  }
  return false;
}

// 添加类
function addClassName(element, className) {
  if (!(element = getId(element))) return false;
  element.className += (element.className ? " " : "") + className;
  return true;
}

// 删除类
function removeClassName(element, className) {
  if (!(element = getId(element))) return false;
  var classes = getClassNames(element),
    length = classes.length,
    i = length - 1;
  for (; i >= 0; i--) {
    if (classes[i] === className) {
      // delete(classes[i]);
      classes.splice(i, 1);
    }
  }
  element.className = classes.join(" ");
  return length === classes.length ? false : true;
}

// 获取子元素
function getChildElements(obj) {
  var obj = obj.childNodes,
    arr = [],
    i = 0,
    l = obj.length;
  for (; i < l; i++) {
    if (obj[i].nodeType !== 1) {
      continue;
    }
    arr.push(obj[i]);
  }
  return arr;
}

// 获取其他同级元素
function getChildren(n, skipMe) {
  var r = [];
  for (; n; n = n.nextSibling) {
    if (n.nodeType == 1 && n != skipMe) {
      r.push(n);
    }
  }
  return r;
}

function getSiblings(n) {
  return getChildren(n.parentNode.firstChild, n);
}

// 获取之后的同级元素
function nextElementSibling(el) {
  do {
    el = el.nextSibling;
  } while (el && el.nodeType !== 1);
  return el;
}

// 获取之前的同级元素
function prevElementSibling(el) {
  do {
    el = el.previousSibling;
  } while (el && el.nodeType !== 1);
  return el;
}

// 获取父元素
function getParent(obj) {
  var parent = obj.parentNode;
  while (parent && parent.nodeType === 1) {
    return parent;
  }
}

// 获取向上范围的指定父级元素
function parentsUntil(o, select) {
  var parent = o;
  var type = typeof select;

  function setCondition(parent) {
    var condition;
    var arr = [];
    if (type === 'string') {
      if (select.indexOf('.') !== -1) {
        // console.log('class');
        arr = select.split('.');
        arr.shift();
        condition = arr.indexOf(parent.className) === -1;
      } else if (select.indexOf('#') !== -1) {
        // console.log('id');
        arr = select.split('#');
        arr.shift();
        condition = arr.indexOf(parent.id) === -1;
      } else {
        // console.log('tag');
        condition = parent.nodeName.toLowerCase() !== select;
      }

    } else if (type === 'object') {
      condition = parent != select;
    }

    return condition;
  }

  while (setCondition(parent)) {
    parent = parent.parentNode;
  }

  return parent;
}

if (typeof Array.prototype.indexOf !== 'function') {
  Array.prototype.indexOf = function(e) {
    var i = 0;
    var l = this.length;
    for (; i < l; i++) {
      if (e === this[i]) {
        return i;
      }
    }
    return -1;
  }
}

/*// 判断浏览器是否支持indexOf ，indexOf 为ecmaScript5新方法 IE8以下（包括IE8， IE8只支持部分ecma5）不支持
if (!Array.prototype.indexOf){
  // 新增indexOf方法
  Array.prototype.indexOf = function(item) {
    var result = -1,
      a_item = null;
    if (this.length == 0) {
      return result;
    }
    for (var i = 0, len = this.length; i < len; i++) {
      a_item = this[i];
      if (a_item === item) {
        result = i;
        break;
      }
    }
    return result;
  }
}*/

Array.join = Array.join || function(a, sep) {
  return Array.prototype.join.call(a, sep);
};

Array.slice = Array.slice || function(a, from, to) {
  return Array.prototype.slice.call(a, from, to);
};

Array.map = Array.map || function(a, f, thisArg) {
  return Array.prototype.map.call(a, f, thisArg);
};
// 在数组中查找所有出现的x，并返回一个包含匹配索引的数组
function findAll(a, x) {
  var results = [],
    len = a.length,
    pos = 0;
  while (pos < len) {
    pos = a.indexOf(x, pos);
    if (pos === -1) {
      break;
    }
    results.push(pos);
    pos++;
  }
  return results;
}

/*
判断o是否是一个类数组对象
 */
function isArrayLike(o) {
  if (
    o &&
    typeof o === 'object' &&
    isFinite(o.length) &&
    o.length >= 0 &&
    o.length === Math.floor(o.length) &&
    o.length < 4294967296
  ) {
    return true;
  } else {
    return false;
  }
}

// 为数字填充0
// a为要填充的数字，b为要对比的数字，例如8, 100 返回的就是'00'
function fillZero(a, b) {
  var lengtha = String(a).length;
  var lengthb = String(b).length;
  var j = 0;
  var k = lengthb - lengtha;
  var p = '';
  for (; j < k; j++) {
    p = p + '0';
  }
  return p;
}

// 判断是否是数组
/*if (typeof Array.isArray === 'undefined') {
  Array.isArray = function(arg) {
    return Object.prototype.toString.call(arg) = '[object Array]';
  };
}*/
// 判断是否是数组
if (!Array.isArray) {
  Array.isArray = function(arg) {
    return Object.prototype.toString.call(arg) === '[object Array]';
  };
}

// 判断是否在数组中
function inArray(arr, value) {
  for (var i = 0, l = arr.length; i < l; i++) {
    if (arr[i] === value) {
      return true;
    }
  }
  return false;
}

// 将节点插入到某节点后
function insertAfter(node, referenceNode) {
  if (!(node = getId(node))) return false;
  if (!(referenceNode = getId(referenceNode))) return false;
  return referenceNode.parentNode.insertBefore(node, referenceNode.nextSibling);
}

// 将节点插入到某节点前
function prependChild(parent, newChild) {
  if (!(parent = getId(parent))) return false;
  if (!(newChild = getId(newChild))) return false;
  if (parent.firstChild) {
    // 如果存在一个子节点就在这个子节点之前插入
    parent.insertBefore(newChild, parent.firstChild);
  } else {
    // 如果没有就直接添加
    parent.appendChild(newChild);
  }
  // 返回父元素实现方法连缀
  return parent;
}

// 删除子元素
function removeChildren(parent) {
  if (!(parent = getId(parent))) return false;
  // 当存在子节点时删除该子节点
  while (parent.firstChild) {
    parent.firstChild.parentNode.removeChild(parent.firstChild);
  }
  return parent;
}

/*
事件
document.ready
*/
(function whenReady() {
  var funcs = [];
  var ready = false;

  function handler(e) {
    if (ready) return;
    if (e.type === "readystatechange" && document.readyState !== "complete") return;
    for (var i = 0; i < funcs.length; i++) funcs[i].call(document);
    ready = true;
    funcs = null;
  }
  if (document.addEventListener) {
    document.addEventListener("DOMContentLoaded", handler, false);
    document.addEventListener("readystatechange", handler, false);
    window.addEventListener("load", handler, false);
  } else if (document.attachEvent) {
    document.attachEvent("onreadystatechange", handler);
    window.attachEvent("onload", handler);
  }
  return function whenReady(f) {
    if (ready) f.call(document);
    else funcs.push(f);
  };
})();

// 事件绑定
function addEvent(element, type, handler) {
  // assign each event handler a unique ID
  //在每个回调函数上绑定了一个UUID
  if (!handler.$$guid) handler.$$guid = addEvent.guid++;
  // create a hash table of event types for the element
  //在要绑定事件的元素节点上设置一个特殊的属性，用来储存事件
  if (!element.events) element.events = {};
  // create a hash table of event handlers for each element/event pair
  //evets函数的键名为事件的类型名，或者说把事件按类型来按理
  var handlers = element.events[type];
  if (!handlers) {
    handlers = element.events[type] = {};
    // store the existing event handler (if there is one)
    if (element["on" + type]) {
      handlers[0] = element["on" + type];
    }
  }
  // store the event handler in the hash table
  //让一个类型对应多个回调函数
  handlers[handler.$$guid] = handler;
  // assign a global event handler to do all the work
  element["on" + type] = handleEvent;
}

// a counter used to create unique IDs
addEvent.guid = 1;

function removeEvent(element, type, handler) {
  // delete the event handler from the hash table
  if (element.events && element.events[type]) {
    //移除当前类型对应的某个回调函数
    delete element.events[type][handler.$$guid];
  }
}

function handleEvent(event) {
  var returnValue = true;
  // grab the event object (IE uses a global event object)
  event = event || fixEvent(window.event);
  // get a reference to the hash table of event handlers
  var handlers = this.events[event.type];
  // execute each event handler
  for (var i in handlers) {
    this.$$handleEvent = handlers[i];
    if (this.$$handleEvent(event) === false) {
      returnValue = false;
    }
  }
  return returnValue;
}

function fixEvent(event) {
  // add W3C standard event methods
  event.preventDefault = fixEvent.preventDefault;
  event.stopPropagation = fixEvent.stopPropagation;
  return event;
}

fixEvent.preventDefault = function() {
  this.returnValue = false;
};

fixEvent.stopPropagation = function() {
  this.cancelBubble = true;
};

// 获取指定css样式
function getStyle(oElm, strCssRule) {
  var strValue = "";
  if (document.defaultView && document.defaultView.getComputedStyle) {
    strValue = document.defaultView.getComputedStyle(oElm, "").getPropertyValue(strCssRule);
  } else if (oElm.currentStyle) {
    strCssRule = strCssRule.replace(/\-(\w)/g, function(strMatch, p1) {
      return p1.toUpperCase();
    });
    strValue = oElm.currentStyle[strCssRule];
  }
  return strValue;
}

// How to use it:
// CSS:
// /* Element CSS*/
// div#container{
//     font: 2em/2.25em Verdana, Geneva, Arial, Helvetica, sans-serif;
// }
// JS:
// var elementFontSize = getStyle(document.getElementById("container"), "font-size");
// 获取元素完整样式
function getCompleteStyle() {
  var objs, PseudoClass, cssName, cssArr = [];

  function getObj(obj) {
    if (obj !== null) {
      if (obj.nodeType === 1 && typeof obj === "object" && obj !== null) {
        return obj;
      } else {
        return false;
      }
    }
  }

  function getPseudoClass(obj) {
    if (obj === null || obj[0] === ":" && typeof obj === "string") {
      return obj;
    } else {
      return false;
    }
  }

  function getCssName(obj) {
    if (typeof obj === "string") {
      return obj;
    } else {
      return false;
    }
  }

  function getArguments(obj) {
    if (getObj(obj)) {
      objs = obj;
    } else if (getPseudoClass(obj)) {
      PseudoClass = obj;
    } else if (getCssName(obj)) {
      cssName = obj;
    } else {
      return false;
    }
  }
  switch (arguments.length) {
    case 0:
      return;
      break;

    case 1:
      if (getObj(arguments[0])) {
        objs = getObj(arguments[0]);
      } else {
        return;
      }
      break;

    case 2:
      for (var i = arguments.length - 1; i >= 0; i--) {
        getArguments(arguments[i]);
      }
      break;

    case 3:
      for (var i = arguments.length - 1; i >= 0; i--) {
        getArguments(arguments[i]);
      }
      break;
  }
  var PseudoClass = PseudoClass || null;
  var cssArr = [];
  if (window.getComputedStyle) {
    cssArr[0] = window.getComputedStyle(objs, PseudoClass);
    if (cssName && typeof cssName === "string") {
      cssArr[1] = cssArr[0].getPropertyValue(cssName);
    }
  } else if (objs.currentStyle) {
    cssArr[0] = objs.currentStyle;
    if (cssName && typeof cssName === "string") {
      cssArr[1] = cssArr[0].getAttribute(cssName);
    }
  }
  return cssArr;
}

// 获取索引
function index(current, obj) {
  for (var i = 0, length = obj.length; i < length; i++) {
    if (obj[i] == current) {
      return i;
    }
  }
}

// 获取元素大小
function getObjSize(obj) {
  var w, h;
  var nodeName = obj.nodeName;
  if (nodeName.toUpperCase() !== "BODY") {
    w = Math.max(obj.clientWidth, obj.offsetWidth, obj.scrollWidth), h = Math.max(obj.clientHeight, obj.offsetHeight, obj.scrollHeight);
  } else {
    w = Math.max(document.documentElement["clientWidth"], document.documentElement["scrollWidth"], document.documentElement["offsetWidth"], document.body["clientWidth"], document.body["scrollWidth"], document.body["offsetWidth"]),
      h = Math.max(document.documentElement["clientHeight"], document.documentElement["scrollHeight"], document.documentElement["offsetHeight"], document.body["clientHeight"], document.body["scrollHeight"], document.body["offsetHeight"]);
  }
  return {
    w: w,
    h: h
  };
}

// 获取居中
function getObjCenter(obj) {
  var objParent = getParent(obj);
  var objSize = getSize(obj);
  var objParentSize = getSize(objParent);
  var objLeft = (objParentSize.w - objSize.w) / 2;
  var objTop = (objParentSize.h - objSize.h) / 2;
  return {
    l: objLeft,
    t: objTop
  };
}

// 返回当前滚动条的偏移量作为对象的x和y属性
function getScrollOffsets(obj) {
  // 如果没有参数，使用指定的窗口或当前窗口
  obj = obj || window;
  // 这适用于除IE浏览器版本8和之前所有的浏览器
  if (obj.pageXOffset != null) {
    return {
      x: obj.pageXOffset,
      y: obj.pageYOffset
    };
  }
  // 对于IE（或任何浏览器）的标准模式
  var d = obj.document;
  if (document.compatMode == "CSS1Compat") {
    return {
      x: d.documentElement.scrollLeft,
      y: d.documentElement.scrollTop
    };
  }
  // 对于浏览器的quick模式
  return {
    x: d.body.scrollLeft,
    y: d.body.scrollTop
  };
}

// 网页可视面积，不含滚动条
function documentVisibleSize() {
  if (document.compatMode === "BackCompat") {
    return {
      width: document.body.clientWidth,
      height: document.body.clientHeight
    };
  } else {
    return {
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight
    };
  }
}

// 网页实际面积
function documentSize() {
  if (document.compatMode === "BackCompat") {
    return {
      width: Math.max(document.body.scrollWidth, document.body.clientWidth),
      height: Math.max(document.body.scrollHeight, document.body.clientHeight)
    };
  } else {
    return {
      width: Math.max(document.documentElement.scrollWidth, document.documentElement.clientWidth),
      height: Math.max(document.documentElement.scrollHeight, document.documentElement.clientHeight)
    };
  }
}

// 获取窗口大小
function getBrowserWindowSize() {
  var de = document.documentElement;
  // window.innerWidth for most browsers
  // document.documentElement.clientWidth for MSIE in strict mode
  // document.body.clientWidth for MSIE in quirks mode
  return {
    width: window.innerWidth || de && de.clientWidth || document.body.clientWidth,
    height: window.innerHeight || de && de.clientHeight || document.body.clientHeight
  };
}

// 获取网页元素的绝对位置
function getElementPosition(element) {
  var position = {
    left: element.offsetLeft,
    top: element.offsetTop
  };
  var current = element.offsetParent;
  while (current !== null) {
    position = {
      left: position.left + current.offsetLeft,
      top: position.top + current.offsetTop
    };
    current = current.offsetParent;
  }
  return position;
}

// 获取网页元素的相对位置，需要getElementPosition函数
function getElementViewPosition(element) {
  var position = getElementPosition(element);
  var scrollPosition = {};
  if (document.compatMode === "BackCompat") {
    scrollPosition = {
      left: document.body.scrollLeft,
      top: document.body.scrollTop
    };
  } else {
    scrollPosition = {
      left: document.documentElement.scrollLeft,
      top: document.documentElement.scrollTop
    };
  }
  position = {
    left: position.left - scrollPosition.left,
    top: position.top - scrollPosition.top
  };
  return position;
}

// 获取元素位置
function getOffset(el) {
  var box = el.getBoundingClientRect(),
    doc = el.ownerDocument,
    body = doc.body,
    docElem = doc.documentElement, // for ie
    clientTop = docElem.clientTop || body.clientTop || 0,
    clientLeft = docElem.clientLeft || body.clientLeft || 0, // In Internet Explorer 7 getBoundingClientRect property is treated as physical,
    // while others are logical. Make all logical, like in IE8.
    zoom = 1;
  if (body.getBoundingClientRect) {
    var bound = body.getBoundingClientRect();
    zoom = (bound.right - bound.left) / body.clientWidth;
  }
  if (zoom > 1) {
    clientTop = 0;
    clientLeft = 0;
  }
  var top = box.top / zoom + (window.pageYOffset || docElem && docElem.scrollTop / zoom || body.scrollTop / zoom) - clientTop,
    left = box.left / zoom + (window.pageXOffset || docElem && docElem.scrollLeft / zoom || body.scrollLeft / zoom) - clientLeft;
  return {
    top: top,
    left: left
  };
}

// 显示或隐藏对象元素
function toggle(obj) {
  var el = document.getElementById(obj);
  if (el.style.display != "none") {
    el.style.display = "none";
  } else {
    el.style.display = "";
  }
}

// 获取鼠标位置
function mousePos(e) {
  var x, y;
  var e = e || window.event;
  return {
    x: e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft,
    y: e.clientY + document.body.scrollTop + document.documentElement.scrollTop
  };
}

/**
 * 获取鼠标在页面上的位置
 * @param ev        触发的事件
 * @return          x:鼠标在页面上的横向位置, y:鼠标在页面上的纵向位置
 */
function getMousePoint(ev) {
  // 定义鼠标在视窗中的位置
  var point = {
    x: 0,
    y: 0
  };
  // 如果浏览器支持 pageYOffset, 通过 pageXOffset 和 pageYOffset 获取页面和视窗之间的距离
  if (typeof window.pageYOffset != "undefined") {
    point.x = window.pageXOffset;
    point.y = window.pageYOffset;
  } else if (typeof document.compatMode != "undefined" && document.compatMode != "BackCompat") {
    point.x = document.documentElement.scrollLeft;
    point.y = document.documentElement.scrollTop;
  } else if (typeof document.body != "undefined") {
    point.x = document.body.scrollLeft;
    point.y = document.body.scrollTop;
  }
  // 加上鼠标在视窗中的位置
  point.x += ev.clientX;
  point.y += ev.clientY;
  // 返回鼠标在视窗中的位置
  return point;
}

// 在文档中的位置的指针
function getPointerPositionInDocument(eventObject) {
  eventObject = eventObject || window.event;
  var x = eventObject.pageX || eventObject.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft);
  var y = eventObject.pageY || eventObject.clientY + (document.documentElement.scrollTop || document.body.scrollTop);
  //x and y now contain the coordinates of the mouse relative to the document origin
  return {
    x: x,
    y: y
  };
}

if (!Function.prototype.bind) {
  Function.prototype.bind = function(oThis) {
    if (typeof this !== "function") {
      // closest thing possible to the ECMAScript 5 internal IsCallable function
      throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
    }

    var aArgs = Array.prototype.slice.call(arguments, 1),
      fToBind = this,
      fNOP = function() {},
      fBound = function() {
        return fToBind.apply(this instanceof fNOP && oThis ? this : oThis || window,
          aArgs.concat(Array.prototype.slice.call(arguments)));
      };

    fNOP.prototype = this.prototype;
    fBound.prototype = new fNOP();

    return fBound;
  };
}

/*
parseJSON(string, filter)
解析JSON文本生成对象或数组，可能抛出SyntaxError异常
*/
function parseJSON(s, filter) {
  var j;

  function walk(k, v) {
    var i;
    if (v && typeof v === 'object') {
      for (i in v) {
        if (v.hasOwnProperty(i)) {
          v[i] = walk(i, v[i]);
        }
      }
    }
    return filter(k, v);
  }

  // Parsing happens in three stages. In the first stage, we run the
  // text against a regular expression which looks for non-JSON
  // characters. We are especially concerned with '()' and 'new'
  // because they can cause invocation, and '=' because it can cause
  // mutation. But just to be safe, we will reject all unexpected
  // characters.

  if (/^("(\\.|[^"\\\n\r])*?"|[,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t])+?$/.test(s)) {

    // In the second stage we use the eval function to compile the text
    // into a JavaScript structure. The '{' operator is subject to a
    // syntactic ambiguity in JavaScript: it can begin a block or an
    // object literal. We wrap the text in parens to eliminate
    // the ambiguity.

    try {
      j = eval('(' + s + ')');
    } catch (e) {
      throw new SyntaxError("parseJSON");
    }
  } else {
    throw new SyntaxError("parseJSON");
  }

  // In the optional third stage, we recursively walk the new structure,
  // passing each name/value pair to a filter function for possible
  // transformation.

  if (typeof filter === 'function') {
    j = walk('', j);
  }
  return j;
}
/*
ajax
*/
function ajax(arr) {
  var url = arr["url"],
    method = arr["methods"] || "POST",
    async = arr["async"] || true,
    fn = arr["suc"] || function(message) {},
    data = arr["datas"] || "",
    name = arr["name"] || "Content-type",
    value = arr["value"] || "application/x-www-form-urlencoded",
    xmlhttp;
  if (window.XMLHttpRequest) {
    // code for IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp = new XMLHttpRequest();
  } else {
    // code for IE6, IE5
    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }
  xmlhttp.onreadystatechange = function() {
    /*
    0 Uninitialized 初始化状态。XMLHttpRequest 对象已创建或已被 abort() 方法重置。
    1 Open  open() 方法已调用，但是 send() 方法未调用。请求还没有被发送。
    2 Sent  Send() 方法已调用，HTTP 请求已发送到 Web 服务器。未接收到响应。
    3 Receiving 所有响应头部都已经接收到。响应体开始接收但未完成。
    4 Loaded  HTTP 响应已经完全接收。
    */
    switch (xmlhttp.readyState) {
      case 0:
        // 尚未初始化
        break;

      case 1:
        // 载入中
        break;

      case 2:
        // 载入完成
        break;

      case 3:
        // 交互
        break;

      case 4:
        // 完成
        if (xmlhttp.status == 200) {
          var message = xmlhttp;
          fn(message);
        } else {}
        break;
    }
  };
  xmlhttp.open(method, url, async);
  xmlhttp.setRequestHeader(name, value);
  // xmlReq.setRequestHeader("Content-length", data.length);
  // xmlReq.setRequestHeader("Connection", "close");
  // abort() // 用于停止当前请求
  // getAllResponseHeaders() // 返回字符串形式的完整的头部信息集合
  // getResponseHeader() // 返回指定头部的一个单独的字符串值
  xmlhttp.send(data);
}

// ajaxs({
//     url:'ajax.php',
//     methods:'post',
//     async:true,
//     name:'Content-type',
//     value:'application/x-www-form-urlencoded',
//     suc:function(message){
//         document.getElementById('odiv').innerHTML = message;
//     },
//     datas:"user=aaaa"
// });
/*
其他
*/
// 用于sort的比较函数
/*
var testArray = ["郑", "州", "信", "源", "信", "息", "技", "术", "股", "份", "有", "限", "公", "司"];
console.log(testArray.sort(
  function compareFunction(param1, param2) {
    return param1.localeCompare(param2); //output:份,公,股,技,术,司,息,限,信,信,有,源,郑,州
  }
));
*/
function compareFunc(param1, param2) {
  //如果两个参数均为字符串类型
  if (typeof param1 == "string" && typeof param2 == "string") {
    return param1.localeCompare(param2);
  }
  //如果参数1为数字，参数2为字符串
  if (typeof param1 == "number" && typeof param2 == "string") {
    return -1;
  }
  //如果参数1为字符串，参数2为数字
  if (typeof param1 == "string" && typeof param2 == "number") {
    return 1;
  }
  //如果两个参数均为数字
  if (typeof param1 == "number" && typeof param2 == "number") {
    if (param1 > param2) return 1;
    if (param1 == param2) return 0;
    if (param1 < param2) return -1;
  }
}

// 指定范围随机数
function randomRange(start, end) {
  var total = end - start + 1;
  return Math.floor(Math.random() * total + start);
}

// 生成不重复的指定范围随机数组
function noRepeatRandom(start, end) {
  var i = 0;
  var l = end - start;
  var arr = [];
  for (; i < l; i++) {
    arr[i] = start + i;
  }
  arr.sort(function() {
    return 0.5 - Math.random();
  });

  return arr;
}

// 随机正负
function getRandomPositiveNegative() {
  var distinguishInt = Math.round(Math.random());
  if (distinguishInt > 0) return 1;
  return -1;
}

// 角度转弧度
function degreeToRadian(degree) {
  return degree * Math.PI / 180;
}

// 快速排序
function quickSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }
  var pivotIndex = Math.floor(arr.length / 2),
    pivot = arr.splice(pivotIndex, 1)[0],
    left = [],
    right = [];
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  return quickSort(left).concat([pivot], quickSort(right));
}

// 获取当前选中的文本
function getSelectionString() {
  if (window.getSelection) {
    return window.getSelection().toString();
  } else if (document.getSelection) {
    return document.getSelection();
  } else if (document.selection) {
    return document.selection.createRange().text;
  }
  return "";
}

//在js中if条件为null/undefined/0/NaN/""表达式时，统统被解释为false,此外均为true .
//为空判断函数
function isNull(arg1) {
  return !arg1 && arg1 !== 0 && typeof arg1 !== "boolean" ? true : false;
}

// 引入外部js
function addScript(url) {
  var script = document.createElement("script");
  script.src = url;
  document.body.appendChild(script);
}

/*
var myURL = parseURL('http://abc.com:8080/dir/index.html?id=255&m=hello#top');
myURL.file; // = 'index.html'
myURL.hash; // = 'top'
myURL.host; // = 'abc.com'
myURL.query; // = '?id=255&m=hello'
myURL.params; // = Object = { id: 255, m: hello }
myURL.path; // = '/dir/index.html'
myURL.segments; // = Array = ['dir', 'index.html']
myURL.port; // = '8080'
myURL.protocol; // = 'http'
myURL.source; // = 'http://abc.com:8080/dir/index.html?id=255&m=hello#top'
*/
function parseURL(url) {
  var a = document.createElement("a");
  //创建一个链接
  a.href = url;
  return {
    source: url,
    protocol: a.protocol.replace(":", ""),
    host: a.hostname,
    port: a.port,
    query: a.search,
    params: function() {
      var ret = {},
        seg = a.search.replace(/^\?/, "").split("&"),
        len = seg.length,
        i = 0,
        s;
      for (; i < len; i++) {
        if (!seg[i]) {
          continue;
        }
        s = seg[i].split("=");
        ret[s[0]] = s[1];
      }
      return ret;
    }(),
    file: (a.pathname.match(/\/([^\/?#]+)$/i) || [, ""])[1],
    hash: a.hash.replace("#", ""),
    path: a.pathname.replace(/^([^\/])/, "/$1"),
    relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [, ""])[1],
    segments: a.pathname.replace(/^\//, "").split("/")
  };
}

// 判断有没有中文
function isChinese(str) {
  var lst = /[u00-uFF]/;
  return !lst.test(str);
}

// 获取中英文混合字符串的长度
function strlen(str) {
  var strlength = 0;
  for (i = 0; i < str.length; i++) {
    if (isChinese(str.charAt(i)) == true) {
      strlength = strlength + 2;
    } else {
      strlength = strlength + 1;
    }
  }
  return strlength;
}

// 去除文字两边空白
function trim(string) {
  return string.replace(/^\s+|\s+$/g, "");
}

// 确定鼠标哪个按钮被按下
function getMouseButton(eventObject) {
  eventObject = eventObject || window.event;
  // Initialize an object wit the appropriate properties
  var buttons = {
    left: false,
    middle: false,
    right: false
  };
  // Check the toString value of the eventObject
  // W3C Dom object have a toString method and in this case it
  // should be MouseEvent
  if (eventObject.toString && eventObject.toString().indexOf("MouseEvent") != -1) {
    // W3C Method
    switch (eventObject.button) {
      case 0:
        buttons.left = true;
        break;

      case 1:
        buttons.middle = true;
        break;

      case 2:
        buttons.right = true;
        break;

      default:
        break;
    }
  } else if (eventObject.button) {
    // MSIE method
    switch (eventObject.button) {
      case 1:
        buttons.left = true;
        break;

      case 2:
        buttons.right = true;
        break;

      case 3:
        buttons.left = true;
        buttons.right = true;
        break;

      case 4:
        buttons.middle = true;
        break;

      case 5:
        buttons.left = true;
        buttons.middle = true;
        break;

      case 6:
        buttons.middle = true;
        buttons.right = true;
        break;

      case 7:
        buttons.left = true;
        buttons.middle = true;
        buttons.right = true;
        break;

      default:
        break;
    }
  } else {
    return false;
  }
  return buttons;
}

/***********************
* 函数：判断滚轮滚动方向
* 作者：walkingp
* 参数：event
* 返回：滚轮方向 ：
向上 ：火狐为-3，其他为120
向下 ：火狐为3，其他为-120
*************************/
function scrollFunc(e) {
  var direct = 0,
    step = 50;
  e = e || window.event;
  if (e.wheelDelta) {
    //IE/Opera/Chrome
    if (e.wheelDelta > 0) {
      window.scrollBy(0, -step);
    } else {
      window.scrollBy(0, step);
    }
  } else if (e.detail) {
    //Firefox
    if (e.detail > 0) {
      window.scrollBy(0, step);
    } else {
      window.scrollBy(0, -step);
    }
  }
}

// 根据事件判断哪个键按下
function getKeyPressed(eventObject) {
  eventObject = eventObject || window.event;
  var code = eventObject.keyCode;
  var value = String.fromCharCode(code);
  return {
    code: code,
    value: value
  };
}

// 遍历DOM包含属性
function walkTheDOMWithAttributes(node, func, depth, returnedFromParent) {
  var root = node || window.document;
  returnedFromParent = func.call(root, depth++, returnedFromParent);
  if (root.attributes) {
    for (var i = 0; i < root.attributes.length; i++) {
      walkTheDOMWithAttributes(root.attributes[i], func, depth - 1, returnedFromParent);
    }
  }
  if (root.nodeType != comm.node.ATTRIBUTE_NODE) {
    node = root.firstChild;
    while (node) {
      walkTheDOMWithAttributes(node, func, depth, returnedFromParent);
      node = node.nextSibling;
    }
  }
}

// 遍历DOM，有回掉函数
function walkTheDOM(node, func) {
  func(node);
  node = node.firstChild;
  while (node) {
    walkTheDOM(node, func);
    node = node.nextSibling;
  }
}

/*
面向对象
*/
// 判断要检查的对象是否存在于原型对象的原型链
function inPrototype(objPrototype, objExample) {
  return objPrototype.prototype.isPrototypeOf(objExample);
}

// 判断一个对象是否是另一个对象的实例则
function isObjectProptotype(objPrototype, objExample) {
  return objExample instanceof objPrototype;
}

// 判断实例中是否存在指定属性
function propertyFromPrototype(obj, propterty) {
  return obj.hasOwnProperty(propterty);
}

// 判断原型或实例中是否存在指定属性
function hasPproperty(obj, propterty) {
  return propterty in obj;
}

// 判断只有原型中有指定属性
function isInPrototype() {
  return propterty in obj && !obj.hasOwnProperty(propterty);
}

// 深拷贝
function deepCopy(p, c) {
  var c = c || {};
  for (var i in p) {
    if (typeof p[i] === "object") {
      c[i] = p[i].constructor === Array ? [] : {};
      deepCopy(p[i], c[i]);
    } else {
      c[i] = p[i];
    }
  }
  return c;
}

// 判断值的类型
function type(o) {
  var t, c, n;
  if (o === null) {
    return 'null';
  }

  if (o !== o) {
    return 'nan';
  }

  if ((t = typeof o) !== 'object') {
    return t;
  }

  if ((c = classof(o)) !== 'Object') {
    return c;
  }

  if (o.constructor && typeof o.constructor === 'function' && (n = o.constructor.getName())) {
    return n;
  }

  return 'Object';
}

/*
类属性
 */
function classof(o) {
  if (o === null) {
    return 'Null';
  }
  if (o === undefined) {
    return 'Undefined';
  }
  return Object.prototype.toString.call(o).slice(8, -1);
}

// 利用空对象作为中介来继承
function extend(Child, Parent) {
  var F = function() {};
  F.prototype = Parent.prototype;
  Child.prototype = new F();
  Child.prototype.constructor = Child;
  Child.uber = Parent.prototype;
}

// 拷贝继承
function extend2(Child, Parent) {
  var p = Parent.prototype;
  var c = Child.prototype;
  for (var i in p) {
    c[i] = p[i];
  }
  c.uber = p;
}

/*
给Object.prototype添加一个不可枚举的extend()方法
这个方法继承自调用它的对象，将作为参数传入的对象的属性一一复制
除了值之外，也复制属性的所有特性，除非在目标对象中存在同名的属性
参数对象的所有自有对象（包括不可枚举的属性）也会一一复制
 */
Object.defineProperty(Object.prototype, 'extend', {
  writable: true,
  enumerable: false,
  configurable: true,
  value: function(o) {
    var names = Object.getOwnPropertyNames(o);
    for (var i = 0; i < names.length; i++) {
      if (names[i] in this) {
        continue;
      }
      var desc = Object.getOwnPropertyDescriptor(o, names[i]);
      Object.defineProperty(this, names[i], desc);
    }
  }
});

// 通过原型继承创建一个新对象
function inherit(p) {
  if (p == null) {
    throw TypeError();
  }
  if (Object.create) {
    return Object.create(p);
  }
  var t = typeof p;
  if (t !== 'object' && t !== 'function') {
    throw TypeError();
  }

  function f() {};
  f.prototype = p;
  return new f();
}

/*
将p中的可枚举属性复制到o中， 并返回o
 */
function merge(o, p) {
  for (prop in p) {
    if (o.hasOwnProperty[prop]) continue;
    o[prop] = p[prop];
  }
  return o;
}

/*
如果o中的属性在p中没有同名属性，则从o中删除这个属性
 */
function restrict(o, p) {
  for (prop in o) {
    if (!(prop in p)) {
      delete o[prop];
    }
  }
  return o;
}

/*
如果o中的属性在p中有同名属性，则从o中删除这个属性
 */
function substr(o, p) {
  for (prop in o) {
    delete o[prop];
  }
  return o;
}

/*
返回一个新对象，这个对象同时拥有o的属性和p的属性，如果o和p中有重名属性，使用p中的属性
 */
function union(o, p) {
  function extend(o, p) {
    for (prop in p) {
      o[prop] = p[prop];
    }
    return o;
  }

  return extend(extend({}, o), p);
}

/*
返回一个新对象，这个对象拥有同时在o和p中出现的属性，
很像求o和p的交集，但p中属性的值被忽略
 */
function instersection(o, p) {
  return restrict(extend({}, o), p);
}

/*
功能
拖动，只能用于绝对定位元素，需要 getScrollOffsets()
*/
function drag(elementToDrag, event) {
  event = event || window.event;
  // 最初的鼠标位置，转换为坐标文件
  var scroll = getScrollOffsets();
  // 获取鼠标的坐标（包括滚动条）
  var startX = event.clientX + scroll.x;
  var startY = event.clientY + scroll.y;
  // 元素的初始坐标
  var origX = elementToDrag.offsetLeft;
  var origY = elementToDrag.offsetTop;
  //
  var deltaX = startX - origX;
  var deltaY = startY - origY;
  //
  if (document.addEventListener) {
    document.addEventListener("mousemove", moveHandler, true);
    document.addEventListener("mouseup", upHandler, true);
  } else if (document.attachEvent) {
    // 只有ie支持 setCapture()
    elementToDrag.setCapture();
    elementToDrag.attachEvent("onmousemove", moveHandler);
    elementToDrag.attachEvent("onmouseup", upHandler);
    elementToDrag.attachEvent("onlosecapture", upHandler);
  }
  if (event.stopPropagation) event.stopPropagation();
  else event.cancelBubble = true;
  // IE
  if (event.preventDefault) event.preventDefault();
  else event.returnValue = false;
  // IE
  function moveHandler(e) {
    e = e || window.event;
    // IE event Model
    var scroll = getScrollOffsets();
    elementToDrag.style.left = e.clientX + scroll.x - deltaX + "px";
    elementToDrag.style.top = e.clientY + scroll.y - deltaY + "px";
    if (e.stopPropagation) e.stopPropagation();
    else e.cancelBubble = true;
  }

  function upHandler(e) {
    e = e || window.event;
    // IE Event Model
    if (document.removeEventListener) {
      // DOM event model
      document.removeEventListener("mouseup", upHandler, true);
      document.removeEventListener("mousemove", moveHandler, true);
    } else if (document.detachEvent) {
      // IE 5+ Event Model
      elementToDrag.detachEvent("onlosecapture", upHandler);
      elementToDrag.detachEvent("onmouseup", upHandler);
      elementToDrag.detachEvent("onmousemove", moveHandler);
      elementToDrag.releaseCapture();
    }
    if (e.stopPropagation) e.stopPropagation();
    else e.cancelBubble = true;
  }
}

/*///////////////////触摸拖动/////////////////////////////*/
function touchMove(obj, steper, inx, fn, o) {
  var ever = obj.parentNode,
    ul_length = getChildElements(obj).length - 1,
    o = o && o != 0 || 0,
    s_x = 0,
    s_y = 0,
    start_x = 0,
    start_y = 0,
    dr = 0,
    step = 0,
    this_index = inx || 0, // 问题出在与与indexer的关联上
    drag_flag = false;
  // 是否是元素按下
  function no_select(obj) {
    var lis = obj.childNodes;
    for (var i = 0, l = lis.length; i < l; i++) {
      function remove_select(i) {
        addEvent(lis[i], "selectstart", function() {
          return false;
        });
        addEvent(lis[i], "dragstart", function() {
          return false;
        });
      }
      remove_select(i);
    }
  }
  /*鼠标按下，触发鼠标移动*/
  addEvent(ever, "mousedown", function(e) {
    if ($id(obj).isAnimate) {
      return false;
    }
    drag_flag = true;
    s_x = mousePos(e)["x"];
    s_y = mousePos(e)["y"];
    start_x = parseInt(getStyle(obj, "left"));
    start_y = parseInt(getStyle(obj, "top"));
    // css没设置时为parseInt('auto')
    if (isNaN(start_x)) {
      start_x = parseInt(obj.offsetLeft);
    }
    if (isNaN(start_y)) {
      start_y = parseInt(obj.offsetTop);
    }
    no_select(document);
    mouse_move();
  });
  // 鼠标移动
  function mouse_move() {
    addEvent(obj, "mousemove", showx);
  }
  // 元素跟随鼠标x轴移动
  function showx(e) {
    var c = dr;
    var n_x = mousePos(e)["x"],
      n_y = mousePos(e)["y"];
    stepx = s_x - n_x;
    stepy = s_y - n_y;
    var a = Math.abs(stepx);
    var b = Math.abs(stepy);
    if (a > b) {
      dr = 0;
    }
    if (a < b) {
      dr = 1;
    }
    if (dr != o) {
      return false;
    }
    if (!o) {
      obj.style["left"] = start_x - stepx + "px";
    } else {
      obj.style["top"] = start_y - stepy + "px";
    }
    darg_end();
  }
  // 鼠标松开，根据松开时的位置判断并移动元素
  function darg_end() {
    addEvent(obj, "mouseup", function(e) {
      removeEvent(obj, "mousemove", showx);
      if (drag_flag) {
        // 判断是否是元素按下，作用是让文档在鼠标松开的时候不进行元素移动的动作
        am(e);
      }
      drag_flag = false;
    });
    addEvent(obj, "mouseout", function(e) {
      removeEvent(obj, "mousemove", showx);
      if (drag_flag) {
        // 判断是否是元素按下，作用是让文档在鼠标松开的时候不进行元素移动的动作
        am(e);
      }
      drag_flag = false;
    });
  }
  // 鼠标释放后，根据当前的位置判断元素移动的位置
  function am(e) {
    if (!o) {
      var e_x = mousePos(e)["x"],
        c = e_x - s_x;
    } else {
      var e_y = mousePos(e)["y"],
        c = e_y - s_y;
    }

    function index() {
      if (c < 0) {
        this_index += 1;
      } else {
        this_index -= 1;
      }
      if (this_index <= 0) {
        this_index = 0;
      }
      if (this_index >= ul_length) {
        this_index = ul_length;
      }
    }
    index();
    if (!o) {
      if (Math.abs(c) > 10) {
        $id(obj).transition({
          left: -(this_index * steper) + "px"
        }, 500, function() {});
        fn(this_index);
      } else {
        $id(obj).transition({
          left: start_x + "px"
        }, 500, function() {});
      }
    } else {
      if (Math.abs(c) > 10) {
        $id(obj).transition({
          top: -(this_index * steper) + "px"
        }, 500, function() {});
        fn(this_index);
      } else {
        $id(obj).transition({
          top: start_x + "px"
        }, 500, function() {});
      }
    }
  }
}

// 序列化表单
function serialize_form(obj) {
  // 获取对象
  if (typeof obj == "string") {
    var form = document.getElementById(obj);
  } else if (typeof obj === "object " && obj !== null) {
    var form = obj;
  }
  // console.log(form);
  var data = "form=" + (form.name || form.id);
  // 所有input
  var inputs = form.getElementsByTagName("input");
  for (var i = 0, l = inputs.length; i < l; i += 1) {
    var type = inputs[i].getAttribute("type");
    // console.log(inputs[i].value);
    function ii() {
      data += "&" + (inputs[i].id || inputs[i].name) + "=" + inputs[i].value;
    }
    switch (type) {
      case "text":
        if (inputs[i].value) {
          ii();
        }
        break;

      case "password":
        if (inputs[i].value) {
          ii();
        }
        break;

      case "email":
        if (inputs[i].value) {
          ii();
        }
        break;

      case "radio":
        if (inputs[i].value && inputs[i].checked) {
          ii();
        }
        break;

      case "checkbox":
        if (inputs[i].value && inputs[i].checked) {
          ii();
        }
        break;

      case "file":
        if (inputs[i].value) {
          ii();
        }
        break;
    }
  }
  // 所有textarea
  var textareas = form.getElementsByTagName("textarea");
  for (var i = 0, l = textareas.length; i < l; i += 1) {
    console.log(textareas[i].value);
    if (textareas[i].value) {
      data += "&" + (textareas[i].id || textareas[i].name) + "=" + textareas[i].value;
    }
  }
  // 所有select
  var selects = form.getElementsByTagName("select");
  for (var i = 0, l = selects.length; i < l; i += 1) {
    // console.log(selects[i].value);
    if (!selects[i].multiple) {
      for (var j = 0, jl = selects[i].options.length; j < jl; j += 1) {
        if (selects[i].options[j].value && selects[i].options[j].selected) {
          data += "&" + (selects[i].id || selects[i].name) + "=" + selects[i].options[j].value;
        }
      }
    } else {
      for (var j = 0, jl = selects[i].options.length; j < jl; j += 1) {
        if (selects[i].options[j].value && selects[i].options[j].selected) {
          data += "&" + (selects[i].options[j].id || selects[i].options[j].name) + "=" + selects[i].options[j].value;
        }
      }
    }
  }
  return data;
}

// 颜色转换
function parseColor(val) {
  var r, g, b;
  // 参数为RGB模式时不做进制转换，直接截取字符串即可
  if (/rgb/.test(val)) {
    // 判断是否是百分比
    var x = val.indexOf('%');
    var arr = val.match(/\d+/g);
    r = parseInt(arr[0]);
    g = parseInt(arr[1]);
    b = parseInt(arr[2]);
    if (x > 0) {
      r = Math.round(r / 100 * 255);
      g = Math.round(g / 100 * 255);
      b = Math.round(b / 100 * 255);
    }

  }
  // 参数为十六进制时需要做进制转换
  else if (/#/.test(val)) {
    var len = val.length;
    // 非简写模式 #0066cc
    if (len === 7) {
      r = parseInt(val.slice(1, 3), 16);
      g = parseInt(val.slice(3, 5), 16);
      b = parseInt(val.slice(5), 16);
    }
    // 简写模式 #06c
    else if (len === 4) {
      r = parseInt(val.charAt(1) + val.charAt(1), 16);
      g = parseInt(val.charAt(2) + val.charAt(2), 16);
      b = parseInt(val.charAt(3) + val.charAt(3), 16);
    }
  } else {
    return val;
  }

  return {
    r: r,
    g: g,
    b: b
  }
}

function color_to_string(color) {
  return 'rgb(' + color.r + ', ' + color.g + ', ' + color.b + ')';
}

function v2h(value) {
  value = parseInt(value).toString(16);
  return value.length < 2 ? value + "0" : value;
}
// 将颜色转成#000000模式
function rgb2hex(rgb) {
  if (rgb.match(/^rgb/) == null) return rgb;
  var arr = rgb.match(/\d+/g);
  return "#" + v2h(arr[0]) + v2h(arr[1]) + v2h(arr[2]);
}
// var color = parseColor('rgb(20%, 17%, 61%)');

// console.log(parseColor('width: 55px'));
// console.log(color_to_string(color));
/*
 * CookieStorage.js
 * This class implements the Storage API that localStorage and sessionStorage
 * do, but implements it on top of HTTP Cookies.
 */
function CookieStorage() { // Arguments specify lifetime and scope

  // Get an object that holds all cookies
  var cookies = (function() { // The getCookies() function shown earlier
    var cookies = {}; // The object we will return
    var all = document.cookie; // Get all cookies in one big string
    if (all === "") // If the property is the empty string
      return cookies; // return an empty object
    var list = all.split("; "); // Split into individual name=value pairs
    for (var i = 0; i < list.length; i++) { // For each cookie
      var cookie = list[i];
      var p = cookie.indexOf("="); // Find the first = sign
      var name = cookie.substring(0, p); // Get cookie name
      var value = cookie.substring(p + 1); // Get cookie value
      value = decodeURIComponent(value); // Decode the value
      cookies[name] = value; // Store name and value
    }
    return cookies;
  }());

  // Collect the cookie names in an array
  var keys = [];
  for (var key in cookies) keys.push(key);

  // Now define the public properties and methods of the Storage API

  // The number of stored cookies
  this.length = keys.length;

  // Return the name of the nth cookie, or null if n is out of range
  this.key = function(n) {
    if (n < 0 || n >= keys.length) return null;
    return keys[n];
  };

  // Return the value of the named cookie, or null.
  this.getItem = function(name) {
    return cookies[name] || null;
  };

  // Store a value
  this.setItem = function(key, value, maxage, path) {
    if (!(key in cookies)) { // If no existing cookie with this name
      keys.push(key); // Add key to the array of keys
      this.length++; // And increment the length
    }

    // Store this name/value pair in the set of cookies.
    cookies[key] = value;

    // Now actually set the cookie.
    // First encode value and create a name=encoded-value string
    var cookie = key + "=" + encodeURIComponent(value);

    // Add cookie attributes to that string
    if (maxage) cookie += "; max-age=" + maxage;
    if (path) cookie += "; path=" + path;

    // Set the cookie through the magic document.cookie property
    document.cookie = cookie;
  };

  // Remove the specified cookie
  this.removeItem = function(key) {
    if (!(key in cookies)) return; // If it doesn't exist, do nothing

    // Delete the cookie from our internal set of cookies
    delete cookies[key];

    // And remove the key from the array of names, too.
    // This would be easier with the ES5 array indexOf() method.
    for (var i = 0; i < keys.length; i++) { // Loop through all keys
      if (keys[i] === key) { // When we find the one we want
        keys.splice(i, 1); // Remove it from the array.
        break;
      }
    }
    this.length--; // Decrement cookie length

    // Finally actually delete the cookie by giving it an empty value
    // and an immediate expiration date.
    document.cookie = key + "=; max-age=0";
  };

  // Remove all cookies
  this.clear = function() {
    // Loop through the keys, removing the cookies
    for (var i = 0; i < keys.length; i++)
      document.cookie = keys[i] + "=; max-age=0";
    // Reset our internal state
    cookies = {};
    keys = [];
    this.length = 0;
  };
}
// 判断浏览器
function checkBrowser() {
  var Sys = {};
  var ua = navigator.userAgent.toLowerCase();
  var s;
  (s = ua.match(/msie ([\d.]+)/)) ? Sys.ie = s[1]:
    (s = ua.match(/firefox\/([\d.]+)/)) ? Sys.firefox = s[1] :
    (s = ua.match(/chrome\/([\d.]+)/)) ? Sys.chrome = s[1] :
    (s = ua.match(/opera.([\d.]+)/)) ? Sys.opera = s[1] :
    (s = ua.match(/version\/([\d.]+).*safari/)) ? Sys.safari = s[1] : 0;
  return Sys;
  // if (Sys.ie) { //Js判断为IE浏览器
  //   alert(Sys.ie + 'ie');
  //   if (Sys.ie == '9.0') { //Js判断为IE 9
  //     alert('ie9');
  //   } else if (Sys.ie == '8.0') { //Js判断为IE 8
  //     alert('ie8');
  //   } else {}
  // }
  // if (Sys.firefox) { //Js判断为火狐(firefox)浏览器
  //   alert(Sys.firefox + 'firefox');
  // }
  // if (Sys.chrome) { //Js判断为谷歌chrome浏览器
  //   alert(Sys.chrome + 'chrome');
  // }
  // if (Sys.opera) { //Js判断为opera浏览器
  //   alert(Sys.opera + 'opera');
  // }
  // if (Sys.safari) { //Js判断为苹果safari浏览器
  //   alert(Sys.safari + 'safari');
  // }
}
/**
 * 将数值四舍五入(保留2位小数)后格式化成金额形式
 *
 * @param num 数值(Number或者String)
 * @return 金额格式的字符串,如'1,234,567.45'
 * @type String
 */
function formatCurrency(num) {
  num = num.toString().replace(/\$|\,/g, '');
  if (isNaN(num))
    num = "0";
  sign = (num == (num = Math.abs(num)));
  num = Math.floor(num * 100 + 0.50000000001);
  cents = num % 100;
  num = Math.floor(num / 100).toString();
  if (cents < 10)
    cents = "0" + cents;
  for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++)
    num = num.substring(0, num.length - (4 * i + 3)) + ',' +
    num.substring(num.length - (4 * i + 3));
  return (((sign) ? '' : '-') + num + '.' + cents);
}

/**
 * 将数值四舍五入(保留1位小数)后格式化成金额形式
 *
 * @param num 数值(Number或者String)
 * @return 金额格式的字符串,如'1,234,567.4'
 * @type String
 */
function formatCurrencyTenThou(num) {
  num = num.toString().replace(/\$|\,/g, '');
  if (isNaN(num))
    num = "0";
  sign = (num == (num = Math.abs(num)));
  num = Math.floor(num * 10 + 0.50000000001);
  cents = num % 10;
  num = Math.floor(num / 10).toString();
  for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++)
    num = num.substring(0, num.length - (4 * i + 3)) + ',' +
    num.substring(num.length - (4 * i + 3));
  return (((sign) ? '' : '-') + num + '.' + cents);
}

// 编码字符串
function escapeString(s){
  return encodeURIComponent(s);
}

// 解码字符串
function unescapeString(s) {
  return decodeURIComponent(s);
}

// 洗牌算法：给数组随机排序
Array.prototype.shuffle = function() {
  var input = this;

  for (var i = input.length - 1; i >= 0; i--) {

    var randomIndex = Math.floor(Math.random() * (i + 1));
    var itemAtIndex = input[randomIndex];

    input[randomIndex] = input[i];
    input[i] = itemAtIndex;
  }
  return input;
}

/*
// 使用例子
var tempArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
tempArray.shuffle();

// and the result is...
alert(tempArray);

 */

