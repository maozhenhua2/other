function circleProcess(o) {

  // var parent = document.getElementById(o.id);
  var canvas = document.getElementById(o.id);
  // var canvas = document.createElement('canvas');
  if (!canvas.getContext) {
    G_vmlCanvasManager.initElement(canvas);
  }
  var ctx = canvas.getContext('2d');
  canvas.width = o.width || 300;
  canvas.height = o.height || 300;
  var W = canvas.width;
  var H = canvas.height;
  var text, text_w;
  var deg = o.percent / 100 * 360;
  var start = o.start || 0;
  // 圆环
  ctx.clearRect(0, 0, W, H);
  ctx.beginPath();
  ctx.strokeStyle = o.circleColor || '#000';
  ctx.lineWidth = W / 10;
  ctx.arc(W / 2, H / 2, (W / 2 - ctx.lineWidth), 0, Math.PI * 2, false);
  ctx.stroke();

  // 进度
  var r = function(t) {
    return t * Math.PI / 180
  };
  var startDeg = o.start - 90;
  var endDeg = deg;
  var s = r(startDeg);
  var e = r(endDeg) + s;
  ctx.beginPath();
  ctx.strokeStyle = o.processColor || '#fff';
  ctx.lineWidth = W / 10;
  ctx.arc(W / 2, H / 2, (W / 2 - ctx.lineWidth), s, e, false);
  ctx.stroke();

  // 字体
  ctx.fillStyle = o.textColor || '#000';
  ctx.font = o.font || '50px Arial';
  text = Math.floor(deg / 360 * 100) + '%';
  var y = o.y || 0;
  // ie8以上支持
  // ctx.textBaseline = 'middle'; //设置文本的垂直对齐方式
  // ctx.textAlign = 'center'; //设置文本的水平对对齐方式
  // ctx.fillText(text, W / 2, H / 2);
  // 手动垂直居中
  var text_w = ctx.measureText(text).width;
  ctx.fillText(text, W / 2 - text_w / 2, H / 2 + y);
  ctx.closePath();

  // parent.appendChild(canvas);
}
