/*
四则运算表达式, 去掉所有多余的括号

 a+(b+c)-d
 a+b/(c+d)
 (a*b)+c/d
 ((a+b)*f)-(i/j)

 样例输出

 a+b+c-d
 a+b/(c+d)
 a*b+c/d
 (a+b)*f-i/j
 */
var strs = [
  'a+(b+c)-d',
  'a+b/(c+d)',
  '(a*b)+c/d',
  '((a+b)*f)-(i/j)'
];

var str = strs[3];
// 找到表达式中左右括号所对应的位置
function getPo(str) {
  var arrl = [];
  var arrr = [];

  var i = 0;
  var l = str.length;
  for (; i < l; i++) {
    var d = str[i];
    if (d === '(') {
      // 找到左括号
      arrl.push(i);
      // 找到匹配的右括号
      arrr.push(getr(str, i + 1));
    }
  }
  return {
    l: arrl,
    r: arrr
  }
}

function getr(str, i) {
  var l = str.length;
  var li = 0;
  var ri = 0;
  var x = 0;
  for (; i < l; i++) {
    var d = str[i];
    if (d === '(') {
      li++;
    } else if (d === ')') {
      if (li !== ri) {
        ri++;
      } else {
        x = i;
        break;
      }
    }
  }
  return x;
}

// 用空格代替左右括号并且转成数组
function getNewStr(str) {
  str = str.replace(/\(/g, ' ');
  str = str.replace(/\)/g, ' ');
  return str.split('');
}

// 判断括号内的运算符是否等于+或-
function getRPo(str, i) {
  var l = str.length;
  var op1 = ['+', '-', '*', '/'];
  var op2 = ['+', '-'];
  var t = false;
  for (; i < l; i++) {
    if (op1.indexOf(str[i]) >= 0) {
      if (op2.indexOf(str[i]) >= 0) {
        t = true;
      }
      break;
    }
  }
  return t;
}

// 去除表达式多余的括号
/*
设待整理的表达式为（s1 op s2）；op为括号内优先级最低的运算符（“＋”，“－”或“×”，“/”）；
①左邻括号的运算符为“/”，则括号必须保留，既…/（s1 op s2）…形式。
②左邻括号的预算符为“*”或“－”。而op为“＋”或“－”，则保留括号，既…×（s1+s2）…”、“…－（s1+s2）…”、“…×（s1-s2）…”、“…－（s1-s2）…”。
③右邻括号的运算符为“×”或“/”，而op 为“＋”或“－”，原式中的op运算必须优先进行，因此括号不去除，即“（s1+s2）*…”。
*/
function strn(o, str) {
  // 左右括号数量不匹配
  if (o.l.length !== o.r.length) {
    alert('左右括号数量不匹配！');
    return false
  }

  var str2 = getNewStr(str);
  var i = 0;
  var l = o.l.length;
  for (; i < l; i++) {
    var dl = o.l[i];
    var dr = o.r[i];
    if (
      // ①左邻括号的运算符为“/”，则括号必须保留
      str[dl - 1] === '/' ||
      // ②左邻括号的预算符为“*”或“－”。而op为“＋”或“－”，则保留括号
      (['*', '-'].indexOf(str[dl - 1]) >= 0 && getRPo(str, dl)) ||
      // ③右邻括号的运算符为“×”或“/”，而op 为“＋”或“－”
      (['*', '/'].indexOf(str[dr + 1]) >= 0 && getRPo(str, dl))
    ) {} else {
      o.l[i] = '';
      o.r[i] = '';
    }
  }

  i = 0;
  // 将要保留的括号替换表达式数组
  for (;i < l; i++) {
    if (o.l[i]) {
      str2[o.l[i]] = '(';
      str2[o.r[i]] = ')';
    }
  }
  // 表达式数组连接成字符串
  var str3 = str2.join('');
  // 去除表达式中的空格
  str3 = str3.replace(/ /g, '');
  return str3;
}

var o = getPo(str);
var newStr = strn(o, str);
console.log(newStr);

