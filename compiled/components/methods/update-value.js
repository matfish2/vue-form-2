'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (e) {
  var _this = this;

  if (this.lazy && e.type == 'keyup') return;
  if (!this.lazy && e.type == 'change') return;

  if (this.lazy && e.type == 'change') {
    this.curValue = e.target.value;
    this.validateRemote();
  }

  if (!this.lazy && e.type == 'keyup') {

    this.lastKeyStroke = Date.now();

    setTimeout(function () {
      var elapsed = Date.now() - _this.lastKeyStroke;

      if (elapsed >= _this.debounce) {
        _this.curValue = e.target.value;
        _this.validateRemote();
      }
    }, this.debounce);
  }
};