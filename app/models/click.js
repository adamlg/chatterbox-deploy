/* START SOLUTION */
// Not used in MongoDB solution
/* ELSE
var db = require('../config');
var Link = require('./link.js')

var Click = db.Model.extend({
  tableName: 'clicks',
  link: function() {
    return this.belongsTo(Link, 'link_id');
  }
});

module.exports = Click;
END SOLUTION */