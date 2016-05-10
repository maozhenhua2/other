// 获取向上范围的指定父级元素
function parentsUntil(o, select) {
  var parent = o;
  var type = typeof select;

  function setCondition(parent) {
    var condition;
    var arr = [];
    if (parent.nodeName.toLowerCase() === 'html') {
      return false;
    }
    if (type === 'string') {
      if (select.indexOf('.') !== -1) {
        arr = select.split('.');
        arr.shift();
        condition = arr.indexOf(parent.className) === -1;
      } else if (select.indexOf('#') !== -1) {
        arr = select.split('#');
        arr.shift();
        condition = arr.indexOf(parent.id) === -1;
      } else {
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

// 获取索引
function index(current) {
  var obj = current.parentNode.childNodes;
  for (var i = 0, length = obj.length; i < length; i++) {
    if (obj[i] == current) {
      return i;
    }
  }
}

// 将节点插入到某节点前
function prependChild(parent, newChild) {
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

// 判断是否含有指定class
function hasClass(element, className) {
  var re = new RegExp('\\b' + className + '\\b', 'i');
  return element.className.match(re);
}

// 去除文字两边空白
function trim(string) {
  return string.replace(/^\s+|\s+$/g, "");
}

// 添加类
function addClassName(element, className) {
  element.className += (element.className ? " " : "") + className;
  return true;
}

// 删除类
function removeClassName(element, className) {
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
  return length === classes.length;
}

// 获取元素节点的class
function getClassNames(element) {
  return element.className.replace(/\s+/, " ").split(" ");
}

if (typeof Array.prototype.map != "function") {
  Array.prototype.map = function (fn, context) {
    var arr = [];
    if (typeof fn === "function") {
      for (var k = 0, length = this.length; k < length; k++) {
        arr.push(fn.call(context, this[k], k, this));
      }
    }
    return arr;
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