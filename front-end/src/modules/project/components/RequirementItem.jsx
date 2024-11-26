import React from "react";
import checkedBoxIcon from "../../../assets/icons/checkedBoxIcon.svg";
const RequirementItem = ({ requirement }) => {
  return (
    <div className="flex space-x-2 px-4 sm:px-8 space-y-2 items-center">
      <img src={checkedBoxIcon} alt="" className="h-5 sm:h-6" />
      <p className="text-lg sm:text-xl">{requirement}</p>
    </div>
  );
};

export default RequirementItem;
