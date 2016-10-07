module.exports ={
  methods: {
    getMessage: require('../methods/get-message'),
    validateRemote: require('../methods/validate-remote'),
    validate: require('../methods/validate'),
    addFormError: require('../methods/add-form-error'),
    removeFormError: require('../methods/remove-form-error'),
    inForm: require('../methods/in-form'),
    triggerOn: require('../methods/trigger-on'),
    handleTriggeredFields: require('../methods/handle-triggered-fields'),
    getForm: require('../methods/get-form'),
    getField: require('../methods/get-field')
  }
}
