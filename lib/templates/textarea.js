export default function(h) {

var button = this.toggler?<button type="button" class="btn btn-default btn-xs" on-click={this.toggle.bind(this)}>{this.togglerText}</button>:'';

return <div class='Textarea__wrapper'>
		<textarea
        name={this.Name}
        id={"textarea_" + this.Name}
        maxlength={this.maxlength}
        class="form-control"
        v-model={this.value}
        disabled={this.disabled}
        placeholder={this.placeholder}>
        </textarea>
        {button}
        </div>
}
