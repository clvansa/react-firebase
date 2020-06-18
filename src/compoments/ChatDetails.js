import React, { Component,Fragment } from 'react';
import {connect} from 'react-redux';
import {sendMessage,getUserData} from '../redux/actions/userActions'
import {getChatUser} from '../redux/actions/userActions'

import axios from 'axios';

export class ChatDetails extends Component {
   
    
    state = ({
        message :'',
        userHandle:'',
        uid:'',
        messagesRc:[]
    })
    handleChange = (e) => {
        this.setState({
        [e.target.name]:e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault()
        this.props.sendMessage(this.state.userHandle,{message:this.state.message})
        this.setState({message:''})
        this.props.getChatUser()

      

    }
    
    componentDidMount(){
        this.userHandle()
        this.props.getChatUser()
    }

 

 

   
    
    userHandle =() => {
        axios.get(`/user/${this.props.match.params.userHandle}`)
        .then((data)=> {
            this.setState({
                userHandle:data.data.user.handle,
                uid:data.data.user.userId
            })
            console.log(this.state.uid)
        })
    }

    recevieMsg = () =>{
        console.log(this.props.chat)
    }


    
    render() {
        const {UI:{loading},user :{credentials :{userId,handle,messages}},chat} = this.props
        let msgSendet;
        let recMsg = ! loading && chat !== undefined? (Object.values(chat).map(msg => msg.receiverId === this.state.uid ? <li>{msg.message}</li>:null)):(<p>Loading</p>)
       
        
            
            
        
      
        if(messages === undefined){
            return false
        }else {
            msgSendet =  messages.map(a => (this.state.uid === a.uid) ?(
                <div>
                {console.log(userId)}
            <li>{this.props.match.params.handle}{a.message}</li></div>
        ):null)
        }
        return (
            <Fragment>
                <ul style={{minHeight:'50vh',textAlign:'left'}}>{msgSendet}</ul>
                <ul style={{textAlign:'right'}}>{recMsg}</ul>
                <form onSubmit={this.handleSubmit} >
                    <input type='text' name='message' value={this.state.message} onChange={this.handleChange} />
                </form>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.user,
    data: state.data,
    chat: state.chat,
    UI: state.UI
})
export default connect(mapStateToProps,{sendMessage,getUserData,getChatUser})(ChatDetails)
     