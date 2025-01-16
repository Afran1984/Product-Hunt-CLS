import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../Layouts/Main";
import Home from "../Pages/Home/Home/Home";
import Menu from "../Pages/Menu/Menu/Menu";
import Order from "../Pages/Order/Order/Order";
import Login from "../Pages/Login/login";
import SignUp from "../Pages/SignUp/SignUp";
import DashBoard from "../Layouts/DashBoard";
import Cart from "../Pages/AdmineDashboard/Cart/Cart";
import PrivateRoute from "./PrivateRoute";
import UpdateItem from "../Pages/AdmineDashboard/updateItem/updateItem";
import AllUsers from "../Pages/AdmineDashboard/AllUsers/AllUsers";
import AddItems from "../Pages/AdmineDashboard/AddItems/AddItems";
import AdminRoute from "./AdminRoute";
import ManageItem from "../Pages/AdmineDashboard/ManageItems/ManageItem";
import Payment from "../Pages/AdmineDashboard/Payment/Payment";
import PaymentHistory from "../Pages/AdmineDashboard/PaymentHistory/PaymentHistory";
import UserHome from "../Pages/AdmineDashboard/UserHome/UserHome";
import AdmineHome from "../Pages/AdmineDashboard/AdmineHome/AdmineHome";

 export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children: [
        {
            path: '/',
            element: <Home></Home>
        },
        {
          path: '/menu',
          element: <Menu></Menu>
        },
        {
          path: 'order/:category',
          element: <Order></Order>
        },
        {
          path: '/login',
          element: <Login></Login>
        },
        {
          path: 'signup',
          element: <SignUp></SignUp>
        }
      ]
    },
    {
      path: 'dashboard',
      element: <PrivateRoute> <DashBoard></DashBoard> </PrivateRoute> ,
      children: [
        // normal User
        {
          path: 'userHome',
          element: <UserHome></UserHome>
        },
        {
          path: 'cart',
          element: <Cart></Cart>
        },
        {
          path: 'payment',
          element: <Payment></Payment>
        },
        {
          path: 'paymentHistory',
          element: <PaymentHistory></PaymentHistory>
        },
        // admine Routs
        {
          path: 'adminHome',
          element: <AdminRoute><AdmineHome></AdmineHome></AdminRoute>
        },
        {
          path: 'addItems',
          element: <AdminRoute> <AddItems></AddItems> </AdminRoute>
        },
        {
          path: 'manageitems',
          element: <AdminRoute> <ManageItem></ManageItem> </AdminRoute>
        },
        {
          path: 'updateItem/:id',
          element: <AdminRoute> <UpdateItem></UpdateItem> </AdminRoute>,
          loader: ({params}) => fetch(`https://84-foodbar-server.vercel.app/menu/${params.id}`)
            
        },
        {
          path: 'users',
          element: <AdminRoute> <AllUsers></AllUsers> </AdminRoute>
        }
        
      ]
    }
  ]);