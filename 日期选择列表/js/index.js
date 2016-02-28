var select1 = new dateLink();
select1.init({
  year: 2015,
  month: 2,
  date: 30
});

customSelect
  .run()
  .setFn(function() {
    var _this = this;
    // var h = _this.ul.html();
    // h = h.replace(/(^\s*)|(\s*$)/g, "");
    // if (h) {
    _this.show();
    // }
  })
  .selectFn(function(t) {
    // console.log('select: ' + t);
  })

function dateLink() {
  var __this = this;
  var _thisPrototype = dateLink.prototype;
  var now = new Date();
  var nowDate = {
    year: now.getFullYear(),
    month: now.getMonth(),
    date: now.getDate()
  };
  var selectDate = {
    year: nowDate.year,
    month: nowDate.month,
    date: nowDate.date
  };

  if (typeof _thisPrototype.init !== 'function') {
    _thisPrototype.init = function(obj) {
      var _this = this;
      if(obj){
        selectDate.year = obj.year || nowDate.year;
        selectDate.month = obj.month - 1 || nowDate.month;
        selectDate.date = obj.date || nowDate.date;
      }
      _this.createYear();
      _this.createMonth();
      _this.createDate();
      _this.selectY();
      _this.selectM();
    }

    _thisPrototype.createYear = function() {
      var s = nowDate.year;
      var e = 1900;
      var h = '';

      for (; s >= e; s--) {
        h += '<li><span class=" input option">' + s + '</span></li>';
      }
      $('.date-box .year ul').html(h);
      $('.date-box .year .txt').html(selectDate.year);
    };

    _thisPrototype.createMonth = function() {
      h = '';
      s = 0;
      e = 12;
      for (; s < e; s++) {
        h += '<li><span class=" input option">' + (s + 1) + '</span></li>';
      }
      $('.date-box .month ul').html(h);
      $('.date-box .month .txt').html(selectDate.month + 1);
    };

    _thisPrototype.createDate = function() {
      h = '';
      s = 0;
      e = new Date(selectDate.year, selectDate.month + 1, 0).getDate();

      selectDate.date = selectDate.date > e ? e : selectDate.date;
      
      for (; s < e; s++) {
        h += '<li><span class=" input option">' + (s + 1) + '</span></li>';
      }
      $('.date-box .date ul').html(h);
      $('.date-box .date .txt').html(selectDate.date);
    };

    _thisPrototype.selectY = function() {
      var _this = this;
      $('.date-box .year .option').on('click', function() {
        // console.log($(this).html())
        selectDate.year = parseInt($(this).html(), 10);
        // console.log(selectDate)
        _this.createDate();
      });
    };

    _thisPrototype.selectM = function() {
      var _this = this;
      $('.date-box .month .option').on('click', function() {
        // console.log($(this).html())
        selectDate.month = parseInt($(this).html(), 10) - 1;
        // console.log(selectDate)
        _this.createDate();
      });
    };

  }

}
