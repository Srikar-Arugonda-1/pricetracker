import { useState } from "react";
import { BsFillTrash3Fill, BsFillPencilFill } from "react-icons/bs";
import "./Home.css";
import { Icons } from "react-toastify";

const Home = ({ rows, delRow, editRow }) => {
  const [link, setLink] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Submitted link:", link);
  };

  const handleLinkChange = (event) => {
    setLink(event.target.value);
  };
  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  return (
    <div className="home-cont">
      <h1>Paste link here to add it to your Wishlist</h1>
      <form onSubmit={handleSubmit} className="form-link">
        <h2 style={{ textAlign: "left" }}>Link:</h2>
        <div className="form-floating mb-3">
          <input
            type="text"
            value={link}
            className="form-control"
            onChange={handleLinkChange}
            placeholder="Link"
            style={{ height: "70px" }}
            id="floatingInput"
            name="link"
            required
          />
          <label htmlFor="floatingInput">Link:</label>
        </div>
        <h2 style={{ textAlign: "left" }}>Price Limit:</h2>
        <div className="form-floating mb-3">
          <input
            type="number"
            value={price}
            className="form-control"
            onChange={handlePriceChange}
            style={{ height: "70px" }}
            placeholder="price"
            id="price"
            name="price"
            required
          />
          <label htmlFor="price">Price limit: </label>
        </div>

        <button className="btn btn-primary" type="submit">
          Submit
        </button>
      </form>

      <h2>Wishlist products</h2>
      <div className="table-wrap">
        <table className="price-table">
          <thead>
            <tr>
              <th className="">S.no</th>
              <th className="expand">Product Name</th>
              <th className="">Current Price</th>
              <th className="">Limit</th>
              <th className="">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => {
              return (
                <tr key={idx}>
                  <td>{row.sno}</td>
                  <td>{row.productname}</td>
                  <td>{row.currentprice}</td>
                  <td>{row.limit}</td>
                  <td className="action">
                    <BsFillTrash3Fill
                      className="btn-del"
                      onClick={() => delRow(idx)}
                    />
                    <BsFillPencilFill
                      className="btn-edit"
                      onClick={() => editRow(idx)}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
