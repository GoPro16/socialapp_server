import * as types from './types';
import { browserHistory } from 'react-router';
import fetch from 'isomorphic-fetch'

export function logIn(payload) {
  return {
    type: types.LOGIN,
    payload: payload,
  };
}

export function getUser(payload){
  return{
    type:types.CREATE_USER,
    payload:payload
  }
}

export function signIn(payload) {
  return (dispatch) => {
    fetch(`http://localhost:3000/login`,
    {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(payload),
    })
    .then((response) => response.json())
    .then((data) => {
      if (!data.error){
        dispatch(logIn(data));
      }else{
        console.log('sign in error', data.error)
        dispatch(setError(data.error))
      }
    })
    .catch((error) => {
      console.log('error catch',error);
      dispatch(setError('invalid credentials'))

    });
  };
}


export function createUser(payload){
  return(dipatch) =>{
    fetch(`http://localhost:3000/api/users`,
      {
        method:'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload),
      })
    .then((response) => response.json())
    .then((data) =>{
      if(!data.error){
        browserHistory.replace('/');
      }else{
        console.log('sign up error', data.error)
        dispatch(setError(data.error))
      }
    })
    .catch((error) => {
      console.log('error catch',error);
      dispatch(setError('invalid credentials'))
    });
  };
}