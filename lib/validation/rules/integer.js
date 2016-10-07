module.exports = function(that) {
  return !isNaN(that.curValue) && that.curValue%1===0;
}
