module.exports = function() {
  return getForm(this.$parent);
}

function getForm(instance) {

    if (!instance || !instance.hasOwnProperty('$parent'))
      return false;

    if (instance.hasOwnProperty('isForm') && instance.isForm)
      return instance;

    return getForm(instance.$parent);
}
