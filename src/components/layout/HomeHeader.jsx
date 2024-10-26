import { useEffect, useState } from "react";
import appIcon from "../../assets/icons/mainIcon.svg";
import TextInputWithoutLabel from "../input/TextInputWithoutLabel";
import HomeIcon from "../../assets/icons/HomeIcon.svg";
import MyProjects from "../../assets/icons/MyProjects.svg";
import ProfileIcon from "../../assets/icons/ProfileIcon.svg";
import InvitesIcon from "../../assets/icons/InvitesIcon.svg";
import DropDownMenuByArrow from "../DropDownMenu/DropDownMenuByArrow";
import { MenuOutlined } from "@mui/icons-material";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
// Note that variant is indicating which page is the header in
// onChange is a function passed to the textinput to collect the search input
export default function HomeHeader({ onChange, variant = "home" }) {
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

  // Function to handle menu toggle
  const toggleMenu = () => {
    setShowMenu((prev) => !prev);
  };

  return (
    <div className="relative bottom-8">
      {/* Overlay for the background when the menu is open */}
      {showMenu && (
        <div
          className="fixed inset-0 bg-black opacity-60 z-20"
          onClick={toggleMenu}
        />
      )}

      {screenWidth < 600 ? (
        <div className="w-full flex flex-col">
          <p className="flex self-center m-4 text-white font-bold capitalize">
            {variant}
          </p>
          <header className="bg-brighterGray flex justify-center items-center mx-4 relative flex-col rounded-2xl z-30">
            <span className="flex flex-row justify-center items-center w-full">
              <span className="p-4 w-full">
                <TextInputWithoutLabel placeholder="Search" />
              </span>
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
                    onClick={() => navigate("/myProjects")}
                    className="p-2 w-full cursor-pointer hover:bg-gray-200"
                  >
                    My Projects
                  </p>
                  <p
                    onClick={() => navigate("/myInvites")}
                    className="p-2 w-full cursor-pointer hover:bg-gray-200"
                  >
                    Invites
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
        <header className="w-full bg-darkGray flex justify-between">
          <div className="flex flex-row p-4 w-1/2 justify-center items-center">
            <img className="w-16 h-14" src={appIcon} alt="App Icon" />
            <span className="w-full mx-2">
              <TextInputWithoutLabel placeholder="Search" />
            </span>
          </div>
          <ul className="flex xl:w-1/4">
            <li
              onClick={() => navigate("/home")}
              className="flex flex-col items-center justify-center m-2 cursor-pointer"
            >
              <img
                className={`w-16 h-14 ${"fill-lightBlue"}`}
                src={HomeIcon}
                alt="homeIcon"
              />
              <h1
                className={`m-2 ${
                  variant === "home" ? "text-lightBlue" : "text-white"
                }`}
              >
                Home
              </h1>
            </li>
            <li
              onClick={() => navigate("/MyProjects")}
              className="flex flex-col items-center justify-center m-2 cursor-pointer"
            >
              <img
                className="w-16 h-14"
                src={MyProjects}
                alt="MyProjects Icon"
              />
              <h1
                onClick={() => navigate("/MyProjects")}
                className={`m-2 ${
                  variant === "myProjects" ? "text-lightBlue" : "text-white"
                }`}
              >
                My Projects
              </h1>
            </li>
            <li
              onClick={() => navigate("/myInvites")}
              className="flex flex-col items-center justify-center m-2 cursor-pointer"
            >
              <img
                className="w-16 h-14 fill-blue-500"
                src={InvitesIcon}
                alt="Invites Icon"
              />
              <h1
                className={`m-2 ${
                  variant === "myInvites" ? "text-lightBlue" : "text-white"
                }`}
              >
                Invites
              </h1>
            </li>
          </ul>
          <div className="flex flex-col justify-center items-center">
            <img className="w-16 h-14" src={ProfileIcon} alt="profileIcon" />
            <DropDownMenuByArrow>
              <h1
                onClick={() => navigate("/myProfile")}
                className="p-4 hover:bg-gray-200 delay-50 duration-75"
              >
                Profile
              </h1>
              <h1 className="p-4 hover:bg-gray-200 delay-50 duration-75">
                Logout
              </h1>
            </DropDownMenuByArrow>
          </div>
        </header>
      )}
    </div>
  );
}
