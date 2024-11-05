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
export const data = [
  ["City", "2010 Population", "2000 Population"],
  ["New York City, NY", 8175000, 8008000],
  ["Los Angeles, CA", 3792000, 3694000],
  ["Chicago, IL", 2695000, 2896000],
  ["Houston, TX", 2099000, 1953000],
  ["Philadelphia, PA", 1526000, 1517000],
];
export const data2 = [
  ["City", "2010 Population"],
  ["New York City, NY", 8175000],
  ["Los Angeles, CA", 3792000],
  ["Chicago, IL", 2695000],
  ["Houston, TX", 2099000],
  ["Philadelphia, PA", 1526000],
];

export default function Home() {
  const navigate = useNavigate();
  const [pageState, setPageState] = useState({
    loading: false,
    success: false,
    error: false,
    errorMessage: null,
    userData: null,
    projectsData: null,
  });
  // eslint-disable-next-line react-hooks/exhaustive-deps

  useEffect(() => {
    const fetchData = async () => {
      setPageState((old) => ({ ...old, loading: true }));

      try {
        // Replace this with your actual fetch call
        const data = await new Promise((resolve) =>
          setTimeout(() => resolve(dummyusers), 2000)
        );
        const data2 = await new Promise((resolve) =>
          setTimeout(() => resolve(dummyProjects), 2000)
        );

        setPageState({
          loading: false,
          success: true,
          error: false,
          errorMessage: null,
          userData: data,
          projectsData: data2,
        });
      } catch (error) {
        setPageState({
          loading: false,
          success: false,
          error: true,
          errorMessage: error.message || "Something went wrong",
          userData: null,
          projectsData: null,
        });
      }
    };

    fetchData();
  }, []);

  return (
    <main className="bg-darkGray min-h-screen w-full p-8 flex flex-col">
      <span className="mb-4">
        <AdminDashboardHeader variant="home" />
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
          <div className="flex justify-between items-center mx-40">
            {/* Left Side: Chart in a Span */}
            <div className="flex justify-center">
              <ColChart data={data} />
            </div>
            {/* Right Side: Additional Elements */}
            <div className="flex flex-col space-y-2">
              <LineChart className="p-4" data={data2} />
              <InfoCard
                message="Banned Users"
                count={pageState.userData.filter((user) => !user.Active).length}
              />
            </div>
          </div>
          <div className="flex justify-center items-center m-2">
            <div className="w-64">
              <SubmitButton
                variant="default"
                onClick={() => navigate("/admin/reports")}
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
