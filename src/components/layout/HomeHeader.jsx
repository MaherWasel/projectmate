import { useEffect, useState } from "react";
import appIcon from "../../assets/icons/mainIcon.svg";

import HomeIcon from "../../assets/icons/HomeIcon.svg";
import MyProjects from "../../assets/icons/MyProjects.svg";
import ProfileIcon from "../../assets/icons/ProfileIcon.svg";
import InvitesIcon from "../../assets/icons/InvitesIcon.svg";
import DropDownMenuByArrow from "../DropDownMenu/DropDownMenuByArrow";
import { MenuOutlined, Search } from "@mui/icons-material";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import TextInput from "../input/TextInput";

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
          <header className="bg-brighterGray flex justify-center items-center mx-4 relative flex-col rounded-2xl z-30">
            <span className="flex flex-row justify-center items-center w-full">
              <span className="p-4 w-full">
                <TextInput placeholder="Search" />
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
            <span className="w-full mx-4">
              <TextInput icon={<Search />} placeholder="Search" />
            </span>
          </div>
          <div className="flex justify-between">
            <ul className="flex">
              <li
                onClick={() => navigate("/home")}
                className="flex flex-col items-center justify-center m-2 cursor-pointer"
              >
                <svg
                  className={`w-16 h-14  ${
                    variant === "home" ? "text-lightBlue" : "text-white"
                  }`}
                  width="78"
                  height="55"
                  viewBox="0 0 78 55"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M75.5978 27.3935L40.6126 1.42732C40.3607 1.23985 40.0615 1.09112 39.7321 0.989647C39.4027 0.888171 39.0496 0.835938 38.693 0.835938C38.3364 0.835938 37.9833 0.888171 37.6539 0.989647C37.3245 1.09112 37.0253 1.23985 36.7734 1.42732L1.78821 27.3935C0.768973 28.1506 0.191406 29.1789 0.191406 30.2513C0.191406 32.4783 2.62908 34.2888 5.62732 34.2888H9.31356V52.8172C9.31356 53.9338 10.5281 54.8359 12.0315 54.8359H33.2571V40.7047H42.7699V54.8359H65.3545C66.8579 54.8359 68.0724 53.9338 68.0724 52.8172V34.2888H71.7587C73.2026 34.2888 74.5871 33.8661 75.6063 33.1028C77.7212 31.5257 77.7212 28.9707 75.5978 27.3935Z"
                    fill="currentColor"
                  />
                </svg>

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
                <svg
                  className={`w-16 h-14  ${
                    variant === "myProjects" ? "text-lightBlue" : "text-white"
                  }`}
                  width="84"
                  height="61"
                  viewBox="0 0 84 61"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M4.46413 60.8359C3.39519 60.8359 2.4998 60.4759 1.77795 59.7559C1.05359 59.0384 0.691406 58.1484 0.691406 57.0859V50.3359C0.691406 48.2109 1.24222 46.2572 2.34386 44.4747C3.44298 42.6947 4.90428 41.3359 6.72777 40.3984C10.6263 38.4609 14.5876 37.0072 18.6119 36.0372C22.6361 35.0697 26.7232 34.5859 30.8732 34.5859C35.0232 34.5859 39.1103 35.0697 43.1346 36.0372C47.1588 37.0072 51.1202 38.4609 55.0187 40.3984C56.8422 41.3359 58.3035 42.6947 59.4026 44.4747C60.5042 46.2572 61.055 48.2109 61.055 50.3359V57.0859C61.055 58.1484 60.6929 59.0384 59.9685 59.7559C59.2466 60.4759 58.3513 60.8359 57.2823 60.8359H4.46413ZM66.8084 60.8359C67.3744 60.3984 67.8145 59.8509 68.1289 59.1934C68.4433 58.5384 68.6005 57.8047 68.6005 56.9922V49.5859C68.6005 46.8359 67.8309 44.1947 66.2916 41.6622C64.7498 39.1322 62.5641 36.9609 59.7346 35.1484C62.9414 35.5234 65.9596 36.1634 68.7891 37.0684C71.6187 37.9759 74.2596 39.0859 76.7119 40.3984C78.9755 41.6484 80.7047 43.0384 81.8994 44.5684C83.0941 46.1009 83.6914 47.7734 83.6914 49.5859V57.0859C83.6914 58.1484 83.3292 59.0384 82.6049 59.7559C81.883 60.4759 80.9876 60.8359 79.9187 60.8359H66.8084ZM30.8732 30.8359C26.7232 30.8359 23.1706 29.3672 20.2153 26.4297C17.26 23.4922 15.7823 19.9609 15.7823 15.8359C15.7823 11.7109 17.26 8.17969 20.2153 5.24219C23.1706 2.30469 26.7232 0.835938 30.8732 0.835938C35.0232 0.835938 38.5759 2.30469 41.5312 5.24219C44.4865 8.17969 45.9641 11.7109 45.9641 15.8359C45.9641 19.9609 44.4865 23.4922 41.5312 26.4297C38.5759 29.3672 35.0232 30.8359 30.8732 30.8359ZM68.6005 15.8359C68.6005 19.9609 67.1228 23.4922 64.1675 26.4297C61.2122 29.3672 57.6596 30.8359 53.5096 30.8359C52.8179 30.8359 51.9376 30.7584 50.8687 30.6034C49.7997 30.4459 48.9194 30.2734 48.2278 30.0859C49.9255 28.0859 51.2296 25.8672 52.1401 23.4297C53.0531 20.9922 53.5096 18.4609 53.5096 15.8359C53.5096 13.2109 53.0531 10.6797 52.1401 8.24219C51.2296 5.80469 49.9255 3.58594 48.2278 1.58594C49.1081 1.27344 49.9884 1.06969 50.8687 0.974688C51.749 0.882188 52.6293 0.835938 53.5096 0.835938C57.6596 0.835938 61.2122 2.30469 64.1675 5.24219C67.1228 8.17969 68.6005 11.7109 68.6005 15.8359Z" />
                </svg>

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
                <svg
                  className={`w-16 h-14  ${
                    variant === "myInvites" ? "text-lightBlue" : "text-white"
                  }`}
                  width="68"
                  height="74"
                  viewBox="0 0 68 74"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M50.9414 0.335938C53.5049 0.335765 55.9715 1.52148 57.8366 3.65048C59.7017 5.77947 60.8243 8.69082 60.9747 11.7888L60.9914 12.5026V30.1443L62.9813 29.0736C65.0382 27.9664 67.41 29.6819 67.6713 32.3099L67.6914 32.7804V65.2248C67.6919 67.2712 67.0535 69.2421 65.9042 70.7426C64.7548 72.2431 63.1795 73.1622 61.4939 73.3157L60.9914 73.3359H7.39141C5.70108 73.3366 4.07301 72.5637 2.83357 71.1723C1.59413 69.7809 0.834931 67.8737 0.708157 65.8332L0.691406 65.2248V32.7804C0.691406 30.055 2.95266 28.1287 5.03636 28.9073L5.40486 29.0736L7.39141 30.1443V12.5026C7.39126 9.39925 8.37069 6.41313 10.1293 4.15521C11.8879 1.8973 14.2928 0.538279 16.8518 0.356216L17.4414 0.335938H50.9414ZM50.9414 8.44705H17.4414C16.5529 8.44705 15.7008 8.87433 15.0726 9.63489C14.4444 10.3955 14.0914 11.427 14.0914 12.5026V33.7497L34.1914 44.5658L54.2914 33.7497V12.5026C54.2914 11.427 53.9385 10.3955 53.3102 9.63489C52.682 8.87433 51.8299 8.44705 50.9414 8.44705ZM34.1914 20.6137C35.0453 20.6149 35.8665 21.0107 36.4874 21.7203C37.1083 22.4299 37.4819 23.3997 37.5319 24.4316C37.582 25.4635 37.3046 26.4796 36.7566 27.2723C36.2086 28.0649 35.4312 28.5743 34.5834 28.6964L34.1914 28.7248H27.4914C26.6376 28.7237 25.8163 28.3279 25.1954 27.6183C24.5745 26.9087 24.2009 25.9388 24.1509 24.9069C24.1008 23.875 24.3782 22.859 24.9262 22.0663C25.4742 21.2736 26.2516 20.7642 27.0995 20.6421L27.4914 20.6137H34.1914Z" />
                </svg>

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
                  className="p-4 rounded-lg hover:bg-gray-200 delay-50 duration-75 "
                >
                  Profile
                </h1>
                <h1 className="p-4 rounded-lg hover:bg-gray-200 delay-50 duration-75">
                  Logout
                </h1>
              </DropDownMenuByArrow>
            </div>
          </div>
        </header>
      )}
    </div>
  );
}
