export default function(e) {

  if (e.type==='change' || (e.type==='keyup' && !this.lazy)) {
    this.curValue = e.target.value;
    this.validateRemote();
  }

}
