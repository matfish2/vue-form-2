export default function(h) {

let hiddenInput = '';
let nowButton = '';

if (this.inForm() && this.getForm().server) {
hiddenInput = <input  type="hidden" name={this.name} value={this.serverFormat} />
}

if (this.nowButton && !this.disabled) {
	nowButton  = <button class="btn btn-default btn-sm" type="button" on-click={this.setNow.bind(this)}>{this.nowText}</button>;
}

return <div><input class="VF-Field--Date__datepicker form-control"
name={this.name}
placeholder={this.placeholder}
value={this.formattedDate}
disabled={this.disabled}
on-change={this.updateValue.bind(this)}
type="text"/>{nowButton}{hiddenInput}</div>
}
