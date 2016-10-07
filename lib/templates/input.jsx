export default function(h) {

 return <input type={this.fieldType}
        name={this.name}
        value={this.curValue}
        on-change={this.updateValue.bind(this)}
        on-keyup={this.updateValue.bind(this)}
        class="form-control"
        placeholder={this.placeholder}
        disabled={this.disabled}
        />
}
