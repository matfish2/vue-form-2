export default function(h) {
  let placeholder = "";
  let items = [];

  if (!this.noDefault && !this.multiple) {
    placeholder = <option value="">{this.placeholder}</option>;
  }

  if (!this.select2 || this.ajaxUrl || this.html || this.filterBy) {
    if (this.grouped) {
      items = this.items.map(item => {
        return (
          <optgroup label={item.text}>
            {item.children.map(i => {
              return (
                <option value={i.id} disabled={i.disabled}>
                  {i.text}
                </option>
              );
            })}
          </optgroup>
        );
      });
    } else {
      items = this.filteredItems.map(item => {
        return (
          <option value={item.id} disabled={item.disabled}>
            {item.text}
          </option>
        );
      });
    }
  }

  return (
    <select
      name={this.Name + this.arraySymbol}
      disabled={this.disabled}
      multiple={this.multiple}
      domPropsValue={this.value}
      onInput={e => this.$emit("input", e.target.value)}
      class="form-control"
    >
      {placeholder}
      {items}
    </select>
  );
}
