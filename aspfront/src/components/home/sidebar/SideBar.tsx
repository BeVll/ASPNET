import MenuItem from "./MenuItem";
import { http } from "../../../http";
import { AuthUserActionType, IAuthUser } from "../../auth/types";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

const Sidebar = () => {

    const dispatch = useDispatch();
    const { isAuth, user } = useSelector((store: any) => store.auth as IAuthUser);
    const navigator = useNavigate();

    const logout = () => {
        delete http.defaults.headers.common["Authorization"];
        localStorage.removeItem("token");
        dispatch({ type: AuthUserActionType.LOGOUT_USER });
        navigator("/login");
    }

    return (
        <nav className="main-menu">

            <div className="p-2 d-flex logoBlock">
                <img src="/bevl2.png" alt="" height="50"></img>
            </div>

            <ul className="mt-5 menu">

                <MenuItem name="Dashboard" icon="fa fa-dashboard fa-2x" active="activeMenu" link="/"></MenuItem>
                <MenuItem name="Categories" icon="fa fa-th-large fa-2x" active="" link="/List"></MenuItem>
                <MenuItem name="Products" icon="fa fa-shopping-bag fa-2x" active="" link=""></MenuItem>
            </ul>

            <ul className="logout">
                <li>
                    <Link to="/logout"
                        onClick={(e) => {
                            e.preventDefault();
                            logout();
                        }}>
                        <div className="iconMenu">
                            <i className="fa fa-power-off fa-2x"></i>
                        </div>
                        <span className="nav-text">
                            Logout
                        </span>
                    </Link>
                </li>
            </ul>

        </nav>
    );
};
export default Sidebar;