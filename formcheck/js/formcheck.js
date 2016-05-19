/***********************策略对象**************************/
var strategies = {
  isNonEmpty: function (value, errorMsg) { // 不为空
    if (value === '') {
      return errorMsg;
    }
  },
  minLength: function (value, length, errorMsg) { // 限制最小长度
    if (value.length < length) {
      return errorMsg;
    }
  },
  isMobile: function (value, errorMsg) { // 手机号码格式
    if (!/(^1[3|5|8][0-9]{9}$)/.test(value)) {
      return errorMsg;
    }
  }
};

/***********************Validator 类**************************/
var Validator = function () {
  this.cache = []; // 保存校验规则
};

Validator.prototype.add = function (value, rules) {
  var self = this;

  for (var i = 0, rule; rule = rules[i++];) {
    (function (rule) {
      var strategyAry = rule.strategy.split(':');
      var errorMsg = rule.errorMsg;

      self.cache.push(function () {
        var strategy = strategyAry.shift();
        strategyAry.unshift(value);
        strategyAry.push(errorMsg);
        return strategies[strategy].apply(value, strategyAry);
      });
    })(rule)
  }
};

Validator.prototype.start = function () {
  for (var i = 0, validatorFunc; validatorFunc = this.cache[i++];) {
    var errorMsg = validatorFunc();
    if (errorMsg) {
      return errorMsg;
    }
  }
};

/***********************客户调用代码**************************/
var registerForm = document.getElementById('registerForm');

var validataFunc = function () {
  var validator = new Validator();

  validator.add(registerForm.userName.value, [{
    strategy: 'isNonEmpty',
    errorMsg: '用户名不能为空'
  }, {
    strategy: 'minLength:6',
    errorMsg: '用户名长度不能小于 10 位'
  }]);

  validator.add(registerForm.password.value, [{
    strategy: 'minLength:6',
    errorMsg: '密码长度不能小于 6 位'
  }]);

  validator.add(registerForm.phoneNumber.value, [{
    strategy: 'isMobile',
    errorMsg: '手机号码格式不正确'
  }]);

  return validator.start();
};

registerForm.onsubmit = function () {
  return false;
};

document.getElementById('submit').addEventListener('click', function () {
  console.dir(registerForm);
  
});
