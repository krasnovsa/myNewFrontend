import React from "react";

const ErrorMessage = (props) => {
  const { message, style = 'danger'} = props;
 

return <div className={`alert alert-${style} mt3`}>
   {typeof message == 'string' && message}
   
    </div>;
};

export default ErrorMessage;
