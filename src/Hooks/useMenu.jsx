// import {useEffect, useState } from "react";
import useAxiousPublic from "./useAxiousPublic";
import { useQuery } from "@tanstack/react-query";


const useMenu = () => {
    const axiousPublic = useAxiousPublic();

    // const [menu, setMenu] = useState([]);
    // const [loading, setLoading] = useState(true);
    // useEffect( () =>{
    //     fetch('https://84-foodbar-server.vercel.app/menu')
    //     .then(res => res.json())
    //     .then(data => {
    //         setMenu(data)
    //         setLoading(false);
    //     });
    // }, [])

    const {data: menu = [], isPending: loading, refetch} = useQuery({
        queryKey: ['menu'],
        queryFn: async() =>{
            const res = await axiousPublic.get('/menu');
            return res.data;
        }
    });


    return [menu, loading, refetch]
};

export default useMenu;