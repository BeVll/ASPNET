import { useFormik } from "formik";
import React, { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { ICategoryCreate, ICategoryItem } from "./types";
import * as yup from "yup";
import classNames from "classnames";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import http from "../../../http";
import { APP_ENV } from "../../../env";
const CreateCategory = () => {

    const navigator = useNavigate();
    const [image, setImage] = useState<string>();
    const [list, setList] = useState<ICategoryItem[]>([]);

    
    useEffect(() => {
        http.get("api/Categories/list")
            .then(resp => {
                const data = resp.data;
                setList(data);
            });
    }, []);

    const initValues: ICategoryCreate = {
        name: "",
        image: new File(["fs"], "", {
            type: "text/plain"
        }),
        description: "",
        status: true,
        parentId: 0,
        priority: 0
    };

    const createSchema = yup.object({
        name: yup.string().required("Input name"),
        image: yup.mixed().required("Choose image"),
        description: yup.string().required("Input description"),
    });


    const onSubmitFormikData = (values: ICategoryCreate) => {
        const http2 = axios.create({
            baseURL: APP_ENV.BASE_URL,
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        console.log(values);
        const data = new FormData()
        data.append('image', values.image);
        data.append('name', values.name);
        data.append('description', values.description);
        data.append('priority', JSON.stringify(values.priority));
        data.append('parentId', JSON.stringify(Number(values.parentId)));
        http2.post("api/Categories/create", data).then(() => {
            navigator("/List");
            navigator(0);
        });
        console.log("post");
    }

    const clickSelect = () => {

        const myElement = document.getElementById("selectedFile") as HTMLInputElement;
        myElement.click();
        console.log(myElement);
    }

    const formik = useFormik({
        initialValues: initValues,
        validationSchema: createSchema,
        onSubmit: onSubmitFormikData
    });

    const changeImage = (event: ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.files);
        if (event.target.files) {
            console.log("set");
            formik.setFieldValue("image", event.target.files[0]);
            values.image = event.target.files[0];
            setImage(URL.createObjectURL(event.target.files[0]));
        }
    }

    const { values, errors, touched, handleSubmit, handleChange } = formik;

    return (
        <div className='pageList'>
            <div className='ListColumn'>
                <div className='tableHeader'>
                    <h2>Add category</h2>

                    <Link to="/List" className='btn btn-success'>

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
                    <label htmlFor="name" className="form-label">Parent category</label>
                        <select className="form-select" aria-label="Default select example" id="parentId" name="parentId" value={values.parentId} onChange={handleChange}>
                            <option selected>None</option>
                            {list.map(item => {
                                return (
                                    <option value={item.id}>{item.id} - {item.name}</option>
                                )
                            })}
                        </select>
                    </div>
                    <div className="mb-3">
                        <input type="file" id="selectedFile" className='selectInp' name="img" accept="image/*" onChange={changeImage}></input>
                        <input type="button" className='btn btn-primary btnSelect' value="Select image" onClick={clickSelect} />
                        <img className='selectedImg' src={image} height={100}></img>
                        {errors.name && touched.name && <div className="invalid-feedback">{errors.name}</div>}
                    </div>
                    <div className="form-floating mb-3">
                        <label htmlFor="description" className="form-label">Опис</label>
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

                    <button type="submit" className="btn btn-primary">
                        Add
                    </button>
                </form>
            </div>
        </div>
    );
};
export default CreateCategory;