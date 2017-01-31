let getSubmitter = require('./get-submitter');

module.exports = function(e) {

  if (e)
   e.preventDefault();

  if (this.errors.length>0)
    return handleErrors(this);

  if (this.sending || (this.opts.sendOnlyDirtyFields && this.pristine)) {
    return false;
  }

  var beforeSubmit = this.opts.beforeSubmit(this);

  if (typeof beforeSubmit=='boolean' && beforeSubmit)
    return getSubmitter(this).submit(e);

  var resolveMethod = beforeSubmit.done?'done':'then';
  var rejectMethod = beforeSubmit.catch?'catch':'fail';

  beforeSubmit[resolveMethod](function() {
    return getSubmitter(this).submit(e);
  }.bind(this))
  [rejectMethod](function() {

  });

}

function handleErrors(vm) {
 vm.showAllErrors();
 vm.dispatch('invalid.client', vm.errors);
 return false;
}
