import { useEffect, useState } from "react";
import { APP_ENV } from "../../../env";
import { http } from "../../../http";
import { IUserItem } from "./types";
import { Link, useNavigate } from "react-router-dom";
import { AuthUserActionType, IAuthUser } from "../../auth/types";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "bootstrap"
import SideBar from "../../home/sidebar/SideBar";

const UsersView = () => {
    const [list, setList] = useState<IUserItem[]>([]);
    const [isLoading, setLoading] = useState<boolean>(true);
    const [deleteId, setId] = useState<number>();
    const { isAuth, user } = useSelector((store: any) => store.auth as IAuthUser);
    const navigator = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = () => {
        http.get("api/Users/list")
            .then(resp => {
                const data = resp.data;

                setList(data);
                setLoading(false);
                console.log(data);
            });
    }

    const deleteConfirmed = () => {
        console.log(1);

        http.delete('api/Users/delete/' + deleteId)
            .then(() => {
                loadUsers();
            });
    }

    const deleteUser = (id: number) => {
        console.log(id);
        const myElement = document.getElementById("exampleModal") as HTMLElement;
        setId(id);
        const myModal = new Modal(myElement);
        myModal.show();
    }


    return (
        <div className="pageContent">
            <SideBar page={4} />
            {isLoading ? (
                <div className="loader-container">
                    <div className="spinner"></div>
                </div>
            ) : (
                <div className='pageList'>
                    <div className='ListColumn'>
                        <div className='tableHeader'>
                            <h2>Users</h2>
                            <Link to="create" className='btn btn-success'>
                                <i className='fa fa-2x fa-plus-circle'></i>
                                <span>Add</span>
                            </Link>
                        </div>
                        <table className="table listCategories">
                            <thead>
                                <tr>
                                    <th>
                                        <input type='checkbox' className='form-check-input allCheck'></input>
                                    </th>
                                    <th>
                                        Id
                                    </th>
                                    <th>
                                        Image
                                    </th>
                                    <th>
                                        FirstName
                                    </th>
                                    <th>
                                        LastName
                                    </th>
                                    <th>
                                        Email
                                    </th>
                                    <th>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>

                                {list ? (

                                    list.map((item: IUserItem) => (
                                        <tr key={item.id}>
                                            <td>
                                                <input type='checkbox' className='form-check-input'></input>
                                            </td>
                                            <td>
                                                {item.id}
                                            </td>
                                            <td>
                                                <img src={APP_ENV.BASE_URL + 'images/100_' + item.image} height={60}></img>
                                            </td>
                                            <td>
                                                {item.firstName}
                                            </td>
                                            <td>
                                                {item.lastName}
                                            </td>
                                            <td>
                                                {item.email}
                                            </td>
                                            <td>
                                                {user?.roles == "Admin" ? <a onClick={() => deleteUser(item.id)} ><i className='fa fa-trash btnDelete'></i></a> : null}
                                                
                                                <Link to={"/users/edit?id=" + item.id}><i className='fa fa-edit btnEdit'></i></Link>
                                            </td>

                                        </tr>
                                    ))

                                )
                                    :
                                    null}

                            </tbody>
                        </table>

                    </div>
                    <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Confirm delete</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>

                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" >Cancel</button>
                                    <button type="button" onClick={() => deleteConfirmed()} className="btn btn-primary" data-bs-dismiss="modal">Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            )}
        </div>
    );
};
export default UsersView;