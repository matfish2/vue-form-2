var merge = require('merge');
var Field = require('./field');
var clone = require('clone');
var convertDateRulesToMoment = require('../../helpers/convert-date-rules-to-moment');
var DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';

module.exports = function() {
  return merge.recursive(Field(), {
    data: function() {
      return {
        fieldType:'date',
        datepicker:null
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
        default:false
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
        default: function() {
          return {}
        }
      },
      clearLabel:{
        type: String,
        required: false,
        default:'Clear'
      },
      timepicker:{
        type:Boolean
      }
    },
    created: function() {

      this.rules = convertDateRulesToMoment(this.rules);

      this.$watch('rules',function() {
        this.rules = convertDateRulesToMoment(this.rules);
      }, {deep:true});

    },
    mounted: function() {

      if (typeof $=='undefined') {
       console.error('vue-form-2: missing global dependency: vf-date depends on JQuery');
       return;
     }

     this.datepicker = $(this.$el).find(".VF-Field--Date__datepicker");

     if (typeof this.datepicker.daterangepicker=='undefined') {
      console.error('vue-form-2: missing global dependency: vf-date depends on daterangepicker');
      return;
    }

    var dateRule = this.range?'daterange':'date';

    this.Rules[dateRule] =  true;

    var parentOptions = this.inForm()?clone(this.getForm().options.dateOptions):{};

    if (this.disabled) return;

    if (this.timepicker) this.options.timePicker = true;
    
    this.opts = merge.recursive(parentOptions, this.options);

    var options = merge.recursive(this.opts, {
      singleDatePicker: !this.range,
      format: this.format,
      locale: {
        cancelLabel: this.clearLabel
      }
    });

    if (this.value) {
      options = merge.recursive(options,{
        startDate: this.range?this.value.start:this.value,
        endDate: this.range?this.value.end:this.value
      });
    }

    this.datepicker.daterangepicker(options);

    this.datepicker.on('apply.daterangepicker', function(ev, picker) {

      this.curValue = this.range?
      {start:picker.startDate, end:picker.endDate}:
      picker.startDate;

      if (!this.noInput) {
        this.injectValueToField(this.curValue);
      }

    }.bind(this));

    this.datepicker.on('cancel.daterangepicker', function(ev, picker) {

      this.curValue = null;
      this.datepicker.data('daterangepicker').setStartDate(moment().format(this.format));
      this.datepicker.data('daterangepicker').setEndDate(moment().format(this.format));
      this.datepicker.trigger("change");
    }.bind(this));


    if (!this.range && !this.isTimepicker) {

      this.datepicker.on('show.daterangepicker', function(ev, picker) {
       var el = $(picker.container[0]);

       el.find(".ranges").eq(0).show().css("display","block !important");
       el.find(".daterangepicker_start_input").hide();
       el.find(".daterangepicker_end_input").hide();

       el.find(".applyBtn").hide();

     }.bind(this));

    }

  },
  methods: {
    injectValueToField: function(val) {
      if (this.range) {

        let formatted = val.start.format(this.format) + " - " + val.end.format(this.format);
          this.datepicker.find("input").val(formatted);
          let start = val.start.isValid()?val.start:moment();
          let end = val.end.isValid()?val.end:moment();

          this.setDatepickerValue({start, end});
      } else {
        let formatted = val.format(this.format);
        this.datepicker.find("input").val(formatted)
        let pickerDate = val.isValid()?val:moment();
        this.setDatepickerValue(pickerDate);
      }

    },
    updateValue: function(e) {
      let value = e.target.value;

      if (!value.trim()) {
        this.curValue = '';
        return;
      }

      let val = this.momentizeValue(value);

      this.curValue = val;

      this.injectValueToField(val);

    },
    isValidMoment: function(val) {

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
    isMoment: function(val) {
            return val &&
                  typeof val=='object' &&
                  val.hasOwnProperty('_isAMomentObject');
    },
    momentizeValue: function(val) {

      if (this.isValidMoment(val)) return val;

      if (!val)
        val = this.curValue;

      if (this.range && typeof val=='string') {
         let pieces = val.split('-');
         val = {};
         val.start = pieces[0];
         val.end = pieces[1];
      }

      return this.range?
      {start:moment(val.start, this.format),
        end:moment(val.end, this.format)}:
        moment(val, this.format);

      },
      setValue: function(val) {

        try {
          if (this.range) {

            if (typeof val.start=='string') val.start = moment(val.start, DATE_FORMAT);
            if (typeof val.end=='string') val.end = moment(val.end, DATE_FORMAT);
          } else {
             if (typeof val=='string') val = moment(val, DATE_FORMAT);
          }

          if (!this.isValidMoment(val))
             throw `invalid date`;

        } catch (e) {
          let error =  `vue-form-2: invalid date passed to field "${this.name}".`;
          error+= this.range?
          `Date range must be passed as an object with 'start' and 'end' properties, each being a moment object or conforming to the ${DATE_FORMAT} format.`:
          `Date must be either a valid moment object or a string conforming to the ${DATE_FORMAT} format.`;
          console.error(error);
          return;
        }

        this.curValue = val;

        setTimeout(function() {
          this.setDatepickerValue(this.curValue);
        }.bind(this),0);
        this.dirty = true;
      },
      reset: function() {
        this.wasReset = true;
        this.curValue = null;

        this.setDatepickerValue(moment());
        this.datepicker.trigger("change");
      },
      setDatepickerValue: function(value) {

        let start = this.range?value.start:value;
        let end = this.range?value.end:value;

        this.datepicker.data('daterangepicker').setStartDate(start);
        this.datepicker.data('daterangepicker').setEndDate(end);
      }
    },
    computed: {
      type: function() {
        return this.noInput?'span':'input';
      },
      isTimepicker: function() {
        return this.options.hasOwnProperty('timePicker') && this.options.timePicker;
      },
      formattedDate :function() {

          if (!this.curValue ||
            (!this.range && (!this.curValue.format || this.curValue.format()=='Invalid date')) ||
            (this.range &&
             ((!this.curValue.start || !this.curValue.start.format) || (!this.curValue.end || !this.curValue.end.format)))) {

            return this.noInput?this.placeholder:'';

        }

        if (!this.range) return this.curValue.format(this.format);

        return this.curValue.start.format(this.format) + " - " + this.curValue.end.format(this.format);

    },
    serverFormat: function() {

      if (!this.curValue || isDateString(this.curValue)) return '';

      if (!this.range) return this.curValue.format();

      return JSON.stringify({
        start:this.curValue.start.format(),
        end:this.curValue.end.format()
      });
    }
  }
});

}


function isDateString(value) {
  return value && (typeof value=='string' || (value.hasOwnProperty('start') && typeof value.start=='string'));
}
