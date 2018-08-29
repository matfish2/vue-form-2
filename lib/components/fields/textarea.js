var merge = require('merge');
var clone = require('clone');
var Field = require('./field');

import updateValue from '../methods/update-value'

module.exports = function () {
  return merge.recursive(Field(), {
    props: {
      placeholder: {
        type: String,
        required: false,
        default: ''
      },
      // maxlength:{
      //   type:Number,
      //   default:500
      // },
      disabled: {
        type: Boolean
      },
      tinymce: {
        type: Boolean,
      },
      options: {
        type: Object,
        default: function () {
          return {}
        }
      },
      lazy: Boolean,
      debounce: {
        type: Number,
        default: 300
      },
      toggler: {
        type: Boolean
      }
    },
    data: function () {
      return {
        editor: null,
        fieldType: 'textarea',
        tagName: 'textarea',
        expanded: false
      }
    },
    methods: {
      updateValue,
      toggle: function () {
        this.expanded = !this.expanded;
        var textarea = $(this.$el).find("textarea");
        var height = this.expanded ? textarea.get(0).scrollHeight : "auto";
        textarea.height(height);
        this.getForm().dispatch('textarea-was-toggled', {
          expanded: this.expanded
        });
      }
    },
    computed: {
      togglerButton() {
        var form = this.getForm();
        return {
          expand: form.opts.texts.expand,
          minimize: form.opts.texts.minimize
        }
      },
      togglerText: function () {
        return this.expanded ? this.togglerButton.minimize : this.togglerButton.expand;
      }
    },
    mounted: function () {

      if (!this.tinymce) return;

      if (typeof tinymce == 'undefined') {
        console.error('vue-form-2: missing global dependency. TinyMCE is required on a vf-textarea with a tinymce prop')
        return
      }

      var that = this;

      var setup = that.options && that.options.hasOwnProperty('setup') ?
        that.options.setup :
        function () {};

      var parentSetup = that.getForm().opts.tinymceOptions.hasOwnProperty('setup') ?
        that.getForm().opts.tinymceOptions.setup :
        function () {};

      var options = merge.recursive(clone(this.getForm().opts.tinymceOptions), this.options);

      options = merge.recursive(options, {
        selector: 'textarea[name=' + this.name + ']',
        setup: function (ed) {

          ed.on("init", function (ed) {
            tinymce.get("textarea_" + that.name).setContent(that.value);
          });

          that.editor = ed;
          parentSetup(ed);
          setup(ed);

          ed.on('change', function (e) {
            that.saveValue(ed.getContent());
          }.bind(this));

        }
      });

      tinymce.init(options);
      this.$watch('value', function (val) {
        if (val != tinymce.get("textarea_" + this.name).getContent()) {
          tinymce.get("textarea_" + this.name).setContent(val);
        }
      });

    },
    destroyed: function destroyed() {
      if (this.tinymce)
        tinymce.get("textarea_" + this.name).remove();
    }
  });
}
