import React from "react";
import avatar from "../../../assets/icons/ProfileIcon.svg";
import { useNavigate } from "react-router-dom";

const MemberItem = ({ member }) => {
  const navigate = useNavigate();
  return (
    <div className="flex space-x-2 px-4 sm:px-8 space-y-2 items-center">
      <img src={avatar} alt="Profile Icon" className="h-6 sm:h-8" />
      <p
        onClick={() => navigate("/profile/" + member.id)}
        className="text-lg sm:text-xl hover:underline hover:cursor-pointer"
      >
        {member.name}
      </p>
    </div>
  );
};

export default MemberItem;
