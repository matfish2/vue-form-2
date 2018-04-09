var clone = require('clone');

module.exports = {
  data: function() {
  return {
    isField:true,
    randomId:Math.floor(Math.random() * 100000),
    curValue:'',
    tagName:'input',
    messages:{},
    isRequired:false,
    shouldShow:true,
    dirty:false,
    pristine:true,
    wasReset:false,
    initialValue:clone(this.value),
    hadErrors:false,
    errors:[],
    relatedFields:[],
    triggeredFields:[],
    Rules:{}
  }
 }
}
