const mysql = require('mysql2')
const { log } = require('node:console')
require ('dotenv').config()



const connection = mysql.createPool({
    host: 'localhost',
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME
})


connection.getConnection((err,conn)=>{
    if(err){
        console.log("ERROR",err)
        
    }
    console.log("MySQL Database Connected successfully!")
    conn.release()
    
})

module.exports = connection.promise()