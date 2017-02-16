export default function(h) {

let hiddenInput = '';

if (this.inForm() && this.getForm().server) {
hiddenInput = <input  type="hidden" name={this.name} value={this.serverFormat} />
}

return <div><input class="VF-Field--Date__datepicker form-control"
name={this.name}
placeholder={this.placeholder}
value={this.formattedDate}
on-change={this.updateValue.bind(this)}
type="text"/>{hiddenInput}</div>
}
