module.exports = function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}
