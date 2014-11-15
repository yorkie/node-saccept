
var semver = require('semver');

var reg = /(.*)\/vnd\..*\.?v(.*)\+(.*)/;
function valid (raw) {
  return raw.trim().split(';')
    .map(function (accept) {
      var m = accept.match(reg);
      if (m && (m = m.slice(1))) {
        return {
          mime: m[0] + m[2],
          version: m[1]
        };
      } else {
        return null;
      }
    })
    .filter(function (obj) {
      return obj;
    })[0];
}

function accept (raw, res, next, isStrong, ver, mime) {
  var obj = valid(raw);
  if (!obj.version)
    return isStrong ? res.status(400).end() : next();
  if (semver.satisfies(obj.version, ver))
    if (!mime || mime === obj.mime)
      return next();
  else
    return res.status(400).end();
}

exports.valid = valid;
exports.accept = accept;
