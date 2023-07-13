import { useState } from "react";
import "./Home.css";

const Home = () => {
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
      <table
        style={{
          borderCollapse: "collapse",
          margin: "20px",
        }}
      >
        <thead>
          <tr>
            <th style={{ border: "1px solid white", padding: "8px" }}>S.no</th>
            <th style={{ border: "1px solid white", padding: "8px" }}>
              Product Name
            </th>
            <th style={{ border: "1px solid white", padding: "8px" }}>
              Current Price
            </th>
            <th style={{ border: "1px solid white", padding: "8px" }}>Limit</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
    </div>
  );
};

export default Home;
