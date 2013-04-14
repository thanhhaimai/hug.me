(function(root) {
  root.required = function(parameter) {
    if (parameter === undefined) {
      throw 'Required param not supplied';
    }
  };

  root.dieOnError = function(err) {
    if (err) {
      throw err;
    }
  }
})(module && module.exports || this);
