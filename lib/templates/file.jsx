export default function(h) {
let value = '';

if (this.curValue)
value = <span class="VF-Field__file_uploaded glyphicon glyphicon-ok"
        title={this.curValue}>
        </span>

return <span class="VF-Field__file-upload">
  <span class='glyphicon glyphicon-upload VF-Field__file-upload-icon'></span>
  <input disabled={this.disabled}
         type="file"
         name={this.name}
         class="form-control-file" />
         {value}
</span>

}
