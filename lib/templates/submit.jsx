export default function(h) {
  let disabled =  this.disabled?'disabled':'';
  return <button type="submit"
  class={"VF-Submit__button btn btn-primary pull-right " + disabled}>
  {this.text}
  </button>
}

