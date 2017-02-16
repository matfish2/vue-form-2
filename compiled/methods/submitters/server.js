"use strict";

module.exports = function (vm) {
  return {
    submit: function submit(e) {
      if (vm.sending) {
        if (e) e.preventDefault();
        return false;
      }
      vm.sending = true;
      vm.$el.submit();
      return true;
    }
  };
};