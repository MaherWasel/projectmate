import { useEffect, useState } from "react";
import AdminDashboardHeader from "../../../components/layout/AdminDashboardHeader";
import InfoCard from "../../../components/Cards/InfoCard";
import ColChart from "../../../components/charts/ColChart";
import CircularProgressIndicator from "../../../components/spinner/circulatProgressIndicator";
import LineChart from "../../../components/charts/LineChart";
import { useNavigate } from "react-router-dom";
import SubmitButton from "../../../components/buttons/SubmitButton";
import { dummyusers } from "../../../helpers/dummyusers";
import { dummyProjects } from "../../../helpers/dummydata";
import TotalUsers from "../../../assets/icons/TotalUsers.svg";
import Banned from "../../../assets/icons/Banned.svg";
import TotalProject from "../../../assets/icons/TotalProjectsBlue.svg";
import TotalDProjects from "../../../assets/icons/TotalDoneProjects.svg";

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
              count={pageState.userData.length}
              icon={TotalUsers}
            />
            <InfoCard
              message="Banned Users"
              count={pageState.userData.filter((user) => user.Active).length}
              icon={Banned}
            />{" "}
            <InfoCard
              message="Total Projects"
              count={pageState.projectsData.length}
              icon={TotalProject}
            />{" "}
            <div className="md:col-start-2">
              <InfoCard
                message="Total Finished Projects"
                count={
                  pageState.projectsData.filter(
                    (project) => project.status === "Completed"
                  ).length
                }
                icon={TotalDProjects}
              />
            </div>
          </div>
          <div className="flex flex-col lg:flex-row justify-between items-center mx-5 lg:mx-40 my-5 gap-4">
            <div className="flex justify-center w-full lg:w-auto">
              <ColChart data={resultList} />
            </div>
            <div className="flex justify-center w-full lg:w-auto">
              <LineChart className="p-4" data={lineChartData} />
            </div>
          </div>

          <div className="flex justify-center items-center m-1">
            <div className="w-64">
              <SubmitButton
                variant="default"
                onClick={() => navigate("/nothing")}
              >
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
