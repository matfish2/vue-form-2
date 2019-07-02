var merge = require("merge");
var Field = require("./field");

module.exports = function() {
  return merge.recursive(Field(), {
    data: function() {
      return {
        fieldType: "monthyear",
        selected: {
          month: "",
          year: ""
        },
        years: getYears(),
        months: [
          "01",
          "02",
          "03",
          "04",
          "05",
          "06",
          "07",
          "08",
          "09",
          "10",
          "11",
          "12"
        ]
      };
    },
    methods: {
      updateValue(val, type) {
        this.selected[type] = val;

        var val =
          this.selected.year && this.selected.month
            ? `${this.selected.month}/${this.selected.year}`
            : "";
        this.$emit("input", val);
      }
    },
    computed: {},
    mounted: function() {
      if (this.value) {
        var p = this.value.split("/");
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
