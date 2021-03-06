// 为数字填充0
// a为要填充的数字，b为要对比的数字，例如8, 100 返回的就是'00'
function fillZero(a, b) {
  var lengtha = String(a).length;
  var lengthb = String(b).length;
  var j = 0;
  var k = lengthb - lengtha;
  var p = '';
  for (; j < k; j++) {
    p = p + '0';
  }
  return p;
}

if (!Function.prototype.bind) {
  Function.prototype.bind = function(oThis) {
    if (typeof this !== "function") {
      // closest thing possible to the ECMAScript 5 internal IsCallable function
      throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
    }

    var aArgs = Array.prototype.slice.call(arguments, 1),
      fToBind = this,
      fNOP = function() {},
      fBound = function() {
        return fToBind.apply(this instanceof fNOP && oThis ? this : oThis || window,
          aArgs.concat(Array.prototype.slice.call(arguments)));
      };

    fNOP.prototype = this.prototype;
    fBound.prototype = new fNOP();

    return fBound;
  };
}

/*
 parseJSON(string, filter)
 解析JSON文本生成对象或数组，可能抛出SyntaxError异常
 */
function parseJSON(s, filter) {
  var j;

  function walk(k, v) {
    var i;
    if (v && typeof v === 'object') {
      for (i in v) {
        if (v.hasOwnProperty(i)) {
          v[i] = walk(i, v[i]);
        }
      }
    }
    return filter(k, v);
  }

  // Parsing happens in three stages. In the first stage, we run the
  // text against a regular expression which looks for non-JSON
  // characters. We are especially concerned with '()' and 'new'
  // because they can cause invocation, and '=' because it can cause
  // mutation. But just to be safe, we will reject all unexpected
  // characters.

  if (/^("(\\.|[^"\\\n\r])*?"|[,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t])+?$/.test(s)) {

    // In the second stage we use the eval function to compile the text
    // into a JavaScript structure. The '{' operator is subject to a
    // syntactic ambiguity in JavaScript: it can begin a block or an
    // object literal. We wrap the text in parens to eliminate
    // the ambiguity.

    try {
      j = eval('(' + s + ')');
    } catch (e) {
      throw new SyntaxError("parseJSON");
    }
  } else {
    throw new SyntaxError("parseJSON");
  }

  // In the optional third stage, we recursively walk the new structure,
  // passing each name/value pair to a filter function for possible
  // transformation.

  if (typeof filter === 'function') {
    j = walk('', j);
  }
  return j;
}
/*
 ajax
 */
function ajax(arr) {
  var url = arr["url"],
    method = arr["methods"] || "POST",
    async = arr["async"] || true,
    fn = arr["suc"] || function(message) {},
    data = arr["datas"] || "",
    name = arr["name"] || "Content-type",
    value = arr["value"] || "application/x-www-form-urlencoded",
    xmlhttp;
  if (window.XMLHttpRequest) {
    // code for IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp = new XMLHttpRequest();
  } else {
    // code for IE6, IE5
    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }
  xmlhttp.onreadystatechange = function() {
    /*
     0 Uninitialized 初始化状态。XMLHttpRequest 对象已创建或已被 abort() 方法重置。
     1 Open  open() 方法已调用，但是 send() 方法未调用。请求还没有被发送。
     2 Sent  Send() 方法已调用，HTTP 请求已发送到 Web 服务器。未接收到响应。
     3 Receiving 所有响应头部都已经接收到。响应体开始接收但未完成。
     4 Loaded  HTTP 响应已经完全接收。
     */
    switch (xmlhttp.readyState) {
      case 0:
        // 尚未初始化
        break;

      case 1:
        // 载入中
        break;

      case 2:
        // 载入完成
        break;

      case 3:
        // 交互
        break;

      case 4:
        // 完成
        if (xmlhttp.status == 200) {
          var message = xmlhttp;
          fn(message);
        } else {}
        break;
    }
  };
  xmlhttp.open(method, url, async);
  xmlhttp.setRequestHeader(name, value);
  // xmlReq.setRequestHeader("Content-length", data.length);
  // xmlReq.setRequestHeader("Connection", "close");
  // abort() // 用于停止当前请求
  // getAllResponseHeaders() // 返回字符串形式的完整的头部信息集合
  // getResponseHeader() // 返回指定头部的一个单独的字符串值
  xmlhttp.send(data);
}

// ajaxs({
//     url:'ajax.php',
//     methods:'post',
//     async:true,
//     name:'Content-type',
//     value:'application/x-www-form-urlencoded',
//     suc:function(message){
//         document.getElementById('odiv').innerHTML = message;
//     },
//     datas:"user=aaaa"
// });
/*
 其他
 */

// 指定范围随机数
function randomRange(start, end) {
  var total = end - start + 1;
  return Math.floor(Math.random() * total + start);
}

// 生成不重复的指定范围随机数组
function noRepeatRandom(start, end) {
  var i = 0;
  var l = end - start;
  var arr = [];
  for (; i < l; i++) {
    arr[i] = start + i;
  }
  arr.sort(function() {
    return 0.5 - Math.random();
  });

  return arr;
}

// 随机正负
function getRandomPositiveNegative() {
  var distinguishInt = Math.round(Math.random());
  if (distinguishInt > 0) return 1;
  return -1;
}

// 角度转弧度
function degreeToRadian(degree) {
  return degree * Math.PI / 180;
}

// 获取当前选中的文本
function getSelectionString() {
  if (window.getSelection) {
    return window.getSelection().toString();
  } else if (document.getSelection) {
    return document.getSelection();
  } else if (document.selection) {
    return document.selection.createRange().text;
  }
  return "";
}

//在js中if条件为null/undefined/0/NaN/""表达式时，统统被解释为false,此外均为true .
//为空判断函数
function isNull(arg1) {
  return !arg1 && arg1 !== 0 && typeof arg1 !== "boolean" ? true : false;
}

// 引入外部js
function addScript(url) {
  var script = document.createElement("script");
  script.src = url;
  document.body.appendChild(script);
}

/*
 var myURL = parseURL('http://abc.com:8080/dir/index.html?id=255&m=hello#top');
 myURL.file; // = 'index.html'
 myURL.hash; // = 'top'
 myURL.host; // = 'abc.com'
 myURL.query; // = '?id=255&m=hello'
 myURL.params; // = Object = { id: 255, m: hello }
 myURL.path; // = '/dir/index.html'
 myURL.segments; // = Array = ['dir', 'index.html']
 myURL.port; // = '8080'
 myURL.protocol; // = 'http'
 myURL.source; // = 'http://abc.com:8080/dir/index.html?id=255&m=hello#top'
 */
function parseURL(url) {
  var a = document.createElement("a");
  //创建一个链接
  a.href = url;
  return {
    source: url,
    protocol: a.protocol.replace(":", ""),
    host: a.hostname,
    port: a.port,
    query: a.search,
    params: function() {
      var ret = {},
        seg = a.search.replace(/^\?/, "").split("&"),
        len = seg.length,
        i = 0,
        s;
      for (; i < len; i++) {
        if (!seg[i]) {
          continue;
        }
        s = seg[i].split("=");
        ret[s[0]] = s[1];
      }
      return ret;
    }(),
    file: (a.pathname.match(/\/([^\/?#]+)$/i) || [, ""])[1],
    hash: a.hash.replace("#", ""),
    path: a.pathname.replace(/^([^\/])/, "/$1"),
    relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [, ""])[1],
    segments: a.pathname.replace(/^\//, "").split("/")
  };
}

// 判断有没有中文
function isChinese(str) {
  var lst = /[u00-uFF]/;
  return !lst.test(str);
}

// 获取中英文混合字符串的长度
function strlen(str) {
  var strlength = 0;
  for (i = 0; i < str.length; i++) {
    if (isChinese(str.charAt(i)) == true) {
      strlength = strlength + 2;
    } else {
      strlength = strlength + 1;
    }
  }
  return strlength;
}

// 去除文字两边空白
function trim(string) {
  return string.replace(/^\s+|\s+$/g, "");
}

// 生成26个字母
function getAToZ() {
  var A_Z = [];
  for (var j = 65; j < 91; j++) {
    A_Z.push(String.fromCharCode(j));
  }
  return A_Z;
}

// 确定鼠标哪个按钮被按下
function getMouseButton(eventObject) {
  eventObject = eventObject || window.event;
  // Initialize an object wit the appropriate properties
  var buttons = {
    left: false,
    middle: false,
    right: false
  };
  // Check the toString value of the eventObject
  // W3C Dom object have a toString method and in this case it
  // should be MouseEvent
  if (eventObject.toString && eventObject.toString().indexOf("MouseEvent") != -1) {
    // W3C Method
    switch (eventObject.button) {
      case 0:
        buttons.left = true;
        break;

      case 1:
        buttons.middle = true;
        break;

      case 2:
        buttons.right = true;
        break;

      default:
        break;
    }
  } else if (eventObject.button) {
    // MSIE method
    switch (eventObject.button) {
      case 1:
        buttons.left = true;
        break;

      case 2:
        buttons.right = true;
        break;

      case 3:
        buttons.left = true;
        buttons.right = true;
        break;

      case 4:
        buttons.middle = true;
        break;

      case 5:
        buttons.left = true;
        buttons.middle = true;
        break;

      case 6:
        buttons.middle = true;
        buttons.right = true;
        break;

      case 7:
        buttons.left = true;
        buttons.middle = true;
        buttons.right = true;
        break;

      default:
        break;
    }
  } else {
    return false;
  }
  return buttons;
}

/***********************
 * 函数：判断滚轮滚动方向
 * 作者：walkingp
 * 参数：event
 * 返回：滚轮方向 ：
 向上 ：火狐为-3，其他为120
 向下 ：火狐为3，其他为-120
 *************************/
function scrollFunc(e) {
  var direct = 0,
    step = 50;
  e = e || window.event;
  if (e.wheelDelta) {
    //IE/Opera/Chrome
    if (e.wheelDelta > 0) {
      window.scrollBy(0, -step);
    } else {
      window.scrollBy(0, step);
    }
  } else if (e.detail) {
    //Firefox
    if (e.detail > 0) {
      window.scrollBy(0, step);
    } else {
      window.scrollBy(0, -step);
    }
  }
}

// 根据事件判断哪个键按下
function getKeyPressed(eventObject) {
  eventObject = eventObject || window.event;
  var code = eventObject.keyCode;
  var value = String.fromCharCode(code);
  return {
    code: code,
    value: value
  };
}

/*
 功能
 拖动，只能用于绝对定位元素，需要 getScrollOffsets()
 */
function drag(elementToDrag, event) {
  event = event || window.event;
  // 最初的鼠标位置，转换为坐标文件
  var scroll = getScrollOffsets();
  // 获取鼠标的坐标（包括滚动条）
  var startX = event.clientX + scroll.x;
  var startY = event.clientY + scroll.y;
  // 元素的初始坐标
  var origX = elementToDrag.offsetLeft;
  var origY = elementToDrag.offsetTop;
  //
  var deltaX = startX - origX;
  var deltaY = startY - origY;
  //
  if (document.addEventListener) {
    document.addEventListener("mousemove", moveHandler, true);
    document.addEventListener("mouseup", upHandler, true);
  } else if (document.attachEvent) {
    // 只有ie支持 setCapture()
    elementToDrag.setCapture();
    elementToDrag.attachEvent("onmousemove", moveHandler);
    elementToDrag.attachEvent("onmouseup", upHandler);
    elementToDrag.attachEvent("onlosecapture", upHandler);
  }
  if (event.stopPropagation) event.stopPropagation();
  else event.cancelBubble = true;
  // IE
  if (event.preventDefault) event.preventDefault();
  else event.returnValue = false;
  // IE
  function moveHandler(e) {
    e = e || window.event;
    // IE event Model
    var scroll = getScrollOffsets();
    elementToDrag.style.left = e.clientX + scroll.x - deltaX + "px";
    elementToDrag.style.top = e.clientY + scroll.y - deltaY + "px";
    if (e.stopPropagation) e.stopPropagation();
    else e.cancelBubble = true;
  }

  function upHandler(e) {
    e = e || window.event;
    // IE Event Model
    if (document.removeEventListener) {
      // DOM event model
      document.removeEventListener("mouseup", upHandler, true);
      document.removeEventListener("mousemove", moveHandler, true);
    } else if (document.detachEvent) {
      // IE 5+ Event Model
      elementToDrag.detachEvent("onlosecapture", upHandler);
      elementToDrag.detachEvent("onmouseup", upHandler);
      elementToDrag.detachEvent("onmousemove", moveHandler);
      elementToDrag.releaseCapture();
    }
    if (e.stopPropagation) e.stopPropagation();
    else e.cancelBubble = true;
  }
}

/*///////////////////触摸拖动/////////////////////////////*/
function touchMove(obj, steper, inx, fn, o) {
  var ever = obj.parentNode,
    ul_length = getChildElements(obj).length - 1,
    o = o && o != 0 || 0,
    s_x = 0,
    s_y = 0,
    start_x = 0,
    start_y = 0,
    dr = 0,
    step = 0,
    this_index = inx || 0, // 问题出在与与indexer的关联上
    drag_flag = false;
  // 是否是元素按下
  function no_select(obj) {
    var lis = obj.childNodes;
    for (var i = 0, l = lis.length; i < l; i++) {
      function remove_select(i) {
        addEvent(lis[i], "selectstart", function() {
          return false;
        });
        addEvent(lis[i], "dragstart", function() {
          return false;
        });
      }

      remove_select(i);
    }
  }

  /*鼠标按下，触发鼠标移动*/
  addEvent(ever, "mousedown", function(e) {
    if ($id(obj).isAnimate) {
      return false;
    }
    drag_flag = true;
    s_x = mousePos(e)["x"];
    s_y = mousePos(e)["y"];
    start_x = parseInt(getStyle(obj, "left"));
    start_y = parseInt(getStyle(obj, "top"));
    // css没设置时为parseInt('auto')
    if (isNaN(start_x)) {
      start_x = parseInt(obj.offsetLeft);
    }
    if (isNaN(start_y)) {
      start_y = parseInt(obj.offsetTop);
    }
    no_select(document);
    mouse_move();
  });
  // 鼠标移动
  function mouse_move() {
    addEvent(obj, "mousemove", showx);
  }

  // 元素跟随鼠标x轴移动
  function showx(e) {
    var c = dr;
    var n_x = mousePos(e)["x"],
      n_y = mousePos(e)["y"];
    stepx = s_x - n_x;
    stepy = s_y - n_y;
    var a = Math.abs(stepx);
    var b = Math.abs(stepy);
    if (a > b) {
      dr = 0;
    }
    if (a < b) {
      dr = 1;
    }
    if (dr != o) {
      return false;
    }
    if (!o) {
      obj.style["left"] = start_x - stepx + "px";
    } else {
      obj.style["top"] = start_y - stepy + "px";
    }
    darg_end();
  }

  // 鼠标松开，根据松开时的位置判断并移动元素
  function darg_end() {
    addEvent(obj, "mouseup", function(e) {
      removeEvent(obj, "mousemove", showx);
      if (drag_flag) {
        // 判断是否是元素按下，作用是让文档在鼠标松开的时候不进行元素移动的动作
        am(e);
      }
      drag_flag = false;
    });
    addEvent(obj, "mouseout", function(e) {
      removeEvent(obj, "mousemove", showx);
      if (drag_flag) {
        // 判断是否是元素按下，作用是让文档在鼠标松开的时候不进行元素移动的动作
        am(e);
      }
      drag_flag = false;
    });
  }

  // 鼠标释放后，根据当前的位置判断元素移动的位置
  function am(e) {
    if (!o) {
      var e_x = mousePos(e)["x"],
        c = e_x - s_x;
    } else {
      var e_y = mousePos(e)["y"],
        c = e_y - s_y;
    }

    function index() {
      if (c < 0) {
        this_index += 1;
      } else {
        this_index -= 1;
      }
      if (this_index <= 0) {
        this_index = 0;
      }
      if (this_index >= ul_length) {
        this_index = ul_length;
      }
    }

    index();
    if (!o) {
      if (Math.abs(c) > 10) {
        $id(obj).transition({
          left: -(this_index * steper) + "px"
        }, 500, function() {});
        fn(this_index);
      } else {
        $id(obj).transition({
          left: start_x + "px"
        }, 500, function() {});
      }
    } else {
      if (Math.abs(c) > 10) {
        $id(obj).transition({
          top: -(this_index * steper) + "px"
        }, 500, function() {});
        fn(this_index);
      } else {
        $id(obj).transition({
          top: start_x + "px"
        }, 500, function() {});
      }
    }
  }
}

// 序列化表单
function serialize_form(obj) {
  // 获取对象
  if (typeof obj == "string") {
    var form = document.getElementById(obj);
  } else if (typeof obj === "object " && obj !== null) {
    var form = obj;
  }
  // console.log(form);
  var data = "form=" + (form.name || form.id);
  // 所有input
  var inputs = form.getElementsByTagName("input");
  for (var i = 0, l = inputs.length; i < l; i += 1) {
    var type = inputs[i].getAttribute("type");
    // console.log(inputs[i].value);
    function ii() {
      data += "&" + (inputs[i].id || inputs[i].name) + "=" + inputs[i].value;
    }

    switch (type) {
      case "text":
        if (inputs[i].value) {
          ii();
        }
        break;

      case "password":
        if (inputs[i].value) {
          ii();
        }
        break;

      case "email":
        if (inputs[i].value) {
          ii();
        }
        break;

      case "radio":
        if (inputs[i].value && inputs[i].checked) {
          ii();
        }
        break;

      case "checkbox":
        if (inputs[i].value && inputs[i].checked) {
          ii();
        }
        break;

      case "file":
        if (inputs[i].value) {
          ii();
        }
        break;
    }
  }
  // 所有textarea
  var textareas = form.getElementsByTagName("textarea");
  for (var i = 0, l = textareas.length; i < l; i += 1) {
    console.log(textareas[i].value);
    if (textareas[i].value) {
      data += "&" + (textareas[i].id || textareas[i].name) + "=" + textareas[i].value;
    }
  }
  // 所有select
  var selects = form.getElementsByTagName("select");
  for (var i = 0, l = selects.length; i < l; i += 1) {
    // console.log(selects[i].value);
    if (!selects[i].multiple) {
      for (var j = 0, jl = selects[i].options.length; j < jl; j += 1) {
        if (selects[i].options[j].value && selects[i].options[j].selected) {
          data += "&" + (selects[i].id || selects[i].name) + "=" + selects[i].options[j].value;
        }
      }
    } else {
      for (var j = 0, jl = selects[i].options.length; j < jl; j += 1) {
        if (selects[i].options[j].value && selects[i].options[j].selected) {
          data += "&" + (selects[i].options[j].id || selects[i].options[j].name) + "=" + selects[i].options[j].value;
        }
      }
    }
  }
  return data;
}

// 颜色转换
function parseColor(val) {
  var r, g, b;
  // 参数为RGB模式时不做进制转换，直接截取字符串即可
  if (/rgb/.test(val)) {
    // 判断是否是百分比
    var x = val.indexOf('%');
    var arr = val.match(/\d+/g);
    r = parseInt(arr[0]);
    g = parseInt(arr[1]);
    b = parseInt(arr[2]);
    if (x > 0) {
      r = Math.round(r / 100 * 255);
      g = Math.round(g / 100 * 255);
      b = Math.round(b / 100 * 255);
    }

  }
  // 参数为十六进制时需要做进制转换
  else if (/#/.test(val)) {
    var len = val.length;
    // 非简写模式 #0066cc
    if (len === 7) {
      r = parseInt(val.slice(1, 3), 16);
      g = parseInt(val.slice(3, 5), 16);
      b = parseInt(val.slice(5), 16);
    }
    // 简写模式 #06c
    else if (len === 4) {
      r = parseInt(val.charAt(1) + val.charAt(1), 16);
      g = parseInt(val.charAt(2) + val.charAt(2), 16);
      b = parseInt(val.charAt(3) + val.charAt(3), 16);
    }
  } else {
    return val;
  }

  return {
    r: r,
    g: g,
    b: b
  }
}

function color_to_string(color) {
  return 'rgb(' + color.r + ', ' + color.g + ', ' + color.b + ')';
}

function v2h(value) {
  value = parseInt(value).toString(16);
  return value.length < 2 ? value + "0" : value;
}

// 将颜色转成#000000模式
function rgb2hex(rgb) {
  if (rgb.match(/^rgb/) == null) return rgb;
  var arr = rgb.match(/\d+/g);
  return "#" + v2h(arr[0]) + v2h(arr[1]) + v2h(arr[2]);
}
// var color = parseColor('rgb(20%, 17%, 61%)');

// console.log(parseColor('width: 55px'));
// console.log(color_to_string(color));
/*
 * CookieStorage.js
 * This class implements the Storage API that localStorage and sessionStorage
 * do, but implements it on top of HTTP Cookies.
 */
function CookieStorage() { // Arguments specify lifetime and scope

  // Get an object that holds all cookies
  var cookies = (function() { // The getCookies() function shown earlier
    var cookies = {}; // The object we will return
    var all = document.cookie; // Get all cookies in one big string
    if (all === "") // If the property is the empty string
      return cookies; // return an empty object
    var list = all.split("; "); // Split into individual name=value pairs
    for (var i = 0; i < list.length; i++) { // For each cookie
      var cookie = list[i];
      var p = cookie.indexOf("="); // Find the first = sign
      var name = cookie.substring(0, p); // Get cookie name
      var value = cookie.substring(p + 1); // Get cookie value
      value = decodeURIComponent(value); // Decode the value
      cookies[name] = value; // Store name and value
    }
    return cookies;
  }());

  // Collect the cookie names in an array
  var keys = [];
  for (var key in cookies) keys.push(key);

  // Now define the public properties and methods of the Storage API

  // The number of stored cookies
  this.length = keys.length;

  // Return the name of the nth cookie, or null if n is out of range
  this.key = function(n) {
    if (n < 0 || n >= keys.length) return null;
    return keys[n];
  };

  // Return the value of the named cookie, or null.
  this.getItem = function(name) {
    return cookies[name] || null;
  };

  // Store a value
  this.setItem = function(key, value, maxage, path) {
    if (!(key in cookies)) { // If no existing cookie with this name
      keys.push(key); // Add key to the array of keys
      this.length++; // And increment the length
    }

    // Store this name/value pair in the set of cookies.
    cookies[key] = value;

    // Now actually set the cookie.
    // First encode value and create a name=encoded-value string
    var cookie = key + "=" + encodeURIComponent(value);

    // Add cookie attributes to that string
    if (maxage) cookie += "; max-age=" + maxage;
    if (path) cookie += "; path=" + path;

    // Set the cookie through the magic document.cookie property
    document.cookie = cookie;
  };

  // Remove the specified cookie
  this.removeItem = function(key) {
    if (!(key in cookies)) return; // If it doesn't exist, do nothing

    // Delete the cookie from our internal set of cookies
    delete cookies[key];

    // And remove the key from the array of names, too.
    // This would be easier with the ES5 array indexOf() method.
    for (var i = 0; i < keys.length; i++) { // Loop through all keys
      if (keys[i] === key) { // When we find the one we want
        keys.splice(i, 1); // Remove it from the array.
        break;
      }
    }
    this.length--; // Decrement cookie length

    // Finally actually delete the cookie by giving it an empty value
    // and an immediate expiration date.
    document.cookie = key + "=; max-age=0";
  };

  // Remove all cookies
  this.clear = function() {
    // Loop through the keys, removing the cookies
    for (var i = 0; i < keys.length; i++)
      document.cookie = keys[i] + "=; max-age=0";
    // Reset our internal state
    cookies = {};
    keys = [];
    this.length = 0;
  };
}

// 判断浏览器
function checkBrowser() {
  var Sys = {};
  var ua = navigator.userAgent.toLowerCase();
  var s;
  (s = ua.match(/msie ([\d.]+)/)) ? Sys.ie = s[1]:
    (s = ua.match(/firefox\/([\d.]+)/)) ? Sys.firefox = s[1] :
    (s = ua.match(/chrome\/([\d.]+)/)) ? Sys.chrome = s[1] :
    (s = ua.match(/opera.([\d.]+)/)) ? Sys.opera = s[1] :
    (s = ua.match(/version\/([\d.]+).*safari/)) ? Sys.safari = s[1] : 0;
  return Sys;
  // if (Sys.ie) { //Js判断为IE浏览器
  //   alert(Sys.ie + 'ie');
  //   if (Sys.ie == '9.0') { //Js判断为IE 9
  //     alert('ie9');
  //   } else if (Sys.ie == '8.0') { //Js判断为IE 8
  //     alert('ie8');
  //   } else {}
  // }
  // if (Sys.firefox) { //Js判断为火狐(firefox)浏览器
  //   alert(Sys.firefox + 'firefox');
  // }
  // if (Sys.chrome) { //Js判断为谷歌chrome浏览器
  //   alert(Sys.chrome + 'chrome');
  // }
  // if (Sys.opera) { //Js判断为opera浏览器
  //   alert(Sys.opera + 'opera');
  // }
  // if (Sys.safari) { //Js判断为苹果safari浏览器
  //   alert(Sys.safari + 'safari');
  // }
}

/*
请使用千位分隔符(逗号)表示web网页中的大数字
*/
String(Number).replace(/(\d)(?=(\d{3})+$)/g, "$1,");

/*
举例：

String(123456789).replace(/(\d)(?=(\d{3})+$)/g, "$1,");

*/
Number.toLocaleString('en-US');
/*
(123456789).toLocaleString('en-US');
*/

/**
 * 将数值四舍五入(保留2位小数)后格式化成金额形式
 *
 * @param num 数值(Number或者String)
 * @return 金额格式的字符串,如'1,234,567.45'
 * @type String
 */
function formatCurrency(num) {
  num = num.toString().replace(/\$|\,/g, '');
  if (isNaN(num))
    num = "0";
  sign = (num == (num = Math.abs(num)));
  num = Math.floor(num * 100 + 0.50000000001);
  cents = num % 100;
  num = Math.floor(num / 100).toString();
  if (cents < 10)
    cents = "0" + cents;
  for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++)
    num = num.substring(0, num.length - (4 * i + 3)) + ',' +
    num.substring(num.length - (4 * i + 3));
  return (((sign) ? '' : '-') + num + '.' + cents);
}

/**
 * 将数值四舍五入(保留1位小数)后格式化成金额形式
 *
 * @param num 数值(Number或者String)
 * @return 金额格式的字符串,如'1,234,567.4'
 * @type String
 */
function formatCurrencyTenThou(num) {
  num = num.toString().replace(/\$|\,/g, '');
  if (isNaN(num))
    num = "0";
  sign = (num == (num = Math.abs(num)));
  num = Math.floor(num * 10 + 0.50000000001);
  cents = num % 10;
  num = Math.floor(num / 10).toString();
  for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++)
    num = num.substring(0, num.length - (4 * i + 3)) + ',' +
    num.substring(num.length - (4 * i + 3));
  return (((sign) ? '' : '-') + num + '.' + cents);
}

// 数字转成千分位金额格式，小数保持原样不做处理
function numberToMoney(v) {
  if (isNaN(v)) {
    return v;
  } else if (v === null) {
    return 'NaN';
  }

  var numArr = String(v).split('.');
  var cent = '';
  if (numArr.length === 2) {
    cent = '.' + numArr[1];
  }
  var value = numArr[0];
  var arr = [];
  var s = value.split('').reverse().join('');
  var i = 0;
  var l = s.length;
  for (; i < l; i = i + 3) {
    var t = s.substr(i, 3);
    t = t.split('').reverse().join('');
    arr.push(t);
  }
  arr = arr.reverse().join(',') + cent;
  return arr;
}

function numberToMoneyReg(v) {
  var t = String(v);
  var a = '',
    b = '';
  if (t.indexOf('.') !== -1) {
    a = t.split('.')[0];
    b = t.split('.')[1];
  } else {
    a = t;
  }
  var regex = /\B(?=(\d{3})+\b)/g;
  a = a.replace(regex, ',');
  return a + '.' + b;
}

// 千分位不支持小数点
/*
var str="123598752";
var re=/(?=(?!(\b))(\d{3})+$)/g;
str=str.replace(re,",");
alert(str);
*/

// 编码字符串
function escapeString(s) {
  return encodeURIComponent(s);
}

// 解码字符串
function unescapeString(s) {
  return decodeURIComponent(s);
}

Function.prototype.before = function(beforefn) {
  var __self = this; // 保存原函数的引用
  return function() { // 返回包含了原函数和新函数的"代理"函数
    beforefn.apply(this, arguments); // 执行新函数，且保证 this 不被劫持，新函数接受的参数
    // 也会被原封不动地传入原函数，新函数在原函数之前执行
    return __self.apply(this, arguments); // 执行原函数并返回原函数的执行结果，
    // 并且保证 this 不被劫持
  }
}

Function.prototype.after = function(afterfn) {
  var __self = this;
  return function() {
    var ret = __self.apply(this, arguments);
    afterfn.apply(this, arguments);
    return ret;
  }
};

var before = function(fn, beforefn) {
  return function() {
    beforefn.apply(this, arguments);
    return fn.apply(this, arguments);
  }
}

var after = function(fn, afterfn) {
  return function() {
    var ret = fn.apply(this, arguments);
    afterfn.apply(this, arguments);
    return ret;
  }
}

/**
 * 设置光标在短连接输入框中的位置
 * @param inputId 框Id
 * @param pos
 * @return {*}s
 */
function setCursorPos(inpObj, pos) {
  var inpObj = document.getElementById(inputId);
  if (navigator.userAgent.indexOf('MSIE') > -1) {
    var textRange = inpObj.createTextRange();
    textRange.moveStart('character', pos);
    textRange.collapse();
    textRange.select();
  } else {
    inpObj.setSelectionRange(pos, pos);
  }
}

/**
 * 获取光标在短连接输入框中的位置
 * @param inputId 框Id
 * @return {*}
 */
function getCursorPos(inputId) {
  var inpObj = document.getElementById(inputId);
  if (navigator.userAgent.indexOf('MSIE') > -1) { // IE
    var range = document.selection.createRange();
    range.text = '';
    range.setEndPoint('StartToStart', inpObj.createTextRange());
    return range.text.length;
  } else {
    return inpObj.selectionStart;
  }
}

// 提取字符串中的字母和数字
function getA0(t) {
  return t.replace(/[^A-Za-z0-9]/ig, '');
}

//将26进制转10进制
var ConvertNum = function(str) {
  var n = 0;
  var s = str.match(/./g); //求出字符数组
  var j = 0;
  for (var i = str.length - 1, j = 1; i >= 0; i--, j *= 26) {
    var c = s[i].toUpperCase();
    if (c < 'A' || c > 'Z') {
      return 0;
    }
    n += (c.charCodeAt(0) - 64) * j;
  }
  return n;
}

//测试
// var teststr = "AB";
// alert(ConvertNum(teststr));

//将10进制转26进制
var Convert26 = function(num) {
  var str = "";
  while (num > 0) {
    var m = num % 26;
    if (m == 0) {
      m = 26;
    }
    str = String.fromCharCode(m + 64) + str;
    num = (num - m) / 26;
  }
  return str;
}

//测试
// var num = 28;
// alert(Convert26(num));

// 判断是否为整数
// 方法1
function isInteger(obj) {
  return Math.floor(obj) === obj
}

// 方法2
function isInteger(obj) {
  return typeof obj === 'number' && obj % 1 === 0
}

// 方法3
function isInteger(obj) {
  return parseInt(obj, 10) === obj
}

// 方法4
function isInteger(obj) {
  return (obj | 0) === obj
}

// 限制输入
function onlyInput(select, value, term) {
  var ncount = 0;
  var nresult = '';
  $(select).on('keydown', function(e) {
    var v = value(e, this);
    if (term(v)) {
      ncount++;
      if (ncount < 2) {
        nresult = $(this).val();
      } else {
        $(this).val(nresult);
      }
    } else {
      nresult = $(this).val();
    }
  });
  $(select).on('keyup', function(e) {
    var v = value(e, this);
    //console.log(nresult);
    if (term(v)) {
      $(this).val(nresult);
    }
  });
}

// 模拟setInterval保证每次调用之间的间隔相同
function interval(func, wait) {
  var interv = function() {
    func.call(null);
    setTimeout(interv, wait);
  };
  setTimeout(interv, wait);
}

//反射調用
var invokeFieldOrMethod = function(element, method) {
  var usablePrefixMethod;
  ["webkit", "moz", "ms", "o", ""].forEach(function(prefix) {
    if (usablePrefixMethod) return;
    if (prefix === "") {
      // 无前缀，方法首字母小写
      method = method.slice(0, 1).toLowerCase() + method.slice(1);
    }
    var typePrefixMethod = typeof element[prefix + method];
    if (typePrefixMethod + "" !== "undefined") {
      if (typePrefixMethod === "function") {
        usablePrefixMethod = element[prefix + method]();
      } else {
        usablePrefixMethod = element[prefix + method];
      }
    }
  });

  return usablePrefixMethod;
};

// video全屏，退出全屏
//進入全屏
function launchFullscreen(element) {
  //此方法不可以在異步任務中執行，否則火狐無法全屏
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen();
  } else if (element.oRequestFullscreen) {
    element.oRequestFullscreen();
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullScreen();
  } else {

    var docHtml = document.documentElement;
    var docBody = document.body;
    var videobox = document.getElementById('videobox');
    var cssText = 'width:100%;height:100%;overflow:hidden;';
    docHtml.style.cssText = cssText;
    docBody.style.cssText = cssText;
    videobox.style.cssText = cssText + ';' + 'margin:0px;padding:0px;';
    document.IsFullScreen = true;

  }
}

//退出全屏
function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.oRequestFullscreen) {
    document.oCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else {
    var docHtml = document.documentElement;
    var docBody = document.body;
    var videobox = document.getElementById('videobox');
    docHtml.style.cssText = "";
    docBody.style.cssText = "";
    videobox.style.cssText = "";
    document.IsFullScreen = false;
  }
}

document.getElementById('fullScreenBtn').addEventListener('click', function() {
  launchFullscreen(document.getElementById('video'));
  window.setTimeout(function exit() {
    //檢查瀏覽器是否處於全屏
    if (invokeFieldOrMethod(document, 'FullScreen') || invokeFieldOrMethod(document, 'IsFullScreen') || document.IsFullScreen) {
      exitFullscreen();
    }
  }, 5 * 1000);
}, false);

// 取到顶层对象
// 方法一
(typeof window !== 'undefined' ? window : (typeof process === 'object' &&
  typeof require === 'function' &&
  typeof global === 'object') ? global : this);

// 方法二
var getGlobal = function() {
  if (typeof self !== 'undefined') {
    return self;
  }
  if (typeof window !== 'undefined') {
    return window;
  }
  if (typeof global !== 'undefined') {
    return global;
  }
  throw new Error('unable to locate global object');
};

// 点击页面其他地方隐藏弹窗
function documentClickHide(parent1, parent2, tag, callback) {
  /*
  parent1: 触发弹窗显示的元素的父级元素的选择器
  parent2: 弹窗的选择器
  tag: 触发弹窗显示的元素的node名称
  callback: 隐藏弹窗回调函数
   */
  $(document).on('click', function(e) {
    var dom = e.target;
    var clickParent = $(dom).parentsUntil(parent1).parent().hasClass('hasTree');
    var popName = $(dom).parentsUntil(parent2).parent().hasClass('tree');
    if ((dom.nodeName.toLowerCase() === tag && clickParent) || popName) {

    } else {
      callback && callback();
    }
  });
}

/*
documentClickHide('.hasTree', '.tree', 'button', function () {
    popHide()
  })
*/

function compare(a, b) {
  //a去年 b今年
  var a = parseFloat(a);
  var b = parseFloat(b);
  var v = 0;
  if (a > b) {
    v = (((1 - a / b) * 100).toFixed(2));
  } else {
    v = (((b / a - 1) * 100).toFixed(2));
  }
  return v
}
//判断手机横竖屏状态：
function hengshuping() {
  if (window.orientation == 180 || window.orientation == 0) {
    alert("竖屏状态！")
  }
  if (window.orientation == 90 || window.orientation == -90) {
    alert("横屏状态！")
  }
}
window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", hengshuping, false);

function orient() {
  if (window.orientation == 90 || window.orientation == -90) {
    //ipad、iphone竖屏；Andriod横屏
    $("body").attr("class", "landscape");
    orientation = 'landscape';
    return false;
  } else if (window.orientation == 0 || window.orientation == 180) {
    //ipad、iphone横屏；Andriod竖屏
    $("body").attr("class", "portrait");
    orientation = 'portrait';
    return false;
  }
}
//页面加载时调用
$(function() {
  orient();
});
//用户变化屏幕方向时调用
$(window).bind('orientationchange', function(e) {
  orient();
});

// 判断是否是移动端
function isMobile() {
  var isMobile = {
    Android: function() {
      return navigator.userAgent.match(/Android/i) ? true : false;
    },
    BlackBerry: function() {
      return navigator.userAgent.match(/BlackBerry/i) ? true : false;
    },
    iOS: function() {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i) ? true : false;
    },
    Windows: function() {
      return navigator.userAgent.match(/IEMobile/i) ? true : false;
    },
    any: function() {
      return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Windows());
    }
  };
  return isMobile;
}
/**
 * 
 * @desc 获取浏览器类型和版本
 * <a href='http://www.jobbole.com/members/wx1409399284'>@return</a> {String} 
 */
function getExplore() {
  var sys = {},
    ua = navigator.userAgent.toLowerCase(),
    s;
  (s = ua.match(/rv:([\d.]+)\) like gecko/)) ? sys.ie = s[1]:
    (s = ua.match(/msie ([\d\.]+)/)) ? sys.ie = s[1] :
    (s = ua.match(/edge\/([\d\.]+)/)) ? sys.edge = s[1] :
    (s = ua.match(/firefox\/([\d\.]+)/)) ? sys.firefox = s[1] :
    (s = ua.match(/(?:opera|opr).([\d\.]+)/)) ? sys.opera = s[1] :
    (s = ua.match(/chrome\/([\d\.]+)/)) ? sys.chrome = s[1] :
    (s = ua.match(/version\/([\d\.]+).*safari/)) ? sys.safari = s[1] : 0;
  // 根据关系进行判断
  if (sys.ie) return ('IE: ' + sys.ie)
  if (sys.edge) return ('EDGE: ' + sys.edge)
  if (sys.firefox) return ('Firefox: ' + sys.firefox)
  if (sys.chrome) return ('Chrome: ' + sys.chrome)
  if (sys.opera) return ('Opera: ' + sys.opera)
  if (sys.safari) return ('Safari: ' + sys.safari)
  return 'Unkonwn'
}
/**
 * 
 * @desc 获取操作系统类型
 * <a href='http://www.jobbole.com/members/wx1409399284'>@return</a> {String} 
 */
function getOS() {
  var userAgent = 'navigator' in window && 'userAgent' in navigator && navigator.userAgent.toLowerCase() || '';
  var vendor = 'navigator' in window && 'vendor' in navigator && navigator.vendor.toLowerCase() || '';
  var appVersion = 'navigator' in window && 'appVersion' in navigator && navigator.appVersion.toLowerCase() || '';

  if (/mac/i.test(appVersion)) return 'MacOSX'
  if (/win/i.test(appVersion)) return 'windows'
  if (/linux/i.test(appVersion)) return 'linux'
  if (/iphone/i.test(userAgent) || /ipad/i.test(userAgent) || /ipod/i.test(userAgent)) 'ios'
  if (/android/i.test(userAgent)) return 'android'
  if (/win/i.test(appVersion) && /phone/i.test(userAgent)) return 'windowsPhone'
}

// 使用JS判断用户操作系统是否安装某字体
var isSupportFontFamily = function(f) {
  if (typeof f != "string") {
    return false
  }
  var h = "Arial";
  if (f.toLowerCase() == h.toLowerCase()) {
    return true
  }
  var e = "a";
  var d = 100;
  var a = 100,
    i = 100;
  var c = document.createElement("canvas");
  var b = c.getContext("2d");
  c.width = a;
  c.height = i;
  b.textAlign = "center";
  b.fillStyle = "black";
  b.textBaseline = "middle";
  var g = function(j) {
    b.clearRect(0, 0, a, i);
    b.font = d + "px " + j + ", " + h;
    b.fillText(e, a / 2, i / 2);
    var k = b.getImageData(0, 0, a, i).data;
    return [].slice.call(k).filter(function(l) {
      return l != 0
    })
  };
  return g(h).join("") !== g(f).join("")
};


// 获取滚动条的宽度
function getScrollbarWidth() {
  var oP = document.createElement('p');
  var styles = {
    width: '100px',
    height: '100px',
    overflowY: 'scroll',
  };
  var i;
  var scrollbarWidth;

  for (i in styles) {
    oP.style[i] = styles[i];
  }
  document.body.appendChild(oP);
  scrollbarWidth = oP.offsetWidth - oP.clientWidth;
  document.body.removeChild(oP);

  return scrollbarWidth;
}

// swiper 下拉刷新，上拉添加
var refreshSwiper = new Swiper('.refresh-list', {
  direction: 'vertical',
  slidesPerView: 'auto',
  freeMode: true,
  speed: 500,
  scrollbar: {
    el: '.swiper-scrollbar'
  },
  mousewheel: true,
  on: {
    touchEnd: function(event) {
      var y = 0 - $('.refresh-list .swiper-wrapper')[0].scrollHeight + $('.refresh-list').height() - 100;
      if (refreshSwiper.translate > 130) {
        console.log('update');
      }
      if (refreshSwiper.translate < y) {
        console.log('add');
      }

      console.log('touchEnd');
      refreshSwiper.updateSize();
      refreshSwiper.updateSlides();
    }
  }
});

// 获取地址栏属性值
function GetQueryString(name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
  var r = window.location.search.substr(1).match(reg);
  if (r != null) {
    return unescape(r[2]);
  }
  return null;
}


// textarea高度自适应自动增高撑开
function makeExpandingArea(el) {
  var timer = null;
  //由于ie8有溢出堆栈问题，故调整了这里
  var setStyle = function(el, auto) {
    if (auto) el.style.height = 'auto';
    el.style.height = el.scrollHeight + 'px';
  }
  var delayedResize = function(el) {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    timer = setTimeout(function() {
      setStyle(el)
    }, 200);
  }
  if (el.addEventListener) {
    el.addEventListener('input', function() {
      setStyle(el, 1);
    }, false);
    setStyle(el)
  } else if (el.attachEvent) {
    el.attachEvent('onpropertychange', function() {
      setStyle(el)
    })
    setStyle(el)
  }
  if (window.VBArray && window.addEventListener) { //IE9
    el.attachEvent("onkeydown", function() {
      var key = window.event.keyCode;
      if (key == 8 || key == 46) delayedResize(el);

    });
    el.attachEvent("oncut", function() {
      delayedResize(el);
    }); //处理粘贴
  }
}

var textarea = document.getElementById('textarea');
makeExpandingArea(textarea);