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
    has: function(key){
      return store.getItem(key) !== undefined;
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