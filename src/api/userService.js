import axios from 'axios';


const handleLoginApi = (userEmail, userPassword)=>{
    

    
    return axios.post('http://localhost:8000/api/users/auth', { email:userEmail, password:userPassword});

}

const handleCreate = (name, email, password)=>{
    

    
    return axios.post('http://localhost:8000/api/users/', {name: name, email:email, password:password});

}



export {
    handleLoginApi, handleCreate
}