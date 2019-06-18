export default function(h) {
  var button = this.toggler ? (
    <button
      type="button"
      class="btn btn-default btn-xs"
      on-click={this.toggle.bind(this)}
    >
      {this.togglerText}
    </button>
  ) : (
    ""
  );

  return (
    <div class="Textarea__wrapper">
      <textarea
        name={this.Name}
        id={"textarea_" + this.Name}
        maxlength={this.maxlength}
        class="form-control"
        domPropsValue={this.value}
        onInput={e => this.$emit("input", e.target.value)}
        disabled={this.disabled}
        placeholder={this.placeholder}
      />
      {button}
    </div>
  );
}
