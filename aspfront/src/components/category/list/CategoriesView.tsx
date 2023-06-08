import { useEffect, useState } from "react";
import { APP_ENV } from "../../../env";
import { http } from "../../../http";
import { ICategoryItem } from "./types";
import { Link } from "react-router-dom";

const CategoriesView = () => {
    const [list, setList] = useState<ICategoryItem[]>([]);
    const [isLoading, setLoading] = useState<boolean>(true);
    useEffect(() => {
        http.get("api/Categories/list")
            .then(resp => {
                const data = resp.data;

                setList(data);
                setLoading(false);
                console.log(data);
            });
    }, []);


    return (

        isLoading ? (
            <div className="loader-container">
                <div className="spinner"></div>
            </div>
        ) : (
            <div className='pageList'>
                <div className='ListColumn'>
                    <div className='tableHeader'>
                        <h2>Categories</h2>
                        <Link to="/Addcategory" className='btn btn-success'>
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
                                    Name
                                </th>
                                <th>
                                    Status
                                </th>
                                <th>
                                    Parent Id
                                </th>
                                <th>
                                    Description
                                </th>
                                <th>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            
                            {list ? (

                                list.map((item: ICategoryItem) => (
                                    <tr key={item.id}>
                                        <td>
                                            <input type='checkbox' className='form-check-input'></input>
                                        </td>
                                        <td>
                                            {item.id}
                                        </td>
                                        <td>
                                            <img src={APP_ENV.BASE_URL+'images/' + item.image} height={60}></img>
                                        </td>
                                        <td>
                                            {item.name}
                                        </td>
                                        <td>
                                            <text>{item.status}</text>
                                            {item.status == 1 ? <div className='ok'><span>Activated</span></div> : <div className='no'><span>Not working</span></div>}
                                        </td>
                                        <td>
                                            {item.parentId}
                                        </td>
                                        <td>
                                            {item.description}
                                        </td>
                                        <td>
                                            <a ><i className='fa fa-trash btnDelete'></i></a>
                                            <Link to={"/Editcategory?id=" + item.id}><i className='fa fa-edit btnEdit'></i></Link>
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
                                <button type="button" className="btn btn-primary" data-bs-dismiss="modal">Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    );
};
export default CategoriesView;