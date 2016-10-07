export default function(e) {

    if (this.lazy && e.type=='keyup') return;
    if (!this.lazy && e.type=='change') return;

    if (this.lazy && e.type=='change'){
      this.curValue = e.target.value;
      this.validateRemote();
    }

    if (!this.lazy && e.type=='keyup') {

      this.lastKeyStroke = Date.now();

      setTimeout(()=>{
        let elapsed = (Date.now() - this.lastKeyStroke);

        if (elapsed >= this.debounce) {
          this.curValue = e.target.value;
          this.validateRemote();
        }

      }, this.debounce);
    }
  }
