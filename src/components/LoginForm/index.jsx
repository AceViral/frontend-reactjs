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

const LoginForm = () => {
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
            password: "",
         }}
         validationSchema={Yup.object().shape({
            username: Yup.string().required("Please enter your username"),
            password: Yup.string().required("Please enter your password"),
         })}
         onSubmit={(values, { setSubmitting }) => {
            try {
               authAPI
                  .login(values.username, values.password)
                  .then((res) => {
                     if (res.data.status === 200) {
                        setError(false);
                        setSubmitting(false);
                        window.localStorage.setItem(
                           "token",
                           res.data.data.token
                        );
                        navigate("/");
                     }
                  })
                  .catch((error) => {
                     setError(true);
                     setSubmitting(false);
                  });
            } catch (error) {
               console.log(error, "Ошибка при аутентификации");
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
                           <p>
                              The username or password is not correct <br />
                              Try again
                           </p>
                        </div>
                     )}
                     <h1>Login</h1>
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
                           (errors.password && touched.password) ||
                           (errors.username && touched.username)
                              ? "true"
                              : ""
                        }
                        disabled={
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
                           If you want to signup: <Link to="/">Signup</Link>
                        </p>
                     </div>
                  </SignForm>
               </SignWrap>
            );
         }}
      </Formik>
   );
};

export default LoginForm;
