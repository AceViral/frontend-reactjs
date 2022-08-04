import React, { useEffect } from "react";
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Field, Form } from "formik";
import "./LoginForm.scss";
import { useNavigate } from "react-router-dom";
import { authAPI } from "../../api/api";
const LoginForm = () => {
   const navigate = useNavigate();
   useEffect(() => {
      if (window.localStorage.getItem("token")) {
         navigate("/main");
      }
   }, [navigate]);
   return (
      <Formik
         initialValues={{
            username: "",
            password: "",
         }}
         validationSchema={Yup.object().shape({
            username: Yup.string().required("Please enter your username"),
            password: Yup.string().required("Please enter your password"),
         })}
         onSubmit={(values, { setSubmitting, setStatus }) => {
            try {
               authAPI.login(values.username, values.password).then((res) => {
                  if (res.data.status === 200) {
                     window.localStorage.setItem("token", res.data.data.token);
                     navigate("/", { replace: true });
                  }
               });
               setSubmitting(false);
            } catch (error) {
               setStatus(error);
               console.log(error, "Ошибка при аутентификации");
            }
         }}
      >
         {({ values, errors, status, touched, handleSubmit, isSubmitting }) => {
            return (
               <div className="LoginWrap">
                  <Form
                     name="contact"
                     method="post"
                     onSubmit={handleSubmit}
                     className="Form"
                  >
                     <h1>Login</h1>
                     <Field
                        type="username"
                        name="username"
                        autoComplete="username"
                        placeholder="Username"
                        error={errors.username && touched.username}
                        value={values.username}
                        className="Field"
                     />
                     <div className="ErrorBlock">
                        <ErrorMessage name="username">
                           {(msg) => <p>{msg}</p>}
                        </ErrorMessage>
                     </div>

                     <Field
                        type="password"
                        name="password"
                        autoComplete="password"
                        placeholder="Password"
                        error={errors.password && touched.password}
                        value={values.password}
                        className="Field"
                     />
                     <div className="ErrorBlock">
                        <ErrorMessage name="password">
                           {(msg) => <p>{msg}</p>}
                        </ErrorMessage>
                     </div>
                     <p>{status}</p>
                     <button
                        type="submit"
                        disabled={
                           (errors.username && touched.username) ||
                           (errors.password && touched.password)
                              ? true
                              : false
                        }
                        className="SubmitButton"
                        style={
                           (errors.username && touched.username) ||
                           (errors.password && touched.password)
                              ? {
                                   cursor: "auto",
                                   border: "2px solid #ff5050",
                                }
                              : {
                                   cursor: "pointer",
                                   border: "2px solid #2ecc71",
                                }
                        }
                     >
                        {isSubmitting ? `Submiting...` : `Submit`}
                     </button>
                  </Form>
               </div>
            );
         }}
      </Formik>
   );
};

export default LoginForm;
