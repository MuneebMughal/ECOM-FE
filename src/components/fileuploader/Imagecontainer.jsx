import React from "react";
import { FaTimes } from "react-icons/fa";
import "./style.css";
const Imagecontainer = ({ Imgs,setImages }) => {
  const hanndleClick = (index)=>{
    setImages([...Imgs.slice(0,index),...Imgs.slice(index+1)])
  }
  return (
    <div className="imgs-container">
      {Imgs &&
        Imgs.map((Img, index) => (
          <div key={index} className="img-container">
            <div className="removeimg">
              <div className="times">
                <FaTimes style={{ color: "#ffffff" , margin:'5px'}} onClick={()=>hanndleClick(index)} />
              </div>
            </div>
            <img src={Img} alt={"Product Img"} className="imgFit" />
          </div>
        ))}
    </div>
  );
};

export default Imagecontainer;
