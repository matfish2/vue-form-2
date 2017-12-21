'use strict';

module.exports = function (vm) {
  return {
    submit: function submit(e) {
      if (e) e.preventDefault();

      setTimeout(function () {
        var data = vm.formData();
        vm.reinitForm();
        vm.dispatch('sent', data);
        vm.getStatusBar().success(vm.opts.texts.sent);
      }, 50);

      return true;
    }
  };
};