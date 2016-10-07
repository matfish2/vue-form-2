module.exports = function(item) {

   var index;

    this.getForm().errors.forEach(function(error, i) {
      if (error.name==item.name && error.rule==item.rule) {
       index = i;
      }
    });

    if (index>=0) this.getForm().errors.splice(index,1);


}
