import React from "react";


const ButtonComponent = ({ 
  componentFrom,
  title,
  buttonName,
  className,
  type,
  clickFunction,
  btnDisable
}) => {


  return (
    <button
      type={type}
      className={`btn btn-primary ${className}`}
      onClick={clickFunction}
      title={title}
      disabled={btnDisable}
    >
      {buttonName}
    </button>
  );
};

export default ButtonComponent;
