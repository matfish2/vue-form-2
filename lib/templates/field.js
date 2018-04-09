import merge from 'merge'

export default function(h) {

  let label = '';
  let description = '';
  let feedback = '';
  let error = '';
  let form = this.getForm();
  let rowClass = form.opts.layout=='form-horizontal'?'row ':''; 

  if (this.hasLabel) {
   
   if (this.description)
   description = <small class='description'>{this.description}</small>

   label = <label
   class={'col-form-label VF-Field__label control-label ' + form.labelClass}
   for={this.Name}
   title={this.title}>
   <span>{this.label}</span>
   {description}
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
id={'Field--' + this.Name}
class={'VF VF-Field form-group ' + rowClass +  this.fieldClasses}
>
{label}
<div class={"VF-Field__wrapper" +  this.hasLabel?form.fieldClass(!this.hideLabel):''}>
{this.$slots.before}
{form.templates[this.fieldType].apply(this,[h])}
{feedback}
{error}
{this.$slots.after}
</div>
</div>

}

