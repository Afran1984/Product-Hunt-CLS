import { FaGoogle } from "react-icons/fa";
import useAuth from "../../Hooks/useAuth";
import useAxiousPublic from "../../Hooks/useAxiousPublic";
import { useNavigate } from "react-router-dom";

const SocialLogin = () => {
    const { googleSingIn } = useAuth();
    const axiosPublic = useAxiousPublic();
    const navigate = useNavigate();


    const handleGoogleSignIn = () =>{
        googleSingIn()
        .then(result =>{
            console.log(result.user);
            const userInfo ={
                email: result.user?.email,
                name: result.user?.displayName
            }
            axiosPublic.post('/users', userInfo)
            .then(res =>{
                console.log(res.data);
                navigate('/')
            })
        })

    }
    return (
        <div className="p-2 text-center">
             <div className="divider divider-accent"></div>
            <div>
            <button onClick={handleGoogleSignIn}> <FaGoogle className="mr-4">google</FaGoogle></button>
            </div>
        </div>
    );
};

export default SocialLogin;