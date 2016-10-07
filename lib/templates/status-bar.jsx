export default function(h) {

if (!this.hasMessage) return '';

let message = `<p>${this.Message}</p>`
let errors = []

this.showableErrors.map((error)=>errors.push(this.getErrorMessage(error)))
errors = errors.map((error)=>`<li>${error}</li>`)
let content = this.hasErrors?`<p>${this.errorsCount}</p><ul>${errors.join('')}</ul>`:message

return <div class={'StatusBar alert alert-' + this.Status} domProps-innerHTML={content}>

</div>

}
