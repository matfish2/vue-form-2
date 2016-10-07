module.exports = function(ref) {
  if (!this.$root.$refs.hasOwnProperty(ref))
    throw 'vue-formular: error in childrenOf method: ref "' + ref + '" was not found.';

    return getFields(this.$root.$refs[ref].$children, []);
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
