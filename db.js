const mysql = require("mysql2");

const db = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "bhaipankaj@1",
    database : "finace_tracker"
});

try{
    db.connect((err)=>{
        if(err) throw err;
        console.log('db connected');
    })
}catch(err){
    console.log(err);
}

module.exports = db;