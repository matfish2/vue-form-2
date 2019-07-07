"use strict";

module.exports = function (name) {
  if (this.$parent && this.$parent.$refs.hasOwnProperty(name)) return this.$parent.$refs[name];
  return getField(this, name);
};

function getField(parent, name) {
  if (parent.isField && parent.Name == name) {
    return parent;
  } else if (parent.$children && parent.$children.length) {
    var i;
    var result = null;
    for (i = 0; result == null && i < parent.$children.length; i++) {
      result = getField(parent.$children[i], name);
    }

    return result;
  }

  return null;
}