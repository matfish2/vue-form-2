export default function(h) {
  return (
    <date-picker
      value={this.value}
      on-input={value => this.$emit("input", value)}
      config={this.options}
    />
  );
}
