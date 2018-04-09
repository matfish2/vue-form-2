export default function(h) {
  let hiddenInput = '';

  if (this.inForm() && this.getForm().server) {
    hiddenInput = <input name={this.Name} type="hidden" value="0"/>
  }

  return <div>
  {hiddenInput}
  <input type="checkbox"
         name={this.Name}
         value="1"
         checked={this.value}
         on-change={this.updateValue.bind(this)}
         disabled={this.disabled}/>
  </div>
}
