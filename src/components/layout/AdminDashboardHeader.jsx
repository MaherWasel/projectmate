import { useEffect, useState } from "react";
import ViewUsersIcon from "../../assets/icons/ViewUsers.svg";
import ViewReportsIcon from "../../assets/icons/ViewReports.svg";
import ProfileIcon from "../../assets/icons/ProfileIcon.svg";
import DropDownMenuByArrow from "../DropDownMenu/DropDownMenuByArrow";
import { MenuOutlined } from "@mui/icons-material";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import HomeIcon from "../../assets/icons/HomeIcon";

export default function AdminDashboardHeader({ onChange, variant = "home" }) {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleMenu = () => {
    setShowMenu((prev) => !prev);
  };

  return (
    <div className="relative bottom-8">
      {/* Overlay for the background when the menu is open */}
      <AnimatePresence>
        {showMenu && (
          <motion.div
            className="fixed inset-0 bg-black opacity-60 z-20"
            onClick={toggleMenu}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </AnimatePresence>

      {screenWidth < 600 ? (
        <div className="w-full flex flex-col">
          <p className="flex self-center m-4 text-white font-bold capitalize">
            {variant}
          </p>
          <header className="bg-brighterGray flex justify-start items-center mx-4 relative flex-col rounded-2xl z-30">
            <span className="flex flex-row justify-start items-center w-full">
              <span className="p-4">
                <MenuOutlined
                  className="cursor-pointer"
                  onClick={toggleMenu}
                  sx={{ color: "white" }}
                />
              </span>
            </span>
            <AnimatePresence>
              {showMenu && (
                <motion.div
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 25 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="mt-2 flex flex-col items-start rounded-lg shadow-lg z-30 w-full text-white"
                >
                  <p
                    onClick={() => navigate("/home")}
                    className="p-2 w-full cursor-pointer hover:bg-gray-200"
                  >
                    Home
                  </p>
                  <p
                    onClick={() => navigate("/admin/users")}
                    className="p-2 w-full cursor-pointer hover:bg-gray-200"
                  >
                    View Users
                  </p>
                  <p
                    onClick={() => navigate("/admin/reports")}
                    className="p-2 w-full cursor-pointer hover:bg-gray-200"
                  >
                    View Reports
                  </p>
                  <p
                    onClick={() => navigate("/myProfile")}
                    className="p-2 w-full cursor-pointer hover:bg-gray-200"
                  >
                    My Profile
                  </p>
                  <p className="p-2 w-full cursor-pointer hover:bg-gray-200">
                    Logout
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </header>
        </div>
      ) : (
        <header className="w-full bg-darkGray flex justify-start">
          <div className="flex flex-row p-4 w-1/2 justify-start items-center">
            <ul className="flex">
              <li
                onClick={() => navigate("/home")}
                className="flex flex-col items-center justify-center m-2 cursor-pointer"
              >
                <HomeIcon></HomeIcon>
                <h1
                  className={`m-2 ${
                    variant === "home" ? "text-lightBlue" : "text-white"
                  }`}
                >
                  Home
                </h1>
              </li>
              <li
                onClick={() => navigate("/admin/users")}
                className="flex flex-col items-center justify-center m-2 cursor-pointer"
              >
                <img
                  className="w-16 h-14"
                  src={ViewUsersIcon}
                  alt="View Users Icon"
                />
                <h1
                  onClick={() => navigate("/admin/users")}
                  className={`m-2 ${
                    variant === "Users" ? "text-lightBlue" : "text-white"
                  }`}
                >
                  View Users
                </h1>
              </li>
              <li
                onClick={() => navigate("/admin/reports")}
                className="flex flex-col items-center justify-center m-2 cursor-pointer"
              >
                <img
                  className="w-16 h-14 fill-blue-500"
                  src={ViewReportsIcon}
                  alt="ViewReports Icon"
                />
                <h1
                  className={`m-2 ${
                    variant === "ViewReports" ? "text-lightBlue" : "text-white"
                  }`}
                >
                  View Reports
                </h1>
              </li>
            </ul>
          </div>
          <div className="flex flex-col justify-center items-center ml-auto">
            <img className="w-16 h-14" src={ProfileIcon} alt="profileIcon" />
            <DropDownMenuByArrow>
              <h1
                onClick={() => navigate("/myProfile")}
                className="p-4 rounded-lg hover:bg-gray-200 delay-50 duration-75"
              >
                Profile
              </h1>
              <h1 className="p-4 rounded-lg hover:bg-gray-200 delay-50 duration-75">
                Logout
              </h1>
            </DropDownMenuByArrow>
          </div>
        </header>
      )}
    </div>
  );
}
