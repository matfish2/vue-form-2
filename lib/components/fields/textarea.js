var merge = require('merge');
var clone = require('clone');
var Field = require('./field');

import updateValue from '../methods/update-value'

module.exports = function() {
  return merge.recursive(Field(), {
  props: {
    placeholder: {
      type:String,
      required:false,
      default:''
    },
    disabled: {
      type: Boolean
    },
    tinymce:{
      type: Boolean,
    },
    options: {
      type:Object,
      default: function() {
        return {}
      }
    },
    debounce:{
      type:Number,
      default:300
    }
  },
  data: function() {
    return {
      editor: null,
      fieldType:'textarea',
      tagName:'textarea'
    }
  },
  methods:{
    updateValue
  },
  mounted: function() {

    if (!this.tinymce) return;

    if (typeof tinymce=='undefined') {
      console.error('vue-form-2: missing global dependency. TinyMCE is required on a vf-textarea with a tinymce prop')
      return
    }

    var that = this;

    var setup = that.options && that.options.hasOwnProperty('setup')?
                that.options.setup:
                function() {};

    var parentSetup = that.getForm().opts.tinymceOptions.hasOwnProperty('setup')?
    that.getForm().opts.tinymceOptions.setup:
    function(){};

    var options = merge.recursive(clone(this.getForm().opts.tinymceOptions), this.options);

    options = merge.recursive(options, {
      selector:'textarea[name=' + this.name +']',
      setup : function(ed) {

      that.editor = ed;
      parentSetup(ed);
      setup(ed);

        ed.on('change',function(e) {
          that.curValue = ed.getContent();
        }.bind(this));

      }
    });

    tinymce.init(options);
    this.$watch('curValue', function(val) {
      if(val != tinymce.get("textarea_" + this.name).getContent()) {
      tinymce.get("textarea_" + this.name).setContent(val);
    }
    });

  }
});
}
