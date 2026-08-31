import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "./App.css";

import Body from "./components/Body";
import Login from "./components/Login";
import Profile from "./components/Profile/Profile";
import Feed from "./components/Feed";
import Connections from "./components/Connections";
import Requests from "./components/Requests";
import ProtectedRoute from "./components/ProtectedRoute";

import { Provider } from "react-redux";
import appStore from "./utils/appStrore";

function App() {
  return (
    <>
      <Provider store={appStore}>
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
      </Provider>
    </>
  );
}

export default App;
