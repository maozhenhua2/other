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
    if (parent.nodeName.toLowerCase() === 'html') {
      return false;
    }
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
