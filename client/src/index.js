import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Home } from "./components/Home"
import LandingPage from './components/LandingPage';
import Recipes from './components/Recipes';
import DisplayAll from './components/DisplayAll';
import AddData  from './components/AddData';
import EditData from './components/EditData'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: "/landingPage",
    element: <LandingPage/>,
  },
  {
    path: "/recipe",
    element: <Recipes/>,
  },
  {
    path: "/displayAll",
    element: <DisplayAll/>,
  },
  {
    path: "/addData",
    element: <AddData/>,
  },
  {
    path: "/editData/:id",
    element: <EditData/>,
  },
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);
