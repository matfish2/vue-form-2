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

      let field = this.form.getField(error.name);

      if (!field) return false;

      if (error.hasOwnProperty('message'))
        return error.message.replace(":field",field.label);

      return field.getMessage(error.rule);
    }
  },
  created() {
    this.form = this.getForm();
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
      let texts = this.form.opts.texts;

      var multipleErrors = this.showableErrors.length>1;
      var text = multipleErrors?texts.errors:texts.singleError;
      if (multipleErrors && typeof text==='string') {
        text = text.replace('{0}',this.showableErrors.length);
      }

      return text;
    },
    hasErrors: function() {
     return (!this.message || typeof this.message!=='string') && this.form.opts.showClientErrorsInStatusBar && this.showableErrors.length;
    },
    hasMessage: function() {
      return !!this.Message || this.hasErrors;
    },

     showableErrors: function() {
       return this.form.errors.filter(error => error.show);
    }
  }
}
