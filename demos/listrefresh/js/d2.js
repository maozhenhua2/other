var i = 0;
var l = 25;

var lists = document.getElementById('#list');
var list = document.querySelector('#list ul');
var startY = 0;
var startTop = 0;
var moveY = 0;
var move = 0;
var moves = 0;
var endMove = 0;
var isTop = false;
var isBottom = false;
var topAnimateId = null;
var bottomAnimateId = null;
var dir = null;
var height = documentVisibleSize().height;
var listHeight = 0;
var scrollEnd = false;
var maxHeight = document.querySelector('#list .update').offsetHeight / 2 * 3;
var loading = createLoading();
var canMove = false;
/*
 '<div class="down-update">' +
 '  <div class="loading">' +
 '    <div></div>' +
 '    <div></div>' +
 '    <div></div>' +
 '    <div></div>' +
 '  </div>' +
 '  <span>加载新数据······</span>' +
 '</div>';
 */

function createLoading() {
  var down = document.createElement('div');
  down.className = 'down-update';
  var loading = document.createElement('div');
  loading.className = 'loading';
  var span = document.createElement('span');
  span.className = 'margin-left-10';
  span.innerHTML = '加载新数据······';
  var i = 0;
  var l = 4;
  for (; i < l; i++) {
    loading.appendChild(document.createElement('div'));
    loading.appendChild(document.createElement('div'));
    loading.appendChild(document.createElement('div'));
    loading.appendChild(document.createElement('div'));
  }
  down.appendChild(loading);
  down.appendChild(span);
  return down;
}

// 添加dom行
function createLi(i, l) {
  var o = document.createDocumentFragment();
  var li;
  for (; i < l; i++) {
    li = document.createElement('li');
    li.innerHTML = i + 1;
    o.appendChild(li);
  }
  return o;
}
list.appendChild(createLi(i, l));

listHeight = getObjSize(list).h;

list.addEventListener('mousedown', function (e) {
  if (!topAnimateId && !bottomAnimateId) {
    checkPosition();
    startEvent.call(this, e);
    canMove = true;
  }
});

list.addEventListener('mousemove', function (e) {
  if (!topAnimateId && !bottomAnimateId) {
    if (canMove) {
      list.style['-webkit-user-select'] = 'none';
      moveEvent.call(this, e);
    }
  }
});
list.addEventListener('mouseup', function (e) {
  canMove = false;
  dir = move > 0 ? 'up' : 'down';
  startTop = endMove;
  // 移动端
  // document.body.style.overflow = 'auto';

  list.style['-webkit-user-select'] = 'inherit';
  if (!topAnimateId && !bottomAnimateId) {
    // console.log(isBottom)
    if (isTop) {
      window.requestAnimationFrame(topStep);
    } else if (isBottom) {
      window.requestAnimationFrame(bottomStep);
    } else {
      resetPosition();
      if (document.querySelector('.down-update')) {
        removeLoading();
      }
    }
  }
});

// 按下事件
function startEvent(e) {
  startTop = startTop || 0;
  // 移动端
  // startY = e.touches[0].pageY;
  startY = e.pageY;
  list.style.top = startTop + 'px';
}

// 移动事件
function moveEvent(e) {
  // 移动端
  // moveY = e.touches[0].pageY;
  moveY = e.pageY;
  move = (moveY - startY) / 3.5;
  dir = move > 0 ? 'up' : 'down';
  var percent = parseInt(move / maxHeight * 100, 10);
  percent = percent > 100 ? 100 : percent;
  setTimeout(function () {
    document.querySelector('#list .tri').style.transform = 'rotate(' + (-180 * percent / 100) + 'deg)';
  }, 100);
  if (isTop || isBottom) {
    endMove = startTop + move;
  } else {
    endMove = 0;
  }

  if (isTop) {
    if (dir === 'up') {
      // 移动端
      // document.body.style.overflow = 'hidden';
      list.style.top = endMove + 'px';
    }
  } else if (isBottom) {
    if (dir === 'down') {
      list.appendChild(loading);
      list.style.top = endMove + 'px';
    }
  }

}

// 下拉刷新动画
function topStep(e) {
  moves = moves || endMove;
  list.style.top = moves + 'px';
  moves = moves - 10;
  if (moves > 0) {
    topAnimateId = window.requestAnimationFrame(topStep);
  } else {
    resetPosition(topAnimateId);
    topAnimateId = null;
    document.body.scrollTop = 0;
    document.querySelector('#list .tri').style.transform = 'rotate(0deg)';
    if (move > maxHeight) {
      topEndEvent();
    }
  }
}

function bottomStep(e) {
  moves = moves || endMove;
  list.style.top = moves + 'px';
  moves = moves + 10;
  if (moves < 0) {
    bottomAnimateId = window.requestAnimationFrame(bottomStep);
  } else {
    resetPosition(bottomAnimateId);
    bottomAnimateId = null;
    scrollEnd = true;
    if (move < -maxHeight) {
      bottomEndEvent();
    } else {
      removeLoading();
    }
  }
}

function resetPosition(timeid) {
  if (timeid) {
    window.cancelAnimationFrame(timeid);
  }
  moves = 0;
  list.style.top = moves + 'px';
  startTop = 0;
  endMove = 0;
}

// 下拉刷新事件
function topEndEvent() {
  setTimeout(function () {
    updateLi();
    listHeight = getObjSize(list).h;
    if (scrollEnd) {
      document.body.scrollTop = listHeight - height;
      scrollEnd = false;
    }

  }, 500);
}

// 滚动到底部事件
function bottomEndEvent() {
  setTimeout(function () {
    removeLoading();
    updateLi();
    listHeight = getObjSize(list).h;
    if (scrollEnd) {
      document.body.scrollTop = listHeight - height;
      scrollEnd = false;
    }

  }, 500);
}

window.addEventListener('scroll', function (event) {
  checkPosition();
});

function checkPosition() {
  var scrollTop = getScrollOffsets().y;
  if (scrollTop === 0) {
    setTimeout(function () {
      isTop = true;
    }, 200);
  } else if (isScrollBottom(list)) {
    setTimeout(function () {
      isBottom = true;
    }, 200);
  } else {
    isTop = false;
    isBottom = false;
  }
}

function removeLoading() {
  if (document.querySelector('.down-update')) {
    list.removeChild(loading);
  }
}

// 模拟添加数据
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

// 返回top, right, bottom, left, width, height
function getElementPoInfo(o) {
  return o.getBoundingClientRect();
}