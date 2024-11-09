import React from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../../../components/buttons/BackButton";
const ProjectPageHeader = ({ project }) => {
  const navigate = useNavigate();
  return (
    <section className="flex text-white items-center px-2 sm:px-10 flex-wrap">
      <BackButton onClick={() => navigate("/")} />
      <h1 className="text-lightBlue text-2xl font-semibold mx-auto">
        {project.title}
      </h1>
      <div className="rounded-3xl bg-lightBlue text-white p-2 font-bold text-xl m-2">
        {project.status}
      </div>
    </section>
  );
};

export default ProjectPageHeader;
