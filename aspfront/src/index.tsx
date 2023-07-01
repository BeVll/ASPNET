import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import CategoriesView from './components/category/list/CategoriesView';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CreateCategory from './components/category/create/CreateCategory';
import RegistrationView from './components/auth/registration/RegistrationPage';
import LoginView from './components/auth/login/LoginView';
import { Provider } from 'react-redux';
import jwtDecode from "jwt-decode";
import { store } from "./store";
import { AuthUserActionType, IUser } from "./components/auth/types";
import { http } from "./http";
import EditCategory from './components/category/edit/EditCategory';
import DashboardView from './components/dashboard/DashboardView';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

if (localStorage.token) {
  http.defaults.headers.common['Authorization'] = `Bearer ${localStorage.token}`;
  const user = jwtDecode(localStorage.token) as IUser;
  store.dispatch({
    type: AuthUserActionType.LOGIN_USER, payload: {
      email: user.email,
      name: user.name,
      image: user.image,
      exp: user.exp,
      roles: user.roles
    } as IUser
  });
}

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<DashboardView />} />

          <Route path='categories'>
            <Route index element={<CategoriesView />} />
            <Route path="create" element={<CreateCategory />} />
            <Route path="edit" element={<EditCategory />} />
          </Route>

          <Route path="register" element={<RegistrationView />} />
          <Route path="login" element={<LoginView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
