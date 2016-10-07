module.exports = function() {
  return this.opts.layout=='form-horizontal'?'col-sm-' + (12-this.opts.labelWidth):'';
}
