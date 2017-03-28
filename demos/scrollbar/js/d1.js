function createLi() {
  var i = 0;
  var l = 30;
  var o = document.createDocumentFragment();
  var li;
  var ul = document.createElement('ul');
  for (; i < l; i++) {
    li = document.createElement('li');
    li.innerHTML = 'li' + (i + 1);
    ul.appendChild(li);
  }
  o.appendChild(ul);
  return o;
}

document.querySelector('.scroll').appendChild(createLi());

function Scroller() {
  this.option = null;
}

var ease = {
  quadratic: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  circular: 'cubic-bezier(0.1, 0.57, 0.1, 1)',
  back: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)'
};

Scroller.prototype.init = function (option) {
  var _this = this;
  _this._setOption(option);
  _this._setVars();
  _this.obj = document.querySelector(_this.option.obj);
  _this.ul = _this.obj.querySelector('ul');
  _this._events();
};

Scroller.prototype._events = function () {
  var _this = this;
  _this.obj.addEventListener('touchstart', _this, false);
  _this.obj.addEventListener('touchmove', _this, false);
  _this.obj.addEventListener('touchend', _this, false);
};

Scroller.prototype.handleEvent = function (e) {
  var _this = this;
  switch (e.type) {
    case 'touchstart':
    case 'pointerdown':
    case 'MSPointerDown':
    case 'mousedown':
      _this._startEvent(e);
      break;
    case 'touchmove':
    case 'pointermove':
    case 'MSPointerMove':
    case 'mousemove':
      _this._moveEvent(e);
      break;
    case 'touchend':
    case 'pointerup':
    case 'MSPointerUp':
    case 'mouseup':
    case 'touchcancel':
    case 'pointercancel':
    case 'MSPointerCancel':
    case 'mousecancel':
      _this._endEvent(e);
      break;
  }
};

Scroller.prototype._startEvent = function (e) {
  var ev = this._setEv(e);
  this._startTop = this._startTop || 0;
  this._startY = ev().pageY;
  this._setStyle(0, this._startTop);
};

Scroller.prototype._moveEvent = function (e) {
  // console.log('move type: %s', e.type);
  var ev = this._setEv(e);
  this._moveY = ev().pageY;
  this._move = (this._moveY - this._startY) / 3.5;
  this._dir = this._move < 0 ? 'up' : 'down';
  // var percent = parseInt(this._move / this._maxHeight * 100, 10);
  // percent = percent > 100 ? 100 : percent;
  // console.log(this._dir)

  this._endMove = this._startTop + this._move;
  this._setStyle(0, this._endMove, 0, ease.circular);
};

Scroller.prototype._endEvent = function (e) {
  console.log('end type: %s', e.type);
  this._startTop = this._endMove;
};

Scroller.prototype._setOption = function (option) {
  this.option = option;
};

Scroller.prototype._setVars = function () {
  this._startY = 0;
  this._startTop = 0;
  this._moveY = 0;
  this._move = 0;
  this._moves = 0;
  this._endMove = 0;
  this._maxHeight = 50;
};

Scroller.prototype._setEv = function (e) {
  var ev;
  switch (e.type) {
    case 'touchstart':
    case 'touchmove':
    case 'touchend':
      ev = function () {
        return e.touches[0];
      };
      break;
    case 'mousedown':
    case 'mousemove':
    case 'mouseup':
      ev = function () {
        return e;
      };
      break;
  }
  return ev;
};

Scroller.prototype._setStyle = function (x, y, time, ease) {
  var _this = this;
  var arr = ['t', 'webkitT', 'MozT', 'msT', 'OT'];
  for (var key in arr) {
    _this.ul.style[arr[key] + 'ransform'] = 'translate(' + x + 'px, ' + y + 'px)';
  }
  _this.ul.style['transitionTimingFunction'] = ease;
  _this.ul.style['transitionDuration'] = time + 'ms';
  // transition-duration: 0ms;
};

var scroll1 = new Scroller();
scroll1.init({
  obj: '.scroll'
});
