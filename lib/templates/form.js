export default function(h) {

var hidden = [];

if (!this.ajax && !this.client) {
  this.additionalValues.map(function(value) {
    hidden.push(<input
         type="hidden"
         name={value.name}
         value={value.value}/>)
  })
};
return <form action={this.action}
            method={this.method}
            class={this.opts.layout}
            on-submit={this.submit.bind(this)}
            novalidate
            slot="slot"
            enctype="multipart/form-data">
            {hidden}
{this.$slots.default}
</form>
}
