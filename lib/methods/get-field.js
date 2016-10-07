module.exports = function(name) {

  if (this.$root.$refs.hasOwnProperty(name))
    return this.$root.$refs[name];

  return getField(this, name);

}


function getField(parent, name){

     if(parent.name == name){
          return parent;
     } else if (parent.$children && parent.$children.length){
          var i;
          var result = null;
          for(i=0; result == null && i < parent.$children.length; i++){
               result = getField(parent.$children[i], name);
          }

          return result;
     }

     return null;
}
