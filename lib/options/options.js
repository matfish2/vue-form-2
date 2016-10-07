module.exports = function() {

  var options = {
    labelWidth:3,
    layout:'',
    showErrorsInStatusBar:false,
    sendOnlyDirtyFields:false,
    successTimeout:4000,
    additionalPayload:{},
    customRules:{},
    fileOptions: {},
    dateOptions:{},
    select2Options:{},
    tinymceOptions:{},
    beforeSubmit: function() {
     return true;
    },
    texts: {
      sending:'Sending Form...',
      sent:'Form was successfully sent',
      singleError:'an error was found:',
      errors:'{0} errors were found:',
      selectAll:'Select All',
      unselectAll:'Unselect All'
    }
  };

  options.messages = require('../validation/messages/messages')();

  return options;

}
