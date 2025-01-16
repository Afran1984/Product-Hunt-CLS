import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { app } from "../Firebase/firebase.config";
import useAxiousPublic from "../Hooks/useAxiousPublic";
export const AuthContext = createContext(null);



const auth =getAuth(app);


const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const googleProvide = new GoogleAuthProvider()
    const axiosPublic = useAxiousPublic()
// Create User
    const createUser = (email, password) =>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }
    // Login
    const signIn = (email, password) =>{
        setLoading(true);
        return signInWithEmailAndPassword(auth, email,password)
    }
    // LogOut
    const logOut = () =>{
        setLoading(true);
        return signOut(auth)
    }

    const googleSingIn = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvide);
    }
    // Update Profile
    const updateUserProfile = (name, photo) => {
       return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
        });
    }

    useEffect(() =>{
       const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            console.log('Current User', currentUser);
            if(currentUser){
                    // get token store clintsite
                    const userInfo = { email: currentUser.email };
                    axiosPublic.post('/jwt', userInfo)
                    .then(res =>{
                        if(res.data.token) {
                            localStorage.setItem('access-token', res.data.token);
                            setLoading(false);
                        }
                    })

            }
            else{
                // do Something 
                localStorage.removeItem('access-token');
                setLoading(false);
            }
        });
        return () =>{
            return unsubscribe();
        }
    },[axiosPublic])

    const authInfo ={
        user,
        loading,
        createUser,
        signIn,
        googleSingIn,
        logOut,
        updateUserProfile
    }
    return (
        <AuthContext.Provider value={authInfo}>
        {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;