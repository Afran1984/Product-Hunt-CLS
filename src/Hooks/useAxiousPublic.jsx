import axios from "axios";

const axiousPublic = axios.create({
    baseURL: 'https://84-foodbar-server.vercel.app'
})

const useAxiousPublic = () => {
    return axiousPublic;
};

export default useAxiousPublic;