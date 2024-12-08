import { useEffect, useState } from "react";
import AdminDashboardHeader from "../../../components/layout/AdminDashboardHeader";
import CircularProgressIndicator from "../../../components/spinner/circulatProgressIndicator";
import { useNavigate } from "react-router-dom";
import { currentUser } from "../../../helpers/currentUser";
import TextInput from "../../../components/input/TextInput";
import appIcon from "../../../assets/icons/mainIcon.svg";
import Button from "../../../components/buttons/SubmitButton";
import { motion } from "framer-motion"; // Import framer-motion
import axios from "axios";
export default function ReportsPage() {
  const navigate = useNavigate();
  const [pageState, setPageState] = useState({
    loading: false,
    success: false,
    error: false,
    errorMessage: null,
    data: [],
  });

  useEffect(() => {
    if (currentUser.status !== "admin") {
      navigate("/home");
    }
    const fetchData = async () => {
      setPageState((old) => ({ ...old, loading: true }));

      try {
        const response = await axios.get(
          "http://localhost:8080/admin/reports",
          {
            headers: {
              "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            
            },
          }
        );
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
          errorMessage: error.message || "Something went wrong",
          data: null,
        });
      }}
    };

    fetchData();
  }, [navigate]);

  const fetchData = async (search = "") => {
    setPageState((old) => ({ ...old, loading: true }));
    try {
      const response = await axios.get("http://localhost:8080/admin/reports", {
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
    } catch (error) { if (error.response && error.response.status === 401) {
      navigate("/login");
      console.error("Unauthorized: Redirecting to login.");
      localStorage.removeItem("token"); // Clear the invalid token
    } else{
      setPageState({
        loading: false,
        success: false,
        error: true,
        errorMessage: error.response?.data.message || "Something went wrong",
        data: null,
      });}
    }
  };
  async function handleSearch(e) {
    const searchQuery = e.target.value;
    await fetchData(searchQuery);
  }
  const handleReport = async (type, id, reportID) => {
    if (type === "user"){
      // Banned the user
      try {
        const response = await axios.get(`http://localhost:8080/admin/users/${id}/ban`,{ headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },});
        if (response.status >= 200 && response.status < 300) {
          alert(response.data.message);
          await discard(reportID);
        } else {
          alert("Something went wrong.");
        }
    } catch (error) {
      alert("Something went wrong.");
      }
    }else {
      // Delete the project
      try {
        const response = await axios.delete(`http://localhost:8080/admin/projects/${id}/`, { headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },});
        if (response.status >= 200 && response.status < 300) {
          alert(response.data.message);
          await discard(reportID);
        } else {
          alert("Something went wrong.");
        }
    } catch (error) {
      alert("Something went wrong.");
      }
    }

  };

  const discard = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8080/admin/reports/${id}`, { headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },});
      if (response.status >= 200 && response.status < 300) {
        window.location.reload();
      } else {
        alert("Something went wrong.");
      }
  } catch (error) {
    alert("Something went wrong.");
    }
  }

  return (
    <main className="bg-darkGray min-h-screen w-full p-8 flex flex-col">
      <span className="mb-4">
        <AdminDashboardHeader variant="admin/reports" />
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
              {pageState.data.map((report) => (
                <motion.div
                  key={report.id}
                  className="p-4 border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 bg-white w-full"
                  initial={{ opacity: 0 }} // Each report will fade in as well
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-lg text-gray-800">
                      Report ID: {report.id} - Type: {report.type}
                    </span>
                    <span className="text-sm text-gray-500">{report.date}</span>
                  </div>
                  <div className="mb-4">
                    <p className="text-gray-700">{report.reportDescription}</p>
                  </div>
                  <div className="flex justify-center space-x-4 max-w-144 mt-2">
                    <Button
                      onClick={() => {
                        report.type === "user" ? navigate(`/profile/${report.username}`) : navigate(`/projects/${report.projectID}`) 
                      }}
                    >
                      {report.type === "user"
                        ? "Show Profile"
                        : "Show Project"}
                    </Button>
                    <Button variant="error" onClick={() => {
                      handleReport(report.type, report.type === "user" ? report.userID : report.projectID, report.id );
                    }}>Dispatch</Button>
                    <Button onClick={()=>{discard(report.id)}}>Discard</Button>
                  </div>
                </motion.div>
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
