function localStorageFn(toggle) {
  var session = window.sessionStorage;
  var local = window.localStorage;
  var store;
  if(toggle){ // 设置为true为session
    store = session;
  } else { // 设置为false或不设置为local
    store = local;
  }
  var loc = {
    get: function (key) {
      var t = store.getItem(key);
      if (typeof t === 'string') {
        t = JSON.parse(t);
      }
      return t;
    },
    set: function (key, value) {
      var t = value;
      if (typeof t !== 'string') {
        t = JSON.stringify(value);
      }
      store.setItem(key, t);
    },
    del: function (key) {
      store.removeItem(key);
    },
    clear: function () {
      store.clear();
    },
    support: function () {
      try {
        var x = '__storage_test__';
        loc.set(x, x);
        loc.del(x);
        return true;
      } catch (e) {
        return false;
      }
    },
    event: function (fn) {
      if (window.addEventListener) {
        window.addEventListener('storage', fn, false);
      } else if (window.attachEvent) {
        window.attachEvent('onstorage', fn);
      }
    }
  };
  return loc;
}

var loc = localStorageFn();
loc.event(function (e) {
  /*
  只有有多个窗口时，a窗口修改了localStorage，其他窗口才能监听storage事件的改变
  */
  // console.log(e)
  /*
  重要属性
  {
     newValue: '{a: 2}',
     oldValue: '{a: 1}',
     key: 'test'
     storageArea: {
       length: 1,
       test: '{a:2}'
     },
     url: "http://localhost:63342/work/test/localStorage/localStorage.html"
   }
   */
});
//console.log(loc.support());
loc.set('test', {a: 1});
//console.log(loc.get('test'));
//loc.del('test');

loc.set('test', {a: 2});

/*// 也可以用于测试是否支持sessionStorage
 if (storageAvailable('localStorage')) {
 // Yippee! We can use localStorage awesomeness
 alert('This browser supports localStorage');
 return false;
 } else {
 // Too bad, no localStorage for us
 }

 function storageAvailable(type) {
 try {
 var storage = window[type],
 x = '__storage_test__';
 storage.setItem(x, x);
 storage.removeItem(x);
 return true;
 } catch (e) {
 return false;
 }
 }
 */
