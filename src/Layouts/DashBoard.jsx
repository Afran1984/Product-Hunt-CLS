import { Outlet } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { FaCalendar } from "react-icons/fa";
import { FaStreetView, FaList } from "react-icons/fa";
import useCarts from "../Hooks/useCarts";
import { FaUtensils } from "react-icons/fa6";
import { FaUsers } from "react-icons/fa";
import { IoMdBookmarks } from "react-icons/io";
import { IoMenuSharp } from "react-icons/io5";
import useAdmin from "../Hooks/useAdmin";

const DashBoard = () => {
    const [card] = useCarts();

    const [isAdmin] = useAdmin();
    return (
        <div className="flex mt-3">
            <div className="w-64 min-h-screen bg-orange-400">
                <ul className="menu p-5 gap-4">

                    {
                        isAdmin ? <>
                        <li><NavLink to="/dashboard/adminHome"> 
                    <FaHome></FaHome> Admin Home</NavLink> </li>

                    <li><NavLink to="/dashboard/addItems"> 
                    <FaUtensils></FaUtensils>Add Items</NavLink> </li>

                    <li><NavLink to="/dashboard/manageitems"> 
                    <FaList></FaList>Manage Item</NavLink> </li>

                    <li><NavLink to="/dashboard/bookings"> <IoMdBookmarks></IoMdBookmarks> Manage Bookings</NavLink> </li>

                    <li><NavLink to="/dashboard/users"> <FaUsers></FaUsers> All Users</NavLink> </li>
                        </>
                        :
                        <>
                        <li><NavLink to="/dashboard/userHome"> 
                    <FaHome></FaHome> User Home</NavLink> </li>

                    <li><NavLink to="/dashboard/others"> 
                    <FaCalendar></FaCalendar> Others</NavLink> </li>

                    <li><NavLink to="/dashboard/cart"> <FaShoppingCart></FaShoppingCart> My Cart ({card.length})</NavLink> </li>

                    <li><NavLink to="/dashboard/review"> <FaStreetView></FaStreetView> Review</NavLink> </li>

                    <li><NavLink to="/dashboard/paymentHistory"> <FaList></FaList>MyBooking & payHistory</NavLink> </li>
                        </>
                    }
                    
                        {/* divider Div */}
                    <div className="divider divider-warning"></div>
                    {/* Shired Option */}

                    <li><NavLink to="/"> 
                    <FaHome></FaHome> Home</NavLink> </li>

                    <li><NavLink to="/menu"> <IoMenuSharp></IoMenuSharp> Menu</NavLink> </li>

                </ul>
            </div>
            <div className="flex-1">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default DashBoard;