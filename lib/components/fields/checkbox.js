var merge = require('merge');
var Field = require('./field');

module.exports = function() {
  return merge.recursive(Field(), {
    methods: {
   
    },
    data: function() {
      return {
        fieldType:'checkbox',
      }
    }
  });
}

