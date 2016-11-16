module.exports = function(ref) {
  if (!this.$parent.$refs.hasOwnProperty(ref))
    throw 'vue-form: error in childrenOf method: ref "' + ref + '" was not found.';

    return getFields(this.$parent.$refs[ref].$children, []);
}

function getFields(children, result) {

  children.forEach(function(child) {
    if (child.hasOwnProperty('isField') && child.isField) {
      result.push(child);
    } else if (child.hasOwnProperty('$children')) {
        getFields(child.$children, result);
    }
  });

  return result;
}
