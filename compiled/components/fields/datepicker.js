"use strict";

var merge = require("merge");
var Field = require("./field");

module.exports = function () {
  return merge.recursive(Field(), {
    props: {
      options: {
        type: Object
      }
    },
    data: function data() {
      return {
        fieldType: "datepicker"
      };
    },
    mounted: function mounted() {},

    methods: {}
  });
};