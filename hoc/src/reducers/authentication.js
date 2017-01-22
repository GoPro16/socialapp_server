import * as types from '../actions/types';

const initialState = {
	userid: null,
	username:null,
	loggedIn:  false,
	token: false
}

export default function auth(state=initialState,{type,payload}){
	switch(type){
		case types.LOGIN:
		return{
			...state,
			userid:payload.user.id,
			username:payload.user.username,
			loggedIn:true,
			token:payload.token
		};
		case types.CREATE_USER:
		return{
			...state,
			userid:payload.user.id,
			username:payload.user.username
		};
		default:
			return state;
	}
}