
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
};

// 使用数组sort方法对数组元素随机排序
Array.prototype.shuffle2 = function(n) {
  var len = this.length,
    num = n ? Math.min(n, len) : len,
    arr = this.slice(0)
  arr.sort(function(a, b) {
    return Math.random() - 0.5
  })
  return arr.slice(0, num - 1)
};

// 随机交换数组内的元素 原理from underscore.js
Array.prototype.shuffle3 = function(n) {
  var len = this.length,
    num = n ? Math.min(n, len) : len,
    arr = this.slice(0),
    temp, index

  for (var i = 0; i < len; i++) {
    index = lib.range(i, len - 1)
    temp = arr[i]
    arr[i] = arr[index]
    arr[index] = temp

  }
  return arr.slice(0, num)
};

// 随机排序
arr.sort(function() {
  return Math.random() * 2 - 1;
});

function shuffle(arr) {
  return arr.sort(function() {
    return Math.round(Math.random());
  });
}

/*
 // 使用例子
 var tempArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
 tempArray.shuffle();

 // and the result is...
 alert(tempArray);

 */
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
