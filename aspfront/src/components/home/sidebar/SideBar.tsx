import MenuItem from "./MenuItem";
import { http } from "../../../http";
import { AuthUserActionType, IAuthUser } from "../../auth/types";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { ISidebarProps } from "./types";
import { APP_ENV } from "../../../env";
export default function SideBar(props: ISidebarProps) {

    const dispatch = useDispatch();
    const { isAuth, user } = useSelector((store: any) => store.auth as IAuthUser);
    const navigator = useNavigate();

    const logout = () => {
        delete http.defaults.headers.common["Authorization"];
        localStorage.removeItem("token");
        dispatch({ type: AuthUserActionType.LOGOUT_USER });
        navigator("/login");
    }
    console.log("is Auth", isAuth);

    const bg = () => {
        return 'http://bevl.com/storage/images/users/' + user?.image;
    }
    return (
        <nav className="main-menu">

            <div className="p-2 d-flex logoBlock">
                <img src="/bevl2.png" alt="" height="50"></img>
            </div>

            <ul className="mt-5 menu">
                <MenuItem name="Dashboard" icon="fa fa-dashboard fa-2x" active={props.page == 1 ? "activeMenu" : ""} link="/"></MenuItem>
                <MenuItem name="Categories" icon="fa fa-th-large fa-2x" active={props.page == 2 ? "activeMenu" : ""} link="/categories"></MenuItem>
                <MenuItem name="Products" icon="fa fa-shopping-bag fa-2x" active={props.page == 3 ? "activeMenu" : ""} link="/products"></MenuItem>
                <MenuItem name="Users" icon="fa fa-user fa-2x" active={props.page == 4 ? "activeMenu" : ""} link="/users"></MenuItem>
                <MenuItem name="Orders" icon="fa fa-truck fa-2x" active={props.page == 5 ? "activeMenu" : ""} link=""></MenuItem>
            </ul>

            <ul className="logout">
                {isAuth ? (
                    <>

                        <li className="nav-item profile">
                            <a href="#">
                                <div className='iconMenu profileImg' style={{ backgroundImage: `url(${APP_ENV.BASE_URL+'images/100_' + user?.image})` }}>

                                </div>
                                <span className="nav-text email">
                                    {user?.email}
                                </span>
                                {/* <img className='profileImg' src={'http://bevl.com/storage/images/users/' + user?.image}></img> */}
                            </a>
                        </li>
                        <li className="nav-item log">
                            < li >

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
                            
                        </li>
                    </>
                ) : (
                    <></>
                )
                }

            </ul>

        </nav >
    );
}