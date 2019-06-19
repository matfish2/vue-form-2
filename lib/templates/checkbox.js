export default function(h) {
  let hiddenInput = "";

  if (this.inForm() && this.getForm().server) {
    hiddenInput = <input name={this.Name} type="hidden" value="0" />;
  }

  return (
    <div>
      {hiddenInput}
      <input
        type="checkbox"
        name={this.Name}
        checked={this.value}
        on-change={e => this.$emit("input", e.target.checked)}
        disabled={this.disabled}
      />
    </div>
  );
}
