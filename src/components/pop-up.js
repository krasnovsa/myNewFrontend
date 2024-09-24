import React from "react";

const Popup = ({alertClass, alertMessage}) => {
    return (
      <div className={`alert alert-${alertClass}`} role="alert">
        {alertMessage}
      </div>
    );
  };
  
  export default Popup