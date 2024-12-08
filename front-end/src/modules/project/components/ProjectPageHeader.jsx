import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BackButton from "../../../components/buttons/BackButton";

const statusOptions = [
  { value: "Not Started", color: "bg-lightGray" },
  { value: "In Progress", color: "bg-yellow-500" },
  { value: "Finished", color: "bg-green-500" },
];

const ProjectPageHeader = ({ project }) => {
  const navigate = useNavigate();
  const [selectedStatus, setSelectedStatus] = useState(project.status);

  const handleStatusChange = async (newStatus) => {
    try {
      const response = await axios.patch(
        `http://localhost:8080/projects/${project._id}`,
        {
          status: newStatus,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Assuming token-based authentication
          },
        }
      );

      if (response.status >= 200 && response.status < 300) {
        console.log("Status updated successfully");
        setSelectedStatus(newStatus);
      }
    } catch (error) {
      if (error.response?.status === 401) {
        // Handle unauthorized error by redirecting to login
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        navigate("/login");
        return;
      }
      alert("Error updating status:");
      // Optionally reset to the previous status if an error occurs
      setSelectedStatus(project.status);
    }
  };

  const currentStatusColor =
    statusOptions.find((option) => option.value === selectedStatus)?.color ||
    "bg-gray-500";

  return (
    <section className="flex text-white items-center px-2 sm:px-10 flex-wrap">
      <BackButton onClick={() => navigate("/home")} />
      <h1 className="text-lightBlue text-2xl font-semibold mx-auto">
        {project.title}
      </h1>
      {project.isLeader ? (
        <select
          className={`rounded-3xl text-white p-4  font-bold text-xl m-2 ${currentStatusColor}`}
          value={selectedStatus}
          onChange={(e) => handleStatusChange(e.target.value)}
        >
          {statusOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.value}
            </option>
          ))}
        </select>
      ) : (
        <div
          className={`rounded-3xl  font-bold text-xl m-2 p-4  ${currentStatusColor}`}
        >
          {selectedStatus}
        </div>
      )}
    </section>
  );
};

export default ProjectPageHeader;
