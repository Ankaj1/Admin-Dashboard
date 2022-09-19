import { Formik } from "formik";
// import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { loginData } from "../../Components/Layouts/Auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// interface responseType {
//   status: number;
// }

const Login = () => {
  const navigate = useNavigate();
  // const [token, setToken] = useState("");

  /*******  Formik  initialValues ******/
  const initialValues = {
    username: "",
    password: "",
  };

  /*******  Formik  LoginSchema ******/
  const LoginSchema = yup.object({
    // text: yup.string().text("Invalid Email").required("Required"),
    password: yup.string().required("Required"),
  });

  /*******  handlesubmit  Api Intigrate ******/
  const handlesubmit = async (values: any) => {
    const response = await loginData(values);
    console.log("response =======>", response);

    if (response.status === 200) {
      toast.success("Login Successfully !", {
        position: toast.POSITION.TOP_RIGHT,
      });
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } else {
      toast.error("Error !", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  return (
    <>
      <div className="login">
        <div className="formik-form">
          <h1>Admin</h1>
          <div className="forr-form">
            <Formik
              initialValues={initialValues}
              validationSchema={LoginSchema}
              enableReinitialize={true}
              onSubmit={(values) => handlesubmit(values)}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
                /* and other goodies */
              }) => (
                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    name="username"
                    onBlur={handleBlur}
                    value={values.username}
                    onChange={(e: any) => {
                      console.log("onChange::", e.target.name, e.target.value);
                      handleChange(e);
                    }}
                  />
                  {/* {errors.text && touched.text && errors.text} */}
                  <input
                    type="password"
                    name="password"
                    onChange={(e: any) => {
                      console.log("onChange::", e.target.name, e.target.value);
                      handleChange(e);
                    }}
                    onBlur={handleBlur}
                    value={values.password}
                  />
                  {errors.password && touched.password && errors.password}
                  <button type="submit" disabled={isSubmitting}>
                    Submit
                  </button>
                </form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
