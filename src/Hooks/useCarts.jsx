import { useQuery } from "@tanstack/react-query";
import useAxiousSecure from "./useAxiousSecure";
import useAuth from "./useAuth";


const useCarts = () => {
    // tan stack Quary
    const axiosSecure = useAxiousSecure();
    const {user} = useAuth();
    const {refetch, data: cart = [] } = useQuery({
        queryKey: ['cart', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/carts?email=${user.email}`)
            return res.data
        }
    })
    return [cart, refetch]
};

export default useCarts;