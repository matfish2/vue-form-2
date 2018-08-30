var merge = require('merge');
var Field = require('./field');
var clone = require('clone');
var DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';

module.exports = function () {
  return merge.recursive(Field(), {
    data: function () {
      return {
        fieldType: 'date',
        datepicker: null,
        opts: this.options
      }
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
        default: function () {
          return {}
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
    mounted: function () {

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

      var parentOptions = this.inForm() ? clone(this.getForm().opts.dateOptions) : {};

      if (this.disabled) return;

      if (this.timepicker) this.opts.timePicker = true;

      this.opts = merge.recursive(parentOptions, this.opts);

      var options = merge.recursive({
        autoUpdateInput: false,
        singleDatePicker: !this.range,
        timePicker24Hour: true,
        format: this.Format,
        startDate: moment(),
        locale: {
          cancelLabel: this.clearLabel
        }
      }, this.opts);

      this.datepicker.daterangepicker(options);

      this.datepicker.on('apply.daterangepicker', function (ev, picker) {

        var value = this.range ? {
            start: picker.startDate,
            end: picker.endDate
          } :
          picker.startDate;

        this.setValue(value);

      }.bind(this));

      this.datepicker.on('cancel.daterangepicker', function (ev, picker) {

        this.clear();
        this.datepicker.data('daterangepicker').setStartDate(moment());
        this.datepicker.data('daterangepicker').setEndDate(moment());

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
    beforeDestroy() {
      this.datepicker.data('daterangepicker').remove();
    },
    methods: {
      setNow() {
        this.setValue(moment());
      },
      injectValueToField: function (val) {
        let formatted;

        if (this.range) {

          formatted = val.start.format(this.Format) + " - " + val.end.format(this.Format);
          this.datepicker.find("input").val(formatted);
          let start = val.start.isValid() ? val.start : moment();
          let end = val.end.isValid() ? val.end : moment();

          this.setDatepickerValue({
            start,
            end
          });
        } else {
          formatted = val.format(this.Format);
          let pickerDate = val.isValid() ? val : moment();
          this.setDatepickerValue(pickerDate);
        }

        $(this.$el).find("input").val(formatted)

      },
      updateValue: function (e) {

        let value = e.target.value;

        if (!value.trim()) {
          this.saveValue('');
          return;
        }

        let val = this.momentizeValue(value);

        this.saveValue(val);

        this.injectValueToField(val);

      },
      isValidMoment: function (val) {

        if (this.range) {
          return val &&
            val.start &&
            this.isMoment(val.start) &&
            val.start.isValid() &&
            val.end &&
            this.isMoment(val.end) &&
            val.end.isValid();
        }

        return val && this.isMoment(val) && val.isValid();
      },
      isMoment: function (val) {
        return val &&
          typeof val == 'object' &&
          typeof val.isValid === 'function';
      },
      momentizeValue: function (val) {

        if (this.isValidMoment(val)) return val;

        if (!val)
          val = this.value;

        if (this.range && typeof val == 'string') {
          let pieces = val.split('-');
          val = {};
          val.start = pieces[0];
          val.end = pieces[1];
        }

        return this.range ? {
            start: moment(val.start, this.Format),
            end: moment(val.end, this.Format)
          } :
          moment(val, this.Format);

      },
      addTime(val) {

        val = val.replace("T", " ");

        if (val.split(" ").length > 1) return val;

        return val + " 00:00:00";

      },
      setValue: function (val, setDirty = true) {

        if (!val) {
          this.clear();
          return;
        }

        try {
          if (this.range) {

            if (typeof val.start == 'string') val.start = moment(this.addTime(val.start), DATE_FORMAT);
            if (typeof val.end == 'string') val.end = moment(this.addTime(val.end), DATE_FORMAT);
          } else {
            if (typeof val == 'string') val = moment(this.addTime(val), DATE_FORMAT);
          }

          if (!this.isValidMoment(val))
            throw `invalid date`;

        } catch (e) {
          let error = `vue-form-2: invalid date passed to field "${this.Name}".`;
          error += this.range ?
            `Date range must be passed as an object with 'start' and 'end' properties, each being a moment object or conforming to the ${DATE_FORMAT} format.` :
            `Date must be either a valid moment object or a string conforming to the ${DATE_FORMAT} format.`;
          console.error(error);
          return;
        }

        this.$emit('input', val);

        setTimeout(function () {
          this.setDatepickerValue(val);
          if (!this.noInput && val) {
            this.injectValueToField(val);
          }

        }.bind(this), 0);
      },
      clear() {
        this.reset(false);
      },
      reset: function (wasReset = true) {
        this.wasReset = wasReset;
        this.saveValue(null);

        this.setDatepickerValue(moment());

        if (!this.noInput) {
          $(this.$el).find("input").val("");
        }

        this.datepicker.trigger("change");
      },
      setDatepickerValue: function (value) {

        if (this.disabled) return;

        let start = this.range ? value.start : value;
        let end = this.range ? value.end : value;

        this.datepicker.data('daterangepicker').setStartDate(start);
        this.datepicker.data('daterangepicker').setEndDate(end);
      }
    },
    computed: {
      Format() {
        var pieces = this.format.split(" ");
        if (this.timepicker && pieces.length == 1)
          return this.format + ' HH:mm:ss';

        return this.format;
      },
      type: function () {
        return this.noInput ? 'span' : 'input';
      },
      isTimepicker: function () {
        return (this.opts.hasOwnProperty('timePicker') && this.opts.timePicker) || this.timepicker;
      },
      formattedDate: function () {

        var value = this.value;

        if (!value ||
          (!this.range && (!value.format || value.format() == 'Invalid date')) ||
          (this.range &&
            ((!value.start || !value.start.format) || (!value.end || !value.end.format)))) {

          return this.noInput ? this.placeholder : '';

        }

        if (!this.range) return value.format(this.Format);

        return value.start.format(this.Format) + " - " + value.end.format(this.Format);

      },
      serverFormat: function () {

        var value = this.value;

        if (!value || isDateString(value)) return '';

        if (!this.range) return value.format();

        return JSON.stringify({
          start: value.start.format(),
          end: value.end.format()
        });
      }
    }
  });

}


function isDateString(value) {
  return value && (typeof value == 'string' || (value.hasOwnProperty('start') && typeof value.start == 'string'));
}
