
function valid (raw) {
  return raw.trim().split(';')
    .map(function (accept) {
      var obj = accept.split('.').pop();
      if (obj.split) {
        obj = obj.split('+');
        return {
          version: obj[0],
          type: obj[1]
        };
      } else {
        return null;
      }
    })
    .filter(function (obj) {
      return obj;
    });
}

module.exports = valid;