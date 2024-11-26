import { useEffect, useState } from "react";
import AdminDashboardHeader from "../../../components/layout/AdminDashboardHeader";
import CircularProgressIndicator from "../../../components/spinner/circulatProgressIndicator";
import { useNavigate } from "react-router-dom";
import dummyReports from "../../../helpers/dummyReports";
import { currentUser } from "../../../helpers/currentUser";
import TextInput from "../../../components/input/TextInput";
import appIcon from "../../../assets/icons/mainIcon.svg";
import Button from "../../../components/buttons/SubmitButton";
import { motion } from "framer-motion"; // Import framer-motion

export default function ReportsPage() {
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
        // Replace this with your actual fetch call
        const data = await new Promise((resolve) =>
          setTimeout(() => resolve(dummyReports), 2000)
        );

        setPageState({
          loading: false,
          success: true,
          error: false,
          errorMessage: null,
          data: data,
        });
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

    fetchData();
  }, [navigate]);

  return (
    <main className="bg-darkGray min-h-screen w-full p-8 flex flex-col">
      <span className="mb-4">
        <AdminDashboardHeader variant="admin/reports" />
      </span>
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
          <div className=" flex gap-4 w-full sm:w-1/2 md:w-1/3">
            <img className="w-16 h-14" src={appIcon} alt="App Icon" />

            <TextInput placeholder="Search" />
          </div>
          <div className="flex flex-col m-4 sm:w-2/3  items-center justify-center ">
            <div className={`w-full h-0.5  bg-slate-50 m-4`} />
            <div className="p-2 sm:p-4 md:p-8  flex-col gap-3 w-full flex items-center justify-center">
              {dummyReports.map((report) => (
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
                    <p className="text-gray-700">{report.description}</p>
                  </div>
                  <div className="flex space-x-4 max-w-72 ">
                    <Button>
                      {report.type === "user" ? "Show Profile" : "Show Project"}
                    </Button>
                    <Button variant="error">Dispatch</Button>
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
