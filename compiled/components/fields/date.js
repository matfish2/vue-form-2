'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var merge = require('merge');
var Field = require('./field');
var clone = require('clone');
var DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';

module.exports = function () {
  return merge.recursive(Field(), {
    data: function data() {
      return {
        fieldType: 'date',
        datepicker: null
      };
    },
    props: {
      placeholder: {
        type: String,
        required: false,
        default: 'Select Date'
      },
      noInput: {
        type: Boolean,
        default: false
      },
      format: {
        type: String,
        required: false,
        default: 'DD/MM/YYYY'
      },
      range: {
        type: Boolean,
        required: false,
        default: false
      },
      options: {
        type: Object,
        required: false,
        default: function _default() {
          return {};
        }
      },
      clearLabel: {
        type: String,
        required: false,
        default: 'Clear'
      },
      timepicker: {
        type: Boolean
      },
      nowButton: Boolean,
      nowText: {
        type: String,
        default: 'Now'
      }
    },
    mounted: function mounted() {

      if (typeof $ == 'undefined') {
        console.error('vue-form-2: missing global dependency: vf-date depends on JQuery');
        return;
      }

      this.datepicker = $(this.$el).find(".VF-Field--Date__datepicker");

      if (typeof this.datepicker.daterangepicker == 'undefined') {
        console.error('vue-form-2: missing global dependency: vf-date depends on daterangepicker');
        return;
      }

      var dateRule = this.range ? 'daterange' : 'date';

      this.Rules[dateRule] = true;

      var parentOptions = this.inForm() ? clone(this.getForm().options.dateOptions) : {};

      if (this.disabled) return;

      if (this.timepicker) this.options.timePicker = true;

      this.opts = merge.recursive(parentOptions, this.options);

      var options = merge.recursive(this.opts, {
        autoUpdateInput: false,
        singleDatePicker: !this.range,
        format: this.Format,
        startDate: moment(),
        locale: {
          cancelLabel: this.clearLabel
        }
      });

      this.datepicker.daterangepicker(options);

      this.datepicker.on('apply.daterangepicker', function (ev, picker) {

        var value = this.range ? { start: picker.startDate, end: picker.endDate } : picker.startDate;

        this.setValue(value);

        if (!this.noInput) {
          this.injectValueToField(this.getValue());
        }
      }.bind(this));

      this.datepicker.on('cancel.daterangepicker', function (ev, picker) {

        this.reset();
        this.dirty = true;
        this.datepicker.data('daterangepicker').setStartDate(moment());
        this.datepicker.data('daterangepicker').setEndDate(moment());

        if (!this.noInput) $(this.$el).find("input").val("");
      }.bind(this));

      if (!this.range && !this.isTimepicker) {

        this.datepicker.on('show.daterangepicker', function (ev, picker) {
          var el = $(picker.container[0]);

          el.find(".ranges").eq(0).show().css("display", "block !important");
          el.find(".daterangepicker_start_input").hide();
          el.find(".daterangepicker_end_input").hide();

          el.find(".applyBtn").hide();
        }.bind(this));
      }
    },
    methods: {
      setNow: function setNow() {
        this.setValue(moment());
      },

      injectValueToField: function injectValueToField(val) {
        if (this.range) {

          var formatted = val.start.format(this.Format) + " - " + val.end.format(this.Format);
          this.datepicker.find("input").val(formatted);
          var start = val.start.isValid() ? val.start : moment();
          var end = val.end.isValid() ? val.end : moment();

          this.setDatepickerValue({ start: start, end: end });
        } else {
          var _formatted = val.format(this.Format);
          $(this.$el).find("input").val(_formatted);
          var pickerDate = val.isValid() ? val : moment();
          this.setDatepickerValue(pickerDate);
        }
      },
      updateValue: function updateValue(e) {
        var value = e.target.value;

        if (!value.trim()) {
          this.saveValue('');
          return;
        }

        var val = this.momentizeValue(value);

        this.saveValue(val);

        this.injectValueToField(val);
      },
      isValidMoment: function isValidMoment(val) {

        if (this.range) {
          return val && val.start && this.isMoment(val.start) && val.start.isValid() && val.end && this.isMoment(val.end) && val.end.isValid();
        }

        return val && this.isMoment(val) && val.isValid();
      },
      isMoment: function isMoment(val) {
        return val && (typeof val === 'undefined' ? 'undefined' : _typeof(val)) == 'object' && typeof val.isValid === 'function';
      },
      momentizeValue: function momentizeValue(val) {

        if (this.isValidMoment(val)) return val;

        if (!val) val = this.getValue();

        if (this.range && typeof val == 'string') {
          var pieces = val.split('-');
          val = {};
          val.start = pieces[0];
          val.end = pieces[1];
        }

        return this.range ? { start: moment(val.start, this.Format),
          end: moment(val.end, this.Format) } : moment(val, this.Format);
      },
      addTime: function addTime(val) {

        val = val.replace("T", " ");

        if (val.split(" ").length > 1) return val;

        return val + " 00:00:00";
      },

      setValue: function setValue(val) {
        var setDirty = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;


        try {
          if (this.range) {

            if (typeof val.start == 'string') val.start = moment(this.addTime(val.start), DATE_FORMAT);
            if (typeof val.end == 'string') val.end = moment(this.addTime(val.end), DATE_FORMAT);
          } else {
            if (typeof val == 'string') val = moment(this.addTime(val), DATE_FORMAT);
          }

          if (!this.isValidMoment(val)) throw 'invalid date';
        } catch (e) {
          var error = 'vue-form-2: invalid date passed to field "' + this.name + '".';
          error += this.range ? 'Date range must be passed as an object with \'start\' and \'end\' properties, each being a moment object or conforming to the ' + DATE_FORMAT + ' format.' : 'Date must be either a valid moment object or a string conforming to the ' + DATE_FORMAT + ' format.';
          console.error(error);
          return;
        }

        this.saveValue(val);

        setTimeout(function () {
          this.setDatepickerValue(this.getValue());
        }.bind(this), 0);
        if (setDirty) this.dirty = true;
      },
      reset: function reset() {
        this.wasReset = true;
        this.saveValue(null);

        this.setDatepickerValue(moment());
        this.datepicker.trigger("change");
      },
      setDatepickerValue: function setDatepickerValue(value) {

        if (this.disabled) return;

        var start = this.range ? value.start : value;
        var end = this.range ? value.end : value;

        this.datepicker.data('daterangepicker').setStartDate(start);
        this.datepicker.data('daterangepicker').setEndDate(end);
      }
    },
    computed: {
      Format: function Format() {
        var pieces = this.format.split(" ");
        if (this.timepicker && pieces.length == 1) return this.format + ' HH:mm:ss';

        return this.format;
      },

      type: function type() {
        return this.noInput ? 'span' : 'input';
      },
      isTimepicker: function isTimepicker() {
        return this.options.hasOwnProperty('timePicker') && this.options.timePicker || this.timepicker;
      },
      formattedDate: function formattedDate() {

        var value = this.getValue();

        if (!value || !this.range && (!value.format || value.format() == 'Invalid date') || this.range && (!value.start || !value.start.format || !value.end || !value.end.format)) {

          return this.noInput ? this.placeholder : '';
        }

        if (!this.range) return value.format(this.Format);

        return value.start.format(this.Format) + " - " + value.end.format(this.Format);
      },
      serverFormat: function serverFormat() {

        var value = this.getValue();

        if (!value || isDateString(value)) return '';

        if (!this.range) return value.format();

        return JSON.stringify({
          start: value.start.format(),
          end: value.end.format()
        });
      }
    }
  });
};

function isDateString(value) {
  return value && (typeof value == 'string' || value.hasOwnProperty('start') && typeof value.start == 'string');
}