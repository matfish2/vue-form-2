export default function(e) {

  if (e.type==='change' || (e.type==='keyup' && !this.lazy)) {
    this.curValue = e.target.value;
    if (e.type==='change') this.validateRemote();
  }

}
