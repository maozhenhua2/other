var w = new Worker('webWorker2.js');
var i = 0;
setInterval(function() {
  i = i + 2;
  w.postMessage({
    id: 'a',
    n: i
  });
}, 1000);

w.addEventListener('message', function(e) {
  switch (e.data.id){
    case 'a':
      document.getElementById("msg1").innerHTML = e.data.n;
      break;
    case 'b':
      document.getElementById("msg").innerHTML = e.data.n;
      break;
  }
  
}, false);
/*
 1.通过 worker = new Worker( url ) 加载一个JS文件来创建一个worker，同时返回一个worker实例。

 2.通过worker.postMessage( data ) 方法来向worker发送数据。

 3.绑定worker.onmessage方法来接收worker发送过来的数据。

 4.可以使用 worker.terminate() 来终止一个worker的执行。

 worker新线程：

 1.通过postMessage( data ) 方法来向主线程发送数据。

 2.绑定onmessage方法来接收主线程发送过来的数据。
 */
