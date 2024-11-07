import React from "react";
import arrow from "../../../assets/icons/arrow.svg";
import { useNavigate } from "react-router-dom";
const ProjectPageHeader = () => {
  const navigate = useNavigate();
  return (
    <section className="flex text-white items-center px-2 sm:px-10">
      <img
        src={arrow}
        onClick={() => navigate("/")}
        alt="arrowBack"
        className="rotate-180 h-8 sm:h-16 hover:cursor-pointer"
      />
      <h1 className="text-lightBlue text-2xl sm:text-5xl font-semibold mx-auto">
        Project Name
      </h1>
    </section>
  );
};

export default ProjectPageHeader;
