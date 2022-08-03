import React from "react";
import axios from "axios";
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Field, Form } from "formik";
import "./LoginForm.scss";
const LoginForm = ({ setIsLogin }) => {
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
         onSubmit={(values, { setSubmitting }) => {
            try {
               const fetchData = async () => {
                  axios
                     .post("http://localhost:8080/users/login", {
                        username: values.username,
                        password: values.password,
                     })
                     .then((res) => {
                        if (res.data.code === "200") {
                           setIsLogin(true);
                        }
                     });
               };
               fetchData();
            } catch (error) {
               console.log(error, "Ошибка при аутентификации");
            }
         }}
      >
         {({ values, errors, touched, handleSubmit, isSubmitting }) => {
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
                        placeholder="root"
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
                        placeholder="root"
                        error={errors.password && touched.password}
                        value={values.password}
                        className="Field"
                     />
                     <div className="ErrorBlock">
                        <ErrorMessage name="password">
                           {(msg) => <p>{msg}</p>}
                        </ErrorMessage>
                     </div>

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
