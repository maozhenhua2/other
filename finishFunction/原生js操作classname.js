const dom = {};

dom.hasClassName = function(node, classname) {
    let cn = node.className;
    if (classname && node.classList && node.classList.contains) { //浏览器特性判断是否支持classList及对应的contains方法
        return node.classList.contains(classname);
    } else { //对于不支持classList及对应的contains方法使用indexOf进行字符窜匹配
        if ((' ' + cn + ' ').indexOf(' ' + classname + ' ') === -1) {
            return false;
        } else {
            return true;
        }
    }
};

dom.removeClassName = function(node, _className) {
    let obj = node;
    if (_className && obj && obj.classList && obj.classList.remove) { //浏览器特性判断是否支持classList及对应的remove方法
        obj.classList.remove(_className);
    } else {
        obj.className = obj.className.replace(new RegExp("\\b" + _className + "\\b"), "");
    }
};

dom.addClassName = function(node, className) {
    let cn = node.className;
    if (className && node && node.classList && node.classList.add) { //浏览器特性判断是否支持classList及对应的add方法
        node.classList.add(className);
    } else {
        if ((' ' + cn + ' ').indexOf(' ' + className + ' ') === -1) {
            node.className = cn + ' ' + className;
        }
    }
};

dom.toggle = function(node, className) {
    node = $E(node) || node;
    let classList = node.classList;
    if (typeof className === 'undefined' || className === '') { //当没有传递className参数时，做hidden和show的切换
        if (node.style.display !== 'none') {
            node.style.display = 'none';
        } else {
            node.style.display = '';
        }
        return;
    }
    if (classList && classList.toggle) { //传递了className参数时做浏览器特性判断，判断是否支持classList及对应的toggle方法
        node.classList.toggle(className);
    } else {
        if (dom.hasClassName(node, className)) {
            dom.removeClassName(node, className);
        } else {
            dom.addClassName(node, className);
        }
    }
};