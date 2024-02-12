import "./App.css";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Home from "./components/Home";
import Login from "./components/auth/Login";
import { auth } from "./firebase";
import { login, selectUser } from "./feature/userSlice";
import Updates from "./components/Updates";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import Articles from "./components/Articles.jsx";

import Navbar from "./components/Navbar";
function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        dispatch(
          login({
            userName: authUser.displayName,
            photo: authUser.photoURL,
            email: authUser.email,
            uid: authUser.uid,
          })
        );
      }
    });
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route
          exact
          path="/"
          element={
            user ? (
              <>
                <Navbar />
                <Home />
              </>
            ) : (
              <Login />
            )
          }
        ></Route>
        <Route
          path="/articles"
          element={
            user ? (
              <>
                <Navbar />
                <Articles />
              </>
            ) : (
              <Login />
            )
          }
        ></Route>
        <Route
          path="/updates"
          element={
            user ? (
              <>
                <Navbar />
                <Updates />
              </>
            ) : (
              <Login />
            )
          }
        ></Route>
      </Routes>
    </Router>
  );
}

export default App;
