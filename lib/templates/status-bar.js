export default function(h) {

let message = this.hasMessage?`<p>${this.Message}</p>`:'';

let errors = []

this.showableErrors.map((error)=>errors.push(this.getErrorMessage(error)))
errors = errors.filter(error=>error);

errors = errors.map((error)=>`<li>${error}</li>`)
let content = this.hasErrors?`<p>${this.errorsCount}</p><ul>${errors.join('')}</ul>`:message
let style = content?'':'display:none;';

return <div class={'StatusBar alert alert-' + this.Status} style={style} domProps-innerHTML={content}>
</div>

}
