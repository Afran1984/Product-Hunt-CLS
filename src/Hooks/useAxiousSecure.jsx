import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const axiousSecure = axios.create({
    baseURL: 'https://84-foodbar-server.vercel.app'
})
const useAxiousSecure = () => {
    const navigate = useNavigate();
    const {logOut} = useAuth();
    // request intercept to add authorizationheader for every secure call

    axiousSecure.interceptors.request.use(function(config) {
        const token = localStorage.getItem('access-token');
        console.log('request stopped by interseptor');
        config.headers.authorization = `Bearer ${token}`
        return config;
    }, function(error) {
        return Promise.reject(error);
    });
    // interceptor Responce 401 & 403
    axiousSecure.interceptors.response.use(function(response){
        return response;
    }, async (error) =>{
        const status = error.response.status;
        console.log('Status Error', status);
        if(status === 401 || status === 403){
            await logOut();
            navigate('/login')
        }
        return Promise.reject(error); 

    })


    return axiousSecure;
};

export default useAxiousSecure;
