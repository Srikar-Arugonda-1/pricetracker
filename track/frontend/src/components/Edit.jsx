import React, { useState } from "react";
import "./Edit.css";
const Edit = ({ closeBox, onSubmit, defaultValue }) => {
  const [formState, setFormState] = useState(
    defaultValue || {
      limit: "",
    }
  );

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formState);
    onSubmit(formState);
    closeBox();
  };
  return (
    <div
      className="edit-cont"
      onClick={(e) => {
        if (e.target.className === "edit-cont") {
          closeBox();
        }
      }}
    >
      <div className="edit">
        <h3>Edit Price limit</h3>
        <form>
          <div className="form-group">
            <label htmlFor="limit">Price Limit:</label>
            <input
              type="number"
              name="limit"
              value={formState.limit}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="butn" onClick={handleSubmit}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Edit;
