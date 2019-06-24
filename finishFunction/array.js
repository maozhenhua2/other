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



/*var arr = [
  ["值类型", "新车销量", "裸车毛利率", "返利后毛利率", "平均单车销售裸车毛利", "平均单车销售返利", "平均单车销售水平事业毛利", "GA4裸车毛利率", "GA6裸车毛利率", "GA8裸车毛利率", "GS3裸车毛利率", "GS4裸车毛利率", "GS7裸车毛利率", "GS8裸车毛利率", "GM8裸车毛利率", "新车库存周转天数", "0~30天期末新车库存占比", "31~60天期末新车库存占比", "61~90天期末新车库存占比", ">90天期末新车库存占比"],
  ["全国标杆值", "136", "-0.46%", "4.44%", "-607", "6,879", "3,952", "1.72%", "-7.01%", "-0.73%", "4.51%", "-4.15%", "4.60%", "4.11%", "7.39%", "33", "66.39%", "32.23%", "6.37%", "1.92%"],
  ["全国中位值", "111", "-2.0%", "2.7%", "-2,350", "5,423", "3,039", "-0.7%", "-10.6%", "-4.7%", "3.2%", "-6.1%", "2.7%", "1.6%", "5.3%", "41", "55.6%", "26.8%", "10.3%", "7.3%"],
  ["单店值", "84", "-1.8%", "3.4%", "-2,145", "6,212", "3,172", "-6.8%", "-15.6%", "-8.2%", "0.4%", "-7.1%", "4.7%", "5.2%", "2.7%", "54", "38.3%", "28.2%", "16.1%", "17.4%"]
];*/

// 表格数据行列互换
function arrxtoy(arr) {
  var arr2 = [];
  for (var i1 = 0, l1 = arr[0].length; i1 < l1; i1++) {
    var y = arr[0][i1];
    var y1 = [];
    for (var i2 = 0, l2 = arr.length; i2 < l2; i2++) {
      y1.push(arr[i2][i1]);
    }
    arr2.push(y1);
  }
  return arr2;
}

/*arr2 = [
  ["值类型", "全国标杆值", "全国中位值", "单店值"],
  ["新车销量", "136", "111", "84"],
  ["裸车毛利率", "-0.46%", "-2.0%", "-1.8%"],
  ["返利后毛利率", "4.44%", "2.7%", "3.4%"],
  ["平均单车销售裸车毛利", "-607", "-2,350", "-2,145"],
  ["平均单车销售返利", "6,879", "5,423", "6,212"],
  ["平均单车销售水平事业毛利", "3,952", "3,039", "3,172"],
  ["GA4裸车毛利率", "1.72%", "-0.7%", "-6.8%"],
  ["GA6裸车毛利率", "-7.01%", "-10.6%", "-15.6%"],
  ["GA8裸车毛利率", "-0.73%", "-4.7%", "-8.2%"],
  ["GS3裸车毛利率", "4.51%", "3.2%", "0.4%"],
  ["GS4裸车毛利率", "-4.15%", "-6.1%", "-7.1%"],
  ["GS7裸车毛利率", "4.60%", "2.7%", "4.7%"],
  ["GS8裸车毛利率", "4.11%", "1.6%", "5.2%"],
  ["GM8裸车毛利率", "7.39%", "5.3%", "2.7%"],
  ["新车库存周转天数", "33", "41", "54"],
  ["0~30天期末新车库存占比", "66.39%", "55.6%", "38.3%"],
  ["31~60天期末新车库存占比", "32.23%", "26.8%", "28.2%"],
  ["61~90天期末新车库存占比", "6.37%", "10.3%", "16.1%"],
  [">90天期末新车库存占比", "1.92%", "7.3%", "17.4%"]
];*/

const toArray = (() =>
  Array.from ? Array.from : obj => [].slice.call(obj)
)();