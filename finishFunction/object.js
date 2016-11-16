/*
 面向对象
 */
// 判断要检查的对象是否存在于原型对象的原型链
function inPrototype(objPrototype, objExample) {
  return objPrototype.prototype.isPrototypeOf(objExample);
}

// 判断一个对象是否是另一个对象的实例则
function isObjectProptotype(objPrototype, objExample) {
  return objExample instanceof objPrototype;
}

// 判断实例中是否存在指定属性
function propertyFromPrototype(obj, propterty) {
  return obj.hasOwnProperty(propterty);
}

// 判断原型或实例中是否存在指定属性
function hasPproperty(obj, propterty) {
  return propterty in obj;
}

// 判断只有原型中有指定属性
function isInPrototype() {
  return propterty in obj && !obj.hasOwnProperty(propterty);
}

// 深拷贝
function deepCopy(p, c) {
  var c = c || {};
  for (var i in p) {
    if (typeof p[i] === "object") {
      c[i] = p[i].constructor === Array ? [] : {};
      deepCopy(p[i], c[i]);
    } else {
      c[i] = p[i];
    }
  }
  return c;
}

// 判断值的类型
function type(o) {
  var t, c, n;
  if (o === null) {
    return 'null';
  }

  if (o !== o) {
    return 'nan';
  }

  if ((t = typeof o) !== 'object') {
    return t;
  }

  if ((c = classof(o)) !== 'Object') {
    return c;
  }

  if (o.constructor && typeof o.constructor === 'function' && (n = o.constructor.getName())) {
    return n;
  }

  return 'Object';
}

/*
 类属性
 */
function classof(o) {
  if (o === null) {
    return 'Null';
  }
  if (o === undefined) {
    return 'Undefined';
  }
  return Object.prototype.toString.call(o).slice(8, -1);
}

// 利用空对象作为中介来继承
function extend(Child, Parent) {
  var F = function() {};
  F.prototype = Parent.prototype;
  Child.prototype = new F();
  Child.prototype.constructor = Child;
  Child.uber = Parent.prototype;
}

function extend(subClass, superClass) {
  var F = function() {};
  F.prototype = superClass.prototype;
  subClass.prototype = new F();
  subClass.prototype.constructor = subClass;

  subClass.superClass = superClass.prototype;
  if (superClass.prototype.constructor == Object.prototype.constructor) {
    superClass.prototype.constructor = superClass;
  }
}

// 拷贝继承
function extend2(Child, Parent) {
  var p = Parent.prototype;
  var c = Child.prototype;
  for (var i in p) {
    c[i] = p[i];
  }
  c.uber = p;
}

/*
 给Object.prototype添加一个不可枚举的extend()方法
 这个方法继承自调用它的对象，将作为参数传入的对象的属性一一复制
 除了值之外，也复制属性的所有特性，除非在目标对象中存在同名的属性
 参数对象的所有自有对象（包括不可枚举的属性）也会一一复制
 */
Object.defineProperty(Object.prototype, 'extend', {
  writable: true,
  enumerable: false,
  configurable: true,
  value: function(o) {
    var names = Object.getOwnPropertyNames(o);
    for (var i = 0; i < names.length; i++) {
      if (names[i] in this) {
        continue;
      }
      var desc = Object.getOwnPropertyDescriptor(o, names[i]);
      Object.defineProperty(this, names[i], desc);
    }
  }
});

// 通过原型继承创建一个新对象
function inherit(p) {
  if (p == null) {
    throw TypeError();
  }
  if (Object.create) {
    return Object.create(p);
  }
  var t = typeof p;
  if (t !== 'object' && t !== 'function') {
    throw TypeError();
  }

  function f() {};
  f.prototype = p;
  return new f();
}

/*
 将p中的可枚举属性复制到o中， 并返回o
 */
function merge(o, p) {
  for (prop in p) {
    if (o.hasOwnProperty[prop]) continue;
    o[prop] = p[prop];
  }
  return o;
}

/*
 如果o中的属性在p中没有同名属性，则从o中删除这个属性
 */
function restrict(o, p) {
  for (prop in o) {
    if (!(prop in p)) {
      delete o[prop];
    }
  }
  return o;
}

/*
 如果o中的属性在p中有同名属性，则从o中删除这个属性
 */
function substr(o, p) {
  for (prop in o) {
    delete o[prop];
  }
  return o;
}

/*
 返回一个新对象，这个对象同时拥有o的属性和p的属性，如果o和p中有重名属性，使用p中的属性
 */
function union(o, p) {
  function extend(o, p) {
    for (prop in p) {
      o[prop] = p[prop];
    }
    return o;
  }

  return extend(extend({}, o), p);
}

/*
 返回一个新对象，这个对象拥有同时在o和p中出现的属性，
 很像求o和p的交集，但p中属性的值被忽略
 */
function instersection(o, p) {
  return restrict(extend({}, o), p);
}

/*
 判断是否是空对象
 */
function isEmptyObject(o) {
  var hasProp = false;
  for (var key in o) {
    hasProp = true;
    break;
  }
  return hasProp;
}
