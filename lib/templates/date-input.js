export default function(h) {

let nowButton = '';
let clearButton = '';

if (this.nowButton && !this.disabled) {
	nowButton  = <button class="btn btn-default btn-sm" type="button" on-click={this.setNow.bind(this)}>{this.nowText}</button>;
}

if (this.clearButton && this.value && !this.disabled) {
	clearButton = <button class="btn btn-default btn-sm" type="button" on-click={this.clear.bind(this)}>{this.clearLabel}</button>
}

return <div><input class="VF-Field--Date__datepicker form-control"
name={this.Name}
placeholder={this.placeholder}
value={this.formattedDate}
disabled={this.disabled}
onChange={e=>this.$emit('input', this.value)}
type="text"/>{nowButton}{clearButton}</div>
}
