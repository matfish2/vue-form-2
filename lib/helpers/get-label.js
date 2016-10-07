module.exports = function(name, label) {
  if (label) return label;

  return name.split("_").join(" ").ucfirst();
}
