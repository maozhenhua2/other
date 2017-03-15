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
  // if (document.compatMode === "BackCompat") {
  if (document.body) {
    // console.log(1)
    return {
      width: Math.max(document.body.scrollWidth, document.body.clientWidth),
      height: Math.max(document.body.scrollHeight, document.body.clientHeight)
    };
  } else {
    // console.log(2)
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

// 判断是否滚动到底部
function isScrollBottom(obj) {
  var scrollTop = getScrollOffsets().y;
  // 如果body的高度为0，则获取指定元素的高度
  var scrollHeight = documentSize().height || getObjSize(obj).h;
  var windowHeight = documentVisibleSize().height;
  return (scrollTop + windowHeight) === scrollHeight;
}

// 滚动到顶部
function scrollTop() {
  // step = step || document.body.scrollTop / 100;
  step = 100;
  var top = getScrollOffsets().y;
  document.body.scrollTop = top - step;
  // console.log(step)
  if (document.body.scrollTop > 0) {
    window.requestAnimationFrame(scrollTop);
  }
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

/*
返回top, right, bottom, left, width, height
 */
function getElementPoInfo(o) {
  return o.getBoundingClientRect();
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
