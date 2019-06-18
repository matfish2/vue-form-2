var props = require("../mixins/props");
var data = require("../mixins/data");
var methods = require("../mixins/methods");
var computed = require("../mixins/computed");
var mounted = require("../mixins/mounted");
import valueWatcher from "../mixins/watch";

import field from "../../templates/field";

module.exports = function() {
  return {
    render: field,
    mixins: [props, data, methods, computed, mounted],
    methods: {
      updateValue: function(e) {
        this.$emit("input", e.target.value);
      },
      focus: function() {
        this.$el.getElementsByTagName(this.tagName)[0].focus();
      }
    },
    watch: {
      value: {
        immediate: true,
        handler: valueWatcher
      }
    },
    destroyed: function() {
      const form = this.getForm();
      form.vferrors = form.vferrors.filter(error => error.name != this.name);
    }
  };
};
