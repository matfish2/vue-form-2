module.exports = function(item, show, rule) {
    var unique = true;

    this.getForm().errors.forEach(function(error, i) {
      if (error.name==item.name && error.rule==rule) {
        this.getForm().errors[i].show = show;
        unique = false;
      }
    }.bind(this));

   if (unique)
     this.getForm().errors.push(item);

}
