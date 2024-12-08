import { useEffect, useState } from "react";
import TotalActiveUsersIcon from "../../../assets/icons/TotalActiveUsersIcon.svg";
import AdminDashboardHeader from "../../../components/layout/AdminDashboardHeader";
import TotalProjectIcon from "../../../assets/icons/TotalProjectsIcon.svg";
import InfoCard from "../../../components/Cards/InfoCard";
import LargeInfoCard from "../../../components/Cards/LargeInfoCard";
import ColChart from "../../../components/charts/ColChart";
import CircularProgressIndicator from "../../../components/spinner/circulatProgressIndicator";
import LineChart from "../../../components/charts/LineChart";
import { useNavigate } from "react-router-dom";
import SubmitButton from "../../../components/buttons/SubmitButton";
import axios from "axios";
import Banned from "../../../assets/icons/Banned.svg";
import backendUrl from "../../../helpers/utils";

export default function Home() {
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
            data: [],
          });
        }
      }
    };

    fetchData();
  }, [navigate]);

  return (
    <main className="bg-darkGray min-h-screen w-full p-8 flex flex-col">
      <span className="mb-4">
        <AdminDashboardHeader variant="admin/home" />
      </span>
      {pageState.loading ? (
        <div className="flex justify-center items-center flex-1">
          <CircularProgressIndicator />
        </div>
      ) : pageState.success ? (
        <>
          <div className="inline-flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-16 rounded-xl flex-wrap">
            <LargeInfoCard
              message="Total Active Users"
              count={pageState.data.activeUsers}
              icon={TotalActiveUsersIcon}
            />
            <LargeInfoCard
              message="Total Projects"
              count={pageState.data.activeP + pageState.data.DoneP}
              icon={TotalProjectIcon}
            />
          </div>

          <hr className="border-t border-gray-300 my-4 w-5/6 mx-auto" />

          <div className="flex flex-col lg:flex-row justify-between items-center mx-5 lg:mx-40 my-5 gap-4 flex-wrap">
            <div className="flex justify-center w-full lg:w-auto  overflow-auto">
              <ColChart data={pageState.data.majorChartData} />
            </div>
            <div className="flex flex-col space-y-2 w-full lg:w-auto overflow-auto">
              <LineChart
                className="p-4"
                data={pageState.data.userActivityChart}
              />
              <InfoCard
                message="Banned Users"
                count={pageState.data.bannedUsers}
                icon={Banned}
              />
            </div>
          </div>

          <div className="flex justify-center items-center m-2">
            <div className="w-64">
              <SubmitButton
                variant="default"
                onClick={() => navigate("/admin/stats")}
              >
                View All Statistics
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
