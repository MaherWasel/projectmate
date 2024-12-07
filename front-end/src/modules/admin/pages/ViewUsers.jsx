import { useEffect, useState } from "react";
import AdminDashboardHeader from "../../../components/layout/AdminDashboardHeader";
import CircularProgressIndicator from "../../../components/spinner/circulatProgressIndicator";
import { useNavigate } from "react-router-dom";
import { currentUser } from "../../../helpers/currentUser";
import TextInput from "../../../components/input/TextInput";
import appIcon from "../../../assets/icons/mainIcon.svg";
import { motion } from "framer-motion"; // Import framer-motion
import UserCard from "../../../components/Cards/UserCard";
import axios from "axios";
export default function ViewUsers() {
  const navigate = useNavigate();
  const [pageState, setPageState] = useState({
    loading: false,
    success: false,
    error: false,
    errorMessage: null,
    userData: null,
    projectsData: null,
  });

  useEffect(() => {
    if (currentUser.status !== "admin") {
      navigate("/home");
    }
    const fetchData = async () => {
      setPageState((old) => ({ ...old, loading: true }));

      try {
        const response = await axios.get("http://localhost:8080/admin/users", {
          headers: {
            "Content-Type": "application/json",
             Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (response.status >= 200 && response.status < 300) {
          setPageState({
            loading: false,
            success: true,
            error: false,
            errorMessage: null,
            data: response.data.record,
          });
        } else {
          setPageState({
            loading: false,
            success: false,
            error: true,
            errorMessage: "Something went wrong",
            data: null,
          });
        }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        navigate("/login");
        console.error("Unauthorized: Redirecting to login.");
        localStorage.removeItem("token"); // Clear the invalid token
      }else{
        setPageState({
          loading: false,
          success: false,
          error: true,
          errorMessage:  error.response?.data.message || "Something went wrong",
          data: null,
        });
      }}
    };

    fetchData();
  }, [navigate]);

  const fetchData = async (search = "") => {
    setPageState((old) => ({ ...old, loading: true }));
    try {
      const response = await axios.get("http://localhost:8080/admin/users", {
        params: {
          search,
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.status >= 200 && response.status < 300) {
        setPageState({
          loading: false,
          success: true,
          error: false,
          errorMessage: null,
          data: response.data.record,
        });
      } else {
        setPageState({
          loading: false,
          success: false,
          error: true,
          errorMessage: "Something went wrong",
          data: null,
        });
      }
  } catch (error) {
      setPageState({
        loading: false,
        success: false,
        error: true,
        errorMessage: error.message || "Something went wrong",
        data: null,
      });
    }
  };
  async function handleSearch(e) {
    const searchQuery = e.target.value;
    await fetchData(searchQuery);
  }
  return (
    <main className="bg-darkGray min-h-screen w-full p-8 flex flex-col">
      <span className="mb-4">
        <AdminDashboardHeader variant="admin/users" />
      </span>
       <div className="flex flex-1 justify-center items-center flex-col">
       <div className=" flex gap-4 w-full sm:w-1/2 md:w-1/3">
            <img className="w-16 h-14" src={appIcon} alt="App Icon" />
            <TextInput onChange={handleSearch} placeholder="Search" />
          </div>
       </div>
      {pageState.loading ? (
        <div className="flex justify-center items-center flex-1">
          <CircularProgressIndicator />
        </div>
      ) : pageState.success ? (
        <motion.div
          initial={{ opacity: 0 }} // Initial opacity for the fade-in effect
          animate={{ opacity: 1 }} // Animate to full opacity
          exit={{ opacity: 0 }} // Exit opacity when the component unmounts
          transition={{ duration: 1 }} // Duration of the fade-in effect
          className="flex flex-1 justify-center items-center flex-col"
        >
          <div className="flex flex-col m-4 sm:w-2/3  items-center justify-center ">
            <div className={`w-full h-0.5  bg-slate-50 m-4`} />
            <div className="p-2 sm:p-4 md:p-8  flex-col gap-3 w-full flex items-center justify-center">
              {pageState.data.map((user) => (
                <UserCard user={user} />
              ))}
            </div>
          </div>
        </motion.div>
      ) : pageState.error ? (
        <p className="w-full text-redError flex justify-center flex-1 items-center">
          {pageState.errorMessage || "ERROR"}
        </p>
      ) : null}
    </main>
  );
}
