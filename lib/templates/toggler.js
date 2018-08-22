export default function(h) {
  return <label class="switch">
  <input type="checkbox" 
  name={this.Name}
  checked={this.curValue}
  on-change={this.updateValue.bind(this)}
  />
  <span class="slider round"></span>
</label>
}
