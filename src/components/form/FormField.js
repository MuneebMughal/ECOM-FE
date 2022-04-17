import React, { useState } from "react";
import { fieldName } from "../../actions/constants";
const FormField = (props) => {
  const [error, setError] = useState(false);
  if (!props.field || !fieldName.hasOwnProperty(props.field)) {
    return (
      <div className="form-group">
        <div className="form-control redBorder">
          <div className="error">Invalid or Missing Field Name</div>
        </div>
      </div>
    );
  }
  const validate = (value) => {
    if (props.required) {
      if (!value) {
        props.setErrors({
          ...props.errors,
          [props.name]: `${
            props.name[0].toUpperCase() + props.name.slice(1)
          } is required.`,
        });
        setError(true);
        return;
      }
    }
    if (props.minlength) {
      if (value.length > 0 && value.length < props.minlength) {
        props.setErrors({
          ...props.errors,
          [props.name]: `${
            props.name[0].toUpperCase() + props.name.slice(1)
          } should be atleat ${props.minlength} long.`,
        });
        setError(true);
        return;
      }
    }
    setError(false);
    props.setErrors({ ...props.errors, [props.name]: "" });
  };
  const handleChange = (e) => {
    props.handleChange(e);
    validate(e.target.value);
  };
  return (
    <div>
      <div className="form-group">
        <label className="formlabel">{props.label}</label>
        {props.field ? (
          props.field === fieldName.select ? (
            <props.field
              className={error ? "form-control redBorder" : "form-control"}
              name={props.name}
              onChange={(e) => props.handleChange(e)}
              value={props.value}
              required={props.required}
              onBlur={validate}
            >
              <option value="">Please Select </option>
              {props.options &&
                props.options.map((opt, index) => (
                  <option value={opt._id} key={index}>
                    {opt.name}
                  </option>
                ))}
            </props.field>
          ) : (
            <props.field
              rows={props.rows || null}
              type={props.type || "text"}
              name={props.name}
              className={error ? "form-control redBorder" : "form-control"}
              value={props.value}
              onChange={handleChange}
              required={props.required}
              onBlur={() => validate(props.value)}
            />
          )
        ) : (
          <input
            type="text"
            name={props.name}
            className={error ? "form-control redBorder" : "form-control"}
            value={props.value}
            onChange={(e) => props.handleChange(e)}
            required={props.required}
            onBlur={validate}
          />
        )}

        {error ? (
          <small className="error">{props.errors[props.name]}</small>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default FormField;
