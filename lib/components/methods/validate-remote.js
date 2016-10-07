module.exports = function() {

    if (!this.rules.remote) return;

    var formError = {
                      name:this.name,
                      rule:"remote",
                      show:true};

    this.$http.get(this.rules.remote, {value:this.value}).then(function(data) {

        var valid = data.data;

        if (valid) {
          this.errors.$remove('remote');
          if (this.inForm()) this.removeFormError(formError);
        } else {
         if (this.errors.indexOf("remote")==-1)
            this.errors.push("remote");
            if (this.inForm()) this.addFormError(formError,true);

        }
    });

  }
