module.exports = function() {
    var elem = that.$el;    
    return !( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length);
}