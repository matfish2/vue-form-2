export default function(h) {

let hiddenInput = '';

if (this.inForm() && this.getForm().server) {
hiddenInput = <input  type="hidden" name={this.name} value={this.serverFormat} />
}

return <div class='date-wrapper VF-Field--Date__datepicker'>
    <i class="glyphicon glyphicon-calendar"></i>
    <span class="VF-Field--Date__date">{this.formattedDate}</span>
    <b class="caret"></b>
    {hiddenInput}
    </div>


}

