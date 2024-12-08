import React, { useState, useEffect } from "react";

import HomeHeader from "../../../components/layout/HomeHeader";
import CircularProgressIndicator from "../../../components/spinner/circulatProgressIndicator";
import MyProjectsList from "../components/MyProjectsList";
import SubmitButton from "../../../components/buttons/SubmitButton";
import addIcon from "../../../assets/icons/add-icon.svg";
import { useNavigate, useParams } from "react-router-dom";

import axios from "axios";

const MyProjectsPage = () => {
  const { username } = useParams();
  const [pageState, setPageState] = useState({
    loading: false,
    success: false,
    error: false,
    errorMessage: null,
    data: null,
  });

  // fetch data
  const navigate = useNavigate();
  useEffect(() => {
    fetchData();
  }, [navigate]);

  // fetch data function
  const fetchData = async (search = "") => {
    try {
      setPageState((old) => ({ ...old, loading: true }));
      const response = await axios.get(
        `http://localhost:8080/profile/${username}/projects`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          params: {
            search,
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
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        navigate("/login");
        console.error("Unauthorized: Redirecting to login.");
        localStorage.removeItem("token"); // Clear the invalid token
      } else
        setPageState({
          loading: false,
          success: false,
          error: true,
          errorMessage: error.message || "Something went wrong",
          data: null,
        });
    }
  };
  // Get search query
  async function handleSearch(e) {
    const searchQuery = e.target.value;
    await fetchData(searchQuery);
  }
  return (
    <main className="bg-darkGray min-h-screen  w-full flex flex-col">
      <span className="mb-4 p-8">
        <HomeHeader variant="myProjects" onChange={handleSearch} />
      </span>
      {pageState.loading ? (
        <div className="flex justify-center items-center flex-1">
          <CircularProgressIndicator />
        </div>
      ) : pageState.success ? (
        <MyProjectsList projects={pageState.data.projects} />
      ) : pageState.error ? (
        <p className=" text-redError flex justify-center flex-1 items-center">
          {pageState.errorMessage || "ERROR"}
        </p>
      ) : null}
      {pageState.data?.isOwner && (
        <div
          onClick={() => navigate("/myProjects/create")}
          className="fixed bottom-6 sm:bottom-20 right-6 sm:right-20"
        >
          <SubmitButton>
            <img src={addIcon} alt="Add Icon" className="h-8 sm:h-12" />
          </SubmitButton>
        </div>
      )}
    </main>
  );
};

export default MyProjectsPage;
