import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { IUser, IUserItem } from "./types";
import * as yup from "yup";
import { useFormik } from "formik";
import classNames from "classnames";
import { formHttp, http } from "../../../http";
import { useState, ChangeEvent, useEffect } from "react";
import { APP_ENV } from "../../../env";

const EditUser = () => {

  const navigator = useNavigate();

  useEffect(() => {
    setLoading(true);
    loadRoles();
    getUsers();
  }, [])
  const [searchParams, setSearchParams] = useSearchParams();
  const [message, setMessage] = useState<string>("");
  const [isLoading, setLoading] = useState<boolean>();
  const [image, setImage] = useState<string>();
  const [roles, setRoles] = useState<string[]>([]);

  const initValues: IUser = {
    email: "",
    image: undefined,
    firstName: "",
    lastName: "",
    role: ""
  };
  const createSchema = yup.object({
    email: yup
      .string()
      .required("Enter name")
      .email("Wrong email"),
    image: yup.mixed().required("Choose image"),
    firstName: yup.string().required("Enter Firstname").min(2),
    lastName: yup.string().required("Enter Lastname").min(2)
  });

  const getUsers = () => {
    console.log("id: " + searchParams.get('id'));
    http.get('api/Users/' + searchParams.get('id'))
      .then((res) => res.data)
      .then(async (json) => {
        setLoading(false);
        setImage(APP_ENV.BASE_URL + "images/300_" + json.image)
        if (json.status == 1)
          json.status = true;
        else if (json.status == 0)
          json.status = false;
        formik.setValues(json);
        console.log("values ", values);

      })
  }

  const loadRoles = () => {

    http.get("api/Roles")
      .then(resp => {
        const data = resp.data;

        setRoles(data);
        console.log(data);
      });
  }


  const onSubmitFormikData = (values: IUser) => {
    console.log("das" + values.image);
    setLoading(true);
    formHttp.put("api/Users/edit", values).then(() => {
        navigator("..");
        navigator(0);
    });
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
        console.log(values);
        values.image = event.target.files[0];
        setImage(URL.createObjectURL(event.target.files[0]));
        formik.setFieldValue("imgChange", true);
    }
}

  const { values, errors, touched, handleSubmit, handleChange } = formik;

  return (
    isLoading ? (
      <div className="loader-container">
        <div className="spinner"></div>
      </div>
    ) : (
      <div className='pageList'>
        <div className='ListColumn'>
          <div className='tableHeader'>
            <h2>Create user</h2>

            <Link to=".." className='btn btn-success'>

              <i className='fa fa-2x fa-chevron-circle-left '></i>
              <span>Back</span>
            </Link>
          </div>


          <form onSubmit={handleSubmit}>
            {message && (
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            )}
            <div className="mb-2">
              <input type="file" id="selectedFile" className='selectInp' name="img" accept="image/*" onChange={changeImage}></input>
              <input type="button" className='btn btn-primary btnSelect' value="Select image" onClick={clickSelect} />
              <img className='selectedImg' src={image} height={100}></img>
              {values.image === undefined ? (
                <div className="img">Choose image</div>
              ) : <></>}
            </div>

            <div className="mb-2">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className={classNames("form-control", {
                  "is-invalid": errors.email && touched.email,
                })}
                id="email"
                name="email"
                value={values.email}
                onChange={handleChange}
              />
              {errors.email && touched.email && (
                <div className="invalid-feedback">{errors.email}</div>
              )}
            </div>
            <div className="mb-2">
              <label htmlFor="name" className="form-label">
                Firstname
              </label>
              <input
                type="text"
                className={classNames("form-control", {
                  "is-invalid": errors.firstName && touched.firstName,
                })}
                id="firstName"
                name="firstName"
                value={values.firstName}
                onChange={handleChange}
              />
              {errors.firstName && touched.firstName && (
                <div className="invalid-feedback">{errors.firstName}</div>
              )}
            </div>
            <div className="mb-2">
              <label htmlFor="lastName" className="form-label">
                Lastname
              </label>
              <input
                type="text"
                className={classNames("form-control", {
                  "is-invalid": errors.lastName && touched.lastName,
                })}
                id="lastName"
                name="lastName"
                value={values.lastName}
                onChange={handleChange}
              />
              {errors.lastName && touched.lastName && (
                <div className="invalid-feedback">{errors.lastName}</div>
              )}
            </div>
            
            <div className="mb-3">
              <label htmlFor="role" className="form-label">Role</label>
              <select className="form-select" aria-label="Default select example" id="role" name="role" value={values.role} onChange={handleChange} >
                <option value="None">None</option>
                {roles.map(item => {
                  return (
                    <option value={item} >{item}</option>
                  )
                })}
              </select>
            </div>
            <button type="submit" className="btn btn-primary">
              Save
            </button>
          </form>
        </div>
      </div>
    )
  );

};
export default EditUser;