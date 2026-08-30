import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "./App.css";
import Body from "./components/Body";
import Login from "./components/Login";
import Profile from "./components/Profile/Profile";
import { Provider } from "react-redux";
import appStore from "./utils/appStrore";
import Feed from "./components/Feed";

function App() {
  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/" element={<Feed />} />
              {/* Login and Profile are child routes of Body component. 
            The Outlet component in Body will render the matched child route. */}
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
          </Routes>
          <Toaster />
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
