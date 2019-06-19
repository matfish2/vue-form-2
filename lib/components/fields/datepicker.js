var merge = require("merge");
var Field = require("./field");

module.exports = function() {
  return merge.recursive(Field(), {
    props: {
      options: {
        type: Object
      }
    },
    data: function() {
      return {
        fieldType: "datepicker"
      };
    },
    mounted() {},
    methods: {}
  });
};
