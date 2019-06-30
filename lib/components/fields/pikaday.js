var merge = require("merge");
var Field = require("./field");

module.exports = function() {
  return merge.recursive(Field(), {
    props: {
      format: {
        type: String,
        default: "DD-MM-YYYY"
      },
      options: {
        type: Object
      }
    },
    data: function() {
      return {
        fieldType: "pikaday"
      };
    },
    mounted() {
      var self = this;

      var options = merge(
        {
          field: this.$el,
          onSelect(e) {
            self.$emit("input", moment(e));
          }
        },
        this.options
      );

      this.picker = new Pikaday(options);
    },
    methods: {
      formattedValue() {
        if (!this.value) return "";

        if (this.picker) {
          this.picker.setDate(moment(this.value), true);
        }

        // already a moment object
        if (typeof this.value.isValid !== "undefined") {
          return this.value.format(this.format);
        }

        // a DateTime object
        return moment(this.value.format("yyyy-mm-dd"), "YYYY-MM-DD").format(
          this.format
        );
      }
    }
  });
};
