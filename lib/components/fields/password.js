var merge = require('merge');
var Input = require('./input');

module.exports = function() {
 return merge.recursive(Input(), {
  data:function() {
    return {
      fieldType:'password'
    }
  }
});

}
