import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom'
import jwt_decode from 'jwt-decode'

class GetPosts extends Component{
	constructor(){
        super()
        this.state = {
            userId: 0,
            posts: []        
        }
        this.getPost = this.getPost.bind(this)
    }

    getPost(userId){
    	fetch('http://localhost:3000/get-posts/?userId='+userId)
            .then((response) => { return response.json() })
            .then((res) => {
                console.log(res.result)
                this.setState({posts: res.result})
            })
            .catch((e) => { console.log(e)});
    }

    componentDidMount(){
      if(localStorage.usertoken){
        var token = localStorage.usertoken
        var decoded = jwt_decode(token)
        this.setState({
            userId: decoded.userId
        })
        fetch('http://localhost:3000/get-posts/?userId='+this.props.id)
            .then((response) => { return response.json() })
            .then((res) => {
                console.log(res.result)
                this.setState({posts: res.result})
            })
            .catch((e) => { console.log(e)});
      }
    }

    render(){
    	const PostList = () => {
    		const options = this.state.posts.map((i) => (
        		<div>	
                    <ul>
                        <Link to = {'/profile/?userId='+i.userId}>
                            <li>{i.username}</li>    
                        </Link> 
                        {i.content}
                    </ul>
                </div>    
	        ))
	        return <ul>{options}</ul>
	     }
    	return(
    		<div>
    			<PostList/>
    		</div>
    	)
    }
}
export default GetPosts;