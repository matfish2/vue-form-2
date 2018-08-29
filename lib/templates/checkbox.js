export default function(h) {
  let hiddenInput = '';

  if (this.inForm() && this.getForm().server) {
    hiddenInput = <input name={this.Name} type="hidden" value="0"/>
  }

  return <div>
  {hiddenInput}
  <input type="checkbox"
         name={this.Name}
         v-model={this.value}
         disabled={this.disabled}/>
  </div>
}
