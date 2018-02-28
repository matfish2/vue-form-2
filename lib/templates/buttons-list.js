export default function(h) {

let toggler = '';
let items = [];

if (this.multiple) {
  toggler = <span  class="pull-right btn btn-link"
                   on-click={this.toggle.bind(this)}>{this.toggleText}</span>
} else {
  toggler = this.curValue?<span  class="pull-right btn btn-link"
  on-click={this.clear.bind(this)}>{this.clearText}</span>:'';
}

this.items.map((item) => {
  if (this.passesFilter(item))
  items.push(<div class={this.itemClass}>
  <label class='form-check-label'>
    <input
            class='form-check-input'
            disabled={this.disabled}
            name={this.name + this.arraySymbol}
            type={this.type}
            value={item.id}
            on-change={this.updateValue.bind(this, item.id)}
            checked={this.isChecked(item.id)}/>
    <span class='form-check-label-text'>{item.text}</span>
  </label>
</div>)
});

var content = items.length?[toggler, items]:[this.getForm().opts.texts.noItems];

return <div class="VF-Buttons__wrapper">
{content}
</div>

}

