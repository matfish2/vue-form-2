export default function(h) {

var button = this.toggler?<button type="button" class="btn btn-default btn-xs" on-click={this.toggle.bind(this)}>{this.togglerText}</button>:'';

return <div class='Textarea__wrapper'>
		<textarea
        name={this.name}
        id={"textarea_" + this.name}
        class="form-control"
        on-change={this.updateValue.bind(this)}
        on-keyup={this.updateValue.bind(this)}
        disabled={this.disabled}
        placeholder={this.placeholder}>
        	{this.curValue}
        </textarea>
        {button}
        </div>
}
