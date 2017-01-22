import React,{Component} from 'react';
import {connect} from 'react-redux';
import {withRouter,Link} from 'react-router';
import * as actions from './../../actions';

import './style.scss';

class SignUp extends Component {
	constructor(props){
		super(props);
		this.state = {
			password: '',
			username: ''
		};
	}

	componentWillUpdate(nextProps) {
        if(nextProps.created) {
        this.props.router.replace('/');
        }
    }

	updateUsername(e){
		this.setState({username:e.target.value});
	}

	updatePassword(e){
		this.setState({password:e.target.value});
	}

	signUp(e){
		e.preventDefault();
		if(true){//future use for if password is shorter than 4 chars or username
			this.props.createUser({
				username: this.state.username, 
                password: this.state.password
			}); 
		}
	}

	render(){
		return(
			<div>
				<div className="container-fluid">
	 <form onSubmit={this.signUp.bind(this)} className="register-form"> 
      <div className="row">      
           <div className="col-md-4 col-sm-4 col-lg-4">
              <label>USERNAME</label>
               <input onChange={this.updateUsername.bind(this)} value={this.state.username} className="form-control" type="username" />
           </div>            
      </div>
      <div className="row">
           <div className="col-md-4 col-sm-4 col-lg-4">
              <label>PASSWORD</label>
               <input onChange={this.updatePassword.bind(this)} value={this.state.password} className="form-control" type="password" />             
           </div>            
      </div>
      <hr />
      <div className="row">
          <div className="col-md-6 col-sm-6 col-xs-6 col-lg-6">
           <button className="btn btn-default logbutton">Sign up</button>           
          </div>          
      </div>    
    </form>
</div>
			 </div>
			);
	}
}

function mapStateToProps(state){
	return{created : state.created};
}

export default withRouter(connect(mapStateToProps,actions)(SignUp));