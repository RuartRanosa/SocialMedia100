const mysql = require('mysql');
const express = require("express")
const app = express.Router()

const jwt = require("jsonwebtoken")
const bcryptjs = require("bcryptjs")
const cors = require("cors")

app.use(cors())

process.env.SECRET_KEY = 'secret'

let connection = mysql.createPool({
    host: '0.0.0.0',
    // port: '3333',
    user: 'root',
    password: '',
    database: 'socialMedia',
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
		const userData = {
	        username: req.body.username,
	        email: req.body.email,
	        name: req.body.name,
	        password: req.body.password,
	        birthday: req.body.birthday 
	    }
	    console.log(userData.username)
	    connection.query("select email from user where email = '"+req.body.email+"';", (err, result)=>{
	    	if(!err && result.length === 0){
			    connection.query('insert into user(username, name, email, password, birthday) values("'+userData.username+'","'+userData.name+'","'+userData.email+'","'+userData.password+'","'+userData.birthday+'");', (err, response) => {
			    	if(!err){
						console.log("Register successful!")
						return res.send({success: true})
			    	}else{
			    		console.log(err)
			    		return res.send({success: false})
			    	}	
				})
	    	}else{
	    		console.log("Failed")
	    		return res.send({success: false})
	    	}
	    })
	})


	app.post('/login', function(req, res){	
		console.log(req.body.email)
		console.log(req.body.password)
	    connection.query('select userId, username, name, email, password from user where email = "'+req.body.email+'";', (err, result) => {
	    	console.log(result)
			if(!err && result.length > 0){
				if (req.body.password === result[0].password) {
	                    const payload = {
	                        userId: result[0].userId,
	                        username: result[0].username,
	                        name: result[0].name,
	                        email: result[0].email
	                    }
	                    let token = jwt.sign(payload, process.env.SECRET_KEY, {
	                        expiresIn: 1440
	                    })
	                    console.log("Logged in!!!")
      					return res.send({ success: true, token, userId: payload.userId})
	                } else {
	                    return res.send({success: false})
	                }
			}else{
	           return res.send({success: false})
	        }
		})
	})

	app.get('/get-friends', function(req, res){
		console.log(req.query.userId)
		connection.query('select P.*, U.username from friendList P, user U where P.userId = '+req.query.userId+' and P.friendId = U.userId;', (err, result) => {
			if(!err){			 																				
				console.log(result)
				return res.send({success: true, result})
			}else{
				return res.send({success: false})
	            // return res.send(400, 'Couldnt get a connection');															// returns an error message if the connection fails
	        }
		})
	})
	
	app.get('/get-user', function(req, res){
		console.log(req.query.userId)
		connection.query('select username, name, email, about, birthday from user where userId = '+req.query.userId+';', (err, result) => {
			if(!err){			 																				
				console.log(result)
				return res.send({success: true, result})
			}else{
				return res.send({success: false})
	            // return res.send(400, 'Couldnt get a connection');															// returns an error message if the connection fails
	        }
		})
	})

	app.get('/get-posts', function(req, res){
		console.log("USER POST"+req.query.userId)
		connection.query('select P.*, U.username from userPost P, user U where P.userId ='+req.query.userId+' and P.userId = U.userId;', (err, result) => {
			if(!err){			 																			
				console.log(result)
				return res.send({success: true, result})
			}else{
				return res.send({success: false})
	            // return res.send(400, 'Couldnt get a connection');															// returns an error message if the connection fails
	        }
		})
	})

	app.post('/add-post', function(req, res){	
		const postData = {
	        userId: req.body.userId,
	        content: req.body.content 
	    }
	    connection.query('insert into userPost(userId, content, postDate) values('+postData.userId+',"'+postData.content+'", curdate());', (err, result)=>{
	    	if(!err){
			    return res.send({success: true})
	    	}else{
	    		console.log("Failed")
	    		return res.send({success: false})
	    	}
	    })
	})



  }
});


module.exports = app
