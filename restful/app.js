const mongoose = require('mongoose');

// define a connection
mongoose.connect('mongodb://localhost/test');
// if using mongoose.connect, mongoose.connection refer the Connection Object
const db = mongoose.connection;
// open or error event fired when we connect successfully or a error occur
db.on('error', (e) => console.error('connection error: ', e));
db.on('open', () => {
  
})