module.exports = function(hasLabel) {
  
  let width = hasLabel?12-this.opts.labelWidth:12;

  return this.opts.layout=='form-horizontal'?`col-sm-${width}`:'';
}
