module.exports = function() {
  return !this.rules.requiredIf || !!this.vferrors.length;
};
