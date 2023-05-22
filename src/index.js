import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'nprogress/nprogress.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Main from './pages/Main';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import FeePay from './pages/property/FeePay';
import FeeQuery from './pages/property/FeeQuery';
import Repair from './pages/property/Repair';
import Notice from './pages/property/Notice';
import Register from './pages/medical/Register';
import Tip from './pages/medical/Tip';
import Doctor from './pages/medical/Doctor';
import Door from './pages/intelligent/Door';
import ParkingSpace from './pages/intelligent/ParkingSpace';
import ParkingVehicle from './pages/intelligent/ParkingVehicle';
import ParkingRecord from './pages/intelligent/ParkingRecord';
import House from './pages/statistics/House';
import Fee from './pages/statistics/Fee';
import HouseInfo from './pages/baseinfo/HouseInfo';
import Resident from './pages/baseinfo/Resident';
import Device from './pages/baseinfo/Device';
import Map from './pages/baseinfo/Map';
import User from './pages/sysadmin/User';
import Role from './pages/sysadmin/Role';
import Privilege from './pages/sysadmin/Privilege';
import Dashboard from './pages/Dashboard';


let router = createBrowserRouter([
  {path:'/', element:<Login />, errorElement: <NotFound />},
  {path:'/login', element:<Login />},
  {
    path:'/admin', 
    element:<Main />,
    children:[
      {
        //此处path为空，则成为默认子页面，也即直接访问父路径，默认访问的就是这个子页面
        path:'',
        element:<Dashboard/>
      },
      {
        //path:'/main/property/fee/pay',
        path:'property/fee/pay',
        element:<FeePay/>
      },
      {
        path:'property/fee/query',
        element:<FeeQuery/>
      },
      {
        path:'property/repair',
        element:<Repair/>
      },
      {
        path:'property/notice',
        element:<Notice/>
      },
      {
        path:'medical/register',
        element:<Register/>
      },
      {
        path:'medical/tip',
        element:<Tip/>
      },
      {
        path:'medical/doctor',
        element:<Doctor/>
      },
      {
        path:'intelligent/door',
        element:<Door/>
      },
      {
        path:'intelligent/parking/space',
        element:<ParkingSpace/>
      },
      {
        path:'intelligent/parking/vehicle',
        element:<ParkingVehicle/>
      },
      {
        path:'intelligent/parking/record',
        element:<ParkingRecord/>
      },
      {
        path:'statistics/house',
        element:<House/>
      },
      {
        path:'statistics/fee',
        element:<Fee/>
      },
      {
        path:'baseinfo/house',
        element:<HouseInfo/>
      },
      {
        path:'baseinfo/resident',
        element:<Resident/>
      },
      {
        path:'baseinfo/device',
        element:<Device/>
      },
      {
        path:'baseinfo/map',
        element:<Map/>
      },
      {
        path:'sysadmin/user',
        element:<User/>
      },
      {
        path:'sysadmin/role',
        element:<Role/>
      },
      {
        path:'sysadmin/privilege',
        element:<Privilege/>
      }
    ]
  },
  {path:'*',element:<NotFound/>}

])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router} />
);

