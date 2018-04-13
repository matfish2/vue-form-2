 export default function(h) {
  let placeholder = '';
  let items = [];

  if (!this.noDefault && !this.multiple) {
    placeholder = <option value="">{this.placeholder}</option>
  }

  if (!this.select2 || this.ajaxUrl || this.html || this.filterBy) {

    items = this.filteredItems.map((item) => {
      return <option value={item.id} selected={item.id == this.curValue}>{item.text}</option>
    })
  }


  return this.render?<select name={this.Name + this.arraySymbol}
  disabled={this.disabled}
  multiple={this.multiple}
  on-change={this.updateValue.bind(this)}
  class="form-control">
  {placeholder}
  {items}
  </select>:'';

}

