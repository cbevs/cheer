import React from "react";

const ErrorList = ({ errors }) => {
  const errantFields = Object.values(errors);
  if (errantFields.length > 0) {
    return (
      <div className="callout alert">
        <ul>
          <li>{errors.error}</li>
        </ul>
      </div>
    );
  } else {
    return "";
  }
};

export default ErrorList;
