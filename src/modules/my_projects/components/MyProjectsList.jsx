import React from "react";
import MyProjectTile from "./MyProjectTile";

const MyProjectsList = ({ projects }) => {
  return (
    <div className="sm:w-[90vw] w-full px-2 sm:self-center items-center">
      {projects.map((project) => (
        <MyProjectTile key={project.id} order={project.id} project={project} />
      ))}
    </div>
  );
};

export default MyProjectsList;
