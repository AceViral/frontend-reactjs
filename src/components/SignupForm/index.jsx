import React, { useEffect } from "react";
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Field, Form } from "formik";
import "./SignupForm.scss";
import { useNavigate, Link } from "react-router-dom";
import { authAPI } from "../../api/api";
const SignupForm = () => {
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
            email: "",
            password: "",
         }}
         validationSchema={Yup.object().shape({
            username: Yup.string().required("Please enter your username"),
            email: Yup.string().required("Please enter your email"),
            password: Yup.string().required("Please enter your password"),
         })}
         onSubmit={(values, { setSubmitting }) => {
            try {
               authAPI
                  .signup(values.username, values.password, values.email)
                  .then((res) => {
                     if (res.data.status === 201) {
                        navigate("/login");
                        setSubmitting(false);
                     }
                  });
            } catch (error) {
               console.log(error, "Ошибка при регистрации");
            }
         }}
      >
         {({ values, errors, touched, handleSubmit, isSubmitting }) => {
            return (
               <div className="SignupWrap">
                  <Form
                     name="contact"
                     method="post"
                     onSubmit={handleSubmit}
                     className="Form"
                  >
                     <h1>Signup</h1>
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
                        type="email"
                        name="email"
                        autoComplete="email"
                        placeholder="Email"
                        error={errors.email && touched.email}
                        value={values.email}
                        className="Field"
                     />
                     <div className="ErrorBlock">
                        <ErrorMessage name="email">
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

                     <button
                        type="submit"
                        disabled={
                           (errors.username && touched.username) ||
                           (errors.password && touched.password) ||
                           (errors.email && touched.email)
                              ? true
                              : false
                        }
                        className="SubmitButton"
                        style={
                           (errors.username && touched.username) ||
                           (errors.password && touched.password) ||
                           (errors.email && touched.email)
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
                     <div className="decriptionBlock">
                        <p>
                           if you already have an account:{" "}
                           <Link to="login">Login</Link>
                        </p>
                     </div>
                  </Form>
               </div>
            );
         }}
      </Formik>
   );
};

export default SignupForm;
