import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Outlet } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
import Sidebar from './components/home/sidebar/SideBar';
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthUserActionType, IAuthUser } from "./components/auth/types";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "bootstrap"
import { http } from './http';

function App() {

  const { isAuth, user } = useSelector((store: any) => store.auth as IAuthUser);
  const [deleteId, setId] = useState<number>();
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const [authed, setAuth] = useState<boolean>(false); 

  useEffect(() => {
    if (isAuth) {
      if (user != undefined) {
        var t1 = new Date(user?.exp * 1000);
        var t2 = new Date(Date.now());
        if (t1 < t2) {
          logout();
        }
      }
    }
    else {
      navigator('/login');
    }
  },[])

  const logout = () => {
    delete http.defaults.headers.common["Authorization"];
    localStorage.removeItem("token");
    dispatch({ type: AuthUserActionType.LOGOUT_USER });
    navigator("/login");
  }

  return (
    <div className="App">
      <Outlet></Outlet>
    </div>
  );
}

export default App;
