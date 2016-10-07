module.exports = function(vm) {
  return {
    submit: function(e) {
      if (vm.sending) {
        if (e) e.preventDefault();
        return false;
      }
      vm.sending = true;
      vm.$el.submit();
      return true;
    }
  }
}

