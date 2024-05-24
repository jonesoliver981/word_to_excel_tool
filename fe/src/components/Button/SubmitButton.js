import React from "react";

const SubmitButton = ({ children, className,onClick }) => {
  return <button className={className} onClick={onClick}>{children}</button>;
};

export default SubmitButton;
