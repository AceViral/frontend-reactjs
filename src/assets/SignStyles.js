import styled from "styled-components";
import { Field, Form } from "formik";

export const SignWrap = styled.div`
   height: 100vh;
   display: flex;
   justify-content: center;
   align-items: center;
`;

export const SignForm = styled(Form)`
   width: 340px;
   padding: 40px 0;
   display: flex;
   flex-direction: column;
   align-items: center;
   background: #f3f3f3;
   color: #6f63ad;
   border-radius: 24px;
   -webkit-box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
   -moz-box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
   box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
   h1 {
      font-size: 20px;
      margin-bottom: 1vh;
   }
   .error {
      position: absolute;
      margin: 0;
      padding: 20px;
      width: 150px;
      -webkit-box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
      -moz-box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
      box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
      border-radius: 16px;
      transform: translateX(-160%) translateY(-10%);
      display: flex;
      flex-direction: column;
      align-items: center;
      font-family: monospace;
      cursor: pointer;
      i {
         font-size: 45px;
      }
      h1 {
         font-size: 1rem;
      }
      p {
         text-align: center;
         font-size: 1rem;
      }
   }
   .ErrorBlock {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 1vh;
      p {
         font-size: 13px;
         color: #808080;
      }
   }
   .decriptionBlock {
      p {
         font-size: 13px;
         a {
            text-decoration: none;
         }
      }
   }
`;

export const SubmitButton = styled.button`
   background: ${(props) => (!props.color ? "none" : "#808080")};
   display: block;
   color: ${(props) => (!props.color ? "#6f63ad" : "#000")};
   margin: 10px auto 7px auto;
   text-align: center;
   font-size: 15px;
   border: 2px solid ${(props) => (!props.color ? "#6f63ad" : "#808080")};
   padding: 14px 40px;
   outline: none;
   border-radius: 24px;
   transition: all 0.25s ease-in-out;
   cursor: ${(props) => (!props.color ? "pointer" : "auto")};
   font-family: "Roboto", sans-serif;
   &:hover {
      color: #000;
      background: ${(props) => (!props.color ? "#6f63ad" : "#808080")};
   }
`;

export const FormField = styled(Field)`
   background: transparent;
   display: block;
   margin: 10px auto;
   text-align: center;
   border: 2px solid #808080;
   color: #6f63ad;
   padding: 14px 10px;
   width: 200px;
   outline: none;
   border-radius: 24px;
   transition: 0.25s;
   &:hover,
   &:focus {
      width: 230px;
      border-color: #6f63ad;
   }
`;
