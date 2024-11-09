import React, { useState, useEffect } from "react";
import { dummyProjects } from "../../../helpers/dummydata";
import HomeHeader from "../../../components/layout/HomeHeader";
import CircularProgressIndicator from "../../../components/spinner/circulatProgressIndicator";
import MyProjectsList from "../components/MyProjectsList";
import SubmitButton from "../../../components/buttons/SubmitButton";
import addIcon from "../../../assets/icons/add-icon.svg";
import { useNavigate } from "react-router-dom";
const MyProjectsPage = () => {
  const navigate = useNavigate();
  const [pageState, setPageState] = useState({
    loading: false,
    success: false,
    error: false,
    errorMessage: null,
    data: null,
  });

  useEffect(() => {
    const fetchData = async () => {
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
  }, []);

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
      <div
        onClick={() => navigate("/myProjects/create")}
        className="fixed bottom-6 sm:bottom-20 right-6 sm:right-20"
      >
        <SubmitButton>
          <img src={addIcon} alt="Add Icon" className="h-8 sm:h-12" />
        </SubmitButton>
      </div>
    </main>
  );
};

export default MyProjectsPage;
