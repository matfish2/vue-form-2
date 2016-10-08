import bus from '../../../bus'

module.exports = function(vm) {
  return {
    submit: function(e) {
      if (e) e.preventDefault();
      var data = vm.formData();
      vm.reinitForm();
      bus.$emit('vue-form.sent', data);
      vm.getStatusBar().success(vm.opts.texts.sent);
      return true;
    }
  }
}
