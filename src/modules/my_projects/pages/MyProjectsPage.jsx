import React, { useState, useEffect } from "react";
import { dummyProjects } from "../../../helpers/dummydata";
import HomeHeader from "../../../components/layout/HomeHeader";
import CircularProgressIndicator from "../../../components/spinner/circulatProgressIndicator";
import MyProjectsList from "../components/MyProjectsList";
import { useNavigate } from "react-router-dom";
import { currentUser } from "../../../helpers/currentUser";
const MyProjectsPage = () => {
  const [pageState, setPageState] = useState({
    loading: false,
    success: false,
    error: false,
    errorMessage: null,
    data: null,
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (!currentUser || currentUser.status === "banned") {
        navigate("/login");
      }
      setPageState((old) => ({ ...old, loading: true }));

      try {
        const data = await new Promise((resolve) =>
          setTimeout(() => resolve(dummyProjects), 2000)
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
    <main className="bg-darkGray min-h-screen  w-full flex flex-col">
      <span className="mb-4 p-8">
        <HomeHeader variant="myProjects" />
      </span>
      {pageState.loading ? (
        <div className="flex justify-center items-center flex-1">
          <CircularProgressIndicator />
        </div>
      ) : pageState.success ? (
        <MyProjectsList projects={dummyProjects} />
      ) : pageState.error ? (
        <p className=" text-redError flex justify-center flex-1 items-center">
          {pageState.errorMessage || "ERROR"}
        </p>
      ) : null}
    </main>
  );
};

export default MyProjectsPage;
