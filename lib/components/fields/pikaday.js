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
        fieldType: "pikaday",
        months: {
          Jan: "01",
          Feb: "02",
          Mar: "03",
          Apr: "04",
          May: "05",
          Jun: "06",
          Jul: "07",
          Aug: "08",
          Sep: "09",
          Oct: "10",
          Nov: "11",
          Dec: "12"
        }
      };
    },
    mounted() {
      var self = this;

      var options = merge(
        {
          field: this.$el,
          onSelect(e) {
            // console.log(e);
            // console.log(moment(e));
            var date = e.toDateString();
            var pieces = date.split(" ");
            var day = pieces[2];
            var month = self.months[pieces[1]];
            var year = pieces[3];

            self.$emit(
              "input",
              moment(`${year}-${month}-${day}`, "YYYY-MM-DD")
            );
            self.$nextTick(() => {
              self.picker.setDate(self.value, true);
            });
          }
        },
        this.options
      );

      this.picker = new Pikaday(options);
    },
    methods: {
      formattedValue() {
        if (!this.value) return "";

        return this.value.format(this.format);
      }
    }
  });
};
