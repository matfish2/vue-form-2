module.exports = function (vm) {
  return {
    submit: function (e) {
      if (e) e.preventDefault();

      setTimeout(() => {
        var data = vm.formData();

        if (vm.opts.resetFormAfterSubmit) {
          vm.reinitForm();
        }

        vm.dispatch('sent', data);
        vm.getStatusBar().success(vm.opts.texts.sent);
      }, 50);

      return true;
    }
  }
}
