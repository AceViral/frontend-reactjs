import React, { useState } from "react";
import "boxicons";
import "./CreateArea.scss";
function CreateArea({ addNote }) {
   const [isExpanded, setExpanded] = useState(false);

   const [note, setNote] = useState({
      title: "",
      body: "",
   });

   function handleChange(e) {
      const { name, value } = e.target;
      setNote((preValue) => {
         return {
            ...preValue,
            [name]: value,
         };
      });
   }
   function handleExpanded() {
      setExpanded(true);
   }
   function submitButton(event) {
      addNote(note.title, note.body);
      setNote({
         title: "",
         body: "",
      });
      event.preventDefault();
      setExpanded(false);
   }
   const chooseTxt = async (e) => {
      e.preventDefault();
      const reader = new FileReader();
      reader.onload = async (e) => {
         const text = e.target.result;
         setNote({
            title: "",
            text: text,
            image: [],
         });
         setExpanded(true);
      };
      reader.readAsText(e.target.files[0]);
   };
   const chooseImg = (e) => {
      // if (e.target.files.length) {
      //    console.log(e.target.files);
      //    setNote({
      //       image: e.target.files[0],
      //    });
      // }
   };

   return (
      <div>
         <form className="createAreaForm">
            {note.body.length > 255 && (
               <div className="warnBlock">
                  <i className="bx bx-error-alt bx-tada"></i>
                  <h1>WARNING</h1>
                  <p>The size of the note should not exceed 255 characters</p>
               </div>
            )}
            {isExpanded && (
               <input
                  value={note.title}
                  type="text"
                  placeholder="Take a title..."
                  name="title"
                  onChange={handleChange}
               />
            )}
            <p>
               <textarea
                  value={note.body}
                  onClick={handleExpanded}
                  name="body"
                  placeholder="Take a note..."
                  onChange={handleChange}
                  rows={isExpanded ? 4 : 1}
               />
            </p>
            <div className="inputIMG inputFile">
               <input type="file" id="inputIMG" onChange={chooseImg} />
               <label htmlFor="inputIMG">
                  <i className="bx bx-image-add"></i>
               </label>
            </div>
            <div className="inputTXT inputFile">
               <input type="file" id="inputTXT" onChange={chooseTxt} />
               <label htmlFor="inputTXT">
                  <i className="bx bxs-file-txt"></i>
               </label>
            </div>
            <button
               onClick={submitButton}
               disabled={note.body === "" && note.title === "" ? true : false}
               style={
                  (note.body === "" && note.title === "") ||
                  note.body.length > 255
                     ? {
                          background: "#808080",
                          cursor: "auto",
                          transform: "rotate(45deg)",
                       }
                     : { background: "#6f63ad", cursor: "pointer" }
               }
               className="plusBtn"
            >
               <i className="bx bx-plus"></i>
            </button>
         </form>
      </div>
   );
}

export default CreateArea;
