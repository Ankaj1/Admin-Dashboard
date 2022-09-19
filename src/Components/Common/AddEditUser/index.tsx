import Offcanvas from "react-bootstrap/Offcanvas";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import { useState } from "react";

interface UserListType {
  id?: number;
  rating?: number;
  price: number;
  brand: string;
  description: string;
  name?: string;
  date?: string;
  title?: string;
  images: string[];
  length?: number;
  email?: string;
  gender?: string;
  age?: number;
}

interface IProps {
  toogleSidebar: () => void;
  show: boolean;
  AddUserNew: (user: any) => void;
  editUser: any;
  updateUser: any;
}

const AddEditUser = ({
  toogleSidebar,
  show,
  AddUserNew,
  editUser,
  updateUser,
}: IProps) => {
  const [data, setData] = useState<UserListType[]>([]);

  const initialValues = {
    firstName: `${editUser ? editUser.firstName : ""}`,
    email: `${editUser ? editUser.email : ""}`,
    gender: `${editUser ? editUser.gender : ""}`,
    username: `${editUser ? editUser.username : ""}`,
    age: `${editUser ? editUser.age : ""}`,
    images: "",
  };

  const CreateSchema = yup.object({
    firstName: yup.string().required("Required"),
    email: yup.string().required("Required"),
    gender: yup.string().required("Required"),
    username: yup.string().required("Required"),
    age: yup.string().required("Required"),
  });

  return (
    <>
      <div className="">
        <Offcanvas show={show} onHide={toogleSidebar} placement="end">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>
              {editUser ? "Edit User" : "Add User"}
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <div className="form">
              <Formik
                initialValues={initialValues}
                validationSchema={CreateSchema}
                enableReinitialize={true}
                onSubmit={(values: any) => {
                  // console.log("values ==> ", values);
                  // AddUserNew(values);
                  if (editUser) {
                    updateUser(values);
                  } else {
                    AddUserNew(values);
                  }
                }}
              >
                {({ errors, touched, handleChange, isValid, handleSubmit }) => (
                  <Form onSubmit={handleSubmit}>
                    <div className="form-group ">
                      <div className="file">
                        <label>Choose Image</label>
                        <div className="img-box">
                          <Field
                            type="file"
                            label="file"
                            placeholder="file"
                            name="images"
                            accpte="image/*"
                            onChange={(e: any) => {
                              console.log(
                                "onChange::",
                                e.target.name,
                                e.target.value
                              );
                              handleChange(e);
                            }}
                          />
                          <h4>Please select File</h4>
                          {errors.images && touched.images ? (
                            <div className="error">{errors.images}</div>
                          ) : null}
                        </div>
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Name</label>
                      <Field
                        type="text"
                        label="name"
                        placeholder="name"
                        autoComplete="off"
                        name="firstName"
                        onChange={(e: any) => {
                          console.log(
                            "onChange::",
                            e.target.name,
                            e.target.value
                          );
                          handleChange(e);
                        }}
                      />
                      {errors.firstName && touched.firstName ? (
                        <div className="error">{errors.firstName}</div>
                      ) : null}
                    </div>

                    <div className="form-group">
                      <label>Email</label>
                      <Field
                        type="email"
                        label="email"
                        placeholder="Email"
                        name="email"
                        onChange={(e: any) => {
                          console.log(
                            "onChange::",
                            e.target.name,
                            e.target.value
                          );
                          handleChange(e);
                        }}
                      />
                      {errors.email && touched.email ? (
                        <div className="error">{errors.email}</div>
                      ) : null}
                    </div>

                    <div className="form-group">
                      <label>Gender</label>
                      <Field
                        type="text"
                        label="Gender"
                        placeholder="Gender"
                        name="gender"
                        onChange={(e: any) => {
                          console.log(
                            "onChange::",
                            e.target.name,
                            e.target.value
                          );
                          handleChange(e);
                        }}
                      />
                      {errors.gender && touched.gender ? (
                        <div className="error">{errors.gender}</div>
                      ) : null}
                    </div>

                    <div className="form-group">
                      <label>Username</label>
                      <Field
                        type="text"
                        label="Username"
                        placeholder="Username"
                        name="username"
                        onChange={(e: any) => {
                          console.log(
                            "onChange::",
                            e.target.name,
                            e.target.value
                          );
                          handleChange(e);
                        }}
                      />
                      {errors.username && touched.username ? (
                        <div className="error">{errors.username}</div>
                      ) : null}
                    </div>

                    <div className="form-group">
                      <label>Age</label>
                      <Field
                        type="number"
                        label="Age"
                        placeholder="Age"
                        name="age"
                        onChange={(e: any) => {
                          console.log(
                            "onChange::",
                            e.target.name,
                            e.target.value
                          );
                          handleChange(e);
                        }}
                      />
                      {errors.age && touched.age ? (
                        <div className="error">{errors.age}</div>
                      ) : null}
                    </div>

                    <button type="submit" className="addbtn mt-2">
                      Submit
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
          </Offcanvas.Body>
        </Offcanvas>
      </div>
    </>
  );
};

export default AddEditUser;
