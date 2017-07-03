var merge = require('merge');
var Input = require('./input');

module.exports = function() {
	return merge.recursive(Input(), {
		data:function() {
			return {
				fieldType:'color'
			}
		},
		mounted() {
			if (!browserSupportsColorpicker()) {
				var that = this;
				$(this.$el).find("input[type=color]").spectrum({
					color: that.value?that.value:"#000000",
					change: function(color) {
						that.setValue(color.toHexString());					
					}
				});		
			}

		}
	});

}

function browserSupportsColorpicker() {
	var colorInput;
	colorInput = $('<input type="color" value="!" />')[0];
	return colorInput.type === 'color' && colorInput.value !== '!';
}
