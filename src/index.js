const express = require('express');
const mysql = require('mysql');
const app = express();

//settings
app.set('port', process.env.PORT || 8080);



//start server
app.listen(app.get('port'),() => {
    console.log("Server on port", app.get('port'))
})