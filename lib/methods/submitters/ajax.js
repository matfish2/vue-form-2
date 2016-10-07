import bus from '../../../bus'

export default function(vm) {
  return {
    submit: function(e) {
      let status =  vm.getStatusBar();
      if (e) e.preventDefault();
      vm.sending = true;
      status.info(vm.opts.texts.sending)
      bus.$emit('vue-form.sending');
      var data = vm.formData();

      var method = vm.method.toLowerCase();
      vm.$http[method](vm.action,getData(method, data)).then(function(data){

        vm.reinitForm();
        bus.$emit('vue-form.sent', data);

        vm.sending = false;

        status.success(typeof data.data=='string'?data.data:vm.opts.texts.sent);

        setTimeout(function() {
          status.reset();
        }, vm.opts.successTimeout);

      })
      .catch(function(response) {

        bus.$emit('vue-form.invalid.server', response);
        vm.sending = false;
        status.reset();
        status.danger(response.body);

    });

      return true;
    }
  }
}


function getData(method, data) {
  return ['head','get','delete'].indexOf(method)>-1?{params:data}:data;
}
