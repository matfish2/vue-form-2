var isNumeric = require('../../helpers/is-numeric');

module.exports = function(that) {
  return isNumeric(that.value);
}
