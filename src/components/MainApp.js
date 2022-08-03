import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "./Header";
import Count from "./Count";
import CreateArea from "./CreateArea";
import Note from "./Note";

function MainApp() {
   const [notes, setNotes] = useState([]);
   const hostUrl = "http://localhost:8080/v1/";

   const signup = async () => {
      try {
         const fetchData = async () => {
            axios.post(
               `http://localhost:8080/signup`,
               {
                  username: "root1",
                  password: "root1",
                  email: "test1@mail.ru",
               },
               { withCredentials: true }
            );
         };
         fetchData();
      } catch (error) {
         console.log(error, "Ошибка при регистрации");
      }
   };

   useEffect(() => {
      try {
         getNotes();
         signup();
      } catch (error) {
         console.log(error, "Ошибка при загрузке данных");
      }
   }, [setNotes]);

   const getNotes = async () => {
      await axios
         .get(hostUrl + "note", {
            headers: {
               Authorization: "GevuhUhKh5mjifmAfyq8rv9u4LIxGhGy",
            },
         })
         .then((res) => {
            setNotes(res.data);
         });
   };
   const deleteNoteFunction = async (id) => {
      await axios.delete(hostUrl + `note/delete?id=${id}`);
      setNotes(
         notes.filter((note) => {
            return note.id !== id;
         })
      );
   };
   const deleteNote = (id) => {
      try {
         deleteNoteFunction(id);
      } catch (error) {
         console.log(error, "Ошибка при удалении");
      }
   };
   const changeNote = (id, newTitle, newBody) => {
      try {
         if (newTitle === "" && newBody === "") {
            deleteNoteFunction(id);
         } else {
            const fetchData = async () => {
               await axios.patch(hostUrl + `note/update?id=${id}`, {
                  title: newTitle,
                  body: newBody,
               });
            };
            fetchData();
         }
      } catch (error) {
         console.log(error, "Ошибка при изменении");
      }
   };
   const addNote = (title = "", body = "") => {
      try {
         const fetchData = async () => {
            axios.post(hostUrl + `note/create`, {
               title: title,
               body: body,
            });
         };
         fetchData();
         getNotes();
      } catch (error) {
         console.log(error, "Ошибка при изменении");
      }
   };
   const handleChangeBody = (id, e) => {
      setNotes(
         notes.map((note) =>
            note.id === id ? { ...note, body: e.target.value } : note
         )
      );
   };
   const handleChangeTitle = (id, e) => {
      setNotes(
         notes.map((note) =>
            note.id === id ? { ...note, title: e.target.value } : note
         )
      );
   };

   return (
      <div className="App">
         <Header />
         <Count
            count={
               notes.length === 0
                  ? "Empty"
                  : `Showing ${notes.length} Notes in Database`
            }
         />
         <CreateArea addNote={addNote} />
         {notes.map((note) => (
            <Note
               key={note.id}
               title={note.title}
               body={note.body}
               id={note.id}
               changeNote={changeNote}
               deleteNote={deleteNote}
               handleChangeBody={handleChangeBody}
               handleChangeTitle={handleChangeTitle}
            />
         ))}
      </div>
   );
}
export default MainApp;
