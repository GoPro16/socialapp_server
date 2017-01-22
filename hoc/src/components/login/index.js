import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { withRouter, Link } from 'react-router'

import './style.scss';

class Login extends Component {
	constructor(props){
		super();
		this.state = {
            password:'',
            username:''
            
        };
	}

    updateUsername(e){
        this.setState({username:e.target.value});
    }

    updatePassword(e){
        this.setState({password:e.target.value});
    }

    componentWillUpdate(nextProps) {
        if(nextProps.authenticated.loggedIn) {
        this.props.router.replace('/home');
        // nextProps.router.replace('accountsSummary');
        }
    }

    login(e) {
        e.preventDefault();
        if (true) {//future use for if password is shorter than 4 chars or username
            this.props.signIn({
                username: this.state.username, 
                password: this.state.password
            });
        }
    }

  	render() {
    	return (
    		<div>
    			<div className="login-dark">
       		 		<form onSubmit={this.login.bind(this)}>
            			<h2 className="sr-only">Login Form</h2>
            				<div className="illustration"><i className="icon ion-ios-locked-outline"></i></div>
            				<div className="form-group">
                				<input className="form-control" onChange={this.updateUsername.bind(this)} value={this.state.username} type="username" placeholder="username">
                				</input>
            				</div>
            				<div className="form-group">
                				<input className="form-control" onChange={this.updatePassword.bind(this)} value={this.state.password} type="Password" placeholder="Password">
            					</input>
            				</div>
            				<div className="form-group">
               	 				<button className="btn btn-primary btn-block" type="submit">Log In</button>
            				</div>
            				<a href="/signUp" className="forgot">Sign Up</a>
            		</form>
    			</div>
   	 			<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
    			<script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/js/bootstrap.min.js"></script>
    	</div>	);
  	}
}

function mapStateToProps(state) {
  return { authenticated: state.authenticated };
}

export default withRouter(connect(mapStateToProps, actions)(Login));
