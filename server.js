var app = require('./server-config.js');

var port = /*START SOLUTION*/process.env.PORT/*END SOLUTION*/ || 4568;
app.listen(port);

console.log('Server now listening on port ' + port);
