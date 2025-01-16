import { FaTrashAlt } from "react-icons/fa";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import useMenu from "../../../Hooks/useMenu";
import { Link } from "react-router-dom";
import { MdEditDocument } from "react-icons/md";
import Swal from "sweetalert2";
import useAxiousSecure from "../../../Hooks/useAxiousSecure";

const ManageItem = () => {
    const [menu, loading, refetch] = useMenu();
    const axiousSecure = useAxiousSecure();
    // delet function

    const handleDeletItem = (item) =>{
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then( async (result) => {
            if (result.isConfirmed) {
                const res = await axiousSecure.delete(`/menu/${item._id}`);
                // console.log(res.data);
                if(res.data.deletedCount > 0){
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${item.name} has been deleted`,
                        showConfirmButton: false,
                        timer: 1500
                      });
                }
            //   Swal.fire({
            //     title: "Deleted!",
            //     text: "Your file has been deleted.",
            //     icon: "success"
            //   });
            }
          });
    }

    return (
        <div>
            <SectionTitle heading="All items" subHeading="Hurry Up"></SectionTitle>
            <div>
            <div className="overflow-x-auto w-full mx-4">
                <table className="table">
                    {/* head */}
                    <thead>
                    <tr>
                        <td>
                        #
                        </td>
                        <th>Image</th>
                        <th>Item Name</th>
                        <th>Price</th>
                        <th>Change Info</th>
                        <th>Delete</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        menu.map((item, index) => <tr key={item._id}>
                            <th>
                                {index + 1}
                            </th>
                            <td>
                            <div className="flex items-center gap-3">
                                <div className="avatar">
                                <div className="mask mask-squircle h-12 w-12">
                                    <img
                                    src={item.image}
                                    alt="Avatar Tailwind CSS Component" />
                                </div>
                                </div>
                            </div>
                            </td>
                            <td>
                                {item.name}
                            </td>
                            <td>
                                ${item.price}
                            </td>
                            <td>
                            <Link to={`/dashboard/updateItem/${item._id}`}>
                            <button><MdEditDocument className="text-red-600 text-2xl"></MdEditDocument></button>
                            </Link>
                            </td>
                            <td>
                            <button onClick={() => handleDeletItem(item)}><FaTrashAlt className="text-red-600"></FaTrashAlt></button>
                            </td>
                        </tr>
                    )}
                    
                    </tbody>
                </table>
                </div>
            </div>
        </div>
    );
};

export default ManageItem;