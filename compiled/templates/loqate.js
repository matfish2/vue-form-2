"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (h) {
  return h(
    "div",
    { "class": "loqate-address-finder" },
    [h("input", {
      attrs: { type: "text", id: this.id("search"), placeholder: "Type an address..." },
      "class": "form-control search-field", domProps: {
        "value": this.getAddressComponent('Label')
      }
    }), h("hr"), h("input", {
      attrs: { type: "text", id: this.id("city"), placeholder: "City" },
      domProps: {
        "value": this.getAddressComponent('City')
      }
    }), h("input", {
      attrs: { type: "text", id: this.id("postcode"), placeholder: "Postcode" },
      domProps: {
        "value": this.getAddressComponent('PostalCode')
      }
    }), h("input", {
      attrs: { type: "text", id: this.id("state"), placeholder: "State" },
      domProps: {
        "value": this.getAddressComponent('ProvinceCode')
      }
    }), h("input", {
      attrs: { type: "text", id: this.id("country"), placeholder: "Country" },
      domProps: {
        "value": this.getAddressComponent('CountryName')
      }
    })]
  );
};