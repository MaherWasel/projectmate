import { motion } from "framer-motion";
import Button from "../buttons/SubmitButton"; // Assume you have a Button component

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
  return (
    <motion.div
      key={user.Username}
      className="p-4 border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 bg-white w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center mb-2">
        <div className="rounded-full bg-gray-300 w-12 h-12 flex-shrink-0"></div>
        <div className="ml-3">
          <span className="font-semibold text-gray-800">
            {user.Name} | Major: {user.Major} | Working-On Project/s: {0}
          </span>
        </div>
      </div>
      <div className="flex space-x-4 mt-2">
        <Button>View</Button>
        <Button variant="error">Dispatch</Button>
      </div>
    </motion.div>
  );
}
