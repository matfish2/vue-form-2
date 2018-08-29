var merge = require('merge');
var Field = require('./field');

module.exports = function () {
  return merge.recursive(Field(), {
    props: {
      options: {
        type: Object,
        default: () => {
          return {

          }
        }
      }
    },
    data() {
      return {
        fieldType: 'addressfinder',
        componentForm: {
          street_number: "short_name",
          route: "long_name",
          locality: "long_name",
          administrative_area_level_1: "short_name",
          country: "long_name",
          postal_code: "short_name"
        }
      };
    },
    mounted() {
      // Create the autocomplete object, restricting the search to geographical
      // location types.
      this.autocomplete = new google.maps.places.Autocomplete(
        /** @type {!HTMLInputElement} */
        ($(this.$el).find("input")[0]), merge(
          this.getForm().opts.addressFinderOptions,
          this.options, {
            types: ["geocode"]
          })
      );

      // When the user selects an address from the dropdown, populate the address
      // fields in the form.
      this.autocomplete.addListener(
        "place_changed",
        this.fillInAddress.bind(this)
      );
    },
    methods: {
      fillInAddress() {
        // Get the place details from the autocomplete object.
        var address = {};

        var place = this.autocomplete.getPlace();

        // for (var component in componentForm) {
        //   document.getElementById(component).value = "";
        //   document.getElementById(component).disabled = false;
        // }

        // Get each component of the address from the place details
        // and fill the corresponding field on the form.
        for (var i = 0; i < place.address_components.length; i++) {
          var addressType = place.address_components[i].types[0];
          if (this.componentForm[addressType]) {
            var val =
              place.address_components[i][this.componentForm[addressType]];

            address[addressType] = val;
          }
        }

        this.$emit('input',address);
      },
      // Bias the autocomplete object to the user's geographical location,
      // as supplied by the browser's 'navigator.geolocation' object.
      geolocate() {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function (position) {
            var geolocation = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            var circle = new google.maps.Circle({
              center: geolocation,
              radius: position.coords.accuracy
            });

            this.autocomplete.setBounds(circle.getBounds());
          });
        }
      }
    }
  });
}
