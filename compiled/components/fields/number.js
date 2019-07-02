"use strict";

var merge = require("merge");
var Input = require("./input");

module.exports = function () {
  return merge.recursive(Input(), {
    data: function data() {
      return {
        fieldType: "number"
      };
    },
    mounted: function mounted() {
      this.Rules.number = true;
    }
  });
};