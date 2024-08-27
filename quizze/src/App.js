import AppBar from "./Components/AppBarPage/AppBar";
import Login from "./Components/AuthenticationComponent/Login";
import Signup from "./Components/AuthenticationComponent/Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import userstore from "./ReduxStore/userStore";
function App() {
  return (
    <Provider store={userstore}>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Signup />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/dashboard" element={<AppBar />} />
          </Routes>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
