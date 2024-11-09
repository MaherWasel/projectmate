import React from "react";

const StepLabel = ({ stepNumber, label }) => {
  return (
    <div className="text-white flex items-center space-x-2">
      <h3 className="bg-lightBlue px-2 sm:px-3 sm:py-1 rounded-full text-xl ">
        {stepNumber}
      </h3>
      <h3 className="text-xl font-bold">{label}</h3>
    </div>
  );
};

export default StepLabel;
