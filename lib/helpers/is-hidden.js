module.exports = function() {
    var elem = this.$el;    
    return !( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length);
}