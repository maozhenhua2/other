var i = 0;
var l = 20;
var list = document.querySelector('#list ul');
var startY = 0;
var startTop = 0;
var moveY = 0;
var move = 0;
var isTop = true;

function createLi(i, l) {

  var o = document.createDocumentFragment();
  var li;
  for (; i < l; i++) {
    li = document.createElement('li');
    li.innerHTML = i;
    o.appendChild(li);
  }
  return o;
}

list.appendChild(createLi(i, l));

window.addEventListener('scroll', function (event) {
  var scrollTop = getScrollOffsets().y;
  isTop = scrollTop === 0;
  var isBottom = isScrollBottom(list);
  if (isBottom) {
    updateLi();
  }

});

list.addEventListener('touchstart', function (e) {
  if (isTop) {
    startEvent.call(this, e);
  }

  // console.log('start')
});
list.addEventListener('touchmove', function (e) {
  if (isTop) {
    moveEvent.call(this, e);
  }

  // console.log('move')
});

list.addEventListener('touchend', function (e) {
  if (isTop) {
    window.requestAnimationFrame(step);
  }

  // console.log('move')
});

function startEvent(e) {
  startTop = getElementPoInfo(list).top;
  startY = e.touches[0].pageY;
}

function moveEvent(e) {
  moveY = e.touches[0].pageY;
  move = (moveY - startY) / 3.5;
  list.style.top = move + 'px';
}

function step(e) {
  list.style.top = move + 'px';
  move = move - 10;
  if (move > 0) {
    window.requestAnimationFrame(step);
  } else {
    list.style.top = 0 + 'px';
    endEvent();
  }
}

function endEvent() {
  console.log('refresh');
  updateLi();
}

function updateLi() {
  i = l;
  l++;
  list.appendChild(createLi(i, l));
}


// 判断是否滚动到底部
function isScrollBottom(obj) {
  var scrollTop = getScrollOffsets().y;
  // 如果body的高度为0，则获取指定元素的高度
  var scrollHeight = documentSize().height || getObjSize(obj).h;
  var windowHeight = documentVisibleSize().height;
  return (scrollTop + windowHeight) === scrollHeight;
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

/*
 返回top, right, bottom, left, width, height
 */
function getElementPoInfo(o) {
  return o.getBoundingClientRect();
}