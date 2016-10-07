import bus from '../../../bus'

module.exports = function(vm) {
  return {
    submit: function(e) {
      if (e) e.preventDefault();
      var data = vm.formData();
      vm.reinitForm();
      bus.$emit('vue-formular.sent', data);
      vm.$root.$refs.status.success(vm.opts.texts.sent);
      return true;
    }
  }
}
