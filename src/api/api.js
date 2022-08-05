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
   async getNotes(setNotes) {
      return await instance.get("note").then((res) => setNotes(res.data));
   },
   async addNote(title = "", body = "") {
      return await instance.post("note/create", {
         title,
         body,
      });
   },
   async deleteNote(id) {
      return await instance.delete(`note/delete?id=${id}`);
   },
   async changeNote(id, newTitle, newBody) {
      return await instance.put(`note/update?id=${id}`, {
         title: newTitle,
         body: newBody,
      });
   },
};

export const authAPI = {
   async login(username, password) {
      return await instanceForAuth.post("login", {
         username,
         password,
      });
   },
   async signup(username, password, email) {
      return await instanceForAuth.post("signup", {
         username,
         password,
         email,
      });
   },
};
