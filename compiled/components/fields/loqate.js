'use strict';

var merge = require('merge');
var Field = require('./field');

module.exports = function () {
  return merge.recursive(Field(), {
    props: {
      options: {
        type: Object,
        default: function _default() {
          return {};
        }
      }
    },
    data: function data() {
      return {
        fieldType: 'loqate',
        fields: [{ element: "search", field: "", mode: pca.fieldMode.SEARCH }, { element: "company", field: "Company", mode: pca.fieldMode.DEFAULT | pca.fieldMode.PRESERVE }, { element: "line1", field: "Line1" }, { element: "line2", field: "Line2", mode: pca.fieldMode.POPULATE }, { element: "city", field: "City", mode: pca.fieldMode.POPULATE }, { element: "state", field: "Province", mode: pca.fieldMode.POPULATE }, { element: "postcode", field: "PostalCode" }, { element: "country", field: "CountryName", mode: pca.fieldMode.COUNTRY }]
      };
    },
    mounted: function mounted() {
      var _this = this;

      this.control = new pca.Address(this.Fields, this.Options);

      this.control.listen("populate", function (address) {
        _this.$emit('input', address);
      });
    },

    computed: {
      Options: function Options() {
        return merge.recursive(this.getForm().opts.loqateOptions, this.options);
      },
      Fields: function Fields() {
        var _this2 = this;

        return this.fields.map(function (field) {
          field.element = _this2.id(field.element);
          return field;
        });
      }
    },
    methods: {
      id: function id(field) {
        return this.name + '__' + field;
      },
      getAddressComponent: function getAddressComponent(key) {
        if (this.value && this.value[key]) {
          return this.value[key].replace(/(?:\r\n|\r|\n)/g, ', ');
        };

        return '';
      }
    }
  });
};