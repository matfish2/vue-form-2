export default function(h) {

    let message = '';

    if (this.hasMessage) {
        message = getMessage.call(this, h);
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


function getMessage(h) {

    var message = this.Message;
    if (typeof message==='string')
    return message;
    if (typeof message==='object') {

        if (message.formatter) {
            return this.getForm().opts.messageFormatters[message.formatter](h, message.message);
        }

        return message.map(m=>{
            if (m.name) {
                return <li><a href={`#Field--${m.name}`}>{m.message}</a></li>
            }

            return <li>{m}</li>
            
    });

    }

    if (typeof message==='function')
      return message(h);
}