var merge = require("merge");
var Field = require("./field");

module.exports = function() {
  return merge.recursive(Field(), {
    props: {
      options: {
        type: Object,
        default: () => {
          return {};
        }
      }
    },
    data() {
      return {
        fieldType: "loqate",
        fields: [
          { element: "search", field: "", mode: pca.fieldMode.SEARCH },
          {
            element: "company",
            field: "Company",
            mode: pca.fieldMode.DEFAULT | pca.fieldMode.PRESERVE
          },
          { element: "line1", field: "Line1" },
          { element: "line2", field: "Line2", mode: pca.fieldMode.POPULATE },
          { element: "city", field: "City", mode: pca.fieldMode.POPULATE },
          { element: "state", field: "Province", mode: pca.fieldMode.POPULATE },
          { element: "postcode", field: "PostalCode" },
          {
            element: "country",
            field: "CountryName",
            mode: pca.fieldMode.COUNTRY
          }
        ]
      };
    },
    mounted() {
      this.control = new pca.Address(this.vffields, this.Options);

      this.control.listen("populate", address => {
        this.$emit("input", address);
      });
    },
    computed: {
      Options() {
        return merge.recursive(this.getForm().opts.loqateOptions, this.options);
      },
      Fields() {
        return this.vffields.map(field => {
          field.element = this.id(field.element);
          return field;
        });
      }
    },
    methods: {
      id(field) {
        return `${this.Name}__${field}`;
      },
      getAddressComponent(key) {
        if (this.value && this.value[key]) {
          return this.value[key].replace(/(?:\r\n|\r|\n)/g, ", ");
        }

        return "";
      }
    }
  });
};
