import React from "react";
import arrow from "../../../assets/icons/arrow.svg";
import { useNavigate } from "react-router-dom";

const MyProjectTile = ({ project, order }) => {
  const navigate = useNavigate();

  return (
    <section
      onClick={() => navigate(`/projects/${project.id}`)}
      className="flex sm:text-lg items-center justify-between bg-lightGray my-8  text-sm text-white rounded-lg cursor-pointer"
    >
      <span className="flex items-center">
        <div className="p-6 sm:p-8 font-bold bg-lightBlue rounded-l-lg rounded-tl-lg rounded-bl-lg">
          {order}
        </div>
        <div className="px-2 sm:px-8 sm:text-xl font-bold">{project.title}</div>
      </span>
      <span className="flex sm:pr-[8px]">
        <div className="px-4">Members</div>
        <div className=" text-lightBlue ">
          {project.members.length}/{project.maxMembers}
        </div>
        <img className="h-6 px-2 " src={arrow} alt="go_arrow" />
      </span>
    </section>
  );
};

export default MyProjectTile;
