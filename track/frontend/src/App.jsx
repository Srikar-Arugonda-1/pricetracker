// import logo from "./logo.svg";
import "./App.css";
import { Login } from "./Login";
import Home from "./Home";
import { Route, Routes } from "react-router-dom";
import Edit from "./components/Edit";
// import { Register } from "./Register";
import { useState } from "react";

function App() {
  const [boxOpen, setBoxOpen] = useState(false);
  const [rows, setRows] = useState([
    { sno: "1", productname: "camera", currentprice: "10000", limit: "9000" },
    { sno: "2", productname: "book", currentprice: "1000", limit: "900" },
    { sno: "3", productname: "pen", currentprice: "100", limit: "90" },
  ]);
  const [rowToEdit, setRowToEdit] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");

  const handleLogin = (email) => {
    setEmail(email);
    setLoggedIn(true);
  };

  const handleEditRow = (idx) => {
    setRowToEdit(idx);
    setBoxOpen(true);
  };

  const handleDeleteRow = (targetIdx) => {
    setRows(rows.filter((_, idx) => idx !== targetIdx));
  };

  const handleNewRow = (newrow) => {
    rowToEdit === null
      ? setRows([...rows, newrow])
      : setRows(
          rows.map((currRow, idx) => {
            if (idx !== rowToEdit) {
              return currRow;
            }
            return newrow;
          })
        );
    //   : setRows((prevRows) =>
    //       prevRows.map((currRow, idx) => (idx === rowToEdit ? newrow : currRow))
    //     );
  };

  return (
    <div className="App">
      {/* <Login /> */}
      {/* <Home /> */}
      <Routes>
        <Route
          path="/"
          element={<Login loggedIn={loggedIn} onLogin={handleLogin} />}
        />
        <Route
          path="/home"
          element={
            <Home
              rows={rows}
              delRow={handleDeleteRow}
              editRow={handleEditRow}
              loggedIn={loggedIn}
              email={email}
            />
          }
        />
      </Routes>
      {boxOpen && (
        <Edit
          closeBox={() => {
            setBoxOpen(false);
            setRowToEdit(null);
          }}
          onSubmit={handleNewRow}
          defaultValue={rowToEdit !== null && rows[rowToEdit]}
        />
      )}
    </div>
  );
}

export default App;
