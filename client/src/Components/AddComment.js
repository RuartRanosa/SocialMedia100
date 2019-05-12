import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom'
import jwt_decode from 'jwt-decode'

class AddComment extends Component{
	constructor(){
        super()
        this.state = {
            userId: 0,
            content: ""        
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event) {
        this.setState({content: event.target.value});
      }
    handleSubmit(event){
        const post = {
            userId: this.props.id,
            content: this.state.content
        }
        fetch('http://localhost:3000/add-post',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(post)
          })
          .then(response => response.json())
          .then(body => {
            if(body.success){
                window.location.reload()
            }else{ 
                alert('Failed to post') 
            }
          })
          event.preventDefault()
    }


    render(){
    	return(
    		<form onSubmit={this.handleSubmit}>
                <label>
                    What's on your mind?
                    <textarea content={this.state.content} onChange={this.handleChange} />
                </label>
                <input type="submit" value="Submit" />
            </form>
    	)
    }
}
export default AddComment;