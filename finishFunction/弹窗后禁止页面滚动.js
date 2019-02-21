// 弹窗后禁止页面滚动
var pnbs = {
  toggleContainerTouchAction: function toggleContainerTouchAction(sel, v) {
    var container = document.querySelector(sel);
    if (!container) {
      return;
    }
    container.style["touch-action"] = v ? "none" : "auto";
  },
  show: function show(v) {
    toggleContainerTouchAction(v);
    if (v) {
      document.body.addEventListener("touchmove", stopTouch, {
        passive: false,
        capture: true
      });
    } else {
      document.body.removeEventListener("touchmove", stopTouch, {
        capture: true
      });
    }
  },
  stopTouch: function stopTouch(e) {
    e.preventDefault();
  }
};