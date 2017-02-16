'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _submit = require('../templates/submit');

var _submit2 = _interopRequireDefault(_submit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  render: _submit2.default,
  props: {
    text: {
      type: String,
      required: false,
      default: 'Submit'
    }
  },
  methods: {
    getForm: require('./methods/get-form')
  },
  computed: {
    disabled: function disabled() {
      return this.getForm().sending || this.getForm().options.sendOnlyDirtyFields && this.getForm().pristine;
    }
  }
};