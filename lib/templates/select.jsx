 export default function(h) {
  let placeholder = '';
  let items = [];

  if (!this.noDefault && !this.multiple) {
    placeholder = <option value="">{this.placeholder}</option>
  }

  if (!this.select2 || this.ajaxUrl || this.html || this.filterBy) {
    items = this.items.filter((item) => {
      return !this.filterValue || (item[this.filterBy]==this.filterValue);
    })


    items = items.map(function(item) {
      return <option value={item.id} selected={item.id === this.curValue}>{item.text}</option>
    })
  }


  return <select name={this.name + this.arraySymbol}
  disabled={this.disabled}
  multiple={this.multiple}
  on-change={this.updateValue.bind(this)}
  class="form-control">
  {placeholder}
  {items}
  </select>

}

