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

// foreach
if (!Array.prototype.forEach) {
  Array.prototype.forEach = function(fn, thisObj) {
    var scope = thisObj || window;
    for (var i = 0, j = this.length; i < j; ++i) {
      fn.call(scope, this[i], i, this);
    }
  };
}

// filter
if (!Array.prototype.filter) {
  Array.prototype.filter = function(fn, thisObj) {
    var scope = thisObj || window;
    var a = [];
    for (var i = 0, j = this.length; i < j; ++i) {
      if (!fn.call(scope, this[i], i, this)) {
        continue;
      }
      a.push(this[i]);
    }
    return a;
  };
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
// 数组去重
function unique3(array) {
  // 构建一个新数组存放结果
  var newArray = [];
  // 创建一个空对象
  var object = {};
  // for循环时，每次取出一个元素与对象进行对比
  // 如果这个元素不重复，则将它存放到结果数中
  // 同时把这个元素的内容作为对象的一个属性，并赋值为1,
  // 存入到第2步建立的对象中
  for (var i = 0; i < array.length; i++) {
    // 检测在object对象中是否包含遍历到的元素的值
    if (!object[typeof(array[i]) + array[i]]) {
      // 如果不包含，将存入对象的元素的值推入到结果数组中
      newArray.push(array[i]);
      // 如果不包含，存入object对象中该属性名的值设置为1
      object[typeof(array[i]) + array[i]] = 1;
    }
  }
  return newArray;
}

Array.prototype.max = function() {
  return Math.max.apply({}, this)
}
Array.prototype.min = function() {
  return Math.min.apply({}, this)
}
// 思路：获取没重复的最右一值放入新数组
function unique5(array) {
  var r = [];
  for (var i = 0, l = array.length; i < l; i++) {
    for (var j = i + 1; j < l; j++)
      if (array[i] === array[j]) j = ++i;
    r.push(array[i]);
  }
  return r;
}

/**
 * 
 * @desc 判断两个数组是否相等
 * @param {Array} arr1 
 * @param {Array} arr2 
 * <a href='http://www.jobbole.com/members/wx1409399284'>@return</a> {Boolean}
 */
function arrayEqual(arr1, arr2) {
    if (arr1 === arr2) return true;
    if (arr1.length != arr2.length) return false;
    for (var i = 0; i < arr1.length; ++i) {
        if (arr1[i] !== arr2[i]) return false;
    }
    return true;
}