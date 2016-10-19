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

function hasClass(element, className) {
  var re = new RegExp('\\b' + className + '\\b', 'i');
  return element.className.match(re);
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
