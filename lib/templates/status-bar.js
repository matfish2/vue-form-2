export default function(h) {

    let message = '';

    if (this.hasMessage) {
        message = typeof this.Message==='string'?this.Message:this.Message.map(m=><li><a href={`#Field--${m.name}`}>{m.message}</a></li>);
    }

let errors = []

this.showableErrors.map((error)=>errors.push({name:error.name, text:this.getErrorMessage(error)}))
errors = errors.filter(error=>error);

errors = errors.map((error)=><li><a on-click={()=>{this.getForm().dispatch('error-clicked', error.name)}} href={`#Field--${error.name}`}>{error.text}</a></li>);
let content = this.hasErrors?<div><p>{typeof this.errorsCount==='function'?this.errorsCount.call(this, h):this.errorsCount}</p><ul>{errors}</ul></div>:message;
let style = content?'':'display:none;';

return <div class={'StatusBar alert alert-' + this.Status} style={style}>
{content}
</div>

}
