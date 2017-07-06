import statusbar from '../templates/status-bar'

module.exports = {
  name:'status-bar',
  data: ()=> {
    return {
      message:'',
      status:'success'
    }
  },
  render: statusbar,
  methods: {
    getForm: require('./methods/get-form'),
    _setMessage: function (message, status) {
      this.message = message;
      this.status = status;
    },
    danger: function (message) { this._setMessage(message, 'danger')},
    success: function (message) { this._setMessage(message, 'success')},
    info: function (message) { this._setMessage(message, 'info')},
    warning: function (message){  this._setMessage(message, 'warning')},
    reset: function() { this.success('')},
    getErrorMessage: function(error) {

      let field = this.getForm().getField(error.name);

      if (!field) return false;
      
      if (error.hasOwnProperty('message'))
        return error.message.replace(":field",field.label);

      return field.getMessage(error.rule);
    }
  },
  computed: {
    Message: function() {
      return this.message;
    },
    Status: function() {
      if (this.hasErrors)
        return 'danger';

      return this.status;
    },
    errorsCount: function() {
      let texts = this.getForm().opts.texts;
      return this.showableErrors.length==1?texts.singleError:texts.errors.replace('{0}', this.showableErrors.length);
    },
    hasErrors: function() {
      return !this.message && this.getForm().opts.showClientErrorsInStatusBar && this.showableErrors.length;
    },
    hasMessage: function() {
      return !!this.Message || this.hasErrors;
    },

     showableErrors: function() {

         let errors = [];

        this.getForm().errors.forEach(function(error) {
          if (error.show)
            errors.push(error);
        });

        return errors;
    }
  }
}
