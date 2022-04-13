import React from "react";
import "./form.css";
const FormField = (props) => {
  return (
    <div>
      <div className="form-group">
        <label className="formlabel">{props.label}</label>
        {props.field && props.field === "textarea" ? (
          <textarea
            rows="5"
            type="text"
            name={props.name}
            className="form-control"
            value={props.value}
            onChange={(e) => props.handleChange(e)}
          />
        ) : props.field && props.field === "select" ? (
            <select
              className="form-control"
              name={props.name}
              onChange={(e)=>props.handleChange(e)}
              value={props.value}
            >
              <option value="">Please Select </option>
              {props.options &&
                props.options.map((cat, index) => (
                  <option value={cat._id} key={index}>
                    {cat.name}
                  </option>
                ))}
            </select>
        ) : (
          <input
            type="text"
            name={props.name}
            className="form-control"
            value={props.value}
            onChange={(e) => props.handleChange(e)}
          />
        )}

        {props.error ? <small className="error">{props.error}</small> : ""}
      </div>
    </div>
  );
};

export default FormField;
