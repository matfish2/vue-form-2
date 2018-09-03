export default function(h) {

return <span class="VF-Field__file-upload">
  <span class='glyphicon glyphicon-upload VF-Field__file-upload-icon'></span>
  <input disabled={this.disabled}
         type="file"
         name={this.Name}
         class="form-control-file" />
         {this.$scopedSlots.default({
           value:this.value
         })}
</span>

}
