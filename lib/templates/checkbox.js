export default function(h) {
  let hiddenInput = '';

  if (this.inForm() && this.getForm().server) {
    hiddenInput = <input name={this.name} type="hidden" value="0"/>
  }

  return <div>
  {hiddenInput}
  <input type="checkbox"
         name={this.name}
         value="1"
         checked={this.value}
         on-change={this.updateValue.bind(this)}
         disabled={this.disabled}/>
  </div>
}
