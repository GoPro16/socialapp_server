import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

import { withRouter, Link } from 'react-router';


import './style.scss';

import dev1 from '../../assets/dev1.jpg';
import iphone from '../../assets/iphone.png'
import dev2 from '../../assets/dev2.png';



class Home extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state ={
      username: this.props.authenticated.username,
      token: this.props.authenticated.token
    }
  }

  render() {
    return (
      <div>
        <div className="jumbotron hero">
        <div className="container">
            <div className="row">
                <div className="col-md-4 col-md-push-7 phone-preview">
                    <div className="iphone-mockup"><img src={iphone} className="device"></img></div>
                </div>
                <div className="col-md-6 col-md-pull-3 get-it">
                    <h1>Social App Landing Page</h1>
                    <h3>Welcome {this.state.username}</h3>
                    <p>This is a test of the Landing page for the social media app. Logging in will send you a token for future uses.</p>
                    <p><a className="btn btn-primary btn-lg" role="button" href=""><i className="fa fa-apple"></i> Coming soon to the App Store</a><a className="btn btn-success btn-lg" role="button" href="/"><i className="fa fa-code"></i> To the console manager</a></p>
                </div>
            </div>
        </div>
    </div>
    <div className="team-boxed">
        <div className="container">
            <div className="intro">
                <h2 className="text-center">Team </h2></div>
            <div className="row people" data-aos="fade-up" data-aos-duration="300" data-aos-delay="50">
                <div className="col-md-4 col-md-offset-1 col-sm-6 item">
                    <div className="box"><img className="img-circle" src={dev2}></img>
                        <h3 className="name">Kyle Gray</h3>
                        <p className="title">Developer </p>
                        <p className="description">Aenean tortor est, vulputate quis leo in, vehicula rhoncus lacus. Praesent aliquam in tellus eu gravida. Aliquam varius finibus est, et interdum justo suscipit id. Etiam dictum feugiat tellus, a semper massa. </p>
                        <div className="social"><a href="#"><i className="fa fa-facebook-official"></i></a><a href="#"><i className="fa fa-twitter"></i></a><a href="#"><i className="fa fa-instagram"></i></a></div>
                    </div>
                </div>
                <div className="col-md-4 col-md-offset-2 col-sm-6 item">
                    <div className="box"><img className="img-circle" src={dev1}></img>
                        <h3 className="name">Jonathan Danek</h3>
                        <p className="title">Developer </p>
                        <p className="description">Aenean tortor est, vulputate quis leo in, vehicula rhoncus lacus. Praesent aliquam in tellus eu gravida. Aliquam varius finibus est, et interdum justo suscipit id. Etiam dictum feugiat tellus, a semper massa. </p>
                        <div className="social"><a href="#"><i className="fa fa-facebook-official"></i></a><a href="#"><i className="fa fa-twitter"></i></a><a href="#"><i className="fa fa-instagram"></i></a></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <section className="testimonials"></section>
    <footer className="site-footer">
        <div className="container">
            <div className="row">
                <div className="col-sm-6">
                    <h5>Mobile App © 2016</h5></div>
                <div className="col-sm-6 social-icons"><a href="/feed"><i className="fa fa-facebook"></i></a><a href="/feed"><i className="fa fa-twitter"></i></a><a href="#"><i className="fa fa-instagram"></i></a></div>
            </div>
        </div>
        </footer>
      </div>
    );
  }
}//end Component

function mapStateToProps(state) {
  return { authenticated: state.authenticated, accounts: state.accounts };
}

export default withRouter(connect(mapStateToProps, actions)(Home));