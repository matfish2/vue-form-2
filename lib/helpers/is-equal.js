module.exports = function(value1, value2) {

if (value1 && value1.format) value1 = value1.format('YYYY-MM-DD');
if (value2 && value2.format) value2 = value2.format('YYYY-MM-DD');

  if (typeof value1!='object' && typeof value2!='object')
    return value1==value2;

var what = Object.prototype.toString;

if (what.call(value1)=='[object Array]') { // multiple list
    return arraysEqual(value1, value2);
}

if (value1 && value1.start && value2 && value2.start) {

 var value1start = value1.start.format?value1.start.format('YYYY-MM-DD'):value1.start;
 var value1end = value1.end.format?value1.end.format('YYYY-MM-DD'):value1.end;
 var value2start = value2.start.format?value2.start.format('YYYY-MM-DD'):value2.start;
 var value2end = value2.end.format?value2.end.format('YYYY-MM-DD'):value2.end;

  return (value1start==value2start) && (value1end==value2end);
}

return false;

}

function arraysEqual(arr1, arr2) {

  var equal = true;

  if (arr1 && !arr2) return false;
  
  if (arr1.length!=arr2.length) return false;

  arr1.forEach(function(item) {
    if (typeof item!='object' && arr2.indexOf(item)==-1)
      equal = false;
  });

  return equal;
}
