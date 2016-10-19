/*
 事件
 document.ready
 */
(function whenReady() {
  var funcs = [];
  var ready = false;

  function handler(e) {
    if (ready) return;
    if (e.type === "readystatechange" && document.readyState !== "complete") return;
    for (var i = 0; i < funcs.length; i++) funcs[i].call(document);
    ready = true;
    funcs = null;
  }

  if (document.addEventListener) {
    document.addEventListener("DOMContentLoaded", handler, false);
    document.addEventListener("readystatechange", handler, false);
    window.addEventListener("load", handler, false);
  } else if (document.attachEvent) {
    document.attachEvent("onreadystatechange", handler);
    window.attachEvent("onload", handler);
  }
  return function whenReady(f) {
    if (ready) f.call(document);
    else funcs.push(f);
  };
})();

// 事件绑定
function addEvent(element, type, handler) {
  // assign each event handler a unique ID
  //在每个回调函数上绑定了一个UUID
  if (!handler.$$guid) handler.$$guid = addEvent.guid++;
  // create a hash table of event types for the element
  //在要绑定事件的元素节点上设置一个特殊的属性，用来储存事件
  if (!element.events) element.events = {};
  // create a hash table of event handlers for each element/event pair
  //evets函数的键名为事件的类型名，或者说把事件按类型来按理
  var handlers = element.events[type];
  if (!handlers) {
    handlers = element.events[type] = {};
    // store the existing event handler (if there is one)
    if (element["on" + type]) {
      handlers[0] = element["on" + type];
    }
  }
  // store the event handler in the hash table
  //让一个类型对应多个回调函数
  handlers[handler.$$guid] = handler;
  // assign a global event handler to do all the work
  element["on" + type] = handleEvent;
}

// a counter used to create unique IDs
addEvent.guid = 1;

function removeEvent(element, type, handler) {
  // delete the event handler from the hash table
  if (element.events && element.events[type]) {
    //移除当前类型对应的某个回调函数
    delete element.events[type][handler.$$guid];
  }
}

function handleEvent(event) {
  var returnValue = true;
  // grab the event object (IE uses a global event object)
  event = event || fixEvent(window.event);
  // get a reference to the hash table of event handlers
  var handlers = this.events[event.type];
  // execute each event handler
  for (var i in handlers) {
    this.$$handleEvent = handlers[i];
    if (this.$$handleEvent(event) === false) {
      returnValue = false;
    }
  }
  return returnValue;
}

function fixEvent(event) {
  // add W3C standard event methods
  event.preventDefault = fixEvent.preventDefault;
  event.stopPropagation = fixEvent.stopPropagation;
  return event;
}

fixEvent.preventDefault = function() {
  this.returnValue = false;
};

fixEvent.stopPropagation = function() {
  this.cancelBubble = true;
};

var addEvents = function(elem, type, handler) {
  if (window.addEventListener) {
    addEvents = function(elem, type, handler) {
      elem.addEventListener(type, handler, false);
    };
  } else if (window.attachEvent) {
    addEvents = function(elem, type, handler) {
      elem.attachEvent('on' + type, handler);
    };
  } else {
    addEvents = function(elem, type, handler) {
      elem['on' + type] = handler;
    };
  }

  addEvents(elem, type, handler);
};
