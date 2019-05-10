const mysql = require('mysql');
const express = require("express")
const app = express.Router()
const cors = require("cors")

app.use(cors())

process.env.SECRET_KEY = 'secret'

let connection = mysql.createPool({
    host: '0.0.0.0',
    // port: '3333',
    user: 'root',
    password: '',
    database: 'eatwise',
    connectionLimit: 10
});


connection.getConnection(function(err) {
  if (err){
  	throw err;
  } 
  else{
  	console.log("Connected to database!");
	app.get('/', (req, res, next) => {
		res.send("Welcome to Social Media Server!")
		next()
	})

	app.post('/register', function(req, res){
		var conn = res.locals.connection	
		const userData = {
	        username: req.body.username,
	        display_name: req.body.display_name,
	        email: req.body.email,
	        password: req.body.password,
	        location: "here"
	    }
	    conn.query("select email from user where email = '"+req.body.email+"';", (err, result)=>{
	    	if(!err && result.length === 0){
			    conn.query('call addUser(false, "'+userData.username+'", "'+userData.email+'", "'+userData.display_name+'", "'+userData.password+'", "'+userData.location+'");', (err, response) => {
			    	if(!err){
						console.log("Register successful!")
						res.json({ status: userData.email + ' registered!' })
			    	}else{
			    		res.send("Error: "+err)
			    	}	
				})
	    	}else{
	    		res.send(400, "User is already registered")
	    	}
	    })
	})


	app.post('/login', function(req, res){
		var conn = res.locals.connection	
	    conn.query('select userId, adminAccess, username, displayName, email, CAST(aes_decrypt(password, "secret") AS CHAR(10000) CHARACTER SET utf8) as password from user where email = "'+req.body.email+'";', (err, result) => {
			if(!err && result.length > 0){
				if (req.body.password === result[0].password) {
	                    const payload = {
	                        userId: result[0].userId,
	                        username: result[0].username,
	                        display_name: result[0].displayName,
	                        email: result[0].email,
	                        adminAccess: result[0].adminAccess
	                    }
	                    let token = jwt.sign(payload, process.env.SECRET_KEY, {
	                        expiresIn: 1440
	                    })
	                    console.log("Logged in!!!")
	                    res.send(token)
	                } else {
	                    res.send(400, 'User does not exist');
	                }
			}else{
	           res.send(400, 'Couldnt get a connection');
	        }
		})
	})

	

  }
});


module.exports = app
