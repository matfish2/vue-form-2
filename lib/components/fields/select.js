var merge = require('merge');
var clone = require('clone');
var Field = require('./field');
var fuzzyOptions = require('./fuzzy-search/options');

module.exports = function() {
  return merge.recursive(Field(),{
    props: {
      items: {
        type:Array,
        required:false,
        default:function() {
          return [];
        }
      },
      multiple:{
        type: Boolean,
        required:false,
        default:false
      },
      select2: Boolean,
      fuzzy: Boolean,
      options: {
        type:Object,
        default: function() {
          return {}
        }
      },
      containerClass: {
        required:false
      },
      placeholder: {
        type:String,
        required:false,
        default:'Select Option'
      },
      noDefault: {
        type: Boolean
      },
      filterBy: {
        type: String,
        default: ''
      },
      ajaxUrl: {
        type: String,
        default:''
      },
      callback: {
        type: Function,
        required: false
      },
      html: {
        type:Boolean
      },
      listId:{}
    },
    mounted: function() {

      var that = this;
      var value;
      var callback = this.callback;
      var filterBy = this.filterBy;

      if (this.filterBy) {

        this.$watch('filterValue', function(val) {
          if (val) {
           if (this.select2 && !this.ajaxUrl)
            this.el.select2(options);
           this.reset();
         }
       }.bind(this));
      }

      if (this.select2 || this.ajaxUrl) {

        if (typeof $=='undefined') {
         console.error('vue-form-2: missing global dependency: vf-select with select2 depends on JQuery');
         return;
       }

       if (typeof $(this.$el).select2=='undefined') {
         console.error('vue-form-2: missing global dependency: vf-select with select2 depends on Select2');
         return;
       }


        var options = this.inForm()?clone(this.getForm().opts.select2Options):{};
        var self = this;

        options = merge.recursive(options, {
          placeholder:this.placeholder
        });

        if (!this.html && !this.filterBy)
          options.data = this.items;

        if (this.ajaxUrl) {
          options = merge.recursive(options, {
            ajax: {
              url: this.ajaxUrl,
              dataType: 'json',
              delay: 250,
              data: function (params) {
                var query = {
                  q: params.term,
                  selected: that.getValue()
                };

                if (filterBy) {
                 var filterValue = self.getForm().getField(filterBy).getValue();

                  if (filterValue)
                    query[filterBy] = filterValue;
                }

                return query;
              },
              processResults: function (data) {

                return {
                  results: callback?$.map(data, callback):data
                }
              },
              cache: true
            },
            minimumInputLength: 3
          });

        }

        if (this.fuzzy) {
            options = merge.recursive(options, fuzzyOptions(this.fuzzySearch));
        }

        options = merge.recursive(options, this.options);

        this.el = $(this.$el).find("select");

        this.el.select2(options)
        .on("select2:select",function(e){

          if (that.ajaxUrl && that.inForm()) {
            that.getForm().dispatch('new-ajax-item',{
            name:this.name,
            listId:this.listId,
            item:{
              id:data.id, 
              text:data.text
            } 
              });
          }

          that.saveValue($(this).val());
        }).on("select2:unselecting", function(e) {
         if (that.multiple) {
          var $this = $(this);
          setTimeout(function() {
            value = $this.val();
            that.saveValue(value?value:[]);
          }, 0);
        } else {
          that.saveValue('');
        }
      });

       if (this.value){
        this.el.val(this.value).trigger("change");
       }


        setTimeout(function() {
          this.el.trigger('change');
        }.bind(this),0);

        if (this.containerClass) {
          this.el.data('select2').$container.addClass("container-" + this.containerClass);
          this.el.data('select2').$dropdown.addClass("dropdown-" + this.containerClass);
        }

      }

    },
    computed: {
      arraySymbol: require('../computed/array-symbol'),
      filterValue: function() {

        if (!this.filterBy) return '';

        return this.getField(this.filterBy).getValue();
      }
    },
    data: function(){
      return {
        fieldType:'select',
        tagName:'select'
      }
    },
    methods: {
      fuzzySearch: require('./fuzzy-search/fuzzy-search'),
      setValue: function(value, setDirty = true) {
        if (this.multiple && !value) value = [];

        this.saveValue(value);
        if (setDirty) this.dirty = true;

        if (!this.select2)
        document.getElementsByName(this.name)[0].value = value;

        if (this.select2 && this.el)
          this.el.val(value).trigger("change");
      },
      reset: function() {
        var value = this.multiple?[]:'';
        this.wasReset = true;
        this.saveValue(value);

        if (!this.select2)
        document.getElementsByName(this.name)[0].value = value;
      
        if (this.select2 && this.el)
          this.el.val(value).trigger("change");

      }
    }
  });
}

