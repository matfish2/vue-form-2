var merge = require('merge');
var Field = require('./field');

module.exports = function () {
  return merge.recursive(Field(), {
    props:{
      format:{
        type: String,
        default: 'DD-MM-YYYY'
      }
    },
    data: function () {
      return {
        fieldType: 'pikaday',
      }
    },
    mounted() {
      var self = this;
      this.picker = new Pikaday({ 
        field: this.$el,
        onSelect(e) {
          self.$emit('input', e);
        }
       });
    },
    methods:{
      formattedValue() {
        if (!this.picker || !this.value) return '';

        this.picker.setDate(this.value, true);

        return this.picker.toString(this.format);
      }
    }
  });
}
