module.exports = function() {
  return this.vferrors.length ? this.getMessage(this.vferrors[0]) : "";
};
