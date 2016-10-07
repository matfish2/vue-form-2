module.exports = function(rules) {
  if (rules.min && isDateString(rules.min))
    rules.min = moment(rules.min, 'YYYY-MM-DD');

   if (rules.max && isDateString(rules.max))
    rules.max = moment(rules.max, 'YYYY-MM-DD');

   if (rules.between && isDateString(rules.between[0])) {
    rules.between[0] = moment(rules.between[0], 'YYYY-MM-DD');
    rules.between[1] = moment(rules.between[1], 'YYYY-MM-DD');
   }

  return rules;

}

function isDateString(str) {
  return typeof str=='string' && (/\d{4}-\d{2}-\d{2}/).test(str);
}
