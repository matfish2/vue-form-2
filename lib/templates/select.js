 export default function(h) {
  let placeholder = '';
  let items = [];

  if (!this.noDefault && !this.multiple) {
    placeholder = <option value="">{this.placeholder}</option>
  }

  if (!this.select2 || this.ajaxUrl || this.html || this.filterBy) {

    items = this.filteredItems.map((item) => {
      return <option value={item.id}>{item.text}</option>
    })
  }


  return <select 
  name={this.Name + this.arraySymbol}
  disabled={this.disabled}
  multiple={this.multiple}
  domPropsValue={this.value}
  onInput={e=>this.$emit('input',e.target.value)}
  class="form-control">
  {placeholder}
  {items}
  </select>;

}

