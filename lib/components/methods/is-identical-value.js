module.exports = function (newValue, oldValue) {
    if (typeof newValue!=='object') {
      return oldValue===newValue;
    }
  
    if (Object.prototype.toString.call(newValue) === '[object Array]') {
      return newValue.length === oldValue.length && newValue.every((v,i) => v === oldValue[i]);
    }
  
    return false;
  }
  