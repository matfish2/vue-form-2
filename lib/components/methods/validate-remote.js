var merge = require('merge');

module.exports = function() {

    if (!this.Rules.remote) return;

    var formError = {
                      name:this.name,
                      rule:"remote",
                      show:true
                    };

    var rule = this.Rules.remote;
    var url = typeof rule==='string'?rule:rule.url;
    var params = typeof rule==='string'?{}:rule.params;

    this.$http.get(url, {params:merge(params,{value:this.value})}).then(function(data) {
          var i = this.errors.indexOf("remote")
          this.errors.splice(i,1);
          if (this.inForm()) this.removeFormError(formError);

    }).catch(function(e){
        this.messages.remote = e.body;

        if (this.errors.indexOf("remote")==-1) {
            this.errors.push("remote");
            if (this.inForm()) this.addFormError(formError,true);    
        }
    });

  }
