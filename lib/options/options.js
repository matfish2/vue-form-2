module.exports = function () {

  var options = {
    labelWidth: 3,
    layout: '',
    showErrorsInStatusBar: false,
    sendOnlyDirtyFields: false,
    resetFormAfterSubmit: true,
    removePristineFields: true,
    fireChangeOnInit: false,
    successTimeout: 4000,
    additionalPayload: {},
    customRules: {},
    fileOptions: {},
    dateOptions: {},
    select2Options: {},
    tinymceOptions: {},
    loqateOptions: {},
    addressFinderOptions: {},
    beforeSubmit: function () {
      return true;
    },
    texts: {
      sending: 'Sending Form...',
      sent: 'Form was successfully sent',
      singleError: 'an error was found:',
      errors: '{0} errors were found:',
      selectAll: 'Select All',
      unselectAll: 'Unselect All',
      expand: 'Expand',
      minimize: 'Minimize',
      noItems: 'No items were found',
      clear: 'Clear'
    },
    messageFormatters: {},
    nullifyEmptyStrings: false,
    disableValidation: false // set to true for testing purposes
  };

  options.messages = require('../validation/messages/messages')();

  return options;

}
