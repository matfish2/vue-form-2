import debounce from 'debounce';

export default function(h) {

 return <input type={this.fieldType}
        name={this.Name}
        value={this.curValue}
        on-change={this.updateValue.bind(this)}
        on-keyup={debounce(this.updateValue, this.debounce)}
        class="form-control"
        placeholder={this.placeholder}
        disabled={this.disabled}
        minlength={this.minlength}
        maxlength={this.maxlength}
        autocomplete={this.autocomplete}
        />
}
