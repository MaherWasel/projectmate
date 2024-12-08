import { motion } from "framer-motion";
import Button from "../buttons/SubmitButton"; // Assume you have a Button component
import { useNavigate } from "react-router-dom";
import axios from "axios";
import backendUrl from "../../helpers/utils";
/*
    Username: "user1",
    Password: "pass123",
    Email: "user1@example.com",
    Name: "",
    Bio: "",
    Image: "",
    Links: "",
    Active: true
*/

export default function UserCard({ user }) {
  const navigate = useNavigate();
  const handleView = () => {
    navigate(`/profile/${user.Username}`);
  };
  const dispatch = async () => {
    try {
      const response = await axios.get(
        `${backendUrl}/admin/users/${user.id}/ban`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status >= 200 && response.status < 300) {
        alert(response.data.message);
        window.location.reload();
      } else {
        alert("Something went wrong.");
      }
    } catch (error) {
      alert("Something went wrong.");
    }
  };

  const unDispatch = async () => {
    try {
      const response = await axios.get(
        `${backendUrl}/admin/users/${user.id}/unban`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status >= 200 && response.status < 300) {
        alert(response.data.message);
        window.location.reload();
      } else {
        alert("Something went wrong.");
      }
    } catch (error) {
      alert("Something went wrong.");
    }
  };

  return (
    <motion.div
      key={user.id}
      className="p-4 border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 bg-white w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center mb-2">
        <div className="rounded-full bg-gray-300 w-12 h-12 flex-shrink-0"></div>
        <div className="ml-3">
          <span className="font-semibold text-gray-800">
            {user.Username} | Major: {user.Major} | Working-On Project/s:{" "}
            {user.Count}
          </span>
        </div>
      </div>
      <div className="flex space-x-4 mt-2">
        <Button onClick={handleView}>View</Button>
        {user.Status === "Active" ? (
          <Button variant="error" onClick={dispatch}>
            Dispatch
          </Button>
        ) : (
          <Button onClick={unDispatch}>UnBanned</Button>
        )}
      </div>
    </motion.div>
  );
}
