"use strict";

var clone = require("clone");

module.exports = {
  data: function data() {
    return {
      isField: true,
      randomId: Math.floor(Math.random() * 100000),
      tagName: "input",
      messages: {},
      isRequired: false,
      shouldShow: true,
      wasReset: false,
      initialValue: clone(this.value),
      hadErrors: false,
      vferrors: [],
      relatedFields: [],
      triggeredFields: [],
      Rules: {}
    };
  }
};