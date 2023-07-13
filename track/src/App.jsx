// import logo from "./logo.svg";
import "./App.css";
import { Login } from "./Login";
import Home from "./Home";
import { Route, Routes } from "react-router-dom";
// import { Register } from "./Register";

function App() {
  //   const [currentForm, setCurrentForm] = useState("login");

  //   const toggleForm = (formName) => {
  //     setCurrentForm(formName);
  //   };

  return (
    <div className="App">
      {/* <Login /> */}
      {/* <Home /> */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
