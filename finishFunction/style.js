// 获取指定css样式
function getStyle(oElm, strCssRule) {
  var strValue = "";
  if (document.defaultView && document.defaultView.getComputedStyle) {
    strValue = document.defaultView.getComputedStyle(oElm, "").getPropertyValue(strCssRule);
  } else if (oElm.currentStyle) {
    strCssRule = strCssRule.replace(/\-(\w)/g, function(strMatch, p1) {
      return p1.toUpperCase();
    });
    strValue = oElm.currentStyle[strCssRule];
  }
  return strValue;
}
// How to use it:
// CSS:
// /* Element CSS*/
// div#container{
//     font: 2em/2.25em Verdana, Geneva, Arial, Helvetica, sans-serif;
// }
// JS:
// var elementFontSize = getStyle(document.getElementById("container"), "font-size");
// 获取元素完整样式
function getCompleteStyle() {
  var objs, PseudoClass, cssName, cssArr = [];

  function getObj(obj) {
    if (obj !== null) {
      if (obj.nodeType === 1 && typeof obj === "object" && obj !== null) {
        return obj;
      } else {
        return false;
      }
    }
  }

  function getPseudoClass(obj) {
    if (obj === null || obj[0] === ":" && typeof obj === "string") {
      return obj;
    } else {
      return false;
    }
  }

  function getCssName(obj) {
    if (typeof obj === "string") {
      return obj;
    } else {
      return false;
    }
  }

  function getArguments(obj) {
    if (getObj(obj)) {
      objs = obj;
    } else if (getPseudoClass(obj)) {
      PseudoClass = obj;
    } else if (getCssName(obj)) {
      cssName = obj;
    } else {
      return false;
    }
  }

  switch (arguments.length) {
    case 0:
      return;
      break;

    case 1:
      if (getObj(arguments[0])) {
        objs = getObj(arguments[0]);
      } else {
        return;
      }
      break;

    case 2:
      for (var i = arguments.length - 1; i >= 0; i--) {
        getArguments(arguments[i]);
      }
      break;

    case 3:
      for (var i = arguments.length - 1; i >= 0; i--) {
        getArguments(arguments[i]);
      }
      break;
  }
  var PseudoClass = PseudoClass || null;
  var cssArr = [];
  if (window.getComputedStyle) {
    cssArr[0] = window.getComputedStyle(objs, PseudoClass);
    if (cssName && typeof cssName === "string") {
      cssArr[1] = cssArr[0].getPropertyValue(cssName);
    }
  } else if (objs.currentStyle) {
    cssArr[0] = objs.currentStyle;
    if (cssName && typeof cssName === "string") {
      cssArr[1] = cssArr[0].getAttribute(cssName);
    }
  }
  return cssArr;
}
