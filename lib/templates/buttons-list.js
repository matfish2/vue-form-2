export default function(h) {
  let toggler = "";
  let items = [];

  if (this.disabled) {
    toggler = "";
  } else if (this.multiple) {
    toggler = (
      <span class="pull-right btn btn-link" on-click={this.toggle.bind(this)}>
        {this.toggleText}
      </span>
    );
  } else {
    toggler = this.value ? (
      <span class="pull-right btn btn-link" on-click={this.clear.bind(this)}>
        {this.clearText}
      </span>
    ) : (
      ""
    );
  }

  this.items.map(item => {
    if (this.passesFilter(item))
      items.push(
        <div class={this.itemClass}>
          <label class="form-check-label">
            <input
              class="form-check-input"
              disabled={this.disabled}
              name={this.Name + this.arraySymbol}
              type={this.type}
              value={item.id}
              on-change={e => {
                this.updateValue(e);
              }}
              checked={this.isChecked(item.id)}
            />
            <span class="form-check-label-text">{item.text}</span>
          </label>
        </div>
      );
  });

  var content = items.length
    ? [toggler, items]
    : [this.getForm().opts.texts.noItems];

  return <div class="VF-Buttons__wrapper">{content}</div>;
}
