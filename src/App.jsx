import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Body from "./components/Body";
import Login from "./components/Login";
import Profile from "./components/Profile/Profile";
import Feed from "./components/Feed";
import Connections from "./components/Connections";
import Requests from "./components/Requests";
import ProtectedRoute from "./components/ProtectedRoute";
import { BASE_URL } from "./utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "./utils/userSlice";

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(BASE_URL + "/profile/view", {
          withCredentials: true,
        });

        dispatch(addUser(res.data));
      } catch (err) {
        console.log("User not logged in");
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body />}>
              {/* Protected Feed */}
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Feed />
                  </ProtectedRoute>
                }
              />

              {/* Login - Public */}
              <Route path="/login" element={<Login />} />

              {/* Protected Profile */}
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />

              {/* Protected Connections */}
              <Route
                path="/connections"
                element={
                  <ProtectedRoute>
                    <Connections />
                  </ProtectedRoute>
                }
              />

              {/* Protected Requests */}
              <Route
                path="/requests"
                element={
                  <ProtectedRoute>
                    <Requests />
                  </ProtectedRoute>
                }
              />
            </Route>
          </Routes>

          <Toaster />
        </BrowserRouter>
    </>
  );
}

export default App;
