import React from "react";
import "./Note.scss";
import "boxicons";
const Note = ({
   title,
   body,
   id,
   changeNote,
   deleteNote,
   handleChangeBody,
   handleChangeTitle,
}) => {
   const [editMode, setEditMode] = React.useState(false);
   const modificate = () => {
      setEditMode(!editMode);
      if (editMode === true) changeNote(id, title, body);
   };
   return (
      <div className="note">
         {editMode ? (
            <>
               <div className="editTag">
                  <p>Edit mode</p>
               </div>
               <div className="titleWrap">
                  <textarea
                     value={title}
                     placeholder={title ? "" : "Take a title..."}
                     onChange={(e) => handleChangeTitle(id, e)}
                     rows={
                        Math.floor(title.length / 20) === 0
                           ? 1
                           : Math.floor(title.length / 20) + 1
                     }
                  />
               </div>
               <div className="textWrap">
                  <textarea
                     value={body}
                     onChange={(e) => handleChangeBody(id, e)}
                     placeholder={body ? "" : "Take a note..."}
                     rows={
                        Math.floor(body.length / 27) === 0
                           ? 1
                           : Math.floor(body.length / 27) + 1
                     }
                  />
               </div>
            </>
         ) : (
            <>
               <div className="titleWrap">
                  <h1>{title}</h1>
               </div>
               <div className="textWrap">
                  <p>{body}</p>
               </div>
            </>
         )}
         <div className="buttonBlock">
            <button onClick={() => deleteNote(id)}>
               <i className="bx bx-trash-alt"></i>
            </button>
            <button onClick={() => modificate()}>
               <i
                  className="bx bx-edit-alt"
                  style={{ color: editMode ? "#6f63ad" : "none" }}
               ></i>
            </button>
         </div>
      </div>
   );
};

export default Note;
