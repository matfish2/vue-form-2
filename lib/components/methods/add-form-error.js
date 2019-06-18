module.exports = function(item, show, rule) {
  var unique = true;

  this.getForm().vferrors.forEach(
    function(error, i) {
      if (error.name == item.name && error.rule == rule) {
        this.getForm().vferrors[i].show = show;
        unique = false;
      }
    }.bind(this)
  );

  if (unique) this.getForm().vferrors.push(item);
};
