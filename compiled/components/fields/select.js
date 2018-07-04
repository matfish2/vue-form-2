'use strict';

var merge = require('merge');
var clone = require('clone');
var Field = require('./field');
var fuzzyOptions = require('./fuzzy-search/options');

module.exports = function () {
  return merge.recursive(Field(), {
    props: {
      default: {},
      items: {
        type: Array,
        required: false,
        default: function _default() {
          return [];
        }
      },
      multiple: {
        type: Boolean,
        required: false,
        default: false
      },
      select2: Boolean,
      fuzzy: Boolean,
      options: {
        type: Object,
        default: function _default() {
          return {};
        }
      },
      containerClass: {
        required: false
      },
      placeholder: {
        type: String,
        required: false,
        default: 'Select Option'
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
        default: ''
      },
      callback: {
        type: Function,
        required: false
      },
      html: {
        type: Boolean
      },
      listId: {}
    },
    mounted: function mounted() {
      var _this = this;

      var value;

      if (!this.disabled && !this.value && this.default) {
        this.setValue(this.default);
      } else if (this.noDefault && !this.value) {
        this.setValue(this.filteredItems[0].id);
      }

      this.$watch('select2', function (val) {
        if (val) {
          _this.initSelect2();
        } else {
          _this.el.select2("destroy");
          _this.rerender();
        }
      });

      if (this.filterBy) {

        this.$watch('filterValue', function (val) {
          if (val) {

            if (this.select2 && !this.ajaxUrl) {
              this.el.select2(options);
            }

            this.reset();
          }
        }.bind(this));
      }

      if (this.select2 || this.ajaxUrl) {
        this.initSelect2();
      }
    },
    computed: {
      allItems: function allItems() {
        return this.items.concat(this.newItems);
      },
      filteredItems: function filteredItems() {
        var _this2 = this;

        if (!this.filterValue) return this.allItems;

        return this.allItems.filter(function (item) {
          return !item[_this2.filterBy] || item[_this2.filterBy] == _this2.filterValue;
        });
      },
      flatItems: function flatItems() {
        if (!this.items.length || !this.items[0].children) {
          return this.allItems;
        }

        var res = [];

        this.allItems.forEach(function (item) {
          return res = res.concat(item.children);
        });

        return res;
      },

      arraySymbol: require('../computed/array-symbol'),
      filterValue: function filterValue() {

        if (!this.filterBy) return '';

        return this.getField(this.filterBy).getValue();
      }
    },
    data: function data() {
      return {
        fieldType: 'select',
        tagName: 'select',
        newItems: [],
        render: true
      };
    },
    methods: {
      addItem: function addItem(item) {
        if (this.allItems.find(function (i) {
          return i.id === item.id;
        })) return;

        this.newItems.push(item);
      },
      initSelect2: function initSelect2() {
        if (typeof $ == 'undefined') {
          console.error('vue-form-2: missing global dependency: vf-select with select2 depends on JQuery');
          return;
        }

        if (typeof $(this.$el).select2 == 'undefined') {
          console.error('vue-form-2: missing global dependency: vf-select with select2 depends on Select2');
          return;
        }

        var options = this.inForm() ? clone(this.getForm().opts.select2Options) : {};
        var self = this;

        options = merge.recursive(options, {
          placeholder: this.placeholder
        });

        if (!this.html && !this.filterBy) options.data = this.items;

        if (this.ajaxUrl) {
          options = merge.recursive(options, {
            ajax: {
              url: this.ajaxUrl,
              dataType: 'json',
              delay: 250,
              data: function data(params) {
                var query = {
                  q: params.term,
                  selected: self.getValue()
                };

                if (this.filterBy) {
                  var filterValue = self.getForm().getField(this.filterBy).getValue();

                  if (filterValue) query[this.filterBy] = filterValue;
                }

                return query;
              },
              processResults: function processResults(data) {

                return {
                  results: this.callback ? $.map(data, this.callback) : data
                };
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

        this.el.select2(options).on("select2:select", function (e) {

          if (self.ajaxUrl && self.inForm()) {

            var data = e.params.data;

            var item = { id: data.id, text: data.text };
            self.addItem(item);

            self.getForm().dispatch('new-ajax-item', {
              name: self.name,
              listId: self.listId,
              item: item
            });

            self.removeDuplicateValues();
          }

          var val = $(this).val();

          if (self.multiple && $.isArray(val)) {
            val = $.unique(val);
          }

          self.saveValue(val);
        }).on("select2:unselecting", function (e) {
          if (self.multiple) {
            var $this = $(this);
            setTimeout(function () {
              var value = $this.val();
              self.saveValue(value ? value : []);
            }, 0);
          } else {
            self.saveValue('');
          }

          if (self.ajaxUrl) {
            self.removeDuplicateValues();
          }
        });

        this.el.val(this.value).trigger("change");

        // setTimeout(function() {
        //   this.el.trigger('change');
        // }.bind(this),0);

        if (this.containerClass) {
          this.el.data('select2').$container.addClass("container-" + this.containerClass);
          this.el.data('select2').$dropdown.addClass("dropdown-" + this.containerClass);
        }
      },
      removeDuplicateValues: function removeDuplicateValues() {
        var _this3 = this;

        // fix select2 duplicate values bug when performing an ajax request 
        // https://github.com/select2/select2/issues/4298

        var title;

        this.$nextTick(function () {
          $(_this3.$el).find(".select2-selection__rendered li").each(function () {
            title = $(this).prop('title');
            $(this).siblings('[title=\'' + title + '\']').remove();
          });
        });
      },
      rerender: function rerender() {
        var _this4 = this;

        this.render = false;
        setTimeout(function () {
          _this4.render = true;
        });
      },

      fuzzySearch: require('./fuzzy-search/fuzzy-search'),
      setValue: function setValue(value) {
        var setDirty = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

        if (this.multiple && !value) value = [];

        this.saveValue(value);
        if (setDirty) this.dirty = true;

        if (!this.select2) document.getElementsByName(this.Name)[0].value = value;

        if (this.select2 && this.el) this.el.val(value).trigger("change");
      },
      reset: function reset() {
        var value = this.multiple ? [] : '';

        if (this.noDefault && this.filteredItems.length) {
          value = this.filteredItems[0].id;
        }

        this.wasReset = true;
        this.saveValue(value);

        if (!this.select2) document.getElementsByName(this.Name)[0].value = value;

        if (this.select2 && this.el) this.el.val(value).trigger("change");
      }
    },
    beforeDestroy: function beforeDestroy() {
      if (this.select2) {
        this.el.select2("destroy");
      }
    }
  });
};