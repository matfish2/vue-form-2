module.exports = function(that) {
  return /^[0-9]*$/.test(that.getValue().trim());
}
