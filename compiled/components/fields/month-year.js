"use strict";

var merge = require("merge");
var Field = require("./field");

module.exports = function () {
  return merge.recursive(Field(), {
    data: function data() {
      return {
        format: "MM-YYYY",
        fieldType: "monthyear",
        selected: {
          month: "",
          year: ""
        },
        years: getYears(),
        months: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]
      };
    },
    methods: {
      updateValue: function updateValue(val, type) {
        this.selected[type] = val;

        var val = this.selected.year && this.selected.month ? moment(this.selected.year + "-" + this.selected.month + "-01", "YYYY-MM-DD") : null;

        this.$emit("input", val);
      }
    },
    computed: {},
    mounted: function mounted() {
      if (this.value) {
        var p = this.value.format("MM/YYYY").split("/");
        this.selected.month = p[0];
        this.selected.year = p[1];
      }
    }
  });
};

function getYears() {
  var years = [];
  var currentYear = new Date().getFullYear();

  for (var i = currentYear; i < currentYear + 20; i++) {
    years.push(i);
  }

  return years;
}