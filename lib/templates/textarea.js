export default function(h) {
return <textarea
        name={this.name}
        id={"textarea_" + this.name}
        class="form-control"
        on-change={this.updateValue.bind(this)}
        on-keyup={this.updateValue.bind(this)}
        disabled={this.disabled}
        placeholder={this.placeholder}>
        	{this.curValue}
        </textarea>

}
