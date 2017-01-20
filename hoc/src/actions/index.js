export function getLogin(){
	return(dispatch) =>{
		fetch(`localhost:8080/login`,
		{
			method:`get`,
			headers: {'Content-Type': 'application/json'},
		}).then((response) =>response.json())
		.then((data) =>{
			if(!data.error){
				dispatch(data);
			}//if not eerro
		})
		.catch((error) =>{
			console.log('error',error);
		});//log the erro
	};//end dispatch
}//end login