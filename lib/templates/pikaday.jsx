export default function(h) {
  return (
    <input
      type="text"
      name={this.Name}
      class="form-control"
      disabled={this.disabled}
      domPropsValue={this.formattedValue()}
    />
  );
}
