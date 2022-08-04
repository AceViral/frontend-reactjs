import React, { useEffect, useState } from "react";
import Header from "./Header";
import CreateArea from "./CreateArea";
import Note from "./Note";
import { noteAPI } from "../api/api";
import { useNavigate } from "react-router-dom";

function MainApp() {
   const [notes, setNotes] = useState([]);
   const navigate = useNavigate();
   // Монтирование компонента
   useEffect(() => {
      try {
         if (!window.localStorage.getItem("token")) {
            navigate("/");
         }
         noteAPI.getNotes(setNotes);
      } catch (error) {
         console.log(error, "Ошибка при загрузке данных");
      }
   }, [setNotes, navigate]);

   // Функция добавления записки
   const addNote = (title = "", body = "") => {
      try {
         noteAPI.addNote(title, body);
         noteAPI.getNotes(setNotes);
      } catch (error) {
         console.log(error, "Ошибка при изменении");
      }
   };

   // Функция удаления записки
   const deleteNote = (id) => {
      try {
         noteAPI.deleteNote(id);
         setNotes(
            notes.filter((note) => {
               return note.id !== id;
            })
         );
      } catch (error) {
         console.log(error, "Ошибка при удалении");
      }
   };

   // Функция изменения записки
   const changeNote = (id, newTitle, newBody) => {
      try {
         if (newTitle === "" && newBody === "") {
            noteAPI.deleteNote(id);
            setNotes(
               notes.filter((note) => {
                  return note.id !== id;
               })
            );
         } else {
            noteAPI.changeNote(id, newTitle, newBody);
         }
      } catch (error) {
         console.log(error, "Ошибка при изменении");
      }
   };

   // Функции управления input и textarea
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
