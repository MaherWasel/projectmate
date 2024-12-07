import React from "react";
import MyProjectTile from "./MyProjectTile";

const MyProjectsList = ({ projects }) => {
  return (
    <div className="sm:w-[90vw] w-full px-2 sm:self-center items-center">
      {projects && projects.length > 0 ? (
        projects.map((project, index) => (
          <MyProjectTile
            key={project._id}
            order={index + 1}
            project={project}
          />
        ))
      ) : (
        <p className="text-center text-gray-500">No projects found.</p>
      )}
    </div>
  );
};

export default MyProjectsList;
