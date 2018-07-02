var merge = require('merge');
var Field = require('./field');

module.exports = function() {
 return merge.recursive(Field(), {
  render(h) {
    return <input type="hidden" name={this.Name} value={this.value} />
  }
});

}



