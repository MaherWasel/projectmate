import React from "react";
// import avatar from "../../../assets/icons/ProfileIcon.svg";
import { useNavigate } from "react-router-dom";

const MemberItem = ({ member }) => {
  const navigate = useNavigate();
  return (
    <div className="flex space-x-2 px-4 sm:px-8 space-y-2 items-center">
      {/* fix image */}
      <img src={member.image.url} alt="Profile Icon" className="h-6 sm:h-8 w-6 sm:w-8 rounded-full overflow-hidden" />
      <p
        onClick={() => navigate("/profile/" + member.username)}
        className="text-lg sm:text-xl hover:underline hover:cursor-pointer"
      >
        {member.username}
      </p>
    </div>
  );
};

export default MemberItem;
