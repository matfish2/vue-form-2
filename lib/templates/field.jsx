import merge from 'merge'

export default function(h) {

  let label = '';
  let feedback = '';
  let error = '';
  let form = this.getForm();

  if (this.hasLabel) {
   label = <label
   class={'col-form-label VF-Field__label control-label ' + this.getForm().labelClass}
   for={this.name}>
    {this.label}
  </label>
}

if (this.validationError) {
 error = <span class="VF-ValidationError
 help-block">{this.validationError}</span>
}

if (this.hasFeedback) {
  feedback = <span class={"glyphicon glyphicon-" +this.feedbackIcon + " form-control-feedback"}
  aria-hidden="true"></span>
}

return  <div v-show={this.shouldShow}
id={'Field--' + this.name}
class={'VF VF-Field form-group row ' + this.fieldClasses}
>
{label}
<div class={"VF-Field__wrapper" +  this.hasLabel?form.fieldClass:''}>
{this.$slots.before}
{form.templates[this.fieldType].apply(this,[h])}
{feedback}
{error}
{this.$slots.after}
</div>
</div>

}

