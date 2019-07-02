export default function(h) {
  var addon = this.addon ? (
    <span class="input-group-addon">
      <i class={`fa fa-${this.addon} fa-lg`} />
    </span>
  ) : (
    ""
  );

  var afterAddon = this.afterAddon ? (
    <span class="input-group-addon">{this.afterAddon}</span>
  ) : (
    ""
  );

  return (
    <div class="input-group">
      {addon}
      <input
        type={this.fieldType}
        name={this.Name}
        domPropsValue={this.value}
        onInput={e => this.$emit("input", e.target.value)}
        class="form-control"
        placeholder={this.placeholder}
        disabled={this.disabled}
        minlength={this.minlength}
        maxlength={this.maxlength}
        autocomplete={this.autocomplete}
      />
      {afterAddon}
    </div>
  );
}
