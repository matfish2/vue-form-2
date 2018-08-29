import debounce from 'debounce';

export default function(h) {

 return <input type={this.fieldType}
        name={this.Name}
        domPropsValue={this.value}
        onInput={e=>this.$emit('input', e.target.value)}
        class="form-control"
        placeholder={this.placeholder}
        disabled={this.disabled}
        minlength={this.minlength}
        maxlength={this.maxlength}
        autocomplete={this.autocomplete}
        />
}
