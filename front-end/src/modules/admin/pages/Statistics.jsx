import { useEffect, useState } from "react";
import AdminDashboardHeader from "../../../components/layout/AdminDashboardHeader";
import InfoCard from "../../../components/Cards/InfoCard";
import ColChart from "../../../components/charts/ColChart";
import CircularProgressIndicator from "../../../components/spinner/circulatProgressIndicator";
import SubmitButton from "../../../components/buttons/SubmitButton";
import TotalUsers from "../../../assets/icons/TotalUsers.svg";
import Banned from "../../../assets/icons/Banned.svg";
import TotalProject from "../../../assets/icons/TotalProjectsBlue.svg";
import TotalDProjects from "../../../assets/icons/TotalDoneProjects.svg";
import AreaChart from "../../../components/charts/AreaChart";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import backendUrl from "../../../helpers/utils";

export default function DashboardStats() {
  const navigate = useNavigate();
  const [pageState, setPageState] = useState({
    loading: false,
    success: false,
    error: false,
    errorMessage: null,
    userData: [],
    projectsData: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      setPageState((old) => ({ ...old, loading: true }));
      try {
        const response = await axios.get(`${backendUrl}/admin/home`, {
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
        } else {
          setPageState({
            loading: false,
            success: false,
            error: true,
            errorMessage:
              error.response?.data.message || "Something went wrong",
            userData: [],
            projectsData: [],
          });
        }
      }
    };

    fetchData();
  }, [navigate]);
  const generatePDF = async () => {
    try {
      const response = await axios.get(`${backendUrl}/admin/stats/generate`, {
        responseType: "blob",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "Statistical_Report.pdf";
      link.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error generating PDF:", error.message);
      alert("Failed to generate PDF. Please try again.");
    }
  };
  return (
    <main className="bg-darkGray min-h-screen w-full p-8 flex flex-col">
      <span className="mb-4">
        <AdminDashboardHeader variant="Statistics" />
      </span>
      {pageState.loading ? (
        <div className="flex justify-center items-center flex-1">
          <CircularProgressIndicator />
        </div>
      ) : pageState.success ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-center">
            <InfoCard
              message="Total Users"
              count={pageState.data.activeUsers}
              icon={TotalUsers}
            />
            <InfoCard
              message="Banned Users"
              count={pageState.data.bannedUsers}
              icon={Banned}
            />{" "}
            <InfoCard
              message="Total Projects"
              count={pageState.data.activeP + pageState.data.DoneP}
              icon={TotalProject}
            />{" "}
            <div className="md:col-start-2">
              <InfoCard
                message="Total Finished Projects"
                count={pageState.data.DoneP}
                icon={TotalDProjects}
              />
            </div>
          </div>
          <div className="flex flex-col lg:flex-row justify-between items-center mx-5 lg:mx-40 my-5 gap-4">
            <div className="flex justify-center w-full lg:w-auto">
              <ColChart data={pageState.data.majorChartData} />
            </div>
            <div className="flex justify-center w-full lg:w-auto">
              <AreaChart
                className="p-4"
                data={pageState.data.userActivityChart}
              />
            </div>
          </div>

          <div className="flex justify-center items-center m-1">
            <div className="w-64">
              <SubmitButton variant="default" onClick={generatePDF}>
                Print Statistics Reports
              </SubmitButton>
            </div>
          </div>
        </>
      ) : pageState.error ? (
        <p className="w-full text-redError flex justify-center flex-1 items-center">
          {pageState.errorMessage || "ERROR"}
        </p>
      ) : null}
    </main>
  );
}
