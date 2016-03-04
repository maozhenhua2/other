var i = 0;
function timedCount() {
  i = i + 1;
  //i = i + 1;
  // 不断发送消息
  postMessage({
    id: 'b',
    n: i
  });
  setTimeout("timedCount()", 1000);
}

timedCount();
// 只会
addEventListener('message', function(e){
  postMessage(e.data);
});

/*

Web Worker无法访问DOM节点；
Web Worker无法访问全局变量或是全局函数；
Web Worker无法调用alert()或者confirm之类的函数；
Web Worker无法访问window、document之类的浏览器全局变量；
 */
