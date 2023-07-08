import { useFormik } from "formik";
import React, { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { ICategoryItem, IProductCreate, IUploadImage, IUploadImageResult, } from "./types";
import * as yup from "yup";
import classNames from "classnames";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { formHttp, http } from "../../../http";
import { APP_ENV } from "../../../env";
import { AuthUserActionType, IAuthUser } from "../../auth/types";
import { useDispatch, useSelector } from "react-redux";
import add from "../../../assets/add.jpg";

const CreateProduct = () => {

    const navigator = useNavigate();
    const [images, setImages] = useState<IUploadImageResult[]>([]);
    const [list, setList] = useState<ICategoryItem[]>([]);
    const { isAuth, user } = useSelector((store: any) => store.auth as IAuthUser);

    useEffect(() => {
        formHttp.get("api/Categories/list")
            .then(resp => {
                const data = resp.data;
                setList(data);
            });

        const updatedImagesId = images.map((image) => image.id);
        setFieldValue('imagesId', updatedImagesId);
    }, [images]);

    const initValues: IProductCreate = {
        name: '',
        description: '',
        price: 0,
        discountPrice: 0,
        categoryId: 0,
        imagesId: [],
        priority: 0,
        status: true
    };

    const updateImages = (newImages: IUploadImageResult[]) => {
        setImages(newImages);
    };

    const updateParentID = (id: number) => {
        setFieldValue('categoryId', id);
    };

    const createSchema = yup.object({
        name: yup.string().required("Input name"),
        description: yup.string().required("Input description"),
    });

    const onSubmitFormikData = (values: IProductCreate) => {
        console.log(values);
        formHttp.post('api/products', values, {
        })
            .then(resp => {
                navigator("..");
            })
        navigator("..");
    }

    const formik = useFormik({
        initialValues: initValues,
        validationSchema: createSchema,
        onSubmit: onSubmitFormikData
    });

    const onChangeImageHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            const file = files[0];
            const allowTypes = ["image/jpeg", "image/png", "image/jpg"];
            if (!allowTypes.includes(file.type)) {
                alert("Невірний формат файлу");
                return;
            }
            const upload: IUploadImage = {
                image: file
            }
            formHttp.post('api/products/UploadImage', upload, {
            })
                .then(resp => {
                    setImages([...images, resp.data]);
                })
                .catch(bad => {
                    console.log("Bad request", bad);
                })

        }

    }

    const onDeleteImageHandler = async (id: number) => {
        try {
            await http.delete(`api/products/DeleteImage/${id}`);
            setImages(images?.filter(x => x.id !== id));
        } catch {
            console.log("Delete bad request");
        }
    }
    const { values, errors, touched, handleSubmit, handleChange, setFieldValue } = formik;

    return (
        <div className='pageList'>
            <div className='ListColumn'>
                <div className='tableHeader'>
                    <h2>Add product</h2>

                    <Link to=".." className='btn btn-success'>

                        <i className='fa fa-2x fa-chevron-circle-left '></i>
                        <span>Back</span>
                    </Link>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input
                            type="text"
                            className={classNames("form-control", { "is-invalid": errors.name && touched.name })}
                            id="name"
                            name="name"
                            value={values.name}
                            onChange={handleChange}
                        />
                        {errors.name && touched.name && <div className="invalid-feedback">{errors.name}</div>}

                    </div>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Priority</label>
                        <input
                            type="number"
                            className="form-control"
                            id="priority"
                            name="priority"
                            value={values.priority}
                            onChange={handleChange}
                        />
                        {errors.name && touched.name && <div className="invalid-feedback">{errors.name}</div>}

                    </div>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Price</label>
                        <input
                            type="number"
                            className="form-control"
                            id="price"
                            name="price"
                            value={values.price}
                            onChange={handleChange}
                        />
                        {errors.price && touched.price && <div className="invalid-feedback">{errors.price}</div>}

                    </div>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Discount price</label>
                        <input
                            type="number"
                            className="form-control"
                            id="discountPrice"
                            name="discountPrice"
                            value={values.discountPrice}
                            onChange={handleChange}
                        />
                        {errors.discountPrice && touched.discountPrice && <div className="invalid-feedback">{errors.discountPrice}</div>}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Category</label>
                        <select className="form-select" aria-label="Default select example" id="categoryId" name="categoryId" value={values.categoryId} onChange={handleChange}>
                            <option selected>None</option>
                            {list.map(item => {
                                return (
                                    <option value={item.id}>{item.id} - {item.name}</option>
                                )
                            })}
                        </select>
                    </div>
                    <div className="mb-3">
                        <div className="col position-relative">
                            <div className="imgUp">

                                <label className="btn btn-primary">
                                    Upload
                                    <input
                                        type="file"
                                        className="uploadFile img"
                                        onChange={onChangeImageHandler}
                                        style={{ width: '0px', height: '0px', overflow: 'hidden' }}
                                    />
                                </label>
                            </div>
                        </div>
                        {images.map((img) => (
                            <>
                                <div className="col position-relative">
                                    <div className="imgUp">
                                        <div className="imagePreview align-items-center">
                                            <img
                                                src={`${APP_ENV.BASE_URL}images/300_` + img.path}
                                                className="img-fluid"
                                                alt="Зображення"
                                                style={{ height: '100%', maxHeight: "120px", overflow: 'hidden' }}
                                            />
                                            <div className="top-0" style={{ right: 12 }}>
                                                <button onClick={() => onDeleteImageHandler(img.id)} className="btn p-0 btn-outline-danger border-0 deletebutton" style={{ width: 27 }}>

                                                    <i className="fa fa-trash" aria-hidden="true" style={{ fontSize: 20 }}></i>
                                                </button>
                                            </div>
                                        </div>




                                    </div>
                                </div>

                            </>
                        ))}
                    </div>
                    <div className="form-floating mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                        <textarea
                            className={classNames("form-control", { "is-invalid": errors.description && touched.description })}
                            placeholder="Вкажіть опис"
                            id="description"
                            name="description"
                            style={{ height: "100px" }}
                            value={values.description}
                            onChange={handleChange}
                        ></textarea>
                        {errors.description && touched.description && <div className="invalid-feedback">{errors.description}</div>}

                    </div>
                    <div className="mb-3 form-check form-switch">

                        <input type="checkbox" className="form-check-input" onChange={handleChange} checked={values.status} id="status">

                        </input>
                        <label htmlFor="status" className="form-label">Status</label>
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Add
                    </button>
                </form>
            </div>
        </div>
    );
};
export default CreateProduct;