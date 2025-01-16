import { useQuery } from "@tanstack/react-query";
import useAxiousSecure from "../../../Hooks/useAxiousSecure";
import { FaTrashAlt } from "react-icons/fa";
import { FaUserAlt } from "react-icons/fa";
import Swal from "sweetalert2";


const AllUsers = () => {
    const axiousSecure = useAxiousSecure();
    const {data: users = [], refetch} = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiousSecure.get('/users');
            return res.data;
        }
    })
    const handelMakeAdmin = user =>{
        axiousSecure.patch(`/users/admin/${user._id}`)
        .then(res =>{
            console.log(res.data);
            if(res.data.modifiedCount > 0){
                refetch();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${user.name} is an Admin Now`,
                    showConfirmButton: false,
                    timer: 1500
                  });
            }
        })
    }

    const handelDeletUser = user =>{
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {
                axiousSecure.delete(`/users/${user._id}`)
                .then(res => {
                    if(res.data.deletedCount > 0) {
                        refetch();
                        Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                              });
                    }
                })
            }
          });

    }
    return (
        <div>
           <div className="flex justify-evenly">
           <h2 className="text-3xl">All Users</h2>
           <h2 className="text-3xl">Total Users: {users.length}</h2>
           </div>
           <div className="overflow-x-auto">
  <table className="table table-xs table-pin-rows table-pin-cols w-full">
    <thead>
      <tr>
        <th></th>
        <td>Name</td>
        <td>email</td>
        <td>location</td>
        <td>Role</td>
        <td>Action</td>
      </tr>
    </thead>
    <tbody>
        {
            users.map((user, index) => <tr key={user._id}>
                <th>{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>Bangladesh</td>
                <td>
                {
                    user.role === 'admin' ? 'Admin' : <button onClick={() => handelMakeAdmin(user)}><FaUserAlt className="text-green-600"></FaUserAlt></button>
                }
                </td>
                <td>
                <button onClick={() =>handelDeletUser(user)}><FaTrashAlt className="text-red-600"></FaTrashAlt></button>
                </td>
              </tr> )
        }
      
    </tbody>
  </table>
</div>
        </div>
    );
};

export default AllUsers;