import React, { useState } from "react";
import axios from "axios";
import Button from "../../../components/buttons/SubmitButton";
import avatar from "../../../assets/icons/ProfileIcon.svg";
import { useNavigate } from "react-router-dom";

const JoinRequestsList = ({ project }) => {
  const [loadingId, setLoadingId] = useState(null);
  const navigate = useNavigate();

  const onAccept = async (requestId) => {
    setLoadingId(requestId);
    try {
      const response = await axios.patch(
        `${"http://localhost:8080"}/projects/${project._id}/joinRequests`,
        { username: requestId, accept: true },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200) {
        alert("Request accepted successfully.");
        window.location.reload(); // Refresh the page
      } else {
        alert("Unexpected server response.");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        navigate("/login");
        console.error("Unauthorized: Redirecting to login.");
        localStorage.removeItem("token");
      }
      console.error("Error during Accept:", error);
      alert("Failed to accept the request.");
    } finally {
      setLoadingId(null);
    }

    const onDecline = async (requestId) => {
      setLoadingId(requestId);
      try {
        const response = await axios.patch(
          `${"http://localhost:8080"}/projects/${project._id}/joinRequests`,
          { username: requestId, accept: false },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.status === 200) {
          alert("Request declined successfully.");
          window.location.reload();
        } else {
          alert("Unexpected server response.");
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          navigate("/login");
          console.error("Unauthorized: Redirecting to login.");
          localStorage.removeItem("token");
        }
        console.error("Error during Decline:", error);
        alert("Failed to decline the request.");
      } finally {
        setLoadingId(null);
      }
    };

    return (
      <section className="mt-6 px-4 sm:px-10 py-6 sm:py-12">
        <h3 className="text-xl sm:text-3xl font-semibold mb-4">
          Join Requests
        </h3>
        {project.joinRequests.length === 0 ? (
          <p className="text-gray-400">No join requests at the moment.</p>
        ) : (
          <div className="space-y-4">
            {project.joinRequests.map((request) => (
              <div
                key={request._id}
                className="flex flex-col sm:flex-row  sm:items-center justify-between bg-gray-800 rounded-lg p-4"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={request.userId.image?.url || avatar}
                    alt={request.userId.username}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-medium">{request.userId.username}</h4>
                    <p className="text-gray-400 text-sm">
                      {request.userId.email}
                    </p>
                  </div>
                </div>
                {request.message && (
                  <p className="mt-4 text-gray-300 sm:mt-0 sm:ml-4 text-xl">
                    {request.message}
                  </p>
                )}
                <div className="mt-2 sm:mt-0 sm:flex sm:space-x-2 sm:items-center ">
                  <Button
                    onClick={() => onAccept(request.userId.username)}
                    disabled={loadingId === request.userId.username}
                  >
                    Accept
                  </Button>
                  <div className="my-2" />
                  <Button
                    variant="error"
                    onClick={() => onDecline(request.userId.username)}
                    disabled={loadingId === request.userId.username}
                  >
                    Decline
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    );
  };
};

export default JoinRequestsList;
