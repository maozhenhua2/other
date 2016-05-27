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
    if (!/(^1\d{10}$)/.test(value)) {
      return errorMsg;
    }
  },
  isUserName: function (value, errorMsg) { // 字母、数字、下划线组成，字母开头，4-16位。
    if (!/^[a-zA-z]\w{3,15}$/.test(value)) {
      return errorMsg;
    }
  },
  isChinese: function (value, errorMsg) {
    function isChinese(str) {
      var lst = /[\u4E00-\u9FA5\uF900-\uFA2D]/;
      return lst.test(str);
    }

    for (i = 0; i < value.length; i++) {
      if (!isChinese(value.charAt(i))) {
        return errorMsg;
      }
    }

  },
  isSABA: function (value, errorMsg) {
    if (!/^CN\d+$/i.test(value)) {
      return errorMsg;
    }
  },
  idCheck: function (value, errorMsg) {
    var city = {
      11: "北京",
      12: "天津",
      13: "河北",
      14: "山西",
      15: "内蒙古",
      21: "辽宁",
      22: "吉林",
      23: "黑龙江 ",
      31: "上海",
      32: "江苏",
      33: "浙江",
      34: "安徽",
      35: "福建",
      36: "江西",
      37: "山东",
      41: "河南",
      42: "湖北 ",
      43: "湖南",
      44: "广东",
      45: "广西",
      46: "海南",
      50: "重庆",
      51: "四川",
      52: "贵州",
      53: "云南",
      54: "西藏 ",
      61: "陕西",
      62: "甘肃",
      63: "青海",
      64: "宁夏",
      65: "新疆",
      71: "台湾",
      81: "香港",
      82: "澳门",
      91: "国外 "
    };
    // ^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$
    if (!/^\d{6}(1[8-9]|2[0-9])\d{2}(0[1-9]|1[0-2])(0[0-9]|[1-2][0-9]|3[0-1])\d{3}(\d|x)$/i.test(value)) {
      // tip = "身份证号格式错误";
      return errorMsg;
    } else if (!city[value.substr(0, 2)]) {
      // tip = "地址编码错误";
      return errorMsg;
    } else {
      //18位身份证需要验证最后一位校验位
      if (value.length == 18) {
        value = value.split('');
        //∑(ai×Wi)(mod 11)
        //加权因子
        var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
        //校验位
        var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
        var sum = 0;
        var ai = 0;
        var wi = 0;
        for (var i = 0; i < 17; i++) {
          ai = value[i];
          wi = factor[i];
          sum += ai * wi;
        }
        var last = parity[sum % 11];
        if (parity[sum % 11] != value[17]) {
          // tip = "校验位错误";
          return errorMsg;
        }
      }
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
