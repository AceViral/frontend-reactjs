import React, { useEffect, useState } from "react";
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import { authAPI } from "../../api/api";
import {
   FormField,
   SignForm,
   SubmitButton,
   SignWrap,
} from "../../assets/SignStyles";
const SignupForm = () => {
   const [error, setError] = useState(false);
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
            username: Yup.string()
               .min(2, "Your username is too short")
               .max(255, "Too Long!")
               .required("Please enter your username"),
            email: Yup.string()
               .email("The email is incorrect")
               .max(255, "Too Long!")
               .required("Please enter your email"),
            password: Yup.string().required("Please enter your password"),
         })}
         onSubmit={(values, { setSubmitting }) => {
            try {
               authAPI
                  .signup(values.username, values.password, values.email)
                  .then((res) => {
                     if (res.data.status === 201) {
                        setError(false);
                        setSubmitting(false);
                        navigate("/login");
                     }
                  })
                  .catch((error) => {
                     setError(true);
                     setSubmitting(false);
                  });
            } catch (error) {
               console.log(error, "Ошибка при регистрации");
            }
         }}
      >
         {({ values, errors, touched, handleSubmit, isSubmitting }) => {
            return (
               <SignWrap>
                  <SignForm
                     name="contact"
                     method="post"
                     onSubmit={handleSubmit}
                     className="Form"
                  >
                     {error && (
                        <div
                           className="error"
                           onClick={() => {
                              setError(false);
                           }}
                        >
                           <i className="bx bx-error-alt bx-tada"></i>
                           <h1>WARNING</h1>
                           <p>The account has already been registered</p>
                        </div>
                     )}
                     <h1>Signup</h1>
                     <FormField
                        type="username"
                        name="username"
                        autoComplete="username"
                        placeholder="Username"
                        error={errors.username && touched.username}
                        value={values.username}
                     />
                     <div className="ErrorBlock">
                        <ErrorMessage name="username">
                           {(msg) => <p>{msg}</p>}
                        </ErrorMessage>
                     </div>
                     <FormField
                        type="email"
                        name="email"
                        autoComplete="email"
                        placeholder="Email"
                        error={errors.email && touched.email}
                        value={values.email}
                     />
                     <div className="ErrorBlock">
                        <ErrorMessage name="email">
                           {(msg) => <p>{msg}</p>}
                        </ErrorMessage>
                     </div>
                     <FormField
                        type="password"
                        name="password"
                        autoComplete="password"
                        placeholder="Password"
                        error={errors.password && touched.password}
                        value={values.password}
                     />
                     <div className="ErrorBlock">
                        <ErrorMessage name="password">
                           {(msg) => <p>{msg}</p>}
                        </ErrorMessage>
                     </div>
                     <SubmitButton
                        type="submit"
                        color={
                           (errors.email && touched.email) ||
                           (errors.password && touched.password) ||
                           (errors.username && touched.username)
                              ? "true"
                              : ""
                        }
                        disabled={
                           (errors.email && touched.email) ||
                           (errors.password && touched.password) ||
                           (errors.username && touched.username)
                              ? true
                              : false
                        }
                     >
                        {isSubmitting ? `Submiting...` : `Submit`}
                     </SubmitButton>
                     <div className="decriptionBlock">
                        <p>
                           if you already have an account:{" "}
                           <Link to="login">Login</Link>
                        </p>
                     </div>
                  </SignForm>
               </SignWrap>
            );
         }}
      </Formik>
   );
};

export default SignupForm;
