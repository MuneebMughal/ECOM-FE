import React from "react";
import { AiOutlinePlus } from "react-icons/ai";
import './cardbutton.css'
const CardButton = ({handleClick}) => {
  return (
    <div className="button-card-container">
      <div className="card-container">
        <div className="heading-container">
            <div className='heading' onClick={handleClick}>
                Add
            </div>
        </div>
        <div className="icon-container">
          <AiOutlinePlus />
        </div>
      </div>
    </div>
  );
};

export default CardButton;
