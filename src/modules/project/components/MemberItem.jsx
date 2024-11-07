import React from "react";
import avatar from "../../../assets/icons/ProfileIcon.svg";

const MemberItem = ({ memberName }) => {
  return (
    <div className="flex space-x-2 px-4 sm:px-8 space-y-2 items-center">
      <img src={avatar} alt="Profile Icon" className="h-6 sm:h-8" />
      <p className="text-lg sm:text-xl">{memberName}</p>
    </div>
  );
};

export default MemberItem;
