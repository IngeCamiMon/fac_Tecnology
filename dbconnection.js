let mysql = require('mysql');

/*let connection = mysql.createPool({
    host:'localhost',
    user:'root',
    password:'',
    database:'sandwiches_usb'
});*/

let connection = mysql.createPool({
    host:'localhost',
    user:'root',
    password:'',
    database:'midas'
});

module.exports = connection;