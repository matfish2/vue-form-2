export default function(h) {
  return <label class="switch">
  <input type="checkbox" 
  name={this.Name}
  v-model={this.value}
  on-change={e=>this.$emit('input',e.target.checked)}
  />
  <span class="slider round"></span>
</label>
}

