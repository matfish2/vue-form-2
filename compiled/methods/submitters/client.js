'use strict';

module.exports = function (vm) {
  return {
    submit: function submit(e) {
      if (e) e.preventDefault();
      var data = vm.formData();
      vm.reinitForm();
      vm.dispatch('sent', data);
      vm.getStatusBar().success(vm.opts.texts.sent);
      return true;
    }
  };
};