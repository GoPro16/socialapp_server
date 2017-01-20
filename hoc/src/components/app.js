import React, { Component } from 'react';
import Request from 'superagent';
import _ from 'lodash';

import './style.scss';

export default class App extends Component {
	constructor(){
		super();
		this.state = {};
	}

	componentWillMount(){
		
	}

  	render() {
    	return (
    		<div>
    			<div className="login-dark">
       		 		<form>
            			<h2 className="sr-only">Login Form</h2>
            				<div className="illustration"><i className="icon ion-ios-locked-outline"></i></div>
            				<div className="form-group">
                				<input className="form-control" type="username" name="username" placeholder="username">
                				</input>
            				</div>
            				<div className="form-group">
                				<input className="form-control" type="password" name="password" placeholder="Password">
            					</input>
            				</div>
            				<div className="form-group">
               	 				<button className="btn btn-primary btn-block" type="submit">Log In</button>
            				</div>
            				<a href="" className="forgot">Forgot your email or password?</a>
            		</form>
    			</div>
   	 			<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
    			<script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/js/bootstrap.min.js"></script>
    	</div>	);
  	}
}


