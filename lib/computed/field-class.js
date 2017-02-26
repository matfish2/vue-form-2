module.exports = function() {
  
  let width = this.hideLabel?12:12-this.opts.labelWidth;

  return this.opts.layout=='form-horizontal'?`col-sm-${width}`:'';
}
