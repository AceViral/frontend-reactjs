import axios from "axios";

const instanceForAuth = axios.create({
   withCredentials: true,
   baseURL: "http://localhost:8080/",
});

const instance = axios.create({
   withCredentials: true,
   baseURL: "http://localhost:8080/v1/",
   headers: {
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
   },
});

export const noteAPI = {
   getNotes(setNotes) {
      return instance.get("note").then((res) => setNotes(res.data));
   },
   addNote(title = "", body = "") {
      return instance.post("note/create", {
         title,
         body,
      });
   },
   deleteNote(id) {
      return instance.delete(`note/delete?id=${id}`);
   },
   changeNote(id, newTitle, newBody) {
      return instance.put(`note/update?id=${id}`, {
         title: newTitle,
         body: newBody,
      });
   },
};

export const authAPI = {
   login(username, password) {
      return instanceForAuth.post("login", {
         username,
         password,
      });
   },
   signup(username, password, email) {
      return instanceForAuth.post("signup", {
         username,
         password,
         email,
      });
   },
};
