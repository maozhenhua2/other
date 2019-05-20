export function numberToMoney(v: number | string): string {
  var t = String(v);
  var a = '',
    b = '';
  if (t.indexOf('.') !== -1) {
    a = t.split('.')[0];
    b = '.' + t.split('.')[1];
  } else {
    a = t;
  }
  var regex = /\B(?=(\d{3})+\b)/g;
  a = a.replace(regex, ',');
  return a + b;
}

