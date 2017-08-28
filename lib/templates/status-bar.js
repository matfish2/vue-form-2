export default function(h) {

let message = this.hasMessage?`<p>${this.Message}</p>`:'';

let errors = []

this.showableErrors.map((error)=>errors.push({name:error.name, text:this.getErrorMessage(error)}))
errors = errors.filter(error=>error);

errors = errors.map((error)=>`<li><a href="#Field--${error.name}">${error.text}</a></li>`)
let content = this.hasErrors?`<p>${this.errorsCount}</p><ul>${errors.join('')}</ul>`:message
let style = content?'':'display:none;';

return <div class={'StatusBar alert alert-' + this.Status} style={style} domProps-innerHTML={content}>
</div>

}
