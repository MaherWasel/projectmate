import React from "react";
import { useState, useEffect } from "react";
import { dummyProjects } from "../../../helpers/dummydata";
import { useParams } from "react-router-dom";
import HomeHeader from "../../../components/layout/HomeHeader";
import CircularProgressIndicator from "../../../components/spinner/circulatProgressIndicator";
import ProjectPageHeader from "../components/ProjectPageHeader";
import ProjectDetails from "../components/ProjectDetails";
const ProjectPage = () => {
  const { id } = useParams();

  const [project, setProject] = useState({});
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
          setTimeout(
            () =>
              resolve(
                dummyProjects.forEach((project) => {
                  if (project.id.toString() === id) {
                    setProject(project);
                  }
                })
              ),
            100
          )
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
  }, [id]);
  return (
    <main className="bg-darkGray min-h-screen  w-full flex flex-col py-16 px-8">
      {pageState.loading ? (
        <div className="flex justify-center items-center flex-1">
          <CircularProgressIndicator />
        </div>
      ) : pageState.success ? (
        <section className="flex gap-24 flex-col">
          <ProjectPageHeader project={project} />

          <ProjectDetails project={project} />
        </section>
      ) : pageState.error ? (
        <p className=" text-redError flex justify-center flex-1 items-center">
          {pageState.errorMessage || "ERROR"}
        </p>
      ) : null}
    </main>
  );
};

export default ProjectPage;
