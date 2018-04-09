'use strict';

module.exports = {
  props: {
    name: {
      type: String,
      required: false
    },
    value: {
      required: false,
      default: ''
    },
    label: {
      type: String,
      required: false
    },
    description: {
      type: String,
      required: false
    },
    hideLabel: {
      type: Boolean
    },
    disabled: {
      type: Boolean
    },
    required: {
      type: Boolean
    },
    title: {
      type: String,
      default: ''
    },
    rules: {
      type: Object,
      required: false,
      default: function _default() {
        return {};
      }
    }
  }
};