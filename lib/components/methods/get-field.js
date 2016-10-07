module.exports = function(name) {
    if (this.$root.$refs.hasOwnProperty(name))
      return this.$root.$refs[name];

    return this.getForm().getField(name);

}
