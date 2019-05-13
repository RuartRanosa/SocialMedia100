import React, {Component } from 'react'
import {Link} from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import GetFriendList from './GetFriendList.js'
import GetPosts from './GetPosts.js'
import AddPost from './AddPost.js'
import './CSS/Profile.css'

const qs = require("query-string")


class Profile extends Component {
    constructor() {
        super()

        this.state = {
            userId: 0,
            username: '',
            name: '',
            email: '',
            posts: []
        }
    }

    componentDidMount () {
        var id = qs.parse(this.props.location.search, {ignoreQueryPrefix: true}).userId
            if(localStorage.usertoken){
                var token = localStorage.usertoken
                var decoded = jwt_decode(token)
                if(decoded.userId === id){
                    this.setState({
                        userId: decoded.userId,
                        username: decoded.username,
                        name: decoded.name,
                        email: decoded.email
                    })
                }else{
                    fetch('http://localhost:3000/get-user/?userId='+id)
                    .then((response) => { return response.json() })
                    .then((res) => {
                        this.setState({
                            userId: id,
                            username: res.result[0].username,
                            name: res.result[0].name,
                            email: res.result[0].email
                        })
                    })
                    .catch((e) => { console.log(e)});        
                }
            }else{
                alert("Login to access page")
                this.props.history.push(`/`)

            }
    }

    componentWillReceiveProps(nextProps){
           window.location.reload()
    }


    render () { 
        var id = qs.parse(this.props.location.search, {ignoreQueryPrefix: true}).userId

        return ( 
            <div class="pdiv">
                    <table class="ptable">
                    <tr>Username: {this.state.username}</tr>
                        <tr className="ptr">
                            <td>Name: {this.state.name}</td>
                        </tr>
                        <tr className="ptr">
                            <td>Email: {this.state.email}</td>
                        </tr>
                        <tr><td><br/></td></tr>
                        <tr className="ptr">
                        </tr>
                    </table>
                    {/*<GetFriendList/>*/}
                    <div class="addposts">
                    <AddPost id = {id}/>
                    </div>
                    
                    <div class="posts"> 
                    <GetPosts id = {id}/>
                    </div>

            </div>
        )
    }
}

export default Profile