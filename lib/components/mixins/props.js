module.exports = {
  props: {
    name: {
      type:String,
      required:true
    },
    value: {
      required:false,
      default:''
    },
    label:{
      type:String,
      required:false
    },
    hideLabel: {
      type:Boolean
    },
    disabled: {
      type:Boolean
    },
    required: {
      type: Boolean
    },
    rules: {
      type: Object,
      required: false,
      default: function() {
        return {
        }
      }
    }
  }
}
