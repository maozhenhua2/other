var animateQueue = {
  queue: [],
  step: 10,
  startId: 0,
  animateInfo: {},
  isAnimated: false,
  init: function (option) {
    this.obj = document.querySelector(option.obj);
    this.time = option.time;
    return this;
  },
  run: function (obj) {
    var _this = this;
    _this.addQueue();
    // console.log(_this.queue);
    if (_this.isAnimated) {
      return false;
    }
    _this.isAnimated = true;
    var fn = _this.removeQueue();
    fn.call(_this, obj);
    return this;
  },
  stop: function () {

  },
  pause: function () {

  },
  animate: function (obj) {
    var _this = this;
    var id = _this.obj.animateId;
    _this.animateInfo[id] = {};

    _this.animateInfo[id]['styles'] = {};
    _this.animateInfo[id]['step'] = 10;
    var arr = [];
    for (var key in obj) {
      var style = key;
      var value = obj[key];
      // 获取初始属性
      var startInfo = getStyle(_this.obj, style);

      // css属性
      // 生成js所需要的css属性
      if (style.indexOf('-') !== -1) {
        style = style.split('-').map(function (v, i) {
          if (i !== 0) {
            var ss = v[0].toUpperCase();
            v = v.replace(re, ss);
          }
        });
        style = styleName.join('');
      }
      _this.animateInfo[id]['styles'][style] = {};
      // 初始单位
      _this.animateInfo[id]['styles'][style].su = startInfo.replace(/\d+/, '');
      // 初始值
      _this.animateInfo[id]['styles'][style].sv = parseInt(startInfo.replace(/[a-zA-Z]+/, ''), 10);
      // 目标值
      _this.animateInfo[id]['styles'][style].ev = parseInt(value.replace(/[a-zA-Z]+/, ''), 10);

      var step = _this.animateInfo[id]['styles'][style].ev - _this.animateInfo[id]['styles'][style].sv;
      arr.push(step * (1000 / 60) / _this.time);
      // 1000 * 16.66 / 1666 = 10
      console.log(arr)

    }
    _this.animateInfo[id]['step'] = Math.max.apply(null, arr);
    now = new Date();
    _this.frame();
    console.log(_this.animateInfo[id]['step'])
  },
  frame: function () {
    var _this = animateQueue;
    var id = _this.obj.animateId;
    var value = _this.animateInfo[id]['styles'];
    if (isEmptyObj(value)) {
      window.cancelAnimationFrame(_this.animateInfo[id].animateId);
      _this.animateInfo[id] = {};
      console.log(new Date() - now)
      return false;
    }

    for (var key in value) {
      var o = value[key];
      if (o.sv < o.ev) {
        _this.obj.style[key] = o.sv + o.su;
        o.sv = o.sv + _this.animateInfo[id]['step'];
      } else {
        _this.obj.style[key] = o.ev + o.su;
        _this.isAnimated = false;
        delete value[key];
      }
    }
    _this.animateInfo[id].animateId = window.requestAnimationFrame(_this.frame);
  },
  addQueue: function () {
    var _this = this;
    var key = _this.obj.animateId;
    if (!key) {
      _this.obj.animateId = 'animate' + _this.startId;
      _this.startId = _this.startId + 1;
      key = _this.obj.animateId;
    }


    if (_this.queue[key] === undefined) {
      _this.queue[key] = [];
    }
    this.queue[key].push(_this.animate);
  },
  removeQueue: function () {
    var _this = this;
    var key = _this.obj.animateId;
    if (this.queue[key].length) {
      return _this.queue[key].shift();
    }
  }
};

document.getElementById('run').addEventListener('click', function () {
  animateQueue.init({
    obj: '#animate',
    time: 1000
  }).run({
    'left': '1000px',
    'width': '200px',
    'height': '200px'
  });
});


// 获取指定css样式
function getStyle(oElm, strCssRule) {
  var strValue = "";
  if (document.defaultView && document.defaultView.getComputedStyle) {
    strValue = document.defaultView.getComputedStyle(oElm, "").getPropertyValue(strCssRule);
  } else if (oElm.currentStyle) {
    strCssRule = strCssRule.replace(/\-(\w)/g, function (strMatch, p1) {
      return p1.toUpperCase();
    });
    strValue = oElm.currentStyle[strCssRule];
  }
  return strValue;
}

// 判断是否是空对象
function isEmptyObj(o) {
  for (var key in o) {
    if (o[key]) {
      return false;
    }
  }
  return true;
}