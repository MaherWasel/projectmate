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
import { dummyusers } from "../../../helpers/dummyusers";
import { dummyProjects } from "../../../helpers/dummydata";
import Banned from "../../../assets/icons/Banned.svg";

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
        const usersData = await new Promise((resolve) =>
          setTimeout(() => resolve(dummyusers), 2000)
        );
        const projectsData = await new Promise((resolve) =>
          setTimeout(() => resolve(dummyProjects), 2000)
        );

        setPageState({
          loading: false,
          success: true,
          error: false,
          errorMessage: null,
          userData: usersData || [],
          projectsData: projectsData || [],
        });
      } catch (error) {
        setPageState({
          loading: false,
          success: false,
          error: true,
          errorMessage: error.message || "Something went wrong",
          userData: [],
          projectsData: [],
        });
      }
    };

    fetchData();
  }, []);

  // Count project statuses by major
  const majorCounts = {};
  (pageState.projectsData || []).forEach((project) => {
    const status = project.status || "Unknown Status";

    // For each major in the project, update the count for each status
    project.majors.forEach((major) => {
      if (!majorCounts[major]) {
        majorCounts[major] = {
          Completed: 0,
          "In Progress": 0,
          Open: 0,
          "Not Started": 0,
        };
      }

      if (status in majorCounts[major]) {
        majorCounts[major][status] += 1;
      }
    });
  });

  // Format majorCounts into a list format for ColChart
  const resultList = [
    ["Major", "Completed", "In-Progress", "Open", "Not Started"],
  ];
  for (const [major, counts] of Object.entries(majorCounts)) {
    resultList.push([
      major,
      counts["Completed"] || 0,
      counts["In Progress"] || 0,
      counts["Open"] || 0,
      counts["Not Started"] || 0,
    ]);
  }

  // Line chart example data
  const lineChartData = [
    ["Year", "Users"],
    ["2013", 1000],
    ["2014", 1170],
    ["2015", 660],
    ["2016", 1030],
  ];

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
          <div className="inline-flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-16 rounded-xl">
            <LargeInfoCard
              message="Total Active Users"
              count={pageState.userData.filter((user) => user.Active).length}
              icon={TotalActiveUsersIcon}
            />
            <LargeInfoCard
              message="Total Projects"
              count={pageState.projectsData.length}
              icon={TotalProjectIcon}
            />
          </div>

          <hr className="border-t border-gray-300 my-4 w-5/6 mx-auto" />

          <div className="flex flex-col lg:flex-row justify-between items-center mx-5 lg:mx-40 my-5 gap-4">
            <div className="flex justify-center w-full lg:w-auto">
              <ColChart data={resultList} />
            </div>
            <div className="flex flex-col space-y-2 w-full lg:w-auto">
              <LineChart className="p-4" data={lineChartData} />
              <InfoCard
                message="Banned Users"
                count={pageState.userData.filter((user) => !user.Active).length}
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
