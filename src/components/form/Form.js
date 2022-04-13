import React from "react";

const Form = (props) => {
  return (
    <div>
      <h2 style={{ padding: "1rem" }} className="text-center">
        {props.title}
      </h2>
      <form autocomplete="off">{props.children}</form>
    </div>
  );
};

export default Form;
