import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import Cookies from 'js-cookie'
import { toast } from 'react-toastify';

import { CustomUseLocationHook, useCustomNavigate, useSize } from "./components/CustomHooks";
import { handleBearerToken, handleClearErrors, handleOnlineOffilne, handleScreenSize } from "./Redux/Actions/Common_actions/Common_action";
import Login from "./views/common/Login";
import User_Layout from "./views/Users_dashboard/Main_layout/User_Layout";
import Homepage from "./views/Users_dashboard/Pages/Homepage";


const App = () => {
  const { isOnline, Err } = useSelector((state) => state.commonState);
  const sizer = useSize();
  const dispatch = useDispatch();
  const { token, user_id, role } = useSelector((state) => state.commonState);
  const navigate = useCustomNavigate();
  const location = CustomUseLocationHook();


  //initial state
  useEffect(() => {
    dispatch(handleOnlineOffilne(navigator.onLine))
    dispatch(handleScreenSize(sizer))
    dispatch(handleBearerToken(Cookies.get("token")))
  }, [])

  //error state
  useEffect(() => {
    if (Err) {
      toast(Err, {
        position: "top-right",
        type: 'error',
        onOpen: () => dispatch(handleClearErrors),
        autoClose: 1600
      })
      return
    }
  }, [Err])


  window.addEventListener('online', () => {
    dispatch(handleOnlineOffilne(true))
  });

  window.addEventListener('offline', () => {
    dispatch(handleOnlineOffilne(false))
  });



  useEffect(() => {
    if (!token) {
      navigate("/")
    }
  }, [token, user_id, role])


  return isOnline ?
    <HelmetProvider>
      <ToastContainer theme='light' />
      <Routes>
        {/* login page  */}
        <Route index element={<Login />} />

        <Route path="home">
          <Route element={<User_Layout />} >
            <Route index element={<Homepage />} />
          </Route>
        </Route>

        {/* not found  */}
        <Route path="*" element={<h1>Not found</h1>} />
      </Routes>
    </HelmetProvider >
    :
    <p>No internet connection</p>
}
export default App;